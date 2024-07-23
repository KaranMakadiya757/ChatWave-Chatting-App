import { useState } from "react";

// REACT ROUTER DOM 
import { useNavigate, NavLink } from "react-router-dom";

// REACT QUERY AND FUNCTION 
import { useMutation } from "react-query";
import { Login_User } from "../API/APICalls";

// REACT ICON, TOASTIFY NOTIFICATION AND LOADER 
import { FaUser, FaLock, FaUnlock } from "react-icons/fa6";
import { bouncy } from "ldrs";
import { toast } from "react-toastify";

// IMAGES AND CSS 
import logo from '../../assets/Photos/logo.png'
import './Login.css'

const Login = () => {
    const [showpass, setshowpass] = useState(false)
    const [data, setdata] = useState({ login: "", password: "" });
    const [error, seterror] = useState({ login: false, password: false });

    const nev = useNavigate();
    bouncy.register()

    /* --------------------------- HNADLING THE LOGIN SUBMIT BUTTON --------------------------- */ 

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
            login.mutate(data)
            seterror({ login: false, password: false })
        }
    };

    /* --------------------------- CREATE USER SESSION --------------------------- */

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

    return (
        <div className='login_container'>
            <div className='login_wrapper'>
                <div className="left">
                    <img src={logo} onClick={() => nev('/')} />
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

                        <button className='button' disabled={login.isLoading}>{login.isLoading ? <l-bouncy size={30} speed={1} color='var(--gray)'></l-bouncy> : 'LOGIN'}</button>
                    </form>
                    <div className='msg'>Don't Have a Account? No worries <NavLink className='link' to='/register'>SignUp</NavLink></div>
                </div>

            </div>
        </div>
    );
}

export default Login;