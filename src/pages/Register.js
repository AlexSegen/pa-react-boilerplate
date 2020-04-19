import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Register from '../store/actions/register';

import validators from '../helpers/validators';

import Layout from '../components/Layout';

const SignUp = () => {

    const initialUser = { first_name: "",  last_name: "", email: "", password: "" };

    const dispatch = useDispatch();
    const {loading, error} = useSelector(state => state.register);

    const [user, setUser] = useState(initialUser)
    const [invalidPayload, setInvalidPayload] = useState(null);
    
    const submit = () => {
        dispatch(Register(user));
    }
    
    const handleSubmit = async () => {
        
        setInvalidPayload(null);
        
        if(!validators.onlyLetters(user.first_name) || !validators.onlyLetters(user.last_name)) {
            setInvalidPayload('Check your first name and last name.');
            return;
        }

        if(!validators.isEmail(user.email)) {
            setInvalidPayload('Your email is not valid.');
            return;
        }

        if(!validators.password.Length(user.password)) {
            setInvalidPayload('Your password must be at least 8 character length.');
            return;
        }

        submit();
    }

    const handleChange = e =>{
        const value = e.target.value;
        setUser({
          ...user,
          [e.target.name]: value
        });
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
                    <h1>Register</h1>
                    <p>This is the Register Page.</p>
                    <div className="text-left">
                        <div className="form-group">
                            <label htmlFor="first_name">First Name</label>
                            <input className="form-control" type="text" name="first_name" onChange={handleChange} disabled={loading}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="last_name">Last Name</label>
                            <input className="form-control" type="text" name="last_name" onChange={handleChange} disabled={loading}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input className="form-control" type="email" name="email" onChange={handleChange} disabled={loading}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input className="form-control" type="password" name="password" onChange={handleChange} disabled={loading}/>
                        </div>
                        {
                            error && <div className="alert text-danger">{error}</div>
                        }
                        {
                            invalidPayload && <div className="alert text-danger">{invalidPayload}</div>
                        }
                        <div className="form-group">
                            <button onClick={handleSubmit} type="button" className="btn btn-primary" disabled={loading}>{loading ? 'Loading...':'Register'}</button>
                        </div>
                    </div>
                </div>
            }
            
        </Layout>
     );
}
 
export default SignUp;