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
    } 

    /**
      * @dev Store the Collection 'collectionToAdd' to '_collectionMap' and '_collectionArray' .
      */
    function saveNewCollectionToStorage(Collection collectionToAdd) private{
        _collectionArray.push(collectionToAdd); 
        _collectionMap[address(collectionToAdd)]= collectionToAdd;
    }
}