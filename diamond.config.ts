import { getNetworkName } from "@coinmeca/ethers/utils";
require('dotenv').config();

export const config = {
    deployer: {
        address: process.env.DEPLOYER,
        privateKey: process.env.PRIVATE_KEY
    },
    artifact: {
        diamonds: [
            'contracts/services/game/Game.sol:Game'
        ],
        abi: {
            include: ['facet', 'facets', 'shared'],
            exclude: ['Data', 'Facet'],
            path: 'artifacts/.diamonds',
            file: 'diamond'
        }
    },
    loupe: {
        path: `scripts/deploy/.diamond/${getNetworkName().name}`,
        file: 'facet'
    }
};

export default config;

