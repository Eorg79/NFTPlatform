import React, { useContext } from 'react';
import { ContractContext } from '../utils/ContractContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Home = () => {
    const { web3, accounts, contract } = useContext(ContractContext);

    const initialValues = {
        name: '',
        symbol:''
      };
  
      const onSubmit =  async (values, onSubmitProps) => {
              console.log(formik.values.name);
              const name = formik.values.name;
              const symbol = formik.values.symbol;
              await contract.methods.createCollection(name, symbol, accounts[0]).send({from: accounts[0]});
              alert('Your collection has been created');
              onSubmitProps.resetForm();
      };
  
      const validationSchema = Yup.object({
          name: Yup.string().min(3, '3 caractères minimum').max(80, '80 caractères maximum').required('ce champ doit être complété'),
          name: Yup.string().min(3, '2 caractères minimum').max(80, '4 caractères maximum').required('ce champ doit être complété'),
      }); 
  
      const formik = useFormik({ initialValues, onSubmit, validationSchema });

    return (

        <div className='container'>
            <div className="card">
                    <h2>Create a new collection</h2>
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-control">
                          <label htmlFor="name">token name</label>
                          <input type="text" id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                          {formik.touched.name && formik.errors.name ? (<div className="error">{formik.errors.name}</div>) : (null)}
                        </div>
                        <div className="form-control">
                          <label htmlFor="symbol">symbol</label>
                          <input type="text" id="symbol" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.symbol} />
                          {formik.touched.symbol && formik.errors.symbol ? (<div className="error">{formik.errors.symbol}</div>) : (null)}
                        </div>
                          <button className="btn" type="submit">create</button>
                    </form>  
            </div>
        </div>

        );
}; 

export default Home;