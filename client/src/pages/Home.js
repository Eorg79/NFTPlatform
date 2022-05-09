import React, { useContext } from 'react';
import { ContractContext } from '../utils/ContractContext';

const Home = () => {
    const { web3, accounts, contract } = useContext(ContractContext);

    

    return (

        <div className='container'>
            <div className="card">
                    <h2>Explore the largest NFT Collections</h2>
                    
            </div>
        </div>

        );
}; 

export default Home;