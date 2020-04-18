import React from 'react';
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/actions/auth'

import styles from './header.module.scss';

const Header = () => {

    const dispatch = useDispatch();

    const SignOut  = async () => {
        dispatch(logout())
    }

    const { user, isAuthenticated } = useSelector(state => state.auth);

    return ( 
        <header className={styles.header}>
            <Link className="btn btn-sm btn-link" to='/'>Home</Link>
            <Link className="btn btn-sm btn-link" to='/about'>About</Link>
            { isAuthenticated && <Link className="btn btn-sm btn-link" to='/private'>Private</Link> }
            { isAuthenticated && <button className="btn btn-sm btn-link" type="button" onClick={SignOut} >{user.first_name} (Sign Out)</button>}
            { !isAuthenticated &&  <Link className="btn btn-sm btn-link" to='/login'>Login</Link> }
        </header>
     );
}
 
export default Header;