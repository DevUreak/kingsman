// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Errors } from 'contracts/types/Errors.sol';
import { Modifier } from '../shared/Modifier.sol';
import { IKingdom } from 'contracts/services/kingdom/IKingdom.sol';
import { Type } from 'contracts/types/Type.sol';

import 'hardhat/console.sol';

contract Register is Modifier {
    // 왕국 이벤트 참여, 왕국 컨트랙트를 통해서 참여해야함
    function joinTheKingdom(uint _event) public {
        if ($.wevents[_event].state == Type.State.END) revert Errors.EVENT_STATE(false); // 이벤트 종료 여부
        if (!IKingdom(msg.sender).state()) revert Errors.NOT_AVAILABLE(msg.sender); // 왕국 health check
        if ($.playingKingdom[_event][msg.sender]) revert Errors.ALREADY_REGISTERED(); // 중복 왕국 체크
        $.playingKingdom[_event][msg.sender] = true;
        $.playingKingdomCount[_event]++;
    }
}
