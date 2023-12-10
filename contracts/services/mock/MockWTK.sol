// SPDX-License-Identifier: GPL-3.0-only
pragma solidity ^0.8.22;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MockWTK is ERC20 {
    constructor() ERC20("WTK Token", "WTK") {
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }
}
