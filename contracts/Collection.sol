// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Collection is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; 

    struct tokenMetaData{
        uint tokenId;
        uint timeStamp;
        string tokenURI;
    }

    event TokenMinted(
        uint tokenId,
        address recipient,
        string tokenURI
    );

    //address public collectionCreator;
    mapping(uint=>tokenMetaData) public tokenMetaDataFromIdMap; 

    constructor (string memory name, string memory symbol) ERC721("name", "symbol") {}

    /*function setCollectionCreator(address creator) external onlyOwner{
        collectionCreator = creator;
    }*/

    function mintToken(address recipient_, string memory tokenURI_) external onlyOwner {
        uint newTokenId = _tokenIds.current();

        _safeMint(recipient_, newTokenId);
        emit TokenMinted(newTokenId, recipient_, tokenURI_);
        _setTokenURI(newTokenId, tokenURI_);

        tokenMetaDataFromIdMap[_tokenIds.current()] = tokenMetaData(newTokenId, block.timestamp, tokenURI_);
        _tokenIds.increment();
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

/*

   function getAllTokens() external view returns(tokenMetaData[] memory){
        tokenMetaData[] memory allTokensMetaDataInCollection = new tokenMetaData[](totalSupply);

        for(uint i=0; i<totalSupply; i++){
            allTokensMetaDataInCollection[i] = getMetadataFromToken( _collectionMap[collectionAddress].tokenByIndex(i));
        }

        return allTokensMetaDataInCollection;
    }

    function getCollectionCreator() external view returns(address){
        return collectionCreator;
    }

    function getTokenMetaDataFromID(uint tokenId) external view returns(tokenMetaData memory){
        require(tokenId <= _tokenIds.current(),"This token ID hasnt been minted yet");
        return tokenMetaData(tokenMetaDataFromIdMap[tokenId].tokenId,tokenMetaDataFromIdMap[tokenId].timeStamp,tokenMetaDataFromIdMap[tokenId].tokenURI);
    }*/
}