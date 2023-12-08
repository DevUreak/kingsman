// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.22;

import {IDiamond} from "./interfaces/IDiamond.sol";
import {DiamondBase} from "./utils/DiamondBase.sol";
import {DiamondAuth} from "./utils/DiamondAuth.sol";
import {DiamondLoupe} from "./utils/DiamondLoupe.sol";
import {DiamondManager} from "./DiamondManager.sol";

abstract contract DiamondContract is DiamondAuth, DiamondLoupe {
    using DiamondManager for bytes32;
    using DiamondManager for DiamondManager.Data;

    constructor(
        string memory _key,
        IDiamond.Cut[] memory _diamondCut,
        IDiamond.Args memory _args
    ) payable DiamondBase(_key) DiamondAuth(true) DiamondLoupe(true) {
        _this.setOwner(_args.owner);
        _this.setAccess(address(this), true);
        _this.diamond().addr = payable(address(this));

        DiamondManager.diamondCut(_diamondCut, _args.init, _args.initCalldata);
    }

    function facet(bytes4 _funct) public virtual returns (address) {
        return _this.diamond().funct[_funct].facet;
    }

    function facet(
        bytes32 _contract,
        bytes4 _funct
    ) public virtual returns (address) {
        return _contract.diamond().funct[_funct].facet;
    }
}
