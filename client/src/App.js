import React, { useState, useEffect } from "react";
import { ContractContext } from './utils/ContractContext';
import { useNavigate, Link } from "react-router-dom";
import FactoryContract from "./contracts/Factory.json";
import getWeb3 from "./getWeb3";
import Router from "./components/Router";
import headerLogo from'./assets/9XNFT.png';

import "./styles/main.css";

const App = () => {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState([]);
  const [contract, setContract] = useState([]);
  
  //let navigate = useNavigate();

  useEffect(() => {
    const runInit = async () => {
      try {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = FactoryContract.networks[networkId];
        const instance = new web3.eth.Contract(
          FactoryContract.abi,
          deployedNetwork && deployedNetwork.address,
          );
          // Set web3, accounts, and contract to the state
        setWeb3(web3);
        setAccounts(accounts);
        setContract(instance);

        //subscription to CollectionCreated event
        await instance.events.CollectionCreated()   
        .on('data', event => console.log(event))
        .on('changed', changed => console.log(changed))
        //.on('error', err => throw err)
        .on('connected', str => console.log(str))


        } catch (error) {
          // Catch any errors for any of the above operations.
            console.error(error);
          }
        };
       runInit();
      }, []);

  return (
    
      <ContractContext.Provider value={{ web3, setWeb3, accounts, setAccounts, contract, setContract }}> 
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
