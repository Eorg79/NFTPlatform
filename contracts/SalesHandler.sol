// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "./Collection.sol";
import "./CollectionHandler.sol";

contract SalesHandler is Ownable, CollectionHandler, IERC721Receiver {
    struct Listing {
        address seller;
        address tokenCollection;
        uint tokenId; 
        uint price; // price in wei
    }

    event TokenListed(
        address seller,
        address tokenCollection,
        uint tokenId, 
        uint price
    );

    event TokenSold(
        address seller,
        address buyer,
        address tokenCollection,
        uint tokenId, 
        uint price
    );

    event ListingCanceled(
        address seller,
        address tokenCollection,
        uint tokenId
    );

    event ClaimedSalesRevenue(
        address userAdress,
        uint amount
    );

    event ReceivedERC721(
        address operator,
        address from,
        uint256 tokenId,
        bytes data
    );

    //collection to token id to listing
    mapping(address => mapping(uint => Listing)) public listingsMap;
    Listing[] public listingsArray;
    mapping(address => uint) internal userUnclaimedSalesRevenueMap;

    //To call
    function listToken(uint tokenId, address collectionAddress, uint price) public {
        require(_collectionMap[collectionAddress].ownerOf(tokenId) == msg.sender,"You cant put for sale a token that you dont own");
        require(_collectionMap[collectionAddress].ownerOf(tokenId) == address(this) 
        || _collectionMap[collectionAddress].getApproved(tokenId) == address(this),"Please approve the contract for the token first");

        _collectionMap[collectionAddress].safeTransferFrom(msg.sender,address(this),tokenId);
        Listing memory listing = Listing(msg.sender,collectionAddress,tokenId,price);
        saveNewListing(listing);
        emit TokenListed(msg.sender,collectionAddress,tokenId,price);
    }

    function cancelListing(address collectionAddress, uint tokenId) public {
        require(msg.sender == getListing(collectionAddress, tokenId).seller,"You are not the seller of the Token");
        
        _collectionMap[collectionAddress].safeTransferFrom(address(this), msg.sender, tokenId);
        removeListing(getListing(collectionAddress, tokenId));
        emit ListingCanceled(msg.sender,collectionAddress,tokenId);
    }

    function buyListedToken(address collectionAddress, uint tokenId) public payable {
        Listing memory listing = getListing(collectionAddress, tokenId);
        require(listing.seller != msg.sender,"You cant buy your own listing");
        require(msg.value == listing.price,"Price is wrong");
        
        
        _collectionMap[collectionAddress].safeTransferFrom(address(this), msg.sender, tokenId);
        userUnclaimedSalesRevenueMap[listing.seller] += listing.price;
        emit TokenSold(listing.seller,msg.sender,collectionAddress,tokenId,listing.price);
        removeListing(listing);
    }

    function retrieveUserUnclaimedSales() public {
        require(userUnclaimedSalesRevenueMap[msg.sender]>0);
        uint tempSalesRevenue = userUnclaimedSalesRevenueMap[msg.sender];

        userUnclaimedSalesRevenueMap[msg.sender] = 0;
        payable(msg.sender).transfer(tempSalesRevenue);

        emit ClaimedSalesRevenue(msg.sender, tempSalesRevenue);
    }

    function getUserUnclaimedSalesRevenue(address callerAddress) public view returns(uint){
        require(msg.sender == callerAddress || msg.sender == owner(), "You cant view someone else's unclaimed sales revenue");
        return userUnclaimedSalesRevenueMap[callerAddress];
    }

    function getListing(address collectionAddress, uint tokenId) public view returns(Listing memory){
        return listingsMap[collectionAddress][tokenId];
    }
    
    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external returns (bytes4){
        emit ReceivedERC721(operator, from, tokenId, data);
        return IERC721Receiver.onERC721Received.selector;
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