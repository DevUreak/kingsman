// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Modifier } from '../shared/Modifier.sol';
import { IERC20 } from 'contracts/interfaces/IERC20.sol';
import { Errors } from 'contracts/types/Errors.sol';
import { IGame } from 'contracts/services/game/IGame.sol';
import { IWorld } from 'contracts/services/world/IWorld.sol';

contract Manage is Modifier {
    // 저축량
    function saving() public view returns (uint) {
        return IERC20($.rToken).balanceOf(address(this));
    }

    // 권한 확인
    function getPermission(address _target) public view returns (bool) {
        return $.permission[_target];
    }

    function setWorld(address _target) public permission {
        $.world = _target;
    }

    function setPeriod(uint256 _timePeriodInSeconds) public permission {
        if ($.timestampSet == true) revert Errors.ALREADY_REGISTERED();
        $.timestampSet = true;
        $.period = _timePeriodInSeconds;
    }

    // 왕 게임 권한 요청
    function kingGameApprove(uint _event) external {
        if (IGame(msg.sender).getOwner() == address(0)) revert Errors.NOT_AVAILABLE(msg.sender);
        IERC20($.rToken).approve(msg.sender, IWorld($.world).getWorldEvent(_event).amount);
        //IWorld($.world).approveGame(msg.sender, _event); // IERC20($.rToken).approve(_target, 1000);
    }
}
