import React, { useEffect, useState } from "react";

// REACT QUERY AND FUNCTION 
import { useMutation } from "react-query";
import { Create_User, Login_User } from "../API/APICalls";

// REACT ROUTER DOM 
import { useNavigate, NavLink } from "react-router-dom";

// REACT ICONS, LOADERS AND TOASTIFY NOTIFICATION
import { FaUser, FaLock, FaEye, FaEyeSlash, FaRegCheckCircle } from "react-icons/fa";
import { bouncy } from "ldrs";
import { toast } from 'react-toastify';

// IMAGES AND CSS 
import logo from '../../assets/Photos/logo.png'
import './Register.css'

const Register = () => {
    const [data, setdata] = useState({ login: "", password: "" });
    const [error, seterror] = useState({ login: true, length: true, small: true, capital: true, special_char: true });
    const [showpass, setshowpass] = useState(false)

    const nev = useNavigate();
    bouncy.register()

    /* --------------------------- VALIDATING THE PASSWORD --------------------------- */

    const validate = () => {
        seterror(p => ({
            login: !(/^[a-zA-Z0-9_]{3,10}$/.test(data.login)),
            length: !(data.password.length >= 8),
            small: !(/[a-z]/.test(data.password)),
            capital: !(/[A-Z]/.test(data.password)),
            special_char: !(/[!@#$%^&*()_+{}|:"<>?`\-=[\]\\;',./]/.test(data.password))
        }))
    };

    /* --------------------------- VALIDATING THE PASSWORD --------------------------- */

    const handlechange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value })
    };

    /* --------------------------- HANDLING THE SUBMIT BUTTON --------------------------- */

    const handlesubmit = (e) => {
        e.preventDefault();

        if (!Object.values(error).some(value => value)) {
            register.mutate(data)
            seterror({ login: true, length: true, small: true, capital: true, special_char: true })
        }
    };

    /* --------------------------- REGISTER NEW USER  --------------------------- */

    const register = useMutation('Create_User', Create_User,
        {
            onSuccess: () => login.mutate(data),
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

    const login = useMutation('Login_User', Login_User,
        {
            retry: false,
            onSuccess: (data) => {
                sessionStorage.setItem('userid', data.data.session.user_id)
                sessionStorage.setItem('QBtoken', data.data.session.token)
                nev('/home')
            },
            onError: (err) => {
                const errmsg = err.response.data.errors.base ? err.response.data.errors.base.map(i => i) : err.response.data.errors.map(i => i)
                toast.error(`Oops! 😐 ${errmsg}`, {
                    position: "top-center",
                    autoClose: false,
                })
            }
        }
    )

    useEffect(() => {
        validate()

    }, [data])



    return (
        <div className='register_container'>
            <div className='register_wrapper'>
                <div className="left">
                    <img src={logo} onClick={() => nev('/')} />
                </div>
                <div className="right">
                    <form onSubmit={(e) => handlesubmit(e)}>
                        <div className='inputbox'>
                            <input
                                type="text"
                                name="login"
                                value={data.login}
                                placeholder="Username"
                                onChange={handlechange}
                            />
                            <FaUser className='icon' />
                        </div>

                        <div className='inputbox'>
                            <input
                                type={showpass ? 'text' : 'password'}
                                name="password"
                                value={data.password}
                                placeholder="password"
                                onChange={handlechange}
                            />

                            <FaLock className='icon' />

                            {showpass ?
                                <FaEye className='pass' onClick={() => setshowpass(!showpass)} />
                                :
                                <FaEyeSlash className='pass' onClick={() => setshowpass(!showpass)} />
                            }


                        </div>
                        <ul className="validation">
                            <li className={!error.login ? 'checked' : ''} ><FaRegCheckCircle />username must be 3 to 10 char long</li>
                            <li className={!error.length ? 'checked' : ''} ><FaRegCheckCircle />8 Characters</li>
                            <li className={!error.small ? 'checked' : ''} ><FaRegCheckCircle />one small case letter</li>
                            <li className={!error.capital ? 'checked' : ''} ><FaRegCheckCircle />one upper case letter</li>
                            <li className={!error.special_char ? 'checked' : ''} ><FaRegCheckCircle />one special character</li>
                        </ul>

                        <button className='button' disabled={register.isLoading}>{register.isLoading ? <l-bouncy size={30} speed={1} color='var(--gray)'></l-bouncy> : 'SIGNUP'}</button>

                    </form>
                    <span className='msg'>Created one? Now go and <NavLink className='link' to='/login'>Login</NavLink></span>
                </div>
            </div>
        </div>
    );
};

export default Register;