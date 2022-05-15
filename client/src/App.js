import React, { useState, useEffect } from "react";
import { ContractContext } from './utils/ContractContext';
import Contract from "./contracts/Marketplace.json";
import CollectionContract from './contracts/Collection.json';
import getWeb3 from "./getWeb3";
import Router from "./components/Router";
import headerLogo from'./assets/9XNFT.png';

import "./styles/main.css";

const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);
  const [collections, setCollections] = useState([]);
  const [NFTs, setNFTs] = useState([]);
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    const runInit = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = Contract.networks[networkId];
        const instance = new web3.eth.Contract(
          Contract.abi,
          deployedNetwork && deployedNetwork.address,
          );
          // Set web3, accounts, and contract to the state
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);

        //subscription to events
        await instance.events.CollectionCreated()   
        .on('data', event => console.log(event))
        .on('changed', changed => console.log(changed))
        .on('connected', str => console.log(str));

        await instance.events.TokenListed()   
          .on('data', event => console.log(event))
          .on('changed', changed => console.log(changed))
          .on('connected', str => console.log(str));

        await instance.events.TokenSold()   
          .on('data', event => console.log(event))
          .on('changed', changed => console.log(changed))
          .on('connected', str => console.log(str));

        await instance.events.ListingCanceled()   
          .on('data', event => console.log(event))
          .on('changed', changed => console.log(changed))
          .on('connected', str => console.log(str));
          
        await instance.events.ClaimedSalesRevenue()   
          .on('data', event => console.log(event))
          .on('changed', changed => console.log(changed))
          .on('connected', str => console.log(str));
        
      
        await instance.getPastEvents('CollectionCreated', {
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

      const newUserBalanceinWei = await instance.methods.getUserUnclaimedSalesRevenue(accounts[0]).call({from: accounts[0]});
      const newUserBalanceinETH = web3.utils.fromWei(newUserBalanceinWei, 'ether');
      setUserBalance(newUserBalanceinETH); 

        } catch (error) {
          // Catch any errors for any of the above operations.
            console.error(error);
          }
        };
       runInit();
      }, [collections, NFTs]);
     
const getNFTs = async () => {
  if (collections.length > 0) {
              collections.map(async (collection) => {
                const collectionContract = new web3.eth.Contract(CollectionContract.abi, collection.address);
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
                      let Token = {uniqueKey:(collection.address+String(token.returnValues.tokenId)), collectionAddress:collection.address, collectionName:collection.name, creator:collection.creator, id:token.returnValues.tokenId, recipient:token.returnValues.recipient, tokenURI: token.returnValues.tokenURI, image:Image,name:mjson.name, description:mjson.description, status:"minted"};  
                      if (!NFTs.includes(Token.uniqueKey)) {
                        setNFTs(NFTs => [...NFTs, Token]);
                      } 
                    });
                  });
              })         
            }

      }
  useEffect(() => {
      getNFTs();
      }, [collections]);
   

  return (
    
      <ContractContext.Provider value={{ web3, setWeb3, accounts, setAccounts, contract, setContract, collections, setCollections, NFTs, setNFTs,  userBalance, setUserBalance}}> 
        { web3 ? 
        ( <Router /> ) 
        : (
          <>
          <header className="header">
                <div className="header__img-container">
                <img src={headerLogo} alt="logo 9XNFT" />                   
                </div> 
          </header>
          <main>
          <div className="banner">
            <h1>The largest NFT trading platform</h1>
          </div>         
          <div className="container">
            <div className="card">
              <h2>Sorry, no web3 connexion.</h2>
              <p><strong>Please try again, by updating or reconnecting you wallet.</strong></p>
              <div className="animated-icon">
                <i className="fa-solid fa-browser fa-beat-fade"></i>
              </div>
            </div>
          </div>
          </main>
          </> )
          }
          <footer className='footer'>
                <ul>
                    <li><a href="#">About</a></li>  
                </ul>
                <ul>
                    <li><i className="fa fa-envelope-o" aria-hidden="true"></i><a href="mailto:contact@9xnft.io">Contact</a></li>
                </ul>
            </footer>
      </ContractContext.Provider>
   
  );

};

export default App;
