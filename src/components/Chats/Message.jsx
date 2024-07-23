import React, { useEffect, useState } from 'react';

// REACT-QUERY AND FUNCTION 
import { useQuery } from 'react-query';
import { get_messagelist, get_userlist } from '../API/APICalls';

// CSS 
import './Chats.css'
import nouser from "../../assets/Photos/No User.png"
import { addDays, format } from 'date-fns';

const Message = ({ type, id, bottomref }) => {
    const [time, settime] = useState("false")
    const [messages, setmessages] = useState([])
    let lastdate = addDays(new Date(), 1)

    const { data: msg, isSuccess, isLoading } = useQuery(['get_messagelist', id], get_messagelist,
        {
            refetchInterval: 500,
            enabled: !!id,
            onSuccess: (data) => {
                if (messages !== data.data.items) setmessages(data.data.items)
            }
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
        console.log(messages)
    }, [messages])


    useEffect(() => {
        bottomref.current?.scrollIntoView();
    }, [messages]);



    if (isLoading) {
        return (
            <div className="loader">
                <l-bouncy size={30} speed={1} color='var(--gray)'></l-bouncy>
            </div>
        )
    }

    return (
        <div className='msglist'>

            <ul>
                {isSuccess && msg.data.items.map(d => (
                    <React.Fragment key={d._id}>
                        <li className='date'>{displayDateIfNeeded(d.created_at)}</li>

                        <li className={d.sender_id == sessionStorage.getItem('userid') ? 'msg' : 'msg2'} >

                            {type !== 3 && <img src={nouser} />}


                            <div className='info'
                                onMouseEnter={() => settime(d._id)}
                                onMouseLeave={() => settime("")}
                            >

                                {d.sender_id != sessionStorage.getItem('userid') && <h4>{type !== 3 && userlist.data.items.filter(i => i.user.id === d.sender_id)[0].user.login}</h4>}
                                <p className="message">{d.message}</p>
                                {time === d._id && <p className="time">{format(d.created_at, "HH:mm")}</p>}

                            </div>

                        </li>
                    </React.Fragment>
                ))}

            </ul>

            <span ref={bottomref} />
        </div>
    );
}

export default Message;