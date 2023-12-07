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
    test_get: () => Promise<number>;
    test_set: (index: number) => Promise<any>;
    contract: BaseContract;
}

export default async function Game(game: string | BaseContract & any): Promise<IGame>  {
    game = typeof game === 'string' ? await ethers.getContractAt('game.diamond', game) : game;
    const address: AddressString = typeof game === 'string' ? game : await game.getAddress();

    const module = (game: any, user?: IUser): IGameModule => {
        const test_get = async (): Promise<number> => {
            return await game.test_get();
        };

        const test_set = async (index: number): Promise<any> => {
            return await game.test_set(index);
        };


        return {
            address,
            test_get,
            test_set,
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