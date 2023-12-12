import { env } from 'process';
import { diamond } from '@coinmeca/ethers';
import { a, loadAddress, addAddress, result } from '@coinmeca/ethers/utils';
import World from '../../../scripts/modules/World';
import { Facets } from '../../Facets';

export default async function deploy(token:any, deployed?: any) {
    try {
        const { DEPLOYER } = env;
        deployed = deployed || loadAddress()?.contracts;

        const world = await World(
            await diamond.factory('contracts/services/world/World.sol:World', [
                token,
                deployed.reserve,
                Facets.world,
                {
                    owner: DEPLOYER,
                    init: a(0),
                    initCalldata: a(0)
                }
            ])
        );

        addAddress('world', world.address);
        result(true, 'world Deployed!', [world.address]);
        return world;

    } catch (e) {
        result(false, 'World Deploy Failed!', e);
    }
}

export const world = { deploy };
