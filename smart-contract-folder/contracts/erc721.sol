// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./FavelaItems.sol";

contract FavelaGO is ERC721, ERC721Enumerable, ERC721URIStorage, Pausable, AccessControl, FavelaItems {
    using Counters for Counters.Counter;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");

    Counters.Counter private _tokenIdCounter;

    string private baseURI = "ipfs://";

    constructor() ERC721("FavelaGO", "FGO") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        
    }

    function _baseURI() internal view override returns (string memory) {
        return baseURI;
    }

    function changeBaseURI(string memory newValue) external onlyRole(MINTER_ROLE){
        baseURI = newValue;
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function safeMint(address to, uint256 itemId) public {

        FavelaItem memory item = getItem(itemId);
        require(item.canMint, "Item cannot be minted");

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();


        _safeMint(to, tokenId);
        _setTokenURI(tokenId, item.ipfsId);
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function changeTokenURI(uint256 tokenId, string memory newValue) external onlyRole(MINTER_ROLE){
        _setTokenURI(tokenId, newValue);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
    
    function getAllNftsIdsByAddress(address addr) external view returns (uint256[] memory){
        
        uint256 addressBalance = balanceOf(addr);    

        uint256[] memory ids = new uint256[](addressBalance);

        for (uint256 index = 0; index < addressBalance; index++) {
            ids[index] = tokenOfOwnerByIndex(addr, index);
        }

        return ids;
    }

    function isMinter(address addr) external view returns (bool){
        return hasRole(MINTER_ROLE, addr);
    }
}