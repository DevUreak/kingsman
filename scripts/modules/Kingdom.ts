import { BaseContract } from "ethers";
import { diamond } from "@coinmeca/ethers";
import { AccountLike, IUser } from "@coinmeca/ethers/accounts";
import { a, n } from "@coinmeca/ethers/utils";
import { AddressString } from "@coinmeca/ethers/types";
import { ethers } from "hardhat";

export interface IKingdom extends IKingdomModule {
    use: (user: IUser) => IKingdomModule;
}

export interface IKingdomModule extends AccountLike {
    name : () => Promise<string>;
    owner : () => Promise<any>;
    foundationDay : () => Promise<number>;
    state : () => Promise<boolean>;
    openKingGame : (_event:number, _title:string) => Promise<boolean>;
    infoKingGame : (_target:number) => Promise<string>;
    joinTheEvent : (_event:number) => Promise<any>;
    setGamePermission : (_target:any,_account:any,_state:any) =>Promise<any>;
    contract: BaseContract;
}


export default async function Kingdom(kingdom: string | BaseContract & any): Promise<IKingdom>  {
    kingdom = typeof kingdom === 'string' ? await ethers.getContractAt('kingdom.diamond', kingdom) : kingdom;
    const address: AddressString = typeof kingdom === 'string' ? kingdom : await kingdom.getAddress();

    const module = (kingdom: any, user?: IUser): IKingdomModule => {

        const name = async (): Promise<string> => {
            return await kingdom.name();
        };

        const owner = async (): Promise<any> => {
            return await kingdom.owner();
        };

        const foundationDay = async (): Promise<number> => {
            return await kingdom.foundationDay();
        };

        const state = async (): Promise<boolean> => {
            return await kingdom.state();
        };

        const openKingGame = async (_event:number,_title:string): Promise<boolean> => {
            return await kingdom.openKingGame(_event,_title);
        };

        const infoKingGame = async (_target:number): Promise<string> => {
            return await kingdom.infoKingGame(_target);
        };

        const joinTheEvent = async (_event:number): Promise<any> => {
            return await kingdom.joinTheEvent(_event);
        };

        const setGamePermission = async (_target:any,_account:any,_state:any): Promise<any> => {
            return await kingdom.setGamePermission(_target, _account, _state);
        };
    
        return {
            address,
            name,
            owner,
            foundationDay,
            state,
            openKingGame,
            infoKingGame,
            joinTheEvent,
            setGamePermission,
            contract: kingdom
        } as IKingdomModule;
    }

    const use = (user: IUser): IKingdomModule => {
        return module(kingdom.connect(user.signer), user);
    }

    return {
        ...module(kingdom),
        use,
    };

}