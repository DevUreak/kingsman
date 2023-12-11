// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Errors } from 'contracts/types/Errors.sol';
import { Modifier } from '../shared/Modifier.sol';
import { IWorld } from 'contracts/services/world/IWorld.sol';

import 'hardhat/console.sol';

contract Register is Modifier {
    // 게임 시작
    function startGame(
        bytes32 _target,
        uint _count,
        bytes32[] memory _minHint,
        bytes32[] memory _maxHint,
        string memory _nonce
    ) public permission {
        if ($.setup) revert Errors.ALREADY_REGISTERED();

        $.target = _target;
        $.count = _count;
        $.minHint = _minHint;
        $.maxHint = _maxHint;
        $.setup = true;
        $.nonce = _nonce;
        $.startTime = block.timestamp;

        IWorld($.owner).setKingdomUpdate($.playingEvent, _count);
    }
}