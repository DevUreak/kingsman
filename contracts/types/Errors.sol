// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.22;

interface Errors {
    error NO_PERMISSION(address);
    error NOT_POSSIBLE();
    error INSUFFICIENT_AMOUNT();
    error LOW_VALUE(uint);
    error WRONG_VALUE(uint);
    error ALREADY_REGISTERED();
    error NOT_AVAILABLE(address);
    error EVENT_STATE(bool);
    error MISMATCH_OWNER();
}
