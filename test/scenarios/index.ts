import { expect } from "chai";
import { ethers } from "@coinmeca/ethers";
import { Contracts } from "../../scripts/Contracts";
import { Accounts } from "@coinmeca/ethers/accounts";
import { a, n } from "@coinmeca/ethers/utils";
import { IWorld } from "../../scripts/modules/World";
import { IGame } from "../../scripts/modules/Game";
import { IReserve } from "../../scripts/modules/Reserve";

export default describe('# Scenarios Test', () => {

    it('Initialize', async () => {
        const init = await Contracts();
        const { Game, World, Kingdom, Reserve } = init;
        const WTK = await (await ethers.getContractFactory('MockWTK')).deploy();
        
        const { User } = await Accounts();
        const deployer = User(0);
        const a1 = User(1);
        const a2 = User(2);
        let world:IWorld;
        let reserve:IReserve;

        User(0).set('deployer');
        User(1).set('a1');
        User(2).set('a2');

        describe('First Scenarios', () => {
            it('init', async () => {
                const amount = ethers.parseUnits('1000000', 18);
                await WTK.transfer(User(0).address, amount);
                await WTK.transfer(User(1).address, amount);
                await WTK.transfer(User(2).address, amount);
            })

            it('Game Setting', async () => {
                reserve = await Reserve(await WTK.getAddress());
                world = await World(await WTK.getAddress(), reserve.address);
                await reserve.setWorld(world.address);

                const day = 86400;
                // 베스팅 이벤트 생성
                const now:any = (await ethers.provider.getBlock('latest'))?.timestamp;
                await world.use(User(0)).openWorldEvent(1000, now!, day * 1);
                
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
                    await GAME.hasednonce(1000,'KING01'),
                    3, 
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
                
                const hashed1 = await GAME1.createHintHased(1000, 4, 'KING03'); 
                const min1 =  Array.from(hashed1[0]);
                const max1 = Array.from(hashed1[1]);

                //왕국 게임 시작
                await GAME1.use(User(1)).startGame(
                    await GAME.hasednonce(1000,'KING03'),
                    4, 
                    min1,
                    max1,
                    'KING03'
                );

                 //왕국 이벤트 참여와 동시 게임 생성 --#2 User2
                 await ethers.provider.send("evm_increaseTime", [600]); // 1hr
                 await ethers.provider.send("evm_mine");

                 await kingdom2.use(User(2)).openKingGame(0,'FIRST_GAME_2');
                 const gameaddress2:any = await kingdom2.infoKingGame(0);
                 const GAME2 = await Game(gameaddress2);
                 // 게임에대한 왕국 사람 권한 부여
                 await kingdom2.use(User(2)).setGamePermission(GAME2.address, User(2).address ,true);
                 
                 const hashed2 = await GAME2.createHintHased(1000, 5, 'KING02'); 
                 const min2=  Array.from(hashed2[0]);
                 const max2 = Array.from(hashed2[1]);
 
                 //왕국 게임 시작
                 await GAME2.use(User(2)).startGame(
                     ethers.keccak256(ethers.encodeBytes32String('1000')),
                     5, 
                     min2,
                     max2,
                     'KING02'
                 );
                 await ethers.provider.send("evm_increaseTime", [36000]); // 1hr
                 await ethers.provider.send("evm_mine");
                // total 1000 
                // 왕국 0 : 부스트 : 3  == 250
                // 왕국 1 : 부스트 : 4  == 333
                // 왕국 2 : 부스트 : 5  == 500
                // 총 부스트 : 12 
    
            });

            it('Kingdom Claim', async () => {
                const day = 86400;
                const kingdomTarget:any = await world.getCastle(0);
                const kingdom = await Kingdom(kingdomTarget);
   
                const gameaddress:any = await kingdom.infoKingGame(0);
                const GAME = await Game(gameaddress);

                await expect(GAME.use(User(0)).harvest())
                .to.be.revertedWithCustomError(GAME.contract,'NOT_YET');

                await ethers.provider.send("evm_increaseTime", [day]); 
                await ethers.provider.send("evm_mine");

                await expect(GAME.use(User(1)).harvest())
                .to.be.revertedWithCustomError(GAME.contract,'NO_PERMISSION');

                await GAME.harvest();

                await expect(GAME.harvest())
                .to.be.revertedWithCustomError(GAME.contract,'ALREADY_HARVESTED');
            
            })

            it('Harrier Claim', async () => {
                const day = 86400;
                const kingdomTarget:any = await world.getCastle(1);
                const kingdom = await Kingdom(kingdomTarget);
   
                const gameaddress:any = await kingdom.infoKingGame(0);
                const GAME = await Game(gameaddress);
                // 언스테이킹 기한 설정 
                await reserve.setPeriod(day);
                await WTK.approve(reserve.address, ethers.parseEther('10000'));
                await WTK.connect(User(1).signer).approve(reserve.address, ethers.parseEther('10000'));
                await reserve.staking(10000); // 스테이킹 
                await reserve.use(User(1)).staking(10000); // 스테이킹 
               
                
                // 정답 검증
                const result = await GAME.searchHint(1000);
                expect(result[0]).to.be.equal(true)
                expect(result[2]).to.be.equal(true)

                // 힌트 검증
                const hint = await GAME.createHintNumber(1000,4);
                const min:any=  Array.from(hint[0]);
                const max:any = Array.from(hint[1]);

                expect((await GAME.searchHint(min[0]))[0]).to.be.equal(true)
                expect((await GAME.searchHint(min[1]))[0]).to.be.equal(true)
                expect((await GAME.searchHint(max[2]))[0]).to.be.equal(true)
                expect((await GAME.searchHint(max[3]))[0]).to.be.equal(true)

                expect(GAME.claim(await GAME.hasednonce(999,'KING03')))
                .to.be.revertedWithCustomError(GAME.contract,'NOT_FOUNDED')

                await GAME.claim(await GAME.hasednonce(min[0],'KING03'))
                await GAME.claim(await GAME.hasednonce(max[3],'KING03'))

                // 정답 클레임및 확인 
                await GAME.use(User(1)).claim(await GAME.hasednonce(1000,'KING03'))
                expect(await GAME.use(User(1)).checkNumber()).to.be.equal(true)

                await ethers.provider.send("evm_increaseTime", [day]); 
                await ethers.provider.send("evm_mine");

                // 약탈 당해서 클레임 불가
                expect(GAME.use(User(0)).harvest())
                .to.be.revertedWithCustomError(GAME.contract,'WAS_LOOTED')
                
                // 권한 없는 사람은 수확 불가 
                expect(GAME.use(User(2)).harvest())
                .to.be.revertedWithCustomError(GAME.contract,'NO_PERMISSION')
              
                // 정답 찾은 1번 계정만 수확 가능 
                await GAME.use(User(1)).harvest();
            })

        });
    });
});
