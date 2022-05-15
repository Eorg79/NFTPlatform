import React, { useContext, useEffect, useState } from 'react';
import { ContractContext } from '../utils/ContractContext';
import ListTokenForm from '../components/ListTokenForm';
import CollectionForm from '../components/create/CollectionForm';
import NFTForm from '../components/create/NFTForm';

const Gallery = () => {
    const { accounts, NFTs } = useContext(ContractContext);
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

 useEffect (() => { 
    const getCollectedNFTs = async () => {
        const collectedTokens = NFTs.filter((token) => token.recipient === accounts[0] || token.buyer === accounts[0]);
        collectedTokens.map((token) => {
            let Token = {collectionAddress:token.collectionAddress, collectionName:token.collectionName, creator:token.creator, id:token.id, recipient:token.recipient, tokenURI: token.tokenURI, image:token.image, name:token.name, description:token.description};
            setCollectedNFTs(CollectedNFTs => [...CollectedNFTs, Token]);    
            });
        };
  getCollectedNFTs();    
    }, [NFTs]);

    return (
        
        <div className='container'> 
            <div className="gallery-card">
                {createdNFTs.length > 0 ? 
                (<>
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
                </>) : 
                (<>
                    <h2>You havent created ant NFT yet!</h2>
                    <CollectionForm />
                    <NFTForm />
                </>)}
            </div>
            <div className="gallery-card">
                {collectedNFTs.length > 0 ? 
                (<>
                <h2>NFTs in your wallet</h2>
                <div className='NFT-wrapper'>
                    {collectedNFTs.map((NFT) => (
                    <div className='NFTCard' key={NFT.tokenURI}>
                        <div className='wrapper'>
                            <img src={NFT.image}></img>
                            <div className='data-container'>
                                <div className='text-container'>
                                    <h4>{NFT.name}</h4>
                                    <p>{NFT.description}</p>
                                </div>                               
                            </div>
                        </div>
                    </div>))}
                </div>
                </>) : 
                (<>
                    <h2>You havent collected NFTs yet!</h2>
                </>)}
            </div>

            
        </div>

        );
}; 

export default Gallery;