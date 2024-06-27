import React, { useState } from 'react'

// REACT-ICONS 
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";

// REACT-QUERY AND FUNCTION 
import { create_chat, create_message } from '../API/APICalls'
import { useMutation } from 'react-query';

// CSS 
import './Chats.css'

const Input = ({ id }) => {

    const [message, setmessage] = useState("");

    // CREATE CHAT FUNCTION 
    const {mutate: newmsg} = useMutation('create_message', create_message)

    // HANDLE MESSAGE SEND 
    const handlesubmit = (e) => {
        e.preventDefault();

        newmsg({
            chat_dialog_id: id,
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
                    onChange={(e) => setmessage(e.target.value)}
                    required
                />
                <button> <IoSend /> </button>
            </form>
        </div>
    )
}

export default Input
