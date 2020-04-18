import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement } from '../store/actions'

import Layout from '../components/Layout';

const About = () => {

    const counter = useSelector(state => state.counter);
    const { isAuthenticated } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    return ( 
        <Layout>
            <div className="text-center">
                <h1>About</h1>
                <p>This is the About Page.</p>
                <p>Counter is at: {counter}</p>
                <button onClick={() => dispatch(increment(5))} type="button">+</button>
                <button onClick={() => dispatch(decrement())} type="button">-</button>
                <p>Session: { isAuthenticated ? 'Is Logged In' : 'No access' }</p>
            </div>
        </Layout>
     );
}
 
export default About;