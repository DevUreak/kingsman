// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

interface IKingdom {
    function state() external view returns (bool);

    function setState(bool _state) external;

    function getGame(string memory _title) external view returns (uint);

    function reserve() external view returns (address);

    function owner() external view returns (address);
}
