import { BaseContract } from "ethers";
import { diamond } from "@coinmeca/ethers";
import { AccountLike, IUser } from "@coinmeca/ethers/accounts";

import { a, n } from "@coinmeca/ethers/utils";
import { AddressString } from "@coinmeca/ethers/types";
import { ethers } from "hardhat";

export interface IGame extends IGameModule {
    use: (user: IUser) => IGameModule;
}

export interface IGameModule extends AccountLike {
    createHintNumber : (_target:number, _interval:number) => Promise<any[]>;
    createHintHased : (_target:number, _interval:number, _nonce:string) => Promise<any[]>;
    startGame : (_target:any, _count:any, _minHint:any[], _maxHint:any[], _nonce:string) => Promise<any>;
    harvest : ()=> Promise<number>;
    contract: BaseContract;
}

export default async function Game(game: string | BaseContract & any): Promise<IGame>  {
    game = typeof game === 'string' ? await ethers.getContractAt('game.diamond', game) : game;
    const address: AddressString = typeof game === 'string' ? game : await game.getAddress();

    const module = (game: any, user?: IUser): IGameModule => {


        const createHintNumber = async (_target:number, _interval:number): Promise<any[]> => {
            return await game.createHintNumber(_target,_interval);
        };

        const createHintHased = async (_target:number, _interval:number, _nonce:string): Promise<any[]> => {
            return await game.createHintHased(_target,_interval,_nonce);
        };

        const startGame = async (_target:any, _count:any, _minHint:any[], _maxHint:any[], _nonce:string): Promise<any> => {
            return await game.startGame(_target,_count,_minHint,_maxHint,_nonce);
        };

        const harvest = async (): Promise<number> => {
            return await game.harvest();
        };


        return {
            address,
            createHintNumber,
            createHintHased,
            startGame,
            harvest,
            contract: game
        }as IGameModule;
    }

    const use = (user: IUser): IGameModule => {
        return module(game.connect(user.signer), user);
    }

    return {
        ...module(game),
        use,
    };

}