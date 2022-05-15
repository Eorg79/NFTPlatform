import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ContractContext } from '../utils/ContractContext';
const Navbar = () => {
    const [click, setClick] = useState("");
    const { web3, contract, NFTs, setNFTs } = useContext(ContractContext);
    const handleClick = () => setClick("clicked");



    const getTokensStatus = async () => {
        await contract.getPastEvents('TokenListed', {
            filter: {
                value: []    
            },
            fromBlock: 0,             
            toBlock: 'latest'},
           (err, events) => {
                events.map((token) => {
                    const currentUniqueKey = token.returnValues.tokenCollection+String(token.returnValues.tokenId);
                        setNFTs(NFTs => {
                            return NFTs.map(item => {
                                return item.uniqueKey === currentUniqueKey ? {...item, status: "listed", seller:token.returnValues.seller, price:web3.utils.fromWei(token.returnValues.price, 'ether')} : item;
                            })
                        });
                });
              });
    
      await contract.getPastEvents('TokenSold', {
        filter: {
            value: []    
        },
        fromBlock: 0,             
        toBlock: 'latest'},
       (err, events) => {
            events.map((token) => {
                const currentUniqueKey = token.returnValues.tokenCollection+String(token.returnValues.tokenId);
                    setNFTs(NFTs => {
                        return NFTs.map(item => {
                            return item.uniqueKey === currentUniqueKey ? {...item, status: "sold", buyer:token.returnValues.buyer} : item;
                        })
                    });
                 });        
          });            
    };


    return (

    <nav className="menu" clicked={click}>
        <Link className="item_menu" onClick={handleClick} to="/Create" name="create"><span>Create</span></Link>
        <Link className="item_menu" onClick={getTokensStatus}to="/Buy" name="buy"><span>Buy</span></Link>
        <Link className="item_menu" onClick={handleClick} to="/Gallery" name="gallery"><span>Your Gallery</span></Link>
        <Link className="item_menu" onClick={handleClick} to="/Wallet" name="wallet"><span>Your Wallet</span></Link>
    </nav>   

    );
};

export default Navbar;