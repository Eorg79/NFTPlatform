import React, { useContext, useState } from 'react';
import axios from 'axios';
import { ContractContext } from '../../utils/ContractContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const NFTForm = () => {
      const { web3, accounts, contract } = useContext(ContractContext);
      const [image, setImage] = useState(null);
      const [file, setFile] = useState('');
      const [IPFSHashFile, setIPFSHashFile] = useState('');
      const [IPFSHashJSON, setIPFSHashJSON] = useState('');
      const [readyToMint, setReadyToMint] = useState(false);
      
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
          const key = process.env.REACT_APP_PINATA_KEY;
          const secret = process.env.REACT_APP_PINATA_SECRET;
      
      
      const imageChangeHandler = (event) => {
        setImage(URL.createObjectURL(event.target.files[0]));
        setFile(event.target.files[0]);
      };
      
      const onSubmit =  async (values, onSubmitProps) => {
          const urlFile =  `https://api.pinata.cloud/pinning/pinFileToIPFS`;
          const urlJSON =  `https://api.pinata.cloud/pinning/pinJSONToIPFS`;
          const formData = new FormData();
          formData.append('file', file);

          const responseFile = await axios.post(urlFile, formData, { maxContentLength: "Infinity", headers:{ "Content-Type": `multipart/form-data;boundary=${formData._boundary}`, 'pinata_api_key': key, 'pinata_secret_api_key': secret}});
          console.log(responseFile);
          setIPFSHashFile(responseFile.data.IpfsHash);
          
          const metadata = {
              name: formik.values.name,
              image: IPFSHashFile,
              description : formik.values.description,
            }
          
          const responseJSON = await axios.post(urlJSON, metadata, { maxContentLength: "Infinity", headers:{ "Content-Type": 'application/json', 'pinata_api_key': key, 'pinata_secret_api_key': secret}});  
          setIPFSHashJSON(responseJSON.data.IpfsHash);  
          setReadyToMint(true);

          setImage(null);
          onSubmitProps.resetForm();
  };

      const formik = useFormik({ initialValues, onSubmit, validationSchema });

    return (

        <>
            <div className="card">
                    <h2>Create a new NFT</h2>
                    {!readyToMint ?
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
                          <button className="btn" type="submit">upload</button>
                    </form>)
                    : (
                      <h3>Your NFT has been sucessfully uploaded on IPFS. You have to mint it to complete the creation process.</h3>

                    )}
            </div>
        </>

    );

};

export default NFTForm;