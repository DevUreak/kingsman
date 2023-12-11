import { expect } from "chai";
import { ethers } from "@coinmeca/ethers";
import { Contracts } from "../../scripts/Contracts";
import { Accounts } from "@coinmeca/ethers/accounts";
import { a, n } from "@coinmeca/ethers/utils";

export default describe('# Scenarios Test', () => {

    it('Initialize', async () => {
        const init = await Contracts();
        const { Game, World, Kingdom } = init;
        const WTK = await (await ethers.getContractFactory('MockWTK')).deploy();
        
        const { User } = await Accounts();
        const deployer = User(0);

        User(0).set('deployer');

        describe('', () => {
            it('init : check', async () => {
                

            })

            it('world : check', async () => {
                const world = await World(await WTK.getAddress());
                // 이벤트 생성
                const now:any = (await ethers.provider.getBlock('latest'))?.timestamp;
                await world.use(User(0)).openWorldEvent(1000,now!,10000);
                console.log(await world.getWorldEvent(0));
  
                const amount = ethers.parseUnits('1000', 18);
                await WTK.approve(world.address, amount);
                // 왕국 건설
                await world.createCastle("KBI KINGDOM");

                //왕국 불러오기 
                const kingdomTarget:any = await world.getCastle(0);
                const kingdom = await Kingdom(kingdomTarget);
                console.log(await WTK.balanceOf(kingdom.address))

                console.log(User(0).address);
                //왕국 이벤트 참여
                await kingdom.joinTheEvent(0);
                
                //왕국 이벤트 참여와 동시 게임 생성
                await kingdom.openKingGame(0,'FIRST_GAME');
                const gameaddress:any = await kingdom.infoKingGame(0);
                const GAME = await Game(gameaddress);
                // 게임에대한 왕국 사람 권한 부여
                await kingdom.setGamePermission(GAME.address, User(0).address ,true);

                //console.log(await GAME.createHintNumber(500,2)); 
                const hashed = await GAME.createHintHased(1000, 3, 'KING01'); 
                const min =  Array.from(hashed[0]);
                const max = Array.from(hashed[1]);

                //왕국 게임 시작
                await GAME.startGame(ethers.keccak256(ethers.encodeBytes32String('1000')), ethers.keccak256(ethers.encodeBytes32String('3')), min, max, 'KING01');
                
                

    
            });

        });
    });
});
