// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Modifier } from '../shared/Modifier.sol';
import { IERC20 } from 'contracts/interfaces/IERC20.sol';
import { Errors } from 'contracts/types/Errors.sol';
import { Type } from 'contracts/types/Type.sol';
import { Events } from '../shared/Events.sol';

contract Staking is Modifier {
    // 스테이킹
    function staking(uint _amount) public payable {
        if ($.period == 0) revert Errors.NOT_POSSIBLE();
        if (IERC20($.rToken).balanceOf(msg.sender) > _amount) revert Errors.INSUFFICIENT_AMOUNT();

        $.staker[msg.sender] = Type.Staker(_amount, true, 0, 0);

        IERC20($.rToken).transferFrom(msg.sender, address(this), _amount);

        emit Events.staking(msg.sender, _amount, block.timestamp);
    }

    // 언스테이킹 신청
    function unStaking(uint _amount) public guard {
        Type.Staker memory staker = $.staker[msg.sender];
        if (staker.amount <= _amount) revert Errors.INSUFFICIENT_AMOUNT();
        if (!staker.staking) revert Errors.ALREADY_UNSTKAIN();
        if (staker.claimTime != 0) revert Errors.ALREADY_UNSTKAIN();

        staker.staking = false;
        staker.claimTime = block.timestamp + $.period;
        staker.claimAmount = _amount;
        $.staker[msg.sender] = staker;
        emit Events.unstaking(msg.sender, staker.claimAmount, staker.claimTime);
    }

    // 언스 물량 회수
    function claim() public guard {
        Type.Staker memory staker = $.staker[msg.sender];
        if (staker.claimAmount == 0) revert Errors.INSUFFICIENT_AMOUNT();
        if (staker.staking) revert Errors.ALREADY_UNSTKAIN();

        uint amount = staker.claimAmount;
        if ((staker.amount - staker.claimAmount) == 0) staker.staking = false;
        staker.claimTime = 0;
        staker.claimAmount = 0;
        $.staker[msg.sender] = staker;

        IERC20($.rToken).transfer(msg.sender, amount);

        emit Events.claimToken(msg.sender, staker.claimAmount, block.timestamp);
    }

    // 스테이킹 여부
    function isStaking(address _target) public view returns (bool) {
        return $.staker[_target].staking;
    }
}
