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


        return {
            address,
            name,
            owner,
            foundationDay,
            state,
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