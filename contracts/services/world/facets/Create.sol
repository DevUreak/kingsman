// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;

import {Modifier} from "../shared/Modifier.sol";
import {Type} from "contracts/types/Type.sol";
import {Kingdom} from "contracts/services/kingdom/Kingdom.sol";
import {IKingdom} from "contracts/services/kingdom/IKingdom.sol";

contract Create is Modifier {
    // 이벤트 오픈
    function openWorldEvent(
        uint _amount,
        uint _start,
        uint _duration
    ) public isOperate permission {
        $.wevents.push(
            Type.WorldEvent(
                $.wevents.length,
                _amount,
                _start,
                _duration,
                Type.State.START
            )
        );
    }

    // 이벤트 조회
    function getWorldEvent(
        uint _index
    ) public view returns (Type.WorldEvent memory) {
        return $.wevents[_index];
    }

    // 이벤트 조회
    function getWorldEventAll() public view returns (Type.WorldEvent[] memory) {
        return $.wevents;
    }

    // 왕국 건설
    function createCastle(string memory _name, address _owner) public {
        $.kingdoms[$.kcounts] = address(
            new Kingdom(_name, _owner, address(this))
        );
        $.kcounts++;
    }
}
