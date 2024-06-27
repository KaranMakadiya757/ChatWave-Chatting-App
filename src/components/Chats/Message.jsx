import React, { useEffect, useRef, useState } from 'react';

// REACT-QUERY AND FUNCTION 
import { useQueries, useQuery } from 'react-query';
import { get_messagelist, get_user } from '../API/APICalls';

// CSS 
import './Chats.css'
import { addDays, format } from 'date-fns';

const Message = ({ type, id }) => {
    const [username, setusername] = useState({})

    let lastdate = addDays(new Date(), 1)
    const messagesEndRef = useRef(null);

    const { data: msg, isSuccess } = useQuery(['get_messagelist', id], get_messagelist, { refetchOnWindowFocus: false, refetchInterval: 1000})

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView();
        }

        if (type !== 3) {
            // msg.data.items.map(m => {
            //     const id = m.sender_id;

            //     const {data} = useQuery(['get_username', m.sender_id], get_user,
            //         {
            //             onSuccess: d => d
            //         }
            //     )
            // const res = axios.get(`https://api.quickblox.com/users/${id}.json`, {
            //     headers: {
            //         Authorization: 'ApiKey HnJNFUUkVXV_jEdPsqcrAWxBzAF-srn_QMu2EXkm81Y'
            //     }
            // })
            // if (!(id in username)) {
            //     setusername(prev => ({ ...prev, [id]: res.data.user.login }))
            // }
            // })
        }
    }, []);

    const displayDateIfNeeded = (date) => {
        if ((format(date, "dd-MM-yyyy") !== format(lastdate, "dd-MM-yyyy"))) {
            lastdate = date
            return format(date, "dd-MM")
        }
    }

    const getusername = (id) => {
        // return <div className='time'>{username[id]}</div>;
    }

    return (
        <div className='msglist'>
            {isSuccess && msg.data.items.map((d, index) => (
                <div key={index}>
                    <div className='date'>{displayDateIfNeeded(d.created_at)}</div>
                    <div className={d.sender_id === sessionStorage.getItem('userid') ? 'msg2' : 'msg'} >
                        {type !== 3 &&
                            <img src="https://cdn1.vectorstock.com/i/1000x1000/20/65/man-avatar-profile-vector-21372065.jpg" />}
                        <div className='msgbox'>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {format(d.created_at, "HH:mm")}
                                {type !== 3 && getusername(d.sender_id)}
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
