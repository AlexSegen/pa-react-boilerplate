import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../store/actions/auth';

import validators from '../helpers/validators';

import Layout from '../components/Layout';

const Login = () => {

    const dispatch = useDispatch();
    const {loading, error} = useSelector(state => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [invalidPayload, setInvalidPayload] = useState(null);
    
    const submit = () => {
        dispatch(Auth(email, password));
    }
    
    const handleSubmit = async () => {
        
        setInvalidPayload(null);

        if(!validators.isEmail(email)) {
            setInvalidPayload('Your email is not valid.');
            return;
        }

        if(!validators.password.Length(password)) {
            setInvalidPayload('Your password must be at least 8 character length.');
            return;
        }

        submit();
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
                        {
                            error && <div className="alert text-danger">{error}</div>
                        }
                        {
                            invalidPayload && <div className="alert text-danger">{invalidPayload}</div>
                        }
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