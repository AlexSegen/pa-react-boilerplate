import React from 'react';
import { Link } from "react-router-dom";
import styles from './header.module.scss';

const Header = () => {
    return ( 
        <header className={styles.header}>
            <Link to='/'>Home</Link>
            <Link to='/about'>About</Link>
        </header>
     );
}
 
export default Header;