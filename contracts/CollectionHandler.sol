// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collection.sol";
import "./CollectionFactory.sol";

contract CollectionHandler is CollectionFactory {

    //mapping from collection address to contracts
    mapping(address=>Collection) internal _collectionMap;
    Collection[] internal _collectionArray;

    function createCollection(string memory name, string memory symbol) public returns (address){
        Collection newCollection = CollectionFactory.createCollectionFactory(name, symbol, msg.sender);
        newCollection.setCollectionCreator(msg.sender);
        saveNewCollectionToStorage(newCollection);
        return address(newCollection);
    }

    /*function createCollectionAndMint(string memory name, string memory symbol, address creatorAddress) public returns (address){
        Collection newCollection = CollectionFactory.createCollectionFactory(name, symbol, creatorAddress);
        newCollection.setCollectionCreator(creatorAddress);
        saveNewCollectionToStorage(newCollection);
        address _recipient = 0x8C18525fC1439F6754E314209A3B47353B5EaAA3; 
        string memory _tokenURI = "ipfs://QmeheGfuzE6fNvrH7tGYbiNaVyxpLbxWY5fcnerMGtK2Ab";
        mintToken(_recipient,_tokenURI,address(newCollection));
        return address(newCollection);
    }*/

    function saveNewCollectionToStorage(Collection collectionToAdd) private{
        _collectionArray.push(collectionToAdd); 
        _collectionMap[address(collectionToAdd)]= collectionToAdd;
    }

    /*function mintToken(address _recipient, string memory _tokenURI, address collectionAddress) public{
        require(msg.sender == _collectionMap[collectionAddress].getCollectionCreator(),"Access Denied : You are not the creator of this collection !");
        _collectionMap[collectionAddress].mintToken(_recipient,_tokenURI);
    }*/
}