// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./CollectionData.sol";

contract Collection is ERC721Enumerable, ERC721URIStorage, Ownable, CollectionData {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(address=>tokenMetaData[]) private ownershipRecord;
    mapping(uint=>tokenMetaData) private tokenList;

    constructor (string memory name, string memory symbol) ERC721("name", "symbol") {}

    function getOwnershipRecord(address userAddress) external view returns(tokenMetaData[] memory){
           return ownershipRecord[userAddress];
    }

    function getTokenMetaDataFromID(uint tokenId) external view returns(uint,uint,string memory){
        require(tokenId > _tokenIds.current(),"This token ID hasnt been minted yet");
        return (tokenList[tokenId].tokenId,tokenList[tokenId].timeStamp,tokenList[tokenId].tokenURI);
    }
    
    function mintToken(address _recipient, string memory _tokenURI) external onlyOwner {
        //require(owner()!= _recipient, "Recipient cannot be the owner of the contract");
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();
        _safeMint(_recipient, newItemId);/*
        ownershipRecord[_recipient].push(tokenMetaData(newItemId, block.timestamp, ""));
        tokenList[_tokenIds.current()] = tokenMetaData(newItemId, block.timestamp, "");*/
        _setTokenURI(newItemId, _tokenURI);
    }

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override (ERC721, ERC721Enumerable){
        ERC721Enumerable._beforeTokenTransfer(from, to, tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return ERC721Enumerable.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal virtual override (ERC721, ERC721URIStorage){
        ERC721URIStorage._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view virtual override (ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    }

    
}