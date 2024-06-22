import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate, NavLink } from "react-router-dom";
import { FaUser, FaLock, FaUnlock } from "react-icons/fa";
import { Create_User } from "../API/APICalls";
import { toast } from 'react-toastify';
import logo from '../../assets/Photos/logo.png'
import './Register.css'

const Register = () => {
    const [data, setdata] = useState({ login: "", password: "" });
    const [error, seterror] = useState({ login: "", password: "" });
    const [showpass, setshowpass] = useState(false)

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
            register.mutate(data)
            seterror({ login: false, password: false })
        }
    };

    const register = useMutation('Create_User', Create_User,
        {
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
                    <img src={logo} />
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

                        <button className='button' disabled={register.isLoading}>{register.isLoading ? <span className="loading"></span> : 'SIGNUP'}</button>

                    </form>
                    <span className='msg'>Created one? Now go and <NavLink className='link' to='/login'>Login</NavLink></span>
                </div>
            </div>
        </div>
    );
};

export default Register;


// const createuser = async () => {
//     try {
//         const res = await axios.post("https://api.quickblox.com/users.json",
//             { user: data },
//             {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: "ApiKey HnJNFUUkVXV_jEdPsqcrAWxBzAF-srn_QMu2EXkm81Y",
//                 }
//             }
//         );
//         if (res) {
//             console.log(res)

//             setdata({ login: "", password: "" });
//             setapierr('');
//             nev('/login');
//         }
//     } catch (error) {
//         if (error.response.data.errors.login[0] === 'has already been taken') {
//             setapierr('Username Has already Been Taken by someone')
//         }
//     }
// };