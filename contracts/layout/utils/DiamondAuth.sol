// SPDX-License-Identifier: CC0-1.0
pragma solidity ^0.8.22;

import {DiamondBase} from "./DiamondBase.sol";
import {DiamondManager} from "../DiamondManager.sol";

abstract contract DiamondAuth is DiamondBase {
    using DiamondManager for bytes32;
    using DiamondManager for DiamondManager.Data;

    constructor(bool _diamond) {
        if (_diamond) {
            bytes4[] memory f = new bytes4[](4);
            f[0] = 0x466a0146;
            f[1] = 0x8da5cb5b;
            f[2] = 0xb84614a5;
            f[3] = 0x13af4035;
            DiamondManager.internalCut(f, "auth");
        }
    }

    function owner() public virtual returns (address) {
        address payable diamond = _this.diamond().addr;
        return
            diamond == address(this)
                ? _this.owner()
                : DiamondAuth(diamond).owner();
    }

    function setOwner(address _owner) public virtual {
        address payable diamond = _this.diamond().addr;
        diamond == address(this)
            ? _this.setOwner(_owner)
            : DiamondAuth(diamond).setOwner(_owner);
    }

    function setAccess(address _owner, bool _access) public virtual {
        address payable diamond = _this.diamond().addr;
        diamond == address(this)
            ? _this.setAccess(_owner, _access)
            : DiamondAuth(diamond).setAccess(_owner, _access);
    }

    function checkAccess(address _owner) public view virtual returns (bool) {
        address payable diamond = _this.diamond().addr;
        return
            diamond == address(this)
                ? _this.checkAccess(_owner)
                : DiamondAuth(diamond).checkAccess(_owner);
    }
}
