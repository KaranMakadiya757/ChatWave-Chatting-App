import { FaUser, FaLock, FaUnlock } from "react-icons/fa6";
import { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import logo from '../../assets/Photos/logo.png'
import './Login.css'
import { useMutation } from "react-query";
import { Login_User } from "../API/APICalls";

const Login = () => {
    const [showpass, setshowpass] = useState(false)
    const [data, setdata] = useState({ login: "", password: "" });
    const [error, seterror] = useState({ login: false, password: false });
    const nev = useNavigate();

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
            // createsession();
            login.mutate(data)
            seterror({ login: false, password: false })
        }
    };

    /* --------------------------- CREATE USER SESSION --------------------------- */

    const login = useMutation('Login_User', Login_User,
        {
            retry: false,
            onSuccess: (data) => console.log(data),
            onError: (err) => {
                const errmsg = err.response.data.errors.base ? err.response.data.errors.base.map(i => i) : err.response.data.errors.map(i => i)
                toast.error(`Oops! 😐 ${errmsg}`, {
                    position: "top-center",
                    autoClose: false,
                })
            }
        }
    )


    // const createsession = async () => {

    //     const timestamp = Math.floor(Date.now() / 1000);
    //     const nonce = Math.random().toString(36).substring(2, 8);
    //     const sign = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA1(`application_id=103104&auth_key=ak_vvcpFMhMMRN9Gtb&nonce=${nonce}&timestamp=${timestamp}&user[login]=${data.login}&user[password]=${data.password}`, "as_4L3npC36aRkAOLS"));

    //     try {
    //         const res = await axios.post("https://api.quickblox.com/session.json",
    //             {
    //                 application_id: "103104",
    //                 auth_key: "ak_vvcpFMhMMRN9Gtb",
    //                 timestamp: timestamp,
    //                 nonce: nonce,
    //                 signature: sign,
    //                 user: data
    //             },
    //             {
    //                 headers: { "Content-Type": "application/json" }
    //             }
    //         );

    //         if (res) {
    //             setdata({ login: "", password: "" });
    //             setapierr('');
    //             sessionStorage.setItem('userid', res.data.session.user_id);
    //             sessionStorage.setItem('QBtoken', res.data.session.token);
    //             nev("/home");
    //         }
    //     }
    //     catch (err) {
    //         if (err.response.data.errors[0] === 'Unauthorized') {
    //             setapierr('Please Enter Valid username and password')
    //         }
    //     }
    // };


    /* --------------------------- HANDLE CHANGE --------------------------- */

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
                            />
                            {showpass ?
                                <FaUnlock className={`icon ${error.password && 'iconerr'}`} onClick={() => setshowpass(!showpass)} />
                                :
                                <FaLock className={`icon ${error.password && 'iconerr'}`} onClick={() => setshowpass(!showpass)} />
                            }

                        </div>

                        <button className='button' disabled={login.isLoading}>{login.isLoading ? <span className="loading"></span> : 'LOGIN'}</button>
                    </form>
                    <div className='msg'>Don't Have a Account? No worries <NavLink className='link' to='/register'>SignUp</NavLink></div>
                </div>

            </div>
        </div>
    );
}

export default Login;