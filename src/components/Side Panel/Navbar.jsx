import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
import { MdLogout, MdGroups, MdAddCircleOutline } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";
import style from './Navbar.module.css';
// import { fetchuserlist, fetchuser, createchat, creategrpchat } from '../App/APISlice';



const Navbar = () => {
    const [add, setadd] = useState(false);
    const [grpchat, setgrpchat] = useState(false);
    const [gname, setgname] = useState('');
    const [menu, setmenu] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const user = useSelector(state => state.API.userinfo);
    const userlist = useSelector(state => state.API.userlist)
    const nev = useNavigate();
    const addRef = useRef(null);

    // const handlelogout = () => {
    //     sessionStorage.removeItem('userid');
    //     sessionStorage.removeItem('QBtoken');
    //     nev('/login');
    // }
    // const handleadd = (user) => {
    //     console.log(user.user.id)
    //     dispatch(createchat(user.user.id))
    //     setadd(false)
    //     setmenu(false)
    // }
    // const handlegrp = (userId) => {
    //     // console.log(userId)
    //     if (selectedUsers.includes(userId)) {
    //         setSelectedUsers(selectedUsers.filter(id => id !== userId));
    //     } else {
    //         setSelectedUsers([...selectedUsers, userId]);
    //     }
    // };
    // const handlecreategrp = (e) => {
    //     e.preventDefault()
    //     if (selectedUsers.length < 2) {
    //         alert('Please Select atleast 3 users to create a group')
    //     }
    //     else {
    //         dispatch(creategrpchat(gname, selectedUsers))
    //         setgrpchat(false)
    //         setmenu(false)
    //         setSelectedUsers([])
    //         setgname('')
    //     }
    // };

    useEffect(() => {
        // dispatch(fetchuser())
        // dispatch(fetchuserlist());
        const handleClickOutside = (event) => {
            if (addRef.current && !addRef.current.contains(event.target)) {
                setadd(false);
                setmenu(false);
                setgrpchat(false);
                setSelectedUsers([])
                setgname('')
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [addRef]);

    return (
        <div className='navbar'>
            <span>{user.login}</span>
            <div className='navwrapper'>
                <HiDotsVertical className='icon' onClick={() => setmenu(!menu)} />
            </div>
            {menu &&
                <div className='menu' ref={addRef}>
                    <span className='ucon' onClick={() => setadd(!add)}><MdAddCircleOutline />Create Chat</span>
                    <span className='ucon' onClick={() => setgrpchat(!grpchat)}><MdGroups />Create Group</span>
                    <span className='ucon' onClick={handlelogout}><MdLogout />LogOut</span>
                </div>
            }
            {add &&
                <div className='add' ref={addRef}>
                    {
                        userlist.map((u) => (
                            <div key={u.user.id} className='ucon' onClick={() => handleadd(u)}>
                                <img src="https://cdn1.vectorstock.com/i/1000x1000/20/65/man-avatar-profile-vector-21372065.jpg" alt="" />
                                <span>{u.user.login}</span>
                            </div>
                        ))
                    }
                </div>
            }
            {grpchat &&
                <div className='add' ref={addRef}>
                    <form onSubmit={handlecreategrp} className={style.form}>
                        <input
                            type="text"
                            value={gname}
                            placeholder='Group Name'
                            onChange={(e) => setgname(e.target.value)}
                            required
                        />
                        <input type="submit" value="Create" className='button' />
                    </form>
                    <hr style={{ width: '99%' }} />
                    {
                        userlist.map((u) => (
                            <div
                                key={u.user.id}
                                className={style.ucon}
                                onClick={() => handlegrp(u.user.id)}
                                style={{ backgroundColor: selectedUsers.includes(u.user.id) ? 'rgb(100,100,100)' : 'rgb(47,47,47)', cursor: 'pointer' }}
                            >
                                <img src="https://cdn1.vectorstock.com/i/1000x1000/20/65/man-avatar-profile-vector-21372065.jpg" alt="" />
                                <span className='uname'>{u.user.login}</span>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Navbar
