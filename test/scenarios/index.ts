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
        const a1 = User(1);
        const a2 = User(2);

        User(0).set('deployer');
        User(1).set('a1');
        User(2).set('a2');

        describe('', () => {
            it('init : check', async () => {
                const amount = ethers.parseUnits('100000', 18);
                await WTK.transfer(User(1).address, amount);
                await WTK.transfer(User(2).address, amount);
                

            })

            it('world : check', async () => {
                const world = await World(await WTK.getAddress());
                // 이벤트 생성
                const now:any = (await ethers.provider.getBlock('latest'))?.timestamp;
                await world.use(User(0)).openWorldEvent(1000,now!,10000);
                
                // 왕국 건설
                const amount = ethers.parseUnits('1000', 18);
                await WTK.approve(world.address, amount);
                await WTK.connect(User(1).signer).approve(world.address, amount);
                await WTK.connect(User(2).signer).approve(world.address, amount);

                await world.createCastle("KBI KINGDOM");
                await world.use(User(1)).createCastle("KBI KINGDOM2");
                await world.use(User(2)).createCastle("KBI KINGDOM3");

                //왕국 불러오기 
                const kingdomTarget:any = await world.getCastle(0);
                const kingdomTarget1:any = await world.getCastle(1);
                const kingdomTarget2:any = await world.getCastle(2);
                const kingdom = await Kingdom(kingdomTarget);
                const kingdom1 = await Kingdom(kingdomTarget1);
                const kingdom2 = await Kingdom(kingdomTarget2);

                console.log(await WTK.balanceOf(kingdom.address))
        
                //왕국 이벤트 참여
                await kingdom.joinTheEvent(0);
                await kingdom1.use(User(1)).joinTheEvent(0);
                await kingdom2.use(User(2)).joinTheEvent(0);

                
                //왕국 이벤트 참여와 동시 게임 생성--#1 User0
                await kingdom.openKingGame(0,'FIRST_GAME');
                const gameaddress:any = await kingdom.infoKingGame(0);
                const GAME = await Game(gameaddress);
                // 게임에대한 왕국 사람 권한 부여
                await kingdom.setGamePermission(GAME.address, User(0).address ,true);

                const hashed = await GAME.createHintHased(1000, 3, 'KING01'); 
                const min =  Array.from(hashed[0]);
                const max = Array.from(hashed[1]);

                // //왕국 게임 시작
                 await GAME.startGame(
                    ethers.keccak256(ethers.encodeBytes32String('1000')),
                    ethers.keccak256(ethers.encodeBytes32String('3')), 
                    min,
                    max,
                    'KING01'
                );


                //왕국 이벤트 참여와 동시 게임 생성 --#1 User1
                await kingdom1.use(User(1)).openKingGame(0,'FIRST_GAME_1');
                const gameaddress1:any = await kingdom1.infoKingGame(0);
                const GAME1 = await Game(gameaddress1);
                // 게임에대한 왕국 사람 권한 부여
                await kingdom1.use(User(1)).setGamePermission(GAME1.address, User(1).address ,true);
                
                const hashed1 = await GAME1.createHintHased(1000, 4, 'KING01'); 
                const min1 =  Array.from(hashed1[0]);
                const max1 = Array.from(hashed1[1]);

                //왕국 게임 시작
                await GAME1.use(User(1)).startGame(
                    ethers.keccak256(ethers.encodeBytes32String('1000')),
                    ethers.keccak256(ethers.encodeBytes32String('4')), 
                    min1,
                    max1,
                    'KING01'
                );

                 //왕국 이벤트 참여와 동시 게임 생성 --#2 User2
                 await kingdom2.use(User(2)).openKingGame(0,'FIRST_GAME_2');
                 const gameaddress2:any = await kingdom2.infoKingGame(0);
                 const GAME2 = await Game(gameaddress2);
                 // 게임에대한 왕국 사람 권한 부여
                 await kingdom2.use(User(2)).setGamePermission(GAME2.address, User(2).address ,true);
                 
                 const hashed2 = await GAME2.createHintHased(1000, 5, 'KING02'); 
                 const min2=  Array.from(hashed1[0]);
                 const max2 = Array.from(hashed1[1]);
 
                 //왕국 게임 시작
                 await GAME2.use(User(2)).startGame(
                     ethers.keccak256(ethers.encodeBytes32String('1000')),
                     ethers.keccak256(ethers.encodeBytes32String('5')), 
                     min2,
                     max2,
                     'KING02'
                 );

                 await GAME.harvest();
                
                

    
            });

        });
    });
});
