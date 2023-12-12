import { env } from 'process';
import { diamond } from '@coinmeca/ethers';
import { a, loadAddress, addAddress, result } from '@coinmeca/ethers/utils';
import Reserve from '../../../scripts/modules/Reserve';
import { Facets } from '../../Facets';

export default async function deploy(token:any, deployed?: any) {
    try {
        const { DEPLOYER } = env;
        deployed = deployed || loadAddress()?.contracts;

        const reserve = await Reserve(
            await diamond.factory('contracts/services/reserve/Reserve.sol:Reserve', [
                token,
                Facets.reserve,
                {
                    owner: DEPLOYER,
                    init: a(0),
                    initCalldata: a(0)
                }
            ])
        );

        addAddress('reserve', reserve.address);
        result(true, 'reserve Deployed!', [reserve.address]);
        return reserve;

    } catch (e) {
        result(false, 'Reserve Deploy Failed!', e);
    }
}

export const reserve = { deploy };
