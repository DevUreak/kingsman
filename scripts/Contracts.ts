import { ethers, diamond } from '@coinmeca/ethers';
import { AccountLike, Accounts } from '@coinmeca/ethers/accounts';
import { _, a, color, n } from '@coinmeca/ethers/utils';
import { ERC20, type IERC20 } from '@coinmeca/ethers/interfaces/ERC20';
import { Facets } from '../scripts/Facets';
import Game, { type IGame } from '../scripts/modules/Game';
import World, { IWorld } from './modules/World';
import Kingdom, { IKingdom } from './modules/Kingdom';
import Reserve, {IReserve} from './modules/Reserve';
import { AddressString } from '@coinmeca/ethers/types';


export interface DeployedContracts {
    Game:  (_target:AddressString) => Promise<IGame>;
    World: (_wtk:any, _reserve:AddressString) => Promise<IWorld>;
    Kingdom: (_target:AddressString) => Promise<IKingdom>;
    Reserve: (_wtk:any) => Promise<IReserve>;
    [x: string | number | symbol]: unknown
}

export let contracts:any = {}

export async function Contracts(): Promise<DeployedContracts> {
    const { User } = await Accounts();

    const world = async (_wtk:any, _reserve:AddressString): Promise<IWorld> => {
        if (!contracts?.world) {
            contracts.world = await World(
                await diamond.factory(
                    'contracts/services/world/World.sol:World',
                    [
                        _wtk,
                        _reserve,
                        Facets.world,
                        {
                            owner: a(User(0)),
                            init: a(0),
                            initCalldata: a(0)
                        }
                    ]
                ),
                
            );
        }
        return contracts.world;
    };
    
    const reserve = async (_wtk:any): Promise<IReserve> => {
        if (!contracts?.reserve) {
            contracts.reserve = await Reserve(
                await diamond.factory(
                    'contracts/services/reserve/Reserve.sol:Reserve',
                    [
                        _wtk,
                        Facets.reserve,
                        {
                            owner: a(User(0)),
                            init: a(0),
                            initCalldata: a(0)
                        }
                    ]
                ),
                
            );
        }
        return contracts.reserve;
    };

    const kingdom = async (_target:AddressString): Promise<IKingdom> => {
        return await Kingdom(
            await ethers.getContractAt(await diamond.abi('Kingdom'), _target)
        );
    };

    const game = async (_target:AddressString): Promise<IGame> => {
        return await Game(
            await ethers.getContractAt(await diamond.abi('Game'), _target)
        );
    };

    return {
        Game: game,
        World: world,
        Reserve: reserve,
        Kingdom : kingdom
    };
}
