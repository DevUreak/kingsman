// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import { Type } from 'contracts/types/Type.sol';

library Data {
    struct Storage {
        mapping(address => bool) permission;
        mapping(uint => mapping(address => bool)) playingKingdom; // 게임에 참여한 왕국 상태
        mapping(uint => uint) playingKingdomCount; // 게임에 참여한 왕국 index,
        mapping(uint => Type.KingdomList[]) playingKingdomList; // 게임에 참여한 왕국 정보
        mapping(uint => address) kingdoms; // 건국된 왕국 정보
        bool operate;
        Type.WorldEvent[] wevents; // 이벤트들
        uint kcounts; // 왕국 갯수
        uint gcounts; // 게임갯수
        uint minAmount; // 건국 토큰 갯수
        address mainToken;
    }
}
