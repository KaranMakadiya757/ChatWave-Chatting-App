import React, { useState, useRef, useEffect } from 'react'

// REACT ICONS 
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";

// REACT-QUERY AND FUNCTION 
import { useMutation } from 'react-query';
import { delete_chat } from '../API/APICalls';

// REACT-ROUTER-DOM 
import { useNavigate } from 'react-router-dom';

// CSS 
import './Chats.css'

const Topbar = ({ name, id }) => {
    const [menu, setmenu] = useState(false);
    const ref = useRef(null);
    const ref2 = useRef(null);
    const nav = useNavigate()

    const { mutate } = useMutation("delete_chat", delete_chat,
        {
            onSuccess: () => nav('/home')
        }
    )

    const handleclick = () => {
        setmenu(false);
        mutate(id)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target) && !ref2.current.contains(event.target)) {
                setmenu(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [ref, ref2])

    return (
        <div className='topbar_container'>
            <div className='topbar_chats'>
                <div className='divleft'>
                    <img src='https://cdn1.vectorstock.com/i/1000x1000/20/65/man-avatar-profile-vector-21372065.jpg' />
                    <span>{name}</span>
                </div>
                <span ref={ref2}><HiDotsVertical className='icon' onClick={() => setmenu(!menu)} /></span>
                {menu &&
                    <div className='menu' ref={ref} onClick={() => handleclick(id)}>
                        <MdDelete style={{ color: 'white' }} />
                        <span>Delete Chat</span>
                    </div>}
            </div>
        </div>
    )
}

export default Topbar