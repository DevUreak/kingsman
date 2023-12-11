// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Modifier } from '../shared/Modifier.sol';
import { IERC20 } from 'contracts/interfaces/IERC20.sol';
import { Game } from 'contracts/services/game/Game.sol';
import { IWorld } from 'contracts/services/world/IWorld.sol';
import { Errors } from 'contracts/types/Errors.sol';

contract Create is Modifier {
    // 게임 오픈
    function openKingGame(uint _event, string memory _title) public permission {
        if (!IWorld($.world).joinedCastleState(_event, address(this))) revert Errors.NOT_AVAILABLE(address(this)); // 왕국이 _event에 등록되어있는지 확인
        $.games[$.gcounts] = address(new Game($.world, _event, _title));
        $.gcounts++;
    }
}
