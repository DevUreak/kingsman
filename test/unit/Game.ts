import { expect } from "chai";
import { ethers } from "@coinmeca/ethers";
import { Contracts } from "../../scripts/Contracts";

export default describe('# Unit Test : Game', () => {

    it('Initialize', async () => {
        const init = await Contracts();
        const { Game } = init;

        describe('', () => {
            it('test_facet : value check', async () => {
                console.log(Game.address)
                
                await Game.test_set(12222);
                expect(await Game.test_get()).to.be.equal(12222)
                
                
        
            

            });

        });
    });
});
