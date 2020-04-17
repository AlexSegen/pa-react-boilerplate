import React, { useState } from 'react';
import Layout from '../components/Layout';
import { SetUser } from '../services/storage.service'

const Private = () => {

    const [user] = useState(SetUser.getUser())
    
    return ( 
        <Layout>
            <div className="text-center">
                <h1>Private</h1>
                <p>Hello, <strong>{user.first_name}</strong>.</p>

                <p>This is your private section.</p>
            </div>
        </Layout>
     );
}
 
export default Private;