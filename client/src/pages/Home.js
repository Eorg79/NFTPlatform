import React, { useContext } from 'react';
import { ContractContext } from '../utils/ContractContext';
import { DataContext } from '../utils/DataContext';
import BuyButton from '../components/BuyButton';

const Home = () => {
    const { web3, accounts, contract } = useContext(ContractContext);
    const { collections, setCollections, NFTs, setNFTs } = useContext(DataContext);
    

    return (

            <div className='container'> 
                <div className="card">
                    <h2>Explore the largest NFT Collections</h2>
                    <div className='NFT-wrapper'>
                        {NFTs.map((NFT) => (
                        <div className='NFTCard' key={NFT.id}>
                            <div className='wrapper'>
                                <img src={NFT.image}></img>
                                <div className='data-container'>
                                    <div className='text-container'>
                                        <h4>{NFT.name}</h4>
                                        <p>{NFT.description}</p>
                                        <p>price ETH</p>
                                    </div>                               
                                    <BuyButton id={NFT.id} collectionAddress={NFT.collectionAddress} />    
                                </div>
                            </div>
                        </div>))}
                    </div>
                </div>
             </div>               
        );
}; 

export default Home;