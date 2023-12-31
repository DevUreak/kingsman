// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import {IDiamond} from "../interfaces/IDiamond.sol";
import {DiamondManager} from "../DiamondManager.sol";

contract CutFacet {
    bytes32 constant _this = "";

    function diamondCut(
        IDiamond.Cut[] memory _diamondCut,
        IDiamond.Args memory _args
    ) public virtual {
        DiamondManager.enforceIsContractOwner(_this);
        DiamondManager.diamondCut(_diamondCut, _args.init, _args.initCalldata);
    }
}
