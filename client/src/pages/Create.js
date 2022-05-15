import React from 'react';
import CollectionForm from '../components/create/CollectionForm';
import NFTForm from '../components/create/NFTForm';


const Create = () => {
    
    return (

        <div className='container'>
            <div className='gallery-card'>
                <CollectionForm />
                <NFTForm />
            </div>
            
        </div>

    );

};

export default Create;