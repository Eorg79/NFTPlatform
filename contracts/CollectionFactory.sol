// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "./Collection.sol";

/** @title CollectionFactory
  * @author Domingues Ludovic
  * @dev Give the ability to deploy a contract to manage ERC-721 tokens. 
  */
contract CollectionFactory is Ownable{
    event CollectionCreated(
<<<<<<< Updated upstream
        address _creator,
=======
        address _owner,
>>>>>>> Stashed changes
        string _collectionName,
        address _collectionAddress,
        uint _timestamp
    );

    /**
      * @dev Deploy the ERC-721 Collection contract of the artist caller to be able to create NFTs later
      * @return collection the address of the created collection contract
      */
    function createCollectionFactory(string memory name, string memory symbol, address creatorAddress) internal returns (Collection collection) {
        collection = new Collection(name, symbol);
        emit CollectionCreated(creatorAddress, name, address(collection), block.timestamp);
    }
}

