import React, { useContext } from 'react';
import { ContractContext } from '../utils/ContractContext';
import NFTToBuyCard from '../components/NFTCard/NFTToBuyCard';

const Buy = () => {
    const { web3, accounts, contract } = useContext(ContractContext);

    

    return (

        <div className='container'>
            <div className="card">
                <h2>Buy rare NFTs</h2>
                <div className='NFT-wrapper'>
                    <NFTToBuyCard />
                    <NFTToBuyCard />
                    <NFTToBuyCard />
                    <NFTToBuyCard />
                    <NFTToBuyCard />
                    <NFTToBuyCard />
                </div>
            </div>
        </div>

        );
}; 

export default Buy;