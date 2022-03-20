pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20 {
    uint256 public initialSupply = 100_000_000 * 10**18;
    constructor() ERC20("FavelaGO", "FGO") {
        _mint(msg.sender, initialSupply);
    }
}