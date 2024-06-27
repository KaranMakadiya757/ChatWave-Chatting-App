import React, { useState, useRef, useEffect } from 'react'

// REACT-ROUTER-DOM 
import { useNavigate } from 'react-router-dom';

// REACT-QUERY AND FUNCTION
import { useMutation, useQuery } from 'react-query';
import { create_chat, create_group_chat, get_user, get_userlist } from '../API/APICalls';

// REACT ICONS 
import { MdLogout, MdGroups, MdAddCircleOutline } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

// CSS 
import './Sidebar.css'


const Navbar = () => {
    // POP UP MENUS 
    const [menu, setmenu] = useState(false);
    const [add, setadd] = useState(false);
    const [grpchat, setgrpchat] = useState(false);

    // NEW GROUP INFO 
    const [groupinfo, setgroupinfo] = useState({ type: 2, name: '', occupants_ids: [] })

    // API CALLS FOR USER, USERLIST, NEW PERSONAL AND GROUP CHATS 
    const user = useQuery(['user', sessionStorage.getItem('userid')], get_user, { refetchOnWindowFocus: false })
    const userlist = useQuery('userlist', get_userlist, { refetchOnWindowFocus: false })
    const newchat = useMutation('create_chat', create_chat)
    const newgroup = useMutation('create_group_chat', create_group_chat)

    // NAVIGATION AND REFERENCE VARIABLES 
    const nev = useNavigate();
    const addRef = useRef(null);


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
        (groupinfo.occupants_ids.includes(userId)) ?
            setgroupinfo({ ...groupinfo, occupants_ids: groupinfo.occupants_ids.filter(id => id !== userId) }) :
            setSelectedUsers({ ...groupinfo, occupants_ids: groupinfo.occupants_ids.push(userId) })
    }
    const handlecreategrp = (e) => {
        e.preventDefault()
        console.log(groupinfo)
        newgroup.mutate(groupinfo)
    }


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (addRef.current && !addRef.current.contains(event.target)) {
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
            <span>{user.isSuccess && user.data.data.user.login}</span>
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
                        userlist.data.data.items.map((u) => (
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
                    <form onSubmit={handlecreategrp}>
                        <input
                            type="text"
                            value={groupinfo.name}
                            placeholder='Group Name'
                            onChange={(e) => setgroupinfo({ ...groupinfo, name: e.target.value })}
                            required
                        />
                        <input type="submit" value="Create" className='button' />
                    </form>
                    <hr style={{ width: '99%' }} />
                    {
                        userlist.data.data.items.map((u) => (
                            <div
                                key={u.user.id}
                                className="ucon"
                                onClick={() => handlegrp(u.user.id)}
                                style={{ backgroundColor: groupinfo.occupants_ids.includes(u.user.id) ? 'rgb(100,100,100)' : 'rgb(47,47,47)', cursor: 'pointer' }}
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
