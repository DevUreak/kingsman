import { result } from '@coinmeca/ethers/utils';
import { ethers } from "@coinmeca/ethers";
import {reserve} from './modules/Reserve';
import {world} from './modules/World';

// 배포 
const deploy = async () => {
    const WTK = await (await (await ethers.getContractFactory('MockWTK')).deploy()).getAddress();
    result(true, 'MockWTK Token Deployed!', [WTK]);
    await reserve.deploy(WTK);
    await world.deploy(WTK);
}

const main = async () => {
    await deploy();
}
main(); 


