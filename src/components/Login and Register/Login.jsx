import axios from "axios";
import CryptoJS from 'crypto-js';
import { FaUser, FaLock, FaUnlock } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import logo from '../../assets/Photos/logo.png'
import './Login.css'

const Login = () => {
    const [showpass, setshowpass] = useState(false)
    const [data, setdata] = useState({ login: "", password: "" });
    const [error, seterror] = useState({ login: false, password: false });
    const nev = useNavigate();

    /* --------------------------- CREATE USER SESSION --------------------------- */


    const createsession = async () => {

        const timestamp = Math.floor(Date.now() / 1000);
        const nonce = Math.random().toString(36).substring(2, 8);
        const sign = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA1(`application_id=103104&auth_key=ak_vvcpFMhMMRN9Gtb&nonce=${nonce}&timestamp=${timestamp}&user[login]=${data.login}&user[password]=${data.password}`, "as_4L3npC36aRkAOLS"));

        try {
            const res = await axios.post("https://api.quickblox.com/session.json",
                {
                    application_id: "103104",
                    auth_key: "ak_vvcpFMhMMRN9Gtb",
                    timestamp: timestamp,
                    nonce: nonce,
                    signature: sign,
                    user: data
                },
                {
                    headers: { "Content-Type": "application/json" }
                }
            );

            if (res) {
                setdata({ login: "", password: "" });
                setapierr('');
                sessionStorage.setItem('userid', res.data.session.user_id);
                sessionStorage.setItem('QBtoken', res.data.session.token);
                nev("/home");
            }
        }
        catch (err) {
            if (err.response.data.errors[0] === 'Unauthorized') {
                setapierr('Please Enter Valid username and password')
            }
        }
    };


    /* --------------------------- HANDLE CHANGE --------------------------- */

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
            createsession();
            seterror({ login: false, password: false })
        }
    };

    return (
        <div className='login_container'>
            <div className='login_wrapper'>
                <div className="left">
                    <img src={logo} alt="" />
                </div>
                <div className="right">
                    <form onSubmit={(e) => handlesubmit(e)}>
                        <div>
                            <input
                                type="text"
                                name="login"
                                className={error.login ? 'error' : ''}
                                value={data.login}
                                placeholder="Username"
                                onChange={(e) => setdata({ ...data, [e.target.name]: e.target.value })}
                                required
                            />
                            <FaUser className={`icon ${error.login && 'iconerr'}`} />
                        </div>

                        <div>
                            <input
                                type={showpass ? 'text' : 'password'}
                                name="password"
                                className={error.password ? 'error' : ''}
                                value={data.password}
                                placeholder="password"
                                onChange={(e) => setdata({ ...data, [e.target.name]: e.target.value })}
                                required
                            />
                            {showpass ?
                                <FaUnlock className={`icon ${error.password && 'iconerr'}`} onClick={() => setshowpass(!showpass)} />
                                :
                                <FaLock className={`icon ${error.password && 'iconerr'}`} onClick={() => setshowpass(!showpass)} />
                            }

                        </div>

                        <input className='button' type="submit" value="LOGIN" />
                    </form>
                    <div className='msg'>Don't Have a Account? No worries <NavLink className='link' to='/register'>SignUp</NavLink></div>
                </div>

            </div>
        </div>
    );
}

export default Login;