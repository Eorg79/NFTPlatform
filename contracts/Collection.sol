// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/** @title Collection
  * @author Domingues Ludovic
  * @dev Collection contract to be used for a ERC721 Marketplace 
  */
contract Collection is ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; 

    /**
     *  @notice Structure used to store information about Tokens
     */
    struct tokenMetaData{
        uint tokenId;
        uint timeStamp;
        string tokenURI;
    }

    /**
     *  @notice Emitted when a token is Minted using 'mintToken(address recipient_, string memory tokenURI_)'
     */
    event TokenMinted(
        uint tokenId,
        address recipient,
        string tokenURI
    );

    /**
     *  @notice Mapping linking a token to its stored tokenMetaData via its TokenId
     */
    mapping(uint=>tokenMetaData) public tokenMetaDataFromIdMap; 

    /**
     * @dev Initializes the contract by setting a `name` and a `symbol` to the token collection.
     */
    constructor (string memory name, string memory symbol) ERC721("name", "symbol") {}

     /**
     *  @notice function used to Mint new Tokens
     * Requirements:
     * - msg.sender needs to be the Owner of the Contract
     */
    function mintToken(address recipient_, string memory tokenURI_) external onlyOwner {
        uint newTokenId = _tokenIds.current();

        _safeMint(recipient_, newTokenId);
        emit TokenMinted(newTokenId, recipient_, tokenURI_);
        _setTokenURI(newTokenId, tokenURI_);

        tokenMetaDataFromIdMap[_tokenIds.current()] = tokenMetaData(newTokenId, block.timestamp, tokenURI_);
        _tokenIds.increment();
    }

    /**
     * @dev See {ERC721Enumerable}.
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override (ERC721, ERC721Enumerable){
        ERC721Enumerable._beforeTokenTransfer(from, to, tokenId);
    }

    /**
     * @dev See {ERC721Enumerable}.
     */
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return ERC721Enumerable.supportsInterface(interfaceId);
    }

    /**
     * @dev See {ERC721URIStorage}.
     */
    function _burn(uint256 tokenId) internal virtual override (ERC721, ERC721URIStorage){
        ERC721URIStorage._burn(tokenId);
    }

    /**
     * @dev See {ERC721URIStorage}.
     */
    function tokenURI(uint256 tokenId) public view virtual override (ERC721, ERC721URIStorage) returns (string memory) {
        return ERC721URIStorage.tokenURI(tokenId);
    } 
<<<<<<< Updated upstream

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
=======
>>>>>>> Stashed changes
}