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
    yields : ()=> Promise<number>;
    harvest : ()=> Promise<any>;
    searchHint : (searchHint:number) => Promise<any>;
    claim : (_hasedNumber:any) => Promise<any>;
    hasedNumber : (_target:any) => Promise<any>;
    hasednonce : (_target:any, _nonce:string) => Promise<any> ;
    checkNumber : () => Promise<any> ;
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

        const yields = async (): Promise<number> => {
            return await game.yield();
        };

        const harvest = async (): Promise<any> => {
            return await game.harvest();
        };

        const searchHint = async (_number:number): Promise<any> => {
            return await game.searchHint(_number);
        };
      
        const claim = async (_hasedNumber:any): Promise<any> => {
            return await game.claim(_hasedNumber);
        };
        
        const hasedNumber = async (_target:any): Promise<any> => {
            return await game['hasedNumber(uint64)'](_target);
        };

        const hasednonce = async (_target:any, _nonce:string): Promise<any> => {
            return await game['hasedNumber(uint64,string)'](_target, _nonce);
        }

        const checkNumber = async (): Promise<any> => {
            return await game.checkNumber();
        }
        

        return {
            address,
            createHintNumber,
            createHintHased,
            startGame,
            yields,
            harvest,
            searchHint,
            claim,
            hasedNumber,
            hasednonce,
            checkNumber,
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