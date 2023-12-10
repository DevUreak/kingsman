// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.22;

import {Type} from "contracts/types/Type.sol";

library Data {
    struct Storage {
        mapping(address => bool) permission;
        bool operate;
        Type.WorldEvent[] wevents; // 이벤트들
        mapping(uint => address) kingdoms; // 왕국 정보
        uint kcounts; // 왕국 갯수
    }
}
