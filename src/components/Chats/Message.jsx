import React, { useEffect, useRef } from 'react';

// REACT-QUERY AND FUNCTION 
import { useQuery } from 'react-query';
import { get_messagelist, get_userlist } from '../API/APICalls';

// CSS 
import './Chats.css'
import { addDays, format } from 'date-fns';

const Message = ({ type, id, bottomref }) => {
    let lastdate = addDays(new Date(), 1)
    const ref2 = useRef(null)

    const { data: msg, isSuccess } = useQuery(['get_messagelist', id], get_messagelist,
        {
            refetchOnWindowFocus: false,
            refetchInterval: 1000,
            enabled: !!id
        })

    const { data: userlist } = useQuery('userlist', get_userlist,
        {
            refetchOnWindowFocus: false,
        })

    const displayDateIfNeeded = (date) => {
        if ((format(date, "dd-MM-yyyy") !== format(lastdate, "dd-MM-yyyy"))) {
            lastdate = date
            return format(date, "dd-MM")
        }
    }
    useEffect(() => {
        if (ref2.current) {
          ref2.current.scrollTop = ref2.current.scrollHeight;
        }
      }, [])

    useEffect(() => {
        bottomref.current?.scrollIntoView()
    }, [])

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
                                {type !== 3 && userlist.data.items.filter(i => i.user.id === d.sender_id)[0].user.login}
                            </div>
                            <p>{d.message}</p>
                        </div>
                    </div>
                </div>
            ))}
            <div ref={bottomref} />
        </div>
    );
}

export default Message;