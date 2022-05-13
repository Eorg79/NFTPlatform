import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ContractContext } from '../utils/ContractContext';
import { DataContext } from '../utils/DataContext';
import CollectionContract from '../contracts/Collection.json';

const ListTokenForm = (props) => {
    const { web3, accounts, contract } = useContext(ContractContext);
    const { collections, setCollections, NFTs, setNFTs } = useContext(DataContext);
    const[listed, setListed] = useState(false);
    const initialValues = {price: null};
    const validationSchema = Yup.object({price: Yup.number().max(1000000, 'limite de prix atteinte').required('ce champ doit être complété')}); 
    
    const onSubmit = async (values, onSubmitProps) => {
        const collectionContract = new web3.eth.Contract(CollectionContract.abi, props.collectionAddress);
        
        if (window.confirm("You are about to list your NFT for sale. Please confirm.")) {      
            await collectionContract.methods.approve(contract._address, props.id).send({from: accounts[0]});
            await contract.methods.listToken(props.id, props.collectionAddress, formik.values.price).send({from: accounts[0]});
            setListed(true);
            onSubmitProps.resetForm();
        }  

        
    }

    const formik = useFormik({ initialValues, onSubmit, validationSchema });
    
    return (
        <>
        {!listed ?
        (<form className='listing-form' onSubmit={formik.handleSubmit}>
            <div className="form-control">
                <label htmlFor="price">price</label>
                <input type="number" id="price" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.price} />
                {formik.touched.price && formik.errors.price ? (<div className="error">{formik.errors.price}</div>) : (null)}
            </div>
            <button className='small-btn' type="submit">put to sale</button>
        </form>)
      : (
        <div>prix</div>
      )}
      </>
    );
    
};

export default ListTokenForm;
