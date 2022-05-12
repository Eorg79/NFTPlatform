// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Collection.sol";
import "./CollectionHandler.sol";

contract SalesHandler is Ownable, CollectionHandler {
    struct Listing {
        address seller;
        address tokenCollection;
        uint tokenId; 
        uint price; // price in wei
    }

    event debug(address log);

    //collection to token id to listing
    mapping(address => mapping(uint => Listing)) internal listingsMap;
    mapping(address => uint) internal userUnclaimedSalesRevenueMap;
    Listing[] internal listingsArray;


    //To call
    function listToken(uint tokenId, address collectionAddress, uint price) public {
        /*require(_collectionMap[collectionAddress].ownerOf(tokenId) == msg.sender 
        || _collectionMap[collectionAddress].getApproved(tokenId) == msg.sender,"You cant put for sale a token that you dont own or are approved to use as Owner");
        */
        emit debug(msg.sender);
        emit debug(_collectionMap[collectionAddress].ownerOf(tokenId));
        emit debug(_collectionMap[collectionAddress].getApproved(tokenId));

        _collectionMap[collectionAddress].approve(address(this), tokenId);
        _collectionMap[collectionAddress].transferTokenFromSender(msg.sender,address(this),tokenId); 
        Listing memory listing = Listing(_collectionMap[collectionAddress].ownerOf(tokenId),collectionAddress,tokenId,price);
        saveNewListing(listing);

    }

    function cancelListing(address collectionAddress, uint tokenId) public {
        require(msg.sender == getListing(collectionAddress, tokenId).seller,"You are not the seller of the Token");
        
        _collectionMap[collectionAddress].safeTransferFrom(address(this), msg.sender, tokenId);
        removeListing(getListing(collectionAddress, tokenId));
    }

    function buyListedToken(address collectionAddress, uint tokenId) public payable {
        Listing memory listing = getListing(collectionAddress, tokenId);
        require(msg.value == listing.price);
        
        
        _collectionMap[collectionAddress].safeTransferFrom(address(this), msg.sender, tokenId);
        userUnclaimedSalesRevenueMap[listing.seller] += listing.price;
        removeListing(getListing(collectionAddress, tokenId));
    }

    function getUserUnclaimedSalesRevenue(address callerAddress) public view returns(uint){
        return userUnclaimedSalesRevenueMap[callerAddress];
    }

    function retrieveUserUnclaimedSales() public {
        require(userUnclaimedSalesRevenueMap[msg.sender]>0);
        userUnclaimedSalesRevenueMap[msg.sender] = 0;
        payable(msg.sender).transfer(userUnclaimedSalesRevenueMap[msg.sender]);
    }

    function getListing(address collectionAddress, uint tokenId) public view returns(Listing memory){
        return listingsMap[collectionAddress][tokenId];
    }
    
    //Private
    function saveNewListing(Listing memory listing) private {
        listingsArray.push(listing); 
        listingsMap[listing.tokenCollection][listing.tokenId] = listing;
    }

    function removeListing(Listing memory listing) private {
        delete listingsMap[listing.tokenCollection][listing.tokenId];

        for (uint i = 0; i<listingsArray.length; i++){
            if(listingsArray[i].tokenCollection == listing.tokenCollection && listingsArray[i].tokenId == listing.tokenId){
                remove(i);
            }
        }
    }

    function remove(uint index) private {
        if (index >= listingsArray.length) return;

        for (uint i = index; i<listingsArray.length-1; i++){
            listingsArray[i] = listingsArray[i+1];
        }
        listingsArray.pop();
    }

    
}