// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;
import { Type } from 'contracts/types/Type.sol';

interface IWorld {
    function joinTheKingdom(uint _event) external;

    function joinedCastleState(uint _event, address _target) external view returns (bool);

    function getWorldEvent(uint _index) external view returns (Type.WorldEvent memory);

    function joinedCastleState(uint _event) external view returns (uint);

    function setKingdomUpdate(uint _event, uint _count) external;
}
