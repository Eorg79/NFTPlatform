import React, { useContext } from 'react';
import AllNFTCards from '../components/AllNFTCards'

const Buy = () => {
   
    return (

        <div className='container'> 
                <div className="card">
                    <h2>Buy rare NFTs</h2>
                    <AllNFTCards />
                </div>
             </div>          
        );
}; 

export default Buy;