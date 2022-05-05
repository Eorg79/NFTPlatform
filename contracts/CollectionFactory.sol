// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "./Collection.sol";

/** 
  * @notice Give the ability to deploy a contract to manage ERC-721 tokens for an Artist. 
  * @dev    If the contract is already deployed for an _artistName, it will revert.
  */
contract CollectionFactory {
    event CollectionCreated(
        string _artistName,
        address _collectionAddress,
        uint _timestamp
    );

    function createCollection(string memory name, string memory symbol) external returns (address collectionAddress) {
        Collection collection = new Collection();
        emit CollectionCreated(name, collectionAddress, block.timestamp);
        return address(collection);
    }
}