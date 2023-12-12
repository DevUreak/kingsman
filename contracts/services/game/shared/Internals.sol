// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Data } from '../shared/Data.sol';

library Utils {
    // check target number
    function checkNumber(Data.Storage storage $) internal view returns (bool) {
        return $.checked[$.target].state;
    }

    function getHased(uint64 _number) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(_number));
    }

    function getHased(uint64 _number, string memory _nonce) internal view returns (bytes32) {
        return keccak256(abi.encodePacked(_number, _nonce));
    }
}
