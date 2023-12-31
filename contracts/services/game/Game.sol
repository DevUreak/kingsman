// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { DiamondFacade } from 'contracts/layout/DiamondFacade.sol';
import { IDiamond } from 'contracts/layout/interfaces/IDiamond.sol';
import { Data } from './shared/Data.sol';

contract Game is DiamondFacade {
    using Data for Data.Storage;
    Data.Storage internal $;

    constructor(
        address _diamond,
        uint _event,
        address _reserve,
        string memory _title,
        address _rToken
    ) DiamondFacade('WHOISTHEKING.GAME', _diamond) {
        $.setup = false;
        $.playingEvent = _event;
        $.owner = msg.sender; // 오너는 왕국이어야함
        $.permission[msg.sender] = true;
        $.title = _title;
        $.world = _diamond;
        $.reserve = _reserve;
        $.rToken = _rToken;
    }
}
