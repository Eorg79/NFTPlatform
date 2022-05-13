import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ContractContext } from '../utils/ContractContext';
import { DataContext } from '../utils/DataContext';
import CollectionContract from '../contracts/Collection.json'
import Navbar from './Navbar';
import BackHomepage from './BackHomepage';
import Home from '../pages/Home';
import Create from '../pages/Create';
import Buy from '../pages/Buy';
import Gallery from '../pages/Gallery';

const Router = () => {
    const { web3, accounts, contract } = useContext(ContractContext);
    const [collections, setCollections] = useState([]);
    const [NFTs, setNFTs] = useState([]);


    //useEffect(() => {
        const getExistingCollections = async () => {
          await contract.getPastEvents('CollectionCreated', {
            filter: {
                value: []    
            },
            fromBlock: 0,             
            toBlock: 'latest'},
           (err, events) => {
                events.map( async (collection) => {
                let Collection = {address:collection.returnValues._collectionAddress, name:collection.returnValues._collectionName, creator: collection.returnValues._creator, timestamp:collection.returnValues._timestamp};
                setCollections(Collections => [...Collections, Collection]);
              });
            });
          };
        //getExistingCollections();
        //}, []);

        const getMintedNFTs = async () => {
            for (let i=0; i < collections.length; i++) {
                //console.log(collections[i].address);
                const collectionContract = new web3.eth.Contract(CollectionContract.abi, collections[i].address);
                await collectionContract.getPastEvents('TokenMinted', {
                    filter: {
                        value: []    
                    },
                    fromBlock: 0,             
                    toBlock: 'latest'},
                   (err, events) => {
                        events.map( async (token) => {
                            const MetaJSON = `https://ipfs.io/${token.returnValues.tokenURI}`;
                            const mjson = await fetch(MetaJSON).then((res) => res.json());
                            const Image = `https://ipfs.io/ipfs//${mjson.image}`;
                        let Token = {collectionAddress:collections[i].address, collectionName:collections[i].name, creator:collections[i].creator, id:token.returnValues.tokenId, recipient:token.returnValues.recipient, tokenURI: token.returnValues.tokenURI, image:Image,name:mjson.name, description:mjson.description};
                        setNFTs(NFTs => [...NFTs, Token]);
                      });
                    });
            };
        };
/*
        useEffect(() => {
        const watchEvents = async () => {
        
        await contract.events.TokenListed()   
          .on('data', event => console.log(event))
          .on('changed', changed => console.log(changed))
          .on('connected', str => console.log(str));
        };  
        watchEvents();
        }, []);
*/
    return (
        
     <BrowserRouter>
        <DataContext.Provider value={{ collections, setCollections, NFTs, setNFTs }}> 
            <header className="header">
                <div className="header__img-container">
                <BackHomepage />
                </div>
                <button onClick={getExistingCollections}>get collections</button>
                <button onClick={getMintedNFTs}>get NFTs</button>
                <Navbar />
            </header>
            <main>
            <div className="banner">
                <h1>The largest NFT trading platform</h1>
                <div>connected wallet: {accounts[0]}</div>
            </div>        
            <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/Create" element={<Create/>} />
                <Route path="/Buy" element={<Buy/>} />
                <Route path="/Gallery" element={<Gallery/>} />
            </Routes>
            </main>
        </DataContext.Provider>
     </BrowserRouter>
    );
};

export default Router;