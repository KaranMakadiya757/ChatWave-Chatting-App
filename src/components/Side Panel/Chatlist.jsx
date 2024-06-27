// REACT-QUERY AND FUNCTION IMPORT 
import { useQuery } from 'react-query';
import { get_dialoglist } from '../API/APICalls';

// REACT-ROUTER-DOM 
import { useNavigate } from 'react-router-dom';

// CSS
import './Sidebar.css'

const Chatlist = () => {
  const nev = useNavigate();

  // FETCHING THE CHATS LIST FROM SERVER 
  const {data: dialoglist, isSuccess} = useQuery('get_dialoglist', get_dialoglist,
    {
      refetchOnWindowFocus: false,
      refetchInterval: 1000
    }
  )

  // HANDLING THE CHAT SELECTION FUNCTIONALITY 
  const handleclick = (data) => {
    console.log(data)
    nev(`/home/${data._id}`)
  }


  return (
    <div className='chatlist'>
      {isSuccess && dialoglist.data.items.map((d) => (
        <div key={d._id} className='chat' onClick={() => handleclick(d)}>
          <img src='https://cdn1.vectorstock.com/i/1000x1000/20/65/man-avatar-profile-vector-21372065.jpg' />
          <div className='chatinfo'>
            <span>{d.name}</span>
            <p>{d.last_message}</p>
          </div>
          {d.unread_messages_count != 0 && <div className='count'>{d.unread_messages_count}</div>}
        </div>
      ))}
    </div>
  );
};

export default Chatlist;
