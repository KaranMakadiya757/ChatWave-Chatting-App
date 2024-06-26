import React, { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';
import './Chats.css'
import { useParams } from 'react-router-dom';
import { QueryClient, useMutation, useQuery, useQueryClient, } from 'react-query';
import { fetchmsglist } from '../API/APICalls';

const Message = () => {
    const [username, setusername] = useState({})
    // const msg = useSelector(state => state.API.msglist);
    // const user = useSelector(state => state.API.userinfo);
    // const chattype = useSelector(state => state.API.selecteduser.type);
    const params = useParams()
    const client = useQueryClient()
    let ldate = null;
    const messagesEndRef = useRef(null);

    const msg = useQuery(['msglist', params.id], fetchmsglist,
        {
            // onSuccess: (data) => {
            //     console.log('new',data.data.items)
            //     console.log('juno',client.getQueryData(['msglist', params.id]))
            // }
        })

    useEffect(() => {
        scrollToBottom();
        // if (chattype !== 3) {
        //     msg.map(async (m) => {
        //         const id = m.sender_id;
        //         try {
        //             const res = await axios.get(`https://api.quickblox.com/users/${id}.json`, {
        //                 headers: {
        //                     Authorization: 'ApiKey HnJNFUUkVXV_jEdPsqcrAWxBzAF-srn_QMu2EXkm81Y'
        //                 }
        //             })
        //             if (!(id in username)) {
        //                 setusername(prev => ({ ...prev, [id]: res.data.user.login }))
        //             }
        //         } catch (error) {
        //             console.log(error);
        //         }
        //     })
        // }
    }, []);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
        }
    };
    const displayDateIfNeeded = (datetime) => {
        const data = new Date(datetime);
        const month = (data.getMonth() + 1).toString().padStart(2, '0');
        const day = data.getDate().toString().padStart(2, '0');
        const date = `${day}-${month}`;
        if (date !== ldate) {
            ldate = date;
            return <div className='date'>{date}</div>;
        }
        return null;
    };

    const gettime = (time) => {
        const dateTime = new Date(time.created_at);
        const hours = dateTime.getHours().toString().padStart(2, '0');
        const minutes = dateTime.getMinutes().toString().padStart(2, '0');
        return <p className='time'>{hours}:{minutes}</p>;
    }
    const getusername = (id) => {
        return <div className='time'>{username[id]}</div>;
    }

    return (
        <div className='msglist'>
            hellu
            {msg.isSuccess && msg.data.data.items.map((d, index) => (
                <div key={index}>
                    {/* {displayDateIfNeeded(d.created_at)} */}
                    <div className={d.sender_id === sessionStorage.getItem('userid') ? 'msg' : 'msg2'} >
                        {true &&
                            <img src="https://cdn1.vectorstock.com/i/1000x1000/20/65/man-avatar-profile-vector-21372065.jpg" />}
                        <div className='msgbox'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {/* {gettime(d)} */}
                                {/* {chattype !== 3 && getusername(d.sender_id)} */}
                            </div>
                            <p>{d.message}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
}

export default Message;
