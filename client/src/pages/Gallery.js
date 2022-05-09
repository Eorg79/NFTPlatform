import React, { useContext } from 'react';
import { ContractContext } from '../utils/ContractContext';

const Gallery = () => {
    const { web3, accounts, contract } = useContext(ContractContext);

    

    return (

        <div className='container'>
            <div className="card">
                    <h2>Your NFT Gallery</h2>
                    
            </div>
        </div>

        );
}; 

export default Gallery;