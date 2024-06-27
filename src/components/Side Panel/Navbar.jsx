import React, { useState, useRef, useEffect } from 'react'

// REACT-ROUTER-DOM 
import { useNavigate } from 'react-router-dom';

// REACT-QUERY AND FUNCTION
import { useMutation, useQuery } from 'react-query';
import { create_chat, get_user, get_userlist } from '../API/APICalls';

// REACT ICONS 
import { MdLogout, MdGroups, MdAddCircleOutline } from "react-icons/md";
import { HiDotsVertical } from "react-icons/hi";

// CSS 
import './Sidebar.css'


const Navbar = () => {
    const [add, setadd] = useState(false);
    const [grpchat, setgrpchat] = useState(false);

    const [groupinfo, setgroupinfo] = useState({ type: 2, name: '', occupants_ids: [] })

    const [gname, setgname] = useState('');
    const [menu, setmenu] = useState(false);
    const [selectedUsers, setSelectedUsers] = useState([]);

    const user = useQuery(['user', sessionStorage.getItem('userid')], get_user)
    const userlist = useQuery('userlist', get_userlist)
    const newchat = useMutation('create_chat', create_chat)

    const nev = useNavigate();
    const addRef = useRef(null);


    const handlelogout = () => {
        sessionStorage.removeItem('userid');
        sessionStorage.removeItem('QBtoken');
        nev('/login');
    }

    const handleadd = (user) => {
        newchat.mutate(user.user.id)
        setadd(false)
        setmenu(false)
    }


    const handlegrp = (userId) => {
        (groupinfo.occupants_ids.includes(userId)) ?
            setgroupinfo({ ...groupinfo, occupants_ids: occupants_ids.filter(id => id !== userId) }) :
            setSelectedUsers({ ...groupinfo, occupants_ids: [...occupants_ids, userId]})

        // (selectedUsers.includes(userId)) ?
        //     setSelectedUsers(selectedUsers.filter(id => id !== userId)) :
        //     setSelectedUsers([...selectedUsers, userId])
    }

    const handlecreategrp = (e) => {
        // e.preventDefault()
        // if (selectedUsers.length < 2) {
        //     alert('Please Select atleast 3 users to create a group')
        // }
        // else {
        //     dispatch(creategrpchat(gname, selectedUsers))
        //     setgrpchat(false)
        //     setmenu(false)
        //     setSelectedUsers([])
        //     setgname('')
        // }
    };



    useEffect(() => {
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
                            value={gname}
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
