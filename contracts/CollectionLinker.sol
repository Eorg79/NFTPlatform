// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract CollectionLinker is Ownable {

    struct collectionLink{
        address collectionContractAddress;
        bool hasBalanceInCollection;
    }

    struct hasCollectionLinkResult{
        bool hasLink; 
        uint linkIndex;
    }

    mapping(address=>collectionLink[]) public usersCollectionLinks;

    function addCollectionToAddress(address collectionAddress, address userAddress) public onlyOwner {
        usersCollectionLinks[userAddress].push(collectionLink(collectionAddress,true));
    }

    function removeCollectionToAddress(address collectionAddress, address userAddress) public onlyOwner {
        hasCollectionLinkResult memory result = hasCollectionLink(collectionAddress, userAddress);
        if(result.hasLink){
            collectionLink memory tempcollectionLink = usersCollectionLinks[userAddress][result.linkIndex];
            usersCollectionLinks[userAddress][result.linkIndex] = usersCollectionLinks[userAddress][usersCollectionLinks[userAddress].length-1];
            usersCollectionLinks[userAddress][usersCollectionLinks[userAddress].length-1] = tempcollectionLink;
            usersCollectionLinks[userAddress].pop();
        }
    }

    function hasCollectionLink(address collectionAddress, address userAddress) public view returns(hasCollectionLinkResult memory) {
        for(uint i=0; i<usersCollectionLinks[userAddress].length; i++){
            if(usersCollectionLinks[userAddress][i].collectionContractAddress == collectionAddress){
                return hasCollectionLinkResult(true,i);
            }
        }
       return hasCollectionLinkResult(false,0);
    }
    
}