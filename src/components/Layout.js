import React from 'react';
import Header from './shared/header';
import Footer from './shared/footer';

import '../assets/scss/main.scss'

const Layout = ({children}) => {
    return ( 
        <>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
        </>
     );
}
 
export default Layout;