// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Modifier } from '../shared/Modifier.sol';
import { Type } from 'contracts/types/Type.sol';
import { Errors } from 'contracts/types/Errors.sol';
import { IGame } from 'contracts/services/game/IGame.sol';
import { IERC20 } from 'contracts/interfaces/IERC20.sol';

import 'hardhat/console.sol';

contract Manage is Modifier {
    // operate 조회
    function getOperate() public view returns (bool) {
        return $.operate;
    }

    // operate 설정
    function setOperate(bool _state) public permission {
        $.operate = _state;
    }

    // 왕국 위치 조회
    function getCastle(uint _index) public view returns (address) {
        return $.kingdoms[_index];
    }

    // 왕국 이벤트 등록 조회
    function joinedCastleState(uint _event, address _target) public view returns (bool) {
        return $.playingKingdom[_event][_target];
    }

    // 왕구 정보 조회2
    function joinedCastleState(uint _event) public view returns (uint) {
        return $.playingKingdomCount[_event];
    }

    // 이벤트 조회
    function getWorldEvent(uint _event) public view returns (Type.WorldEvent memory) {
        return $.wevents[_event];
    }

    // 이벤트 조회
    function getWorldEventAll() public view returns (Type.WorldEvent[] memory) {
        return $.wevents;
    }

    // 왕국 게임정보 셋팅
    function setKingdomUpdate(uint _event, uint _count) external {
        (bool state, uint __event, address owner) = IGame(msg.sender).getAll();
        if (!$.playingKingdom[__event][owner]) revert Errors.NO_PERMISSION(msg.sender); // 왕국만 최초 한번 실행 가능
        if (state && (__event == _event)) {
            $.playingKingdomList[_event].push(Type.KingdomList(msg.sender, _count, true));
        } else {
            revert Errors.NOT_AVAILABLE(owner);
        }
    }

    // 게임정보 조회
    function getKingdomGame(uint _event) public view returns (Type.KingdomList[] memory) {
        return $.playingKingdomList[_event];
    }
}
