// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import {DiamondFacade} from "contracts/layout/DiamondFacade.sol";
import {IDiamond} from "contracts/layout/interfaces/IDiamond.sol";
import {Data} from "./shared/Data.sol";

// Fascade factory
contract Kingdom is DiamondFacade {
    using Data for Data.Storage;
    Data.Storage internal $;

    constructor(
        string memory _name,
        address _owner,
        address _diamond
    ) DiamondFacade("WHOISTHEKING.KINGDOM", _diamond) {
        $.name = _name;
        $.owner = _owner;
        $.foundationDay = block.timestamp;
        $.state = true;
    }
}
