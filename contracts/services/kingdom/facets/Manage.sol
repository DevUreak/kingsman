// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import {Modifier} from "../shared/Modifier.sol";
import {IERC20} from "contracts/interfaces/IERC20.sol";

contract Manage is Modifier {
    // 왕국 이름 조회
    function name() public view returns (string memory) {
        return $.name;
    }

    // 왕국 주인 조회
    function owner() public view returns (address) {
        return $.owner;
    }

    // 왕국 건국일 조회
    function foundationDay() public view returns (uint) {
        return $.foundationDay;
    }

    // 왕국 상태 조회
    function state() public view returns (bool) {
        return $.state;
    }
}
