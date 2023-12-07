// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;
import {Data} from "../Data.sol";
import {Modifiers} from "../shared/Modifiers.sol";

contract Set is Modifiers {
    function test_set(uint a) public {
        $.score = a;
    }
}
