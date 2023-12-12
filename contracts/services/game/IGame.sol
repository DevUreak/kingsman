// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

interface IGame {
    function setPermission(address _account, bool _state) external;

    function getTitle() external view returns (string memory);

    function getCount() external view returns (bytes32);

    function getOwner() external view returns (address);

    function getAll() external view returns (bool, uint, address);
}
