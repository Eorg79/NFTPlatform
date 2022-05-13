import React, { useContext, useEffect, useState } from 'react';
import { ContractContext } from '../utils/ContractContext';
import { DataContext } from '../utils/DataContext';
import CollectionContract from '../contracts/Collection.json';
import NFTCard from '../components/NFTCard/NFTCard';
import ListTokenForm from '../components/ListTokenForm';


const Gallery = () => {
    const { web3, accounts, contract } = useContext(ContractContext);
    const { collections, setCollections, NFTs, setNFTs } = useContext(DataContext);
    const [createdNFTs, setCreatedNFTs] = useState([]);
    const [collectedNFTs, setCollectedNFTs] = useState([]);

 useEffect (() => { 
    const getCreatedNFTs = async () => {
        const userTokens = NFTs.filter((token) => token.creator === accounts[0]);
        userTokens.map((token) => {
            let Token = {collectionAddress:token.collectionAddress, collectionName:token.collectionName, creator:token.creator, id:token.id, recipient:token.recipient, tokenURI: token.tokenURI, image:token.image, name:token.name, description:token.description};
            setCreatedNFTs(CollectedNFTs => [...CollectedNFTs, Token]);    
            });
        };
  getCreatedNFTs();    
    }, [NFTs]);

    return (

        <div className='container'> 
            <div className="gallery-card">
                <h2>created</h2>
                <div className='NFT-wrapper'>
                    {createdNFTs.map((NFT) => (
                    <div className='NFTCard' key={NFT.tokenURI}>
                        <div className='wrapper'>
                            <img src={NFT.image}></img>
                            <div className='data-container'>
                                <div className='text-container'>
                                    <h4>{NFT.name}</h4>
                                    <p>{NFT.description}</p>
                                </div>                               
                                <ListTokenForm id={NFT.id} collectionAddress={NFT.collectionAddress} />    
                            </div>
                        </div>
                    </div>))}
                </div>
            </div>

            <div className="gallery-card">
                <h2>collected</h2>
                <div className='NFT-wrapper'>
                    <NFTCard />
                    <NFTCard />
                    <NFTCard />
                </div>
            </div>
        </div>

        );
}; 

export default Gallery;