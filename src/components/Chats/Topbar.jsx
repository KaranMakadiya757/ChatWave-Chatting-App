import React from 'react'
import style from './Topbar.module.css'
import { useSelector, useDispatch } from "react-redux";
import { HiDotsVertical } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { useState, useRef, useEffect } from "react";
import { deletechat, setselecteduser } from "../App/APISlice";

const Topbar = () => {
//   const data = useSelector(state => state.API.selecteduser)
  const [menu, setmenu] = useState(false);
  const addRef = useRef(null);
//   const dispatch = useDispatch()

  const handleclick = (data) => {
    // setmenu(false);
    // if (data === '661dffe332eaaf0042d44756') {
    //   alert('You can not delete a public chat')
    // }
    // else {
    //   dispatch(deletechat(data));
    //   dispatch(setselecteduser({}))
    // }

  }
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addRef.current && !addRef.current.contains(event.target)) {
        setmenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addRef]);

  return (
    <div className='topbar_container'>
      <div className='topbar_chats'>
        <div className='divleft'>
          {data.name && <img src='https://cdn1.vectorstock.com/i/1000x1000/20/65/man-avatar-profile-vector-21372065.jpg'/>}
          <span>{data.name}</span>
        </div>
        {data.name && <HiDotsVertical className='icon' onClick={() => setmenu(!menu)} />}
        {menu &&
          <div className='menu' ref={addRef} onClick={() => handleclick(data._id)}>
            <MdDelete style={{color:'white'}}/>
            <span>Delete Chat</span>
          </div>}
      </div>
    </div>
  )
}

export default Topbar