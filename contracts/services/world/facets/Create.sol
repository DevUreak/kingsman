// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Modifier } from '../shared/Modifier.sol';
import { Type } from 'contracts/types/Type.sol';
import { Kingdom } from 'contracts/services/kingdom/Kingdom.sol';
import { IKingdom } from 'contracts/services/kingdom/IKingdom.sol';
import { IERC20 } from 'contracts/interfaces/IERC20.sol';
import { Errors } from 'contracts/types/Errors.sol';
import { Events } from '../shared/Events.sol';
import 'hardhat/console.sol';

contract Create is Modifier {
    // 이벤트 오픈
    function openWorldEvent(uint _amount, uint _start, uint _duration) public isOperate permission {
        $.wevents.push(Type.WorldEvent($.wevents.length, _amount, _start, _duration, Type.State.START));
    }

    // 왕국 건설
    function createCastle(string memory _name) public payable {
        if (IERC20($.mainToken).balanceOf(msg.sender) < $.minAmount) revert Errors.INSUFFICIENT_AMOUNT();

        address kingdom = address(new Kingdom(_name, msg.sender, address(this)));
        $.kingdoms[$.kcounts] = kingdom;
        $.kcounts++;

        IERC20($.mainToken).transferFrom(msg.sender, kingdom, $.minAmount);
        emit Events.createCastle(block.timestamp, msg.sender);
    }
}
