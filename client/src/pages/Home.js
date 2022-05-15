import React from 'react';
import AllNFTCards from '../components/AllNFTCards'

const Home = () => {
      
    return (
            <div className='container'>           
                <div className="card">
                    <h2>Explore the largest NFT Collections</h2>
                    <AllNFTCards />
                </div>
             </div>               
        );
}; 

export default Home;