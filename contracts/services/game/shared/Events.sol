// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

interface Events {
    event claim(address indexed _owner, bytes32 indexed _hasedNumber, uint indexed _now);
    event harvest(address indexed _owner, uint indexed _amount, uint indexed _now);
}
