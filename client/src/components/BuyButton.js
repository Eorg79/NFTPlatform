import React, { useContext } from 'react';
import { ContractContext } from '../utils/ContractContext';
import { DataContext } from '../utils/DataContext';


const BuyButton = (props) => {
    const { web3, accounts, contract } = useContext(ContractContext);
    
    const buyHandler = async () => {
        if (window.confirm("You are about to buy a NFT. Please confirm.")) {
        let amount = web3.utils.toWei(props.price, 'ether');
        console.log(amount);
        console.log(props.collectionAddress);
        console.log(props.id);
        await contract.methods.buyListedToken(props.collectionAddress, props.id).send({gas:210000, value:amount, from: accounts[0]});
        alert('Purchase confirmed. NFT ownership has been transfered');
        }
    }

    return (

        <button className='small-btn' onClick={buyHandler}>buy it</button>

    );
};

export default BuyButton;
