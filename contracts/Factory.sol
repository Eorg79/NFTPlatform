// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "./NFTCollection.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract Factory {
    address immutable NFTCollectionImplementation;
    
    struct NFTCollectionClone {
        string collectionName;
        string collectionSymbol;
        address creator;
    }

    mapping(address=>NFTCollectionClone) public NFTCollections; 
    
    event CollectionCreated(
        address _creator,
        string _collectionName,
        string _collectionSymbol,
        address _collectionAddress,
        uint _timestamp
    );

    constructor() {
       NFTCollectionImplementation = address(new NFTCollection());
    }

    function createCollection(string memory _name, string memory _symbol) external returns (address) {
        address clone = Clones.clone(NFTCollectionImplementation);
        NFTCollection(clone).initialize(_name, _symbol);
        NFTCollections[clone]= NFTCollectionClone(_name, _symbol, msg.sender);
        emit CollectionCreated(msg.sender, _name, _symbol, clone, block.timestamp);
        return clone;
    }

    function getImplementation() external view returns (address) {
        return NFTCollectionImplementation;
    }
}