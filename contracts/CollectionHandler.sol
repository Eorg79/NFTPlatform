// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collection.sol";
import "./CollectionLinker.sol";
import "./CollectionFactory.sol";

contract CollectionHandler is CollectionLinker, CollectionFactory {

    function createCollection(string memory name, string memory symbol, address creatorAddress) public returns (address){
        Collection newCollection = CollectionFactory.createCollectionFactory(name, symbol, creatorAddress);
        
        if(newCollection.owner() == address(this)){
            newCollection.transferOwnership(creatorAddress);
        }
        
        addNewCollectionToStorage(newCollection);
        
        return address(newCollection);
    }

    function addNewCollectionToStorage(Collection collectionToAdd) private{
        _collectionArray.push(collectionToAdd);
        _collectionMap[address(collectionToAdd)]= collectionToAdd;
    }

    function mintToken(address _recipient, string memory _tokenURI, address collectionAddress) public{
        _collectionMap[collectionAddress].mintToken(_recipient,_tokenURI);
    }
}