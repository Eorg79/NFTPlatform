import React, { useContext, useState } from 'react';
import axios from 'axios';
import CollectionContract from '../../contracts/Collection.json';
import { ContractContext } from '../../utils/ContractContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NFTForm = () => {
      const { web3, accounts, contract } = useContext(ContractContext);
      const [image, setImage] = useState(null);
      const [file, setFile] = useState('');
      const [minted, setMinted] = useState(false);
      
      const initialValues = {
        name: '',
        description:'',
        file:'',
        collection: '',
      };
      const validationSchema = Yup.object({
        name: Yup.string().min(3, '3 caractères minimum').max(80, '80 caractères maximum').required('ce champ doit être complété'),
        description: Yup.string().min(3, '3 caractères minimum').max(80, '80 caractères maximum').required('ce champ doit être complété'),
        
      }); 
          const key = "bd39072f1b8f005f9ca0";
          const secret = "0ca0942421e57c697607921d48ceae9f6a3a5e28ca9926bcaee984352f64b12e";
      
      
      const imageChangeHandler = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
      };
      
      const onSubmit =  async (values, onSubmitProps) => {
          const urlFile =  `https://api.pinata.cloud/pinning/pinFileToIPFS`;
          const urlJSON =  `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
          let IPFSHashFile = "";
          let IPFSHashJSON = "";
          const formData = new FormData();
          formData.append('file', file);

          const responseFile = await axios.post(urlFile, formData, { maxContentLength: "Infinity", headers:{ "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 'pinata_api_key': key, 'pinata_secret_api_key': secret}});
          console.log(responseFile);
          IPFSHashFile = responseFile.data.IpfsHash;
          
          const metadata = {
              name: formik.values.name,
              image: IPFSHashFile,
              description : formik.values.description,
            }
          console.log(metadata);
          const responseJSON = await axios.post(urlJSON, metadata, { maxContentLength: "Infinity", headers:{ "Content-Type": 'application/json', 'pinata_api_key': key, 'pinata_secret_api_key': secret}});  
          console.log(responseJSON.data.IpfsHash); 
          IPFSHashJSON = responseJSON.data.IpfsHash; 
          
          const mintToken = async () => {
            const collectionContract = new web3.eth.Contract(CollectionContract.abi, formik.values.collection);
            await collectionContract.methods.mintToken(accounts[0], `ipfs//${IPFSHashJSON}`).send({from: accounts[0]}); 
            setMinted(true);
            setImage(null);
            onSubmitProps.resetForm();
          };
          mintToken();
  };

    const formik = useFormik({ initialValues, onSubmit, validationSchema });

    return (

        <>
            <div className="cardNoBorder">
                    <h2>Create a new NFT</h2>
                    {!minted ?
                    (<form className="NFTForm" onSubmit={formik.handleSubmit}>
                        <div className="form-control">
                          <label htmlFor="name">name</label>
                          <input type="text" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                          {formik.touched.name && formik.errors.name ? (<div className="error">{formik.errors.name}</div>) : (null)}
                        </div>
                        <div className="form-control">
                          <label htmlFor="description">description</label>
                          <input type="text" id="description" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description} />
                          {formik.touched.description && formik.errors.description ? (<div className="error">{formik.errors.description}</div>) : (null)}
                        </div>
                        <div className="form-control">
                          <label htmlFor="collection">collection</label>
                          <input type="text" id="collection" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.collection} />
                          {formik.touched.collection && formik.errors.collection ? (<div className="error">{formik.errors.collection}</div>) : (null)}
                        </div>                     
                        <div className='form-control'>   
                          <div className="img-wrapper">
                            <img className="img" src={image} alt="" />
                          </div>
                        <input aria-label="fichier image" type='file' id='file' name='file' accept='.jpg, .jpeg, .png, .gif' aria-required='false' onChange={(e) => imageChangeHandler(e)} />
                        </div>
                          <button className="btn" type="submit">create</button>
                    </form>)
                    : (
                      <h3>Your NFT has been sucessfully minted. You can offer it to sell now.</h3>
                    )}
            </div>
        </>

    );

};

export default NFTForm;