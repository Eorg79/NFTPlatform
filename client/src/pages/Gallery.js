import React, { useContext } from 'react';
import { ContractContext } from '../utils/ContractContext';
import NFTCard from '../components/NFTCard/NFTCard';

const Gallery = () => {
    const { web3, accounts, contract } = useContext(ContractContext);

    

    return (

        <div className='container'>
            <div className="card">
                <h2>Your NFT Gallery</h2>
                <div className='NFT-wrapper'>
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                </div>
            </div>
        </div>

        );
}; 

export default Gallery;