// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { DiamondContract } from 'contracts/layout/DiamondContract.sol';
import { IDiamond } from 'contracts/layout/interfaces/IDiamond.sol';
import { Data } from './shared/Data.sol';

contract World is DiamondContract {
    using Data for Data.Storage;
    Data.Storage internal $;

    constructor(
        address _mainToken,
        address _reserve,
        IDiamond.Cut[] memory _diamondCut,
        IDiamond.Args memory _args
    ) DiamondContract('WHOISTHEKING.WORLD', _diamondCut, _args) {
        $.permission[msg.sender] = true;
        $.operate = true;
        $.minAmount = 1000 * 10 ** 18;
        $.mainToken = _mainToken;
        $.reserve = _reserve;
    }
}
