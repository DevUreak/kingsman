// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.22;

library Data {
    struct Storage {
        string title; // 왕국이 설정한 게임 이름
        bytes32 target; // 왕국이 설정한 타겟 번호
        uint count; // 왕국이 설정한 힌트 갯수
        bytes32[] minHint; // 타겟 이하의 힌트
        bytes32[] maxHint; // 타겟 이상의 힌트
        bool setup; // 게임 셋팅 상태, 파밍 참여 상태
        string nonce; // 힌트 해시할때 사용하는 논스
        uint playingEvent; // 참여 이벤트 번호
        address owner; // 왕국 주소
        address world; // world 주소
        mapping(address => bool) permission; // 실행 권한
        uint startTime; // 파밍 시작시간
    }
}
