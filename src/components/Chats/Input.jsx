import React, { useEffect, useState } from 'react'
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";
import { useSelector } from "react-redux";
import { createmsg } from '../API/APICalls'
import './Chats.css'
import { useMutation } from 'react-query';
import { useParams } from 'react-router-dom';

const Input = () => {
    const user = useSelector(state => state.data.selecteduser)
    const [message, setmessage] = useState("");
    const params = useParams()
    const create_message = useMutation('create_message', createmsg)

    const handlechange = (e) => {
        setmessage(e.target.value);
    };
    const handlesubmit = (e) => {
        e.preventDefault();
        console.log(message)
        create_message.mutate({
            chat_dialog_id: params.id,
            message: message
        })
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
