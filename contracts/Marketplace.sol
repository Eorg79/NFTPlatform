// SPDX-License-Identifier: MIT
pragma solidity 0.8.13;
import "./SalesHandler.sol";
import "./CollectionHandler.sol";

/** @title Marketplace
  * @author Domingues Ludovic
  * @dev Marketplace contract that implements the contracts CollectionHandler and SalesHandler 
  */
contract Marketplace is CollectionHandler, SalesHandler{}