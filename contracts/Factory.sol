// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "./Collection.sol";

/** 
  * @notice Give the ability to deploy a contract to manage ERC-721 tokens for an Artist. 
  * @dev    If the contract is already deployed for an _artistName, it will revert.
  */
contract Factory {
    event CollectionCreated(
        string _artistName,
        address _collectionAddress,
        uint _timestamp
    );

 /**
      * @notice Deploy the ERC-721 Collection contract of the artist caller to be able to create NFTs later
      * @return collectionAddress the address of the created collection contract
      */
    
    function createCollection(string memory _artistName, string memory _artistSymbol) external returns (address collectionAddress) {
        // Import the bytecode of the contract to deploy
        bytes memory collectionBytecode = type(Collection).creationCode;
				// Make a random salt based on the artist name
        bytes32 salt = keccak256(abi.encodePacked(_artistName));
 
        assembly {
            collectionAddress := create2(0, add(collectionBytecode, 0x20), mload(collectionBytecode), salt)
            if iszero(extcodesize(collectionAddress)) {
                // revert if something gone wrong (collectionAddress doesn't contain an address)
                revert(0, 0)
            }
        }
        // Initialize the collection contract with the artist settings
        //Collection(collectionAddress).init(_artistName, _artistSymbol);
 
        emit CollectionCreated(_artistName, collectionAddress, block.timestamp);
    }


}