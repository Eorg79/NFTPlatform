// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collection.sol";
import "./CollectionData.sol";

contract CollectionLinker is Ownable, CollectionData {
    //mapping from collection address to contracts
    mapping(address=>Collection) internal _collectionMap;
    Collection[] internal _collectionArray;

    event debug(
        uint log
    );
    function getAllCollectionsWithBalance(address userAddress) public view returns(Collection[] memory result){
        uint counter = 0 ;
        for(uint i=0; i < _collectionArray.length; i++){
           if(hasCollectionBalance(address(_collectionArray[i]), userAddress) > 0){
               result[counter]=_collectionArray[i];
               counter++;
           }
        }
    }

    function hasCollectionBalance(address collectionAddress, address userAddress) public view returns(uint) {
        return _collectionMap[collectionAddress].balanceOf(userAddress);
    }

    function getAllTokensMetaDataOwnedFromCollection(address collectionAddress, address userAddress) external view returns(tokenMetaData[] memory ownedNFTsFromCollection) {
        uint balance = hasCollectionBalance(collectionAddress, userAddress);
        ownedNFTsFromCollection = new tokenMetaData[](balance);

        for(uint i=0; i < balance; i++){
            uint tokenId = _collectionMap[collectionAddress].tokenOfOwnerByIndex(userAddress,i);
            /*emit debug(tokenId);
            emit debug(_collectionMap[collectionAddress].gettokenIds());*/
            (uint metaDataTokenId, uint metaDataTimeStamp, string memory metaDataTokenURI) = _collectionMap[collectionAddress].getTokenMetaDataFromID(tokenId);
            ownedNFTsFromCollection[i] = tokenMetaData(metaDataTokenId,metaDataTimeStamp,metaDataTokenURI);
        }
    }

    function getCollectionOwner(address collectionAddress) external view returns(address owner){
       owner = _collectionMap[collectionAddress].owner();
    }
}