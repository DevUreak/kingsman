// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;
import { Modifier } from '../shared/Modifier.sol';
import { IERC20 } from 'contracts/interfaces/IERC20.sol';
import { IWorld } from 'contracts/services/world/IWorld.sol';
import { IGame } from 'contracts/services/game/IGame.sol';
import { IKingdom } from 'contracts/services/kingdom/IKingdom.sol';
import { Type } from 'contracts/types/Type.sol';
import { Errors } from 'contracts/types/Errors.sol';
import { IReserve } from 'contracts/services/reserve/IReserve.sol';
import { Events } from '../shared/Events.sol';
import { Utils } from '../shared/Internals.sol';
import { Data } from '../shared/Data.sol';

import 'hardhat/console.sol';

contract Harrier is Modifier {
    using Utils for Data.Storage;

    // 힌트및 정답 찾기
    function searchHint(uint _number) public view returns (bool state, bytes32 target, bool discovery) {
        if (!IReserve(IKingdom($.owner).reserve()).isStaking(msg.sender)) revert Errors.NOT_POSSIBLE(); // 스테이킹 여부 체크

        target = keccak256(abi.encodePacked(_number, $.nonce));
        for (uint i = 0; i < $.minHint.length; i++) {
            if ($.minHint[i] == target) {
                return (true, target, false);
            }
        }

        for (uint i = 0; i < $.maxHint.length; i++) {
            if ($.maxHint[i] == target) {
                return (true, target, false);
            }
        }
        if (target == $.target) {
            return (true, target, true);
        }
        return (false, target, false);
    }

    // 약탈자 힌트 또는 정답 찾았다고 주장
    function claim(bytes32 _target) public {
        if (!IReserve(IKingdom($.owner).reserve()).isStaking(msg.sender)) revert Errors.NOT_POSSIBLE(); // 스테이킹 여부 체크
        uint l = $.minHint.length >= $.maxHint.length ? $.minHint.length : $.maxHint.length;
        uint minl = 0;
        uint maxl = 0;
        bool state = false;
        for (uint i = 0; i < l; i++) {
            if (minl < $.minHint.length) {
                if ($.minHint[minl] == _target) {
                    state = true;
                    break;
                }
                minl++;
            }
            if (maxl < $.maxHint.length) {
                if ($.maxHint[maxl] == _target) {
                    state = true;
                    break;
                }
                maxl++;
            }
        }
        state = state ? true : $.target == _target;
        if (!state) revert Errors.NOT_FOUNDED();

        $.checked[_target] = Type.Checker(msg.sender, true);
        emit Events.claim(msg.sender, _target, block.timestamp);
    }

    // check target number
    function checkNumber() public view returns (bool) {
        return $.checkNumber();
    }
}
