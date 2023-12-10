import { expect } from "chai";
import { ethers } from "@coinmeca/ethers";
import { Contracts } from "../../scripts/Contracts";
import { Accounts } from "@coinmeca/ethers/accounts";
import { a } from "@coinmeca/ethers/utils";

export default describe('# Scenarios Test', () => {

    it('Initialize', async () => {
        const init = await Contracts();
        const { Game, World, Kingdom } = init;
        
        const { User } = await Accounts();
        const deployer = User(0);

        User(0).set('deployer');

        describe('', () => {
            it('world : check', async () => {
                console.log(Game.address)
                
                 await World.use(User(0)).openWorldEvent(1,2,3);
                console.log(await World.getWorldEvent(0));

                await World.createCastle("KBI KINGDOM",deployer);

                const kingdomTarget:any = await World.getCastle(0);

                const kingdom = await Kingdom(kingdomTarget);
                console.log(await kingdom.name())
                console.log(await kingdom.foundationDay())
                console.log(await kingdom.state())
                 console.log(await kingdom.owner())


                
                


                
             
            
    
            });

        });
    });
});
