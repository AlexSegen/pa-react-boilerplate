import React from 'react';
import Header from './shared/header';
import Footer from './shared/footer';

import { Helmet } from 'react-helmet-async';

import '../assets/scss/main.scss'

const Layout = ({title, description, children}) => {
    return ( 
        <>
        <Helmet>
            <title>{ title ? title + " - React Boilerplate" : "React.js Boilerplate" }</title>
            <meta name = "description" content={ description || "React.js Boilerplate" } />
        </Helmet>
        <Header/>
        <main>
            {children}
        </main>
        <Footer/>
        </>
     );
}
 
export default Layout;