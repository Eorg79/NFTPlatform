// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "./Factory.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract NFTMarketplace is Factory, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds; 
   // Counters.Counter private _itemsSold; 
    
    uint public listingFees = 50000 wei;

    struct Item {
        uint itemId;
        uint tokenId;
        address NFTCollection;
        address payable seller;
        address payable owner;
        uint price;
        bool listed;
        bool sold;   
    }

    mapping(uint => Item) private items;

    event ItemCreated (
        uint _itemId,
        uint _tokenId,
        address _NFTCollection,
        address payable _seller,
        address payable _owner,
        uint _price,
        bool _listed,
        bool _sold
    );

    function createItem(address _NFTCollection, uint _tokenId, uint _price) public payable nonReentrant {
        require(_price > 0, "Price should not be null");
        require(msg.value == listingFees, "listing fees: Should pay listing fees");

        _itemIds.increment();
        uint itemId = _itemIds.current();
        items[itemId] = Item(itemId, _tokenId, _NFTCollection, payable(msg.sender), payable(address(0)), _price, true, false);
        emit ItemCreated(itemId, _tokenId, _NFTCollection, payable(msg.sender), payable(address(0)), _price, true, false);
    } //transfer ownership of the token to marketplace contract or let it in NFTcontract or creator wallet?

    function sellItem(address _NFTCollection, uint _itemId) public payable nonReentrant {
        uint tokenId = items[_itemId].tokenId;
        uint price = items[_itemId].price;
        require(msg.value == price, "price: Should pay the total price");
        items[_itemId].seller.transfer(msg.value);
        IERC721(_NFTCollection).transferFrom(_NFTCollection, msg.sender, tokenId);
        //transfer listing fees to owner of Markeplace contract or keep it stored in the contract?
        items[_itemId].owner = payable(msg.sender);
        items[_itemId].listed = false;
        items[_itemId].sold = true;
        //_itemsSold.increment();
    }

}