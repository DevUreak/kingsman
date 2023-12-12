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
    staking : (_amount:number) => Promise<any> 
    unStaking : (_amount:number)=> Promise<any> 
    claim : () => Promise<any> 
    isStaking : (_target:AddressString) => Promise<any>
    setPeriod : (_timePeriodInSeconds:number) => Promise<any>
    contract: BaseContract;
}



export default async function Reserve(reserve: string | BaseContract & any): Promise<IReserve>  {
    reserve = typeof reserve === 'string' ? await ethers.getContractAt('reserve.diamond', reserve) : reserve;
    const address: AddressString = typeof reserve === 'string' ? reserve : await reserve.getAddress();

    const module = (reserve: any, user?: IUser): IReserveModule => {

        const setWorld = async (_world:AddressString): Promise<any> => {
            return await reserve.setWorld(_world);
        };

        const staking = async (_amount:number): Promise<any> => {
            return await reserve.staking(_amount);
        };

        const unStaking = async (_amount:number): Promise<any> => {
            return await reserve.unStaking(_amount);
        };

        const claim = async (): Promise<any> => {
            return await reserve.claim();
        };

        const isStaking = async (_target:AddressString): Promise<any> => {
            return await reserve.isStaking(_target);
        };

        const setPeriod = async (_timePeriodInSeconds:number): Promise<any> => {
            return await reserve.setPeriod(_timePeriodInSeconds);
        };


        return {
            address,
            setWorld,
            staking,
            unStaking,
            claim,
            isStaking,
            setPeriod,
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
