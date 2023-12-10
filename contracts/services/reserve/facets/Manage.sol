// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import {Modifier} from "../shared/Modifier.sol";
import {IERC20} from "contracts/interfaces/IERC20.sol";

contract Manage is Modifier {
    // 저축량
    function saving() public view returns (uint) {
        return IERC20($.rToken).balanceOf(address(this));
    }

    // 권한 확인
    function getPermission(address target) public view returns (bool) {
        return $.permission[target];
    }
}
