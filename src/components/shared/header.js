import React from 'react';
import { Link } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux'
import { signIn } from '../../store/actions'

import { authService } from "../../services/auth.service";

import styles from './header.module.scss';

const Header = () => {

    const dispatch = useDispatch();

    const SignOut  = async () => {
        authService.logout()
        dispatch(signIn(false))
    }

    const isAuth = useSelector(state => state.isAuth);

    return ( 
        <header className={styles.header}>
            <Link className="btn btn-sm btn-link" to='/'>Home</Link>
            <Link className="btn btn-sm btn-link" to='/about'>About</Link>
            { isAuth && <Link className="btn btn-sm btn-link" to='/private'>Private</Link> }
            { isAuth && <button className="btn btn-sm btn-link" type="button" onClick={SignOut} >Sign Out</button>}
            { !isAuth &&  <Link className="btn btn-sm btn-link" to='/login'>Login</Link> }
        </header>
     );
}
 
export default Header;