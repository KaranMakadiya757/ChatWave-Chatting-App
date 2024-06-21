import React from 'react'
import { NavLink } from 'react-router-dom';
import './Welcome.css'

function Welcome() {
    return (
        <div className='container'>
            <div className='wrapper'>
                <h1>Welcome to ChatWave</h1>
                <div className='btncontain'>
                    <NavLink to='login'><button>Login</button></NavLink>
                    <NavLink to='register'><button>SignUp</button></NavLink>
                </div>
            </div>
        </div>
    );
}

export default Welcome;