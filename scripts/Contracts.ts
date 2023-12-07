import { ethers, diamond } from '@coinmeca/ethers';
import { AccountLike, Accounts } from '@coinmeca/ethers/accounts';
import { _, a, color, n } from '@coinmeca/ethers/utils';
import { ERC20, type IERC20 } from '@coinmeca/ethers/interfaces/ERC20';
import { Facets } from '../scripts/Facets';
import Game, { type IGame } from '../scripts/modules/Game';
import { AddressString } from '@coinmeca/ethers/types';

export interface DeployedContracts {
    Game: IGame;
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

    return {
        Game: await game(),
    };
}
