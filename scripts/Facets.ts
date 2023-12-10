export const Facets = {
    game: [
        {
            key: 'WHOISTHEKING.GAME',
            data: [
                'contracts/services/game/facets/Get.sol:Get',
                'contracts/services/game/facets/Set.sol:Set',
                'contracts/layout/facets/CutFacet.sol:CutFacet'
            ]
        }
    ],

    world: [
        {
            key: 'WHOISTHEKING.WORLD',
            data: [
                'contracts/services/world/facets/Create.sol:Create',
                'contracts/services/world/facets/Manage.sol:Manage',
                'contracts/layout/facets/CutFacet.sol:CutFacet'
            ]
        },
        {
            key: 'WHOISTHEKING.KINGDOM',
            data: [
                'contracts/services/kingdom/facets/Manage.sol:Manage',
            ]
        },
    ],

    reserve: [
        {
            key: 'WHOISTHEKING.RESERVE',
            data: [
                'contracts/services/world/facets/Manage.sol:Manage',
                'contracts/layout/facets/CutFacet.sol:CutFacet'
            ]
        }
    ],
}

