// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Collection is ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    mapping(address=>tokenMetaData[]) public ownershipRecord;
    
    struct tokenMetaData{
        uint tokenId;
        uint timeStamp;
        string tokenURI;
    }

    constructor (string memory name, string memory symbol) ERC721("name", "symbol") {}
    //constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}
    //function init(address _contractAddress, string memory _name, string memory _symbol) public {
    
    function mintToken(address _recipient, string memory _tokenURI) public {
        require(owner()!= _recipient, "Recipient cannot be the owner of the contract");
        _tokenIds.increment();
        uint newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        ownershipRecord[_recipient].push(tokenMetaData(newItemId, block.timestamp, ""));
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