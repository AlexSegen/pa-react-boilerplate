import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { signIn, setProfile } from '../store/actions'

import Layout from '../components/Layout';

import { authService } from "../services/auth.service";
import { TokenService, SetUser } from "../services/storage.service";

const Login = () => {

    const dispatch = useDispatch();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const submit = () => {
        setLoading(true)
        authService.login(email, password).then(res => {
            
            TokenService.saveToken(res.data.token)
            SetUser.saveUser(res.data)
            
            setLoading(false)
            dispatch(setProfile(res.data))
            dispatch(signIn(true))
        }).catch(err => {
            console.log('Error', err.message);
            setLoading(false)
        })
        
    }
    
    const handleSubmit = async () => {
        //Validate variables here
        submit()
    }

    const styles = {
        textAlign: "center",
        maxWidth: "300px",
        margin: "100px auto"
    }

    return ( 
        <Layout>
            
            {
                <div className="text-center" style={styles}>
                    <h1>Login</h1>
                    <p>This is the Login Page.</p>
                    <div className="text-left">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" onChange={(e) => setEmail(e.target.value) } disabled={loading}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" onChange={(e) => setPassword(e.target.value) } disabled={loading}/>
                        </div>
                        <div className="form-group">
                            <button onClick={handleSubmit} type="button" className="btn btn-primary" disabled={loading}>{loading ? 'Loading...':'Login'}</button>
                        </div>
                    </div>
                </div>
            }
            

        </Layout>
     );
}
 
export default Login;