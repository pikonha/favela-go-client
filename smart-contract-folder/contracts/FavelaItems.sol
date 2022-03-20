// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/AccessControl.sol";

abstract contract FavelaItems is AccessControl {

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    struct FavelaItem {
        uint256 id;
        string ipfsId;
        bool canMint;
    }

    FavelaItem[] internal items;
    
    event AddedItem(FavelaItem item, uint256 index);
    event UpdatedItem(FavelaItem item, uint256 index);

    function AddItem(string memory _ipfsId, bool _canMint) public onlyRole(MINTER_ROLE){
        
        uint256 lengthBefore = items.length;

        FavelaItem memory item = FavelaItem({
            id: lengthBefore,
            ipfsId: _ipfsId,
            canMint: _canMint
        });

        items.push(item);
        emit AddedItem(item, lengthBefore + 1);
    }

    function getItem(uint256 _index) public view returns (FavelaItem memory) {
        require(items.length >= _index, "Index doenst exists");
        FavelaItem storage item = items[_index];
        return item;
    }

    function updateItem(uint256 _index, string memory _ipfsId, bool _canMint) public onlyRole(MINTER_ROLE) {
        
        uint256 length = items.length;
        require(length >= _index, "Index doenst exists");
        
        FavelaItem memory item = FavelaItem({
            id : _index,
            ipfsId: _ipfsId,
            canMint: _canMint
        });

        items[_index] = item;
        emit UpdatedItem(item, length);
    }

    function getItemsLength() public view returns(uint256){
        return items.length;
    }

    function getAllItems() public view returns (FavelaItem[] memory){
        return items;
    }

}