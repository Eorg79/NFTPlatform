// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "@openzeppelin/contracts/access/Ownable.sol";
import "./CollectionFactory.sol";

/** @title CollectionHandler
  * @author Domingues Ludovic
  * @dev Handles the Collections created from the factory. 
  */
contract CollectionHandler is CollectionFactory {
    /**
     *  @notice Mapping from collection address to the instance of the collection
     */
    mapping(address=>Collection) public _collectionMap;

    /**
     *  @notice Array of Collections
     */
    Collection[] public _collectionArray;

    /**
      * @dev Deploy the ERC-721 Collection contract of the artist caller,
      *     transfer the ownership to him and add it to our storage.
      *
      *     Emits a {CollectionCreated} Event
      *
      * @return the address of the created collection contract
      */
    function createCollection(string memory name, string memory symbol) public returns (address){
        Collection newCollection = CollectionFactory.createCollectionFactory(name, symbol, msg.sender);
        newCollection.transferOwnership(msg.sender);
        saveNewCollectionToStorage(newCollection);
        return address(newCollection);
<<<<<<< Updated upstream
    }

      function getAllCollectionsAddresses() external view returns (Collection[] memory)  {
        return _collectionArray;
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
=======
    } 
>>>>>>> Stashed changes

    /**
      * @dev Store the Collection 'collectionToAdd' to '_collectionMap' and '_collectionArray' .
      */
    function saveNewCollectionToStorage(Collection collectionToAdd) private{
        _collectionArray.push(collectionToAdd); 
        _collectionMap[address(collectionToAdd)]= collectionToAdd;
    }
<<<<<<< Updated upstream

    /*function mintToken(address _recipient, string memory _tokenURI, address collectionAddress) public{
        require(msg.sender == _collectionMap[collectionAddress].getCollectionCreator(),"Access Denied : You are not the creator of this collection !");
        _collectionMap[collectionAddress].mintToken(_recipient,_tokenURI);
    }*/


=======
>>>>>>> Stashed changes
}