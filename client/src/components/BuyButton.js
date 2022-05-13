import React, { useContext, useEffect, useState } from 'react';
import { ContractContext } from '../utils/ContractContext';
import { DataContext } from '../utils/DataContext';
import CollectionContract from '../contracts/Collection.json';

const BuyButton = (props) => {
    const { web3, accounts, contract } = useContext(ContractContext);
    const { collections, setCollections, NFTs, setNFTs } = useContext(DataContext);

    const buyHandler = () => {
        if (window.confirm("You are about to buy an NFT. Please confirm.")) {
        
        console.log(props.id);
        }
    }


    return (

        <button className='small-btn' onClick={buyHandler}>buy it</button>

    );
};

export default BuyButton;
