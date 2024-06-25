import React from 'react'
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Photos/logo2.png'
import animatedlogo from '../../assets/Photos/animated_logo.mp4'
import './Welcome.css'

function Welcome() {

    return (
        <div className='container'>
            <div className='wrapper'>
                {/* <img src={logo} /> */}
                <video autoPlay loop>
                    <source src={animatedlogo} type="video/mp4"/>
                </video>
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