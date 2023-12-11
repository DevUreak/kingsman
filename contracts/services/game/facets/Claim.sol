// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;
import { Modifier } from '../shared/Modifier.sol';
import { IERC20 } from 'contracts/interfaces/IERC20.sol';
import { IWorld } from 'contracts/services/world/IWorld.sol';
import { IGame } from 'contracts/services/game/IGame.sol';
import { Type } from 'contracts/types/Type.sol';

contract Claim is Modifier {
    // 현재 리워드
    function harvest(bool keeper) public view returns (uint) {
        Type.WorldEvent memory events = IWorld($.world).getWorldEvent($.playingEvent);
        uint joined = IWorld($.world).joinedCastleState($.playingEvent); // 함께하는 왕국들
        uint weight; // 파밍속도

        // for (uint i = 0; i < joined; i++) {
        //     weight =

        // }

        // 1. 왕국 전체 파밍속도 저장하고 조회
        // 2. 받지못하는 토큰 계산 -> 파밍시작하는 함수에 넣어주자
    }
}
