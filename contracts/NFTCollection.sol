// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFTCollection is ERC721URIStorage, Initializable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds; 
    
    string public collectionName;
    string public collectionSymbol;

     event TokenMinted(
        uint tokenId,
        address recipient,
        string tokenURI
    );

    constructor () ERC721("name", "symbol") {}

    function initialize(string memory _name, string memory _symbol) public initializer {
        collectionName = _name;
        collectionSymbol = _symbol;
    }

    function mintToken(address _recipient, string memory _tokenURI) external {
        _tokenIds.increment();
        uint newTokenId = _tokenIds.current();
        _safeMint(_recipient, newTokenId);
        _setTokenURI(newTokenId, _tokenURI);
        emit TokenMinted(newTokenId, _recipient, _tokenURI);
        
    }

   

}