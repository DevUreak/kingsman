// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.22;

library Data {
    struct Storage {
        mapping(address => bool) permission;
        address rToken;
    }
}
