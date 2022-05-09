import React, { useContext } from 'react';
import { ContractContext } from '../utils/ContractContext';
import CollectionForm from '../components/create/CollectionForm';
import NFTForm from '../components/create/NFTForm';


const Create = () => {
    const { web3, accounts, contract } = useContext(ContractContext);

    return (

        <div className='container'>
            <CollectionForm />
            <NFTForm />
        </div>

    );

};

export default Create;