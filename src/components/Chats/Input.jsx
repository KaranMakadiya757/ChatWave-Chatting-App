import React, { useEffect, useState } from 'react'
import style from "./Input.module.css";
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import { createmsg } from '../App/APISlice';

const Input = () => {
    const user = useSelector(state => state.API.selecteduser)
    const [message, setmessage] = useState("");
    const dispatch = useDispatch();

    const handlechange = (e) => {
        setmessage(e.target.value);
    };
    const handlefileChange = (e) => {
        setFile(e.target.files[0]);
    };
    const handlesubmit = (e) => {
        e.preventDefault();
        // console.log(file.name)
        // console.log(message)
        // dispatch(createfile(file.name));
        dispatch(createmsg(user._id, message))
        setmessage("");
    };

    return (
        <div className='input'>
            <form onSubmit={handlesubmit}>
                <label htmlFor="file">
                    <ImAttachment className='attach' />
                </label>
                <input
                    type="file"
                    id='file'
                    style={{ display: 'none' }}
                    onChange={handlefileChange}
                />
                <input
                    value={message}
                    type="text"
                    placeholder="Type your message"
                    onChange={handlechange}
                    required
                />
                <button type="submit"> <IoSend /> </button>
            </form>
        </div>
    )
}

export default Input
