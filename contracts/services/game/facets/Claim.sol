// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;
import { Modifier } from '../shared/Modifier.sol';
import { IERC20 } from 'contracts/interfaces/IERC20.sol';
import { IWorld } from 'contracts/services/world/IWorld.sol';
import { IGame } from 'contracts/services/game/IGame.sol';
import { Type } from 'contracts/types/Type.sol';
import { Errors } from 'contracts/types/Errors.sol';
import { Utils } from '../shared/Internals.sol';
import { IKingdom } from 'contracts/services/kingdom/IKingdom.sol';
import { Data } from '../shared/Data.sol';
import { Events } from '../shared/Events.sol';

contract Claim is Modifier {
    using Utils for Data.Storage;

    // 이 게임 왕국이 종료를 선언
    // 약탈자및 왕국은 해당 기능을 통해 토큰을 수령해갈수있다.
    function harvest() external guard {
        Type.WorldEvent memory worldEvent = IWorld($.world).getWorldEvent($.playingEvent);
        if ($.harvested) revert Errors.ALREADY_HARVESTED();
        if (block.timestamp < (worldEvent.start + worldEvent.duration)) revert Errors.NOT_YET(); // 게임이 끝난 여부 확인
        if ($.checkNumber() && IKingdom($.owner).owner() == msg.sender) revert Errors.WAS_LOOTED(); // 약탈자 에게 강탈 당했는지 확인
        if (IKingdom($.owner).owner() != msg.sender && $.checked[$.target].owner != msg.sender)
            revert Errors.NO_PERMISSION(msg.sender); // 왕국 소유자 또는 번호를 찾은 권한있는 약탈자가 수행했는지 확인

        uint amount = yield();
        $.harvested = true;
        IERC20($.rToken).transferFrom($.reserve, msg.sender, amount);

        emit Events.harvest(msg.sender, amount, block.timestamp);
    }

    // 이게임의 왕국 수확량 조회
    function yield() public view returns (uint) {
        unchecked {
            Type.WorldEvent memory worldEvent = IWorld($.world).getWorldEvent($.playingEvent);
            uint joined = IWorld($.world).joinedCastleState($.playingEvent); // 함께하는 왕국들

            uint worldWeight; // 왕국 전체 파밍속도
            uint kingdomAmount; // 실제 왕국이 할당받은 토큰
            uint time = worldEvent.start + worldEvent.duration > block.timestamp
                ? block.timestamp
                : worldEvent.start + worldEvent.duration;

            Type.KingdomList[] memory kingdoms = IWorld($.world).getKingdomGame($.playingEvent);

            // 왕국 전체 파밍속도
            for (uint i = 0; i < joined; i++) {
                worldWeight += kingdoms[i].count;
            }
            kingdomAmount = worldEvent.amount / ((worldWeight * 100) / $.count);

            // 제시간에 참여 못한 왕국 계산
            if ($.startTime - worldEvent.start > 600) {
                uint loss = ($.startTime - worldEvent.start) * (kingdomAmount / worldEvent.duration);
                return kingdomAmount = ((kingdomAmount / worldEvent.duration) * (time - $.startTime)) - loss;
            } else {
                return kingdomAmount = (kingdomAmount / worldEvent.duration) * (time - $.startTime);
            }
        }
    }
}
