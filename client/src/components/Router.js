import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ContractContext } from '../utils/ContractContext';
import Navbar from './Navbar';
import BackHomepage from './BackHomepage';
import Home from '../pages/Home';
import Create from '../pages/Create';
import Buy from '../pages/Buy';
import Gallery from '../pages/Gallery';
import Wallet from '../pages/Wallet';

const Router = () => {
    const { accounts } = useContext(ContractContext);
    
    return (
        
     <BrowserRouter>
        
            <header className="header">
                <div className="header__img-container">
                <BackHomepage />
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
                <Route path="/Wallet" element={<Wallet/>} />
            </Routes>
            </main>
        
     </BrowserRouter>
    );
};

export default Router;