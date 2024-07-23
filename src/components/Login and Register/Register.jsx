import React, { useState } from "react";

// REACT QUERY AND FUNCTION 
import { useMutation } from "react-query";
import { Create_User } from "../API/APICalls";

// REACT ROUTER DOM 
import { useNavigate, NavLink } from "react-router-dom";

// REACT ICONS, LOADERS AND TOASTIFY NOTIFICATION
import { FaUser, FaLock, FaUnlock } from "react-icons/fa";
import { bouncy } from "ldrs";
import { toast } from 'react-toastify';

// IMAGES AND CSS 
import logo from '../../assets/Photos/logo.png'
import './Register.css'

const Register = () => {
    const [data, setdata] = useState({ login: "", password: "" });
    const [error, seterror] = useState({ login: "", password: "" });
    const [showpass, setshowpass] = useState(false)
    
    const nev = useNavigate();
    bouncy.register()

        /* --------------------------- HANDLING THE SUBMIT BUTTON --------------------------- */

    const handlesubmit = (e) => {
        e.preventDefault();

        const userregex = /^[a-zA-Z0-9_]{3,10}$/;
        const passwordregex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|:"<>?`\-=[\]\\;',./]).{8,}$/;

        if (data.login === '' || data.password === '' || !userregex.test(data.login) || !passwordregex.test(data.password)) {
            seterror({
                ...error,
                login: (data.login === '' || !userregex.test(data.login)) && true,
                password: (data.password === '' || !passwordregex.test(data.password)) && true
            })
        }
        else {
            register.mutate(data)
            seterror({ login: false, password: false })
        }
    };

     /* --------------------------- REGISTER NEW USER  --------------------------- */

    const register = useMutation('Create_User', Create_User,
        {
            onSuccess: () => nev('/login'),
            onError: (error) => {
                console.log(error)
                toast.error(`Oops! 😐 ${error.response.data.errors.login.map(i => i)}`, {
                    position: "top-center",
                    autoClose: false,
                    hideProgressBar: true
                })
            }
        }
    )


    return (
        <div className='register_container'>
            <div className='register_wrapper'>
                <div className="left">
                    <img src={logo} onClick={() => nev('/')}/>
                </div>
                <div className="right">
                    <form onSubmit={(e) => handlesubmit(e)}>
                        <div className='inputbox'>
                            <input
                                type="text"
                                name="login"
                                value={data.login}
                                className={error.login ? 'error' : ''}
                                placeholder="Username"
                                onChange={(e) => setdata({ ...data, [e.target.name]: e.target.value })}
                            />
                            <FaUser className={`icon ${error.login && 'iconerr'}`} />
                        </div>

                        <div className='inputbox'>
                            <input
                                type={showpass ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                className={error.password ? 'error' : ''}
                                placeholder="password"
                                onChange={(e) => setdata({ ...data, [e.target.name]: e.target.value })}
                            />
                            {showpass ?
                                <FaUnlock className={`icon ${error.password && 'iconerr'}`} onClick={() => setshowpass(!showpass)} />
                                :
                                <FaLock className={`icon ${error.password && 'iconerr'}`} onClick={() => setshowpass(!showpass)} />
                            }
                        </div>

                        <button className='button' disabled={register.isLoading}>{register.isLoading ?<l-bouncy size={30} speed={1} color='var(--gray)'></l-bouncy> : 'SIGNUP'}</button>

                    </form>
                    <span className='msg'>Created one? Now go and <NavLink className='link' to='/login'>Login</NavLink></span>
                </div>
            </div>
        </div>
    );
};

export default Register;