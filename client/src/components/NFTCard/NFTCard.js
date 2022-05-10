import React, { useContext, useState } from 'react';
import { ContractContext } from '../../utils/ContractContext';
import { DataContext } from '../../utils/DataContext';
import testImg from '../../assets/background.png';


const NFTCard = () => {
      const { web3, accounts, contract } = useContext(ContractContext);
      const { collections, NFTs } = useContext(DataContext);
      
    return (
        
       <div className='NFTCard'>
            <div className='wrapper'>
                <img src={testImg}></img>
                <div className='text-container'>
                    <h4></h4>
                    <p></p>
                </div>
            </div>
       </div> 
      
    );

};

export default NFTCard;    