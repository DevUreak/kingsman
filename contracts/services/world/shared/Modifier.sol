// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import {Data} from "./Data.sol";
import {Errors} from "contracts/types/Errors.sol";

abstract contract Modifier {
    using Data for Data.Storage;
    Data.Storage internal $;

    modifier permission() {
        if (!$.permission[msg.sender]) revert Errors.NO_PERMISSION(msg.sender);
        _;
    }

    modifier isOperate() {
        if (!$.operate) revert Errors.NOT_POSSIBLE();
        _;
    }
}
