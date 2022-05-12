// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../CollectionFactory.sol";
import "./CollectionLinker.sol";

contract Marketplace is CollectionLinker,CollectionFactory{/*
    function createCollection(string memory name, string memory symbol) public override returns (address collectionAddress) {
       collectionAddress = super.createCollection(name,symbol);
    }*/

}