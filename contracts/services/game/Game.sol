// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import {DiamondContract} from "contracts/layout/DiamondContract.sol";
import {IDiamond} from "contracts/layout/interfaces/IDiamond.sol";
import {Data} from "./Data.sol";

contract Game is DiamondContract {
    using Data for Data.Storage;
    Data.Storage internal $;

    constructor(
        IDiamond.Cut[] memory _diamondCut,
        IDiamond.Args memory _args
    ) DiamondContract("WHOISTHEKING.GAME", _diamondCut, _args) {}
}
