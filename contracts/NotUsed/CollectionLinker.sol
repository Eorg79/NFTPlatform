// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../Collection.sol";
import "./CollectionData.sol";

contract CollectionLinker is Ownable, CollectionData {
    //mapping from collection address to contracts
    mapping(address=>Collection) internal _collectionMap;
    Collection[] internal _collectionArray;

    //Platform Based
    function getAllCollections() external view returns(address[] memory){
        address[] memory collectionList = new address[](_collectionArray.length);

        for(uint i=0; i<_collectionArray.length; i++){
            collectionList[i] = address(_collectionArray[i]);
        }

        return collectionList;
    }

    function getAllTokensFromCollection(address collectionAddress) external view returns(tokenMetaData[] memory){
        uint totalSupply = _collectionMap[collectionAddress].totalSupply();
        tokenMetaData[] memory allTokensMetaDataInCollection = new tokenMetaData[](totalSupply);

        for(uint i=0; i<totalSupply; i++){
            allTokensMetaDataInCollection[i] = this.getMetadataFromToken(collectionAddress, _collectionMap[collectionAddress].tokenByIndex(i));
        }

        return allTokensMetaDataInCollection;
    }

    function getMetadataFromToken(address collectionAddress, uint tokenId) external view returns(tokenMetaData memory){
        //return _collectionMap[collectionAddress].getTokenMetaDataFromID(tokenId);
    }

    //UserBased
    /*
    function getAllCollectionsWithBalance(address userAddress) external view returns(Collection[] memory){
        uint counter = 0 ;
        Collection[] memory tempCollectionsWithBalance = new Collection[](_collectionArray.length);
        
        for(uint i=0; i < _collectionArray.length; i++){
           if(hasCollectionBalance(address(_collectionArray[i]), userAddress) > 0){
               tempCollectionsWithBalance[counter] = _collectionArray[i];
               counter++;
           }
        }

        Collection[] memory collectionsWithBalance = new Collection[](counter);
        for(uint j=0; j < counter; j++){
            collectionsWithBalance[j]=tempCollectionsWithBalance[j];
        }

        return collectionsWithBalance;
    }

    function hasCollectionBalance(address collectionAddress, address userAddress) public view returns(uint) {
        return _collectionMap[collectionAddress].balanceOf(userAddress);
    }

    function getAllTokensMetaDataOwnedFromCollection(address collectionAddress, address userAddress) external view returns(tokenMetaData[] memory ownedNFTsFromCollection) {
        uint balance = hasCollectionBalance(collectionAddress, userAddress);
        ownedNFTsFromCollection = new tokenMetaData[](balance);

        for(uint i=0; i < balance; i++){
            uint tokenId = _collectionMap[collectionAddress].tokenOfOwnerByIndex(userAddress,i);
            ownedNFTsFromCollection[i] = _collectionMap[collectionAddress].getTokenMetaDataFromID(tokenId);
        }
    }

    function getCollectionOwner(address collectionAddress) external view returns(address owner){
       owner = _collectionMap[collectionAddress].owner();
    }

    function getTokenOwner(address collectionAddress, uint tokenId) external view returns(address owner){
       owner = _collectionMap[collectionAddress].ownerOf(tokenId);
    }*/
}