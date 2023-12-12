// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { DiamondFacade } from 'contracts/layout/DiamondFacade.sol';
import { IDiamond } from 'contracts/layout/interfaces/IDiamond.sol';
import { DiamondManager } from 'contracts/layout/DiamondManager.sol';
import { Data } from './shared/Data.sol';
import 'hardhat/console.sol';

// Fascade factory
contract Kingdom is DiamondFacade {
    using DiamondManager for bytes32;
    using Data for Data.Storage;
    Data.Storage internal $;

    constructor(
        string memory _name,
        address _owner,
        address _reserve,
        address _rToken,
        address _diamond
    ) DiamondFacade('WHOISTHEKING.KINGDOM', _diamond) {
        $.name = _name;
        $.owner = _owner;
        $.foundationDay = block.timestamp;
        $.state = true;
        $.world = _this.diamond().addr;
        $.gcounts = 0;
        $.reserve = _reserve;
        $.rToken = _rToken;
    }
}
