import axios from "axios";
import CryptoJS from 'crypto-js';
import { FaUser, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import './Login.css'

const Login = () => {
    const [data, setdata] = useState({ login: "", password: "" });
    const [usererr, setusererr] = useState(" ");
    const [passworderr, setpassworderr] = useState(" ");
    const [emsg, setemsg] = useState(false);
    const [apierr, setapierr] = useState("");
    const nev = useNavigate();


    /* --------------------------- VALIDATE USER --------------------------- */


    const validateuser = () => {
        const regex = /^[a-zA-Z0-9_]{3,10}$/;

        if (!regex.test(data.login)) {
            setusererr("it should be in range of 3 to 10. only upper case, lower case, digits and _ is allowed");
        }
        else {
            setusererr("");
        }
    };

    const validatepassword = () => {
        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*()_+{}|:"<>?`\-=[\]\\;',./]).{8,}$/;

        if (!regex.test(data.password)) {
            setpassworderr("Password should be minimum 8 character long and must contain atleast one Uppercase letter, one lower case letter and a special character");
        }
        else {
            setpassworderr("");
        }
    };


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


    const handlechange = (e) => {
        setdata({ ...data, [e.target.name]: e.target.value });
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        if (usererr === "" && passworderr === "") {
            createsession();
            setemsg(false);
        } else {
            setemsg(true);
        }
    };

    useEffect(() => {
        validateuser();
        validatepassword();
    }, [handlechange]);



    return (
        <div className='container'>
            <div className='wrapper'>
                <span>LOGIN</span>
                <form onSubmit={(e) => handlesubmit(e)}>
                    <div>
                        <input
                            type="text"
                            name="login"
                            value={data.login}
                            placeholder="Username"
                            onChange={(e) => { handlechange(e); setemsg(true); }}
                            required
                        />
                        <FaUser className='icon' />
                    </div>
                    {emsg && <span style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}> {usererr} </span>}

                    <div>
                        <input
                            type='password'
                            name="password"
                            value={data.password}
                            placeholder="password"
                            onChange={(e) => { handlechange(e); setemsg(true); }}
                            required
                        />
                        <FaLock className='icon' />
                    </div>
                    {apierr !== '' && <span style={{ color: "red", fontSize: 'X-small', fontWeight: "bold" }}> {apierr} </span>}
                    {emsg && <span style={{ color: "red", fontSize: "10px", fontWeight: "bold" }}> {passworderr} </span>}

                    <input className='button' type="submit" value="login" />
                </form>
                <div className='msg'>Don't Have a Account? No worries <Link className='link' to='/register'>SignUp</Link></div>
            </div>
        </div>
    );
}

export default Login;