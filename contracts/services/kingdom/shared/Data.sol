// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

library Data {
    struct Storage {
        string name; //왕국 이름
        address owner; // 왕국의 주인
        uint foundationDay; // 건국일
        bool state; // 왕국 상태
    }
}