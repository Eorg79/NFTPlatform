import React, { useContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContractContext } from '../utils/ContractContext';
import { DataContext } from '../utils/DataContext';
import headerLogo from '../assets/9XNFT.png';
import Navbar from './Navbar';
import Home from '../pages/Home';
import Create from '../pages/Create';
import Buy from '../pages/Buy';
import Gallery from '../pages/Gallery';


const Router = () => {
    const { accounts } = useContext(ContractContext);
    const [collections, setCollections] = useState([]);
    const [NFTs, setNFTs] = useState([]);

    return (
        
     <BrowserRouter>
        <DataContext.Provider value={{ collections, NFTs }}> 
            <header className="header">
                <div className="header__img-container">
                    <img src={headerLogo} alt="logo 9XNFT" />
                </div>
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