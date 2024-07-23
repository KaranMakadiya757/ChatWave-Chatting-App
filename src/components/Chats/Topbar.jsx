import React, { useState, useRef, useEffect } from 'react'

// REACT ICONS 
import { HiDotsVertical } from "react-icons/hi";
import { IoCall } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";

// REACT-QUERY AND FUNCTION 
import { useMutation } from 'react-query';
import { delete_chat } from '../API/APICalls';

// REACT-ROUTER-DOM 
import { useNavigate } from 'react-router-dom';

import ToggleButton from "../../common/ToggleButton.jsx"

// CSS 
import nouser from "../../assets/Photos/No User.png"
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
        <div className='topbar_chats'>

            <div className='divleft'>
                <img src={nouser} />
                <p>{name}</p>
            </div>

            <div className='divright' ref={ref2}>
                <IoCall className='icon' />
                <FaVideo className='icon' />
                <HiDotsVertical className='icon' onClick={() => setmenu(!menu)} />
            </div>

            {menu && <ul className='menu' ref={ref}>
                <li onClick={() => handleclick(id)}>
                    <MdDelete className='menuicon' />
                    <p>Delete Chat</p>
                </li>
                <li>
                    <ToggleButton />
                    <p>Dark Mode</p>
                </li>
            </ul>}
        </div>
    )
}

export default Topbar