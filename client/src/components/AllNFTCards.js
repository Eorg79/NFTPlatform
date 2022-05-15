import React, { useContext, useEffect } from 'react';
import { ContractContext } from '../utils/ContractContext';
import BuyButton from '../components/BuyButton';

const AllNFTCard = () => {
    const {  NFTs } = useContext(ContractContext);
    
    return (
                <>
                
                    <div className='NFT-wrapper'>
                      {NFTs.map((NFT) => (
                        <div className='NFTCard' key={NFT.id}>
                            <div className='wrapper'>
                                <img src={NFT.image}></img>
                                <div className='data-container'>
                                    <div className='text-container'>
                                        <h4>{NFT.collectionName}</h4>
                                        <h4>{NFT.name}</h4>
                                        <p>{NFT.description}</p>
                                        {NFT.price && <p>{NFT.price} ETH</p>}
                                    </div>                               
                                    { NFT.status === "listed" && <BuyButton id={NFT.id} collectionAddress={NFT.collectionAddress} price={NFT.price} />}   
                                    { NFT.status === "sold" && <p>Sold</p>}
                                    { NFT.status === "minted" && <p>Not listed yet</p>}
                                </div>
                            </div>
                        </div>
                        ))}
                    </div>
                </>  
                        
        );
}; 

export default AllNFTCard;

                    