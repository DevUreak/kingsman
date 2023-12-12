// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.22;

import { Type } from 'contracts/types/Type.sol';

library Data {
    struct Storage {
        mapping(address => bool) permission;
        mapping(address => Type.Staker) staker;
        address rToken;
        address world;
        bool process;
        bool timestampSet; // 셋업1
        uint period; // 락 기간
    }
}
