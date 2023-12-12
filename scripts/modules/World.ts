import { BaseContract } from "ethers";
import { diamond } from "@coinmeca/ethers";
import { AccountLike, IUser } from "@coinmeca/ethers/accounts";

import { a, n } from "@coinmeca/ethers/utils";
import { AddressString } from "@coinmeca/ethers/types";
import { ethers } from "hardhat";

export interface IWorld extends IWorldModule {
    use: (user: IUser) => IWorldModule;
}

export interface IWorldModule extends AccountLike {
    openWorldEvent: (_amount:number, _start:number, _duration:number) => Promise<any>;
    getWorldEvent: (_index: number) => Promise<any>;
    createCastle : (_name:string) => Promise<any>;
    getCastle :(_index:number) => Promise<string>
    contract: BaseContract;
}

export default async function World(world: string | BaseContract & any): Promise<IWorld>  {
    world = typeof world === 'string' ? await ethers.getContractAt('world.diamond', world) : world;
    const address: AddressString = typeof world === 'string' ? world : await world.getAddress();

    const module = (world: any, user?: IUser): IWorldModule => {


        const openWorldEvent = async (_amount:number, _start:number, _duration:number): Promise<any> => {
            return await world.openWorldEvent(ethers.parseUnits(_amount.toString(), 18),_start,_duration);
        };

        const getWorldEvent = async (_index: number): Promise<any> => {
            return await world.getWorldEvent(_index);
        };

        const createCastle = async (_name:string): Promise<any> => {
            return await world.createCastle(_name);
        };

        const getCastle = async (_index:number): Promise<string> => {
            return await world.getCastle(_index);
        };


        return {
            address,
            openWorldEvent,
            getWorldEvent,
            createCastle,
            getCastle,
            contract: world
        }as IWorldModule;
    }

    const use = (user: IUser): IWorldModule => {
        return module(world.connect(user.signer), user);
    }

    return {
        ...module(world),
        use,
    };

}