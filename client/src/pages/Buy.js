import React, { useContext } from 'react';
import { ContractContext } from '../utils/ContractContext';

const Buy = () => {
    const { web3, accounts, contract } = useContext(ContractContext);

    

    return (

        <div className='container'>
            <div className="card">
                    <h2>Buy rare NFTs</h2>
                    
            </div>
        </div>

        );
}; 

export default Buy;