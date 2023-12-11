// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;
import { Modifier } from '../shared/Modifier.sol';

contract Manage is Modifier {
    function getTitle() public view returns (string memory) {
        return $.title;
    }

    function getTarget() public view returns (bytes32) {
        return $.target;
    }

    function getCount() public view returns (uint) {
        return $.count;
    }

    function getNonce() public view returns (string memory) {
        return $.nonce;
    }

    function getHint() public view returns (bytes32[] memory, bytes32[] memory) {
        return ($.minHint, $.maxHint);
    }

    function getOwner() public view returns (address) {
        return $.owner;
    }

    function getAll() public view returns (bool, uint, address) {
        return ($.setup, $.playingEvent, $.owner);
    }

    // 실행 권한 등록
    function setPermission(address _account, bool _state) public permission {
        $.permission[_account] = _state;
    }
}
