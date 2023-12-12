import { BaseContract } from "ethers";
import { diamond } from "@coinmeca/ethers";
import { AccountLike, IUser } from "@coinmeca/ethers/accounts";

import { a, n } from "@coinmeca/ethers/utils";
import { AddressString } from "@coinmeca/ethers/types";
import { ethers } from "hardhat";

export interface IReserve extends IReserveModule {
    use: (user: IUser) => IReserveModule;
}

export interface IReserveModule extends AccountLike {
    setWorld :(_world:AddressString) => Promise<any>
    contract: BaseContract;
}

export default async function Reserve(reserve: string | BaseContract & any): Promise<IReserve>  {
    reserve = typeof reserve === 'string' ? await ethers.getContractAt('reserve.diamond', reserve) : reserve;
    const address: AddressString = typeof reserve === 'string' ? reserve : await reserve.getAddress();

    const module = (reserve: any, user?: IUser): IReserveModule => {

        const setWorld = async (_world:AddressString): Promise<any> => {
            return await reserve.setWorld(_world);
        };


        return {
            address,
            setWorld,
            contract: reserve
        }as IReserveModule;
    }

    const use = (user: IUser): IReserveModule => {
        return module(reserve.connect(user.signer), user);
    }

    return {
        ...module(reserve),
        use,
    };

}