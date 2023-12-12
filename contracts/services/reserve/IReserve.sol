// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

interface IReserve {
    function isStaking(address _target) external view returns (bool);

    function kingGameApprove(uint _event) external;
}
