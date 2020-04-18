import React from 'react';
import Layout from '../components/Layout';
import { useSelector } from 'react-redux'

const Private = () => {

    const { user } = useSelector(state => state.auth);

    const { first_name, last_name } = user;
    
    return ( 
        <Layout>
            <div className="text-center">
                <h1>Private</h1>
                <p>Hello, <strong>{first_name} {last_name}</strong>.</p>
                <p>This is your private section.</p>
            </div>
        </Layout>
     );
}
 
export default Private;