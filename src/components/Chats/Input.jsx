import React, { useState, useEffect } from 'react'

// REACT-ICONS 
import { IoSend } from "react-icons/io5";
import { ImAttachment } from "react-icons/im";

// REACT-QUERY AND FUNCTION 
import { create_message } from '../API/APICalls'
import { useMutation } from 'react-query';

// CSS 
import './Chats.css'
import { useParams } from 'react-router-dom';

const Input = ({ id, bottomref }) => {

    const [message, setmessage] = useState("");
    const param = useParams()

    // CREATE CHAT FUNCTION 
    const { mutate: newmsg, isSuccess } = useMutation('create_message', create_message)

    // HANDLE MESSAGE SEND 
    const handlesubmit = (e) => {
        e.preventDefault();

        newmsg({
            chat_dialog_id: id,
            message: message
        })

        setmessage("");
    }

    // useEffect(() => {
    //     bottomref.current?.scrollIntoView()
    // }, [isSuccess, id])

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
