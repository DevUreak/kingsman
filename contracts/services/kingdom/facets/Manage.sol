// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Modifier } from '../shared/Modifier.sol';
import { Errors } from 'contracts/types/Errors.sol';
import { IERC20 } from 'contracts/interfaces/IERC20.sol';
import { IGame } from 'contracts/services/game/IGame.sol';

contract Manage is Modifier {
    // 왕국 이름 조회
    function name() public view returns (string memory) {
        return $.name;
    }

    // 왕국 주인 조회
    function owner() public view returns (address) {
        return $.owner;
    }

    // 왕국 건국일 조회
    function foundationDay() public view returns (uint) {
        return $.foundationDay;
    }

    // 왕국 상태 조회
    function state() public view returns (bool) {
        return $.state;
    }

    function reserve() public view returns (address) {
        return $.reserve;
    }

    // 왕국 상태 설정 // world만 가능
    function setState(bool _state) public {
        if (msg.sender != $.world) revert Errors.NO_PERMISSION(msg.sender);
        $.state = _state;
    }

    // 게임 정보
    function infoKingGame(uint _target) public view returns (address) {
        return $.games[_target];
    }

    // kingGame set permission
    function setGamePermission(address _target, address _account, bool _state) public {
        IGame(_target).setPermission(_account, _state);
    }

    // king game  name -> index get
    function getGame(string memory _title) public view returns (uint) {
        unchecked {
            bytes32 inHased = keccak256(abi.encodePacked(_title));
            for (uint i = 0; i < $.gcounts; i++) {
                bytes32 outHased = keccak256(abi.encodePacked(IGame($.games[i]).getTitle()));
                if (outHased == inHased) return i;
            }
        }
        revert('NOT_EXIST');
    }
}
