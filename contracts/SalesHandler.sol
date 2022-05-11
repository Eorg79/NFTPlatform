// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collection.sol";
import "./CollectionHandler.sol";

contract SalesHandler is Ownable, CollectionHandler {
    struct sellableCollectionToken{
        Collection tokenCollection;
        uint tokenId;
    }
    struct Listing {
    address seller;
    address tokenCollection;
    uint tokenId;
    // wei price
    uint price;
}

    mapping(address=>sellableCollectionToken) internal inSaleTokenMap;
    sellableCollectionToken[] internal inSaleTokenArray;

    function ListToken(uint tokenId, address collectionAddress, address callerAddress, uint price) public {
        require(_collectionMap[collectionAddress].ownerOf(tokenId) == callerAddress 
        || _collectionMap[collectionAddress].getApproved(tokenId) == callerAddress,"You cant put for sale a token that you dont own or are approved to use as Owner");
        
        
    }

    function BuyListedToken() public {}
    function CancelListing() public {}
}