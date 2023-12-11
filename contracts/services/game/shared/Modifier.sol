// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.22;

import { Errors } from 'contracts/types/Errors.sol';
import { Data } from '../Data.sol';

abstract contract Modifier {
    using Data for Data.Storage;
    Data.Storage internal $;

    modifier permission() {
        if (!$.permission[msg.sender]) revert Errors.NO_PERMISSION(msg.sender);
        _;
    }
}
