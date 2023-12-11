// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Errors } from 'contracts/types/Errors.sol';
import { Modifier } from '../shared/Modifier.sol';
import { IKingdom } from 'contracts/services/kingdom/IKingdom.sol';
import { IWorld } from 'contracts/services/world/IWorld.sol';
import { Type } from 'contracts/types/Type.sol';

import 'hardhat/console.sol';

contract Register is Modifier {
    // 월드 이벤트 참여
    function joinTheEvent(uint _event) public permission {
        IWorld($.world).joinTheKingdom(_event);
    }
}
