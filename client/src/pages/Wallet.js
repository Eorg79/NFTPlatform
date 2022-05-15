import React, { useContext } from 'react';
import { ContractContext } from '../utils/ContractContext';


const Wallet = () => {
    const { accounts, contract, userBalance, setUserBalance } = useContext(ContractContext);
  
    const retrieveFunds = async () => {
        await contract.methods.retrieveUserUnclaimedSales().send({gas:210000, from: accounts[0]});
        alert('Your funds has been transfered to your wallet');
        setUserBalance(0);  
    };

    return (

        <div className='container'>
            <div className='wallet-card'>
                <h2>Your wallet</h2>
                <p>My current balance : {userBalance} ETH</p>
                <button className='btn'onClick={retrieveFunds} >transfer funds</button>              
            </div>
            
        </div>

    );

};

export default Wallet;