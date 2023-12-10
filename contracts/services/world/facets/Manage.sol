// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import {Modifier} from "../shared/Modifier.sol";
import {Type} from "contracts/types/Type.sol";

contract Manage is Modifier {
    // operate 조회
    function getOperate() public view returns (bool) {
        return $.operate;
    }

    // operate 설정
    function setOperate(bool _state) public permission {
        $.operate = _state;
    }

    // 왕국 위치 조회
    function getCastle(uint _index) public view returns (address) {
        return $.kingdoms[_index];
    }
}
