// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;
import {Data} from "../Data.sol";
import {Modifiers} from "../shared/Modifiers.sol";

contract Get is Modifiers {
    function test_get() public view returns (uint) {
        return $.score;
    }
}
