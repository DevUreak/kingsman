import { ethers, diamond } from '@coinmeca/ethers';
import { AccountLike, Accounts } from '@coinmeca/ethers/accounts';
import { _, a, color, n } from '@coinmeca/ethers/utils';
import { ERC20, type IERC20 } from '@coinmeca/ethers/interfaces/ERC20';
import { Facets } from '../scripts/Facets';
import Game, { type IGame } from '../scripts/modules/Game';
import World, { IWorld } from './modules/World';
import { AddressString } from '@coinmeca/ethers/types';
import Kingdom, { IKingdom } from './modules/Kingdom';

export interface DeployedContracts {
    Game: IGame;
    World: IWorld;
    Kingdom: (_target:AddressString) => Promise<IKingdom>;
    [x: string | number | symbol]: unknown
}

export let contracts:any = {}

export async function Contracts(): Promise<DeployedContracts> {
    const { User } = await Accounts();

    const game = async (): Promise<IGame> => {
        if (!contracts?.game) {
            contracts.game = await Game(
                await diamond.factory(
                    'contracts/services/game/Game.sol:Game',
                    [
                        Facets.game,
                        {
                            owner: a(User(0)),
                            init: a(0),
                            initCalldata: a(0)
                        }
                    ]
                )
            );
        }
        return contracts.game;
    };

    const world = async (): Promise<IWorld> => {
        if (!contracts?.world) {
            contracts.world = await World(
                await diamond.factory(
                    'contracts/services/world/World.sol:World',
                    [
                        Facets.world,
                        {
                            owner: a(User(0)),
                            init: a(0),
                            initCalldata: a(0)
                        }
                    ]
                )
            );
        }
        return contracts.world;
    };

    const kingdom = async (_target:AddressString): Promise<IKingdom> => {
        return await Kingdom(
            await ethers.getContractAt(await diamond.abi('Kingdom'), _target)
        );
    };

    return {
        Game: await game(),
        World: await world(),
        Kingdom : kingdom
    };
}
