import React, { useState, useRef, useEffect } from 'react'

// REACT-ROUTER-DOM 
import { useNavigate } from 'react-router-dom';

// REACT-QUERY AND FUNCTION
import { useMutation, useQuery } from 'react-query';
import { create_chat, create_group_chat, get_user, get_userlist } from '../API/APICalls';

// REACT ICONS 
import { MdLogout, MdGroups, MdAddCircleOutline } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { HiDotsVertical } from "react-icons/hi";

// CSS
import DP from '../../assets/Photos/a5bc3d87-bd5e-498c-9365-78696a73d802.jpg'
import logo from '../../assets/Photos/logo2.png'
import nouser from "../../assets/Photos/No User.png"
import './Sidebar.css'


const Navbar = () => {
    // POP UP MENUS 
    const [menu, setmenu] = useState(false);
    const [add, setadd] = useState(false);
    const [grpchat, setgrpchat] = useState(false);

    // NEW GROUP INFO 
    const [groupinfo, setgroupinfo] = useState({ type: 2, name: '', occupants_ids: [] })

    // NAVIGATION AND REFERENCE VARIABLES 
    const nev = useNavigate();
    const addRef = useRef(null);
    const ref2 = useRef(null);

    // API CALLS FOR USER, USERLIST, NEW PERSONAL AND GROUP CHATS 
    const user = useQuery(['user', sessionStorage.getItem('userid')], get_user, { refetchOnWindowFocus: false })
    const userlist = useQuery('userlist', get_userlist, { refetchOnWindowFocus: false })
    const newchat = useMutation('create_chat', create_chat, {
        onSuccess: (data) => nev(`/home/${data.data._id}`)
    })
    const newgroup = useMutation('create_group_chat', create_group_chat, {
        onSuccess: (data) => {
            nev(`/home/${data.data._id}`)
            setgrpchat(false)
            setgroupinfo({ type: 2, name: '', occupants_ids: [] })
        }
    })


    // HANDLING THE LOGOUT FUNCTIONALITY 
    const handlelogout = () => {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('QBtoken');
        nev('/login');
    }

    // HANDLING THE NEW CHAT FUNCTIONALITY 
    const handleadd = (user) => {
        newchat.mutate(user.user.id)
        setadd(false)
        setmenu(false)
    }

    // HANDLING GROUP CREATION FUNCTIONALITY 
    const handlegrp = (userId) => {
        console.log(groupinfo.occupants_ids.includes(userId));
        (groupinfo.occupants_ids.includes(userId)) ?
            setgroupinfo({ ...groupinfo, occupants_ids: groupinfo.occupants_ids.filter(id => id !== userId) }) :
            setgroupinfo({ ...groupinfo, occupants_ids: [...groupinfo.occupants_ids, userId] })
    }
    const handlecreategrp = (e) => {
        e.preventDefault()
        console.log(groupinfo)
        newgroup.mutate(groupinfo)
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (addRef.current && !addRef.current.contains(event.target) && !ref2.current.contains(event.target)) {
                setadd(false)
                setmenu(false)
                setgrpchat(false)
                setgroupinfo({ type: 2, name: '', occupants_ids: [] })
            }
        }

        document.addEventListener("mousedown", handleClickOutside)

        return () => { document.removeEventListener("mousedown", handleClickOutside) }
    }, [addRef]);


    return (
        <div className='navbar'>

            <img className='logo' src={logo} />

            <div className='DP' ref={ref2} onClick={() => {
                (!add && !grpchat) && setmenu(!menu);
                add && setadd(false)
                grpchat && setgrpchat(false)
            }}>
                <p>{user.isSuccess && user.data.data.user.login.toUpperCase()}</p>
                <img src={nouser} />
            </div>


            {menu &&
                <ul className='menu' ref={addRef}>
                    <li onClick={() => {
                        setadd(!add)
                        setmenu(false)
                    }}>
                        New Chat<MdAddCircleOutline />
                    </li>

                    <li onClick={() => {
                        setgrpchat(!grpchat)
                        setmenu(false)
                    }}>
                        New Group<MdGroups />
                    </li>

                    <li onClick={handlelogout}>
                        LogOut<MdLogout />
                    </li>
                </ul>}



            {add &&
                <ul className='add' ref={addRef}>
                    {
                        userlist.data.data.items.filter(i => i.user.id != sessionStorage.getItem('userid')).map((u) => (
                            <li key={u.user.id} className='ucon' onClick={() => handleadd(u)}>
                                <img src={nouser} />
                                <span>{u.user.login}</span>
                            </li>
                        ))
                    }
                </ul>
            }

            {grpchat &&
                <ul className='group' ref={addRef}>
                    <li>
                        <input
                            type="text"
                            value={groupinfo.name}
                            placeholder='Group Name'
                            onChange={(e) => setgroupinfo({ ...groupinfo, name: e.target.value })}
                            required
                        />
                        <IoMdAdd className='button' onClick={handlecreategrp} />
                    </li>
                    {
                        userlist.data.data.items.filter(i => i.user.id != sessionStorage.getItem('userid')).map((u) => (
                            <li
                                key={u.user.id}
                                className="ucon"
                                onClick={() => handlegrp(u.user.id)}
                                style={{ boxShadow: groupinfo.occupants_ids.includes(u.user.id) ? 'var(--shadow-2-inset)' : '', cursor: 'pointer' }}
                            >
                                <img src={nouser} />
                                <span className='uname'>{u.user.login}</span>
                            </li>
                        ))
                    }
                </ul>
            }
        </div>
    )
}

export default Navbar
