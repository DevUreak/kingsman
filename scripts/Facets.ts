export const Facets = {

    world: [
        {
            key: 'WHOISTHEKING.WORLD',
            data: [
                'contracts/services/world/facets/Create.sol:Create',
                'contracts/services/world/facets/Manage.sol:Manage',
                'contracts/services/world/facets/Register.sol:Register',
                'contracts/layout/facets/CutFacet.sol:CutFacet'
            ]
        },
        {
            key: 'WHOISTHEKING.KINGDOM',
            data: [
                'contracts/services/kingdom/facets/Manage.sol:Manage',
                'contracts/services/kingdom/facets/Register.sol:Register',
                'contracts/services/kingdom/facets/Create.sol:Create',
            ]
        },
        {
            key: 'WHOISTHEKING.GAME',
            data: [
                'contracts/services/game/facets/Register.sol:Register',
                'contracts/services/game/facets/Generation.sol:Generation',
                'contracts/services/game/facets/Harrier.sol:Harrier',
                'contracts/services/game/facets/Claim.sol:Claim',
                'contracts/services/game/facets/Manage.sol:Manage',
                'contracts/layout/facets/CutFacet.sol:CutFacet'
            ]
        }
    ],

    reserve: [
        {
            key: 'WHOISTHEKING.RESERVE',
            data: [
                'contracts/services/reserve/facets/Manage.sol:Manage',
                'contracts/services/reserve/facets/Staking.sol:Staking',
                'contracts/layout/facets/CutFacet.sol:CutFacet'
            ]
        }
    ],
}

