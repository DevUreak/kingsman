// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

interface Events {
    event staking(address indexed _owner, uint indexed amount, uint indexed _now);
    event unstaking(address indexed _owner, uint indexed _claimAmount, uint indexed _claimTime);
    event claimToken(address indexed _owner, uint indexed _claimAmount, uint indexed _now);
}
