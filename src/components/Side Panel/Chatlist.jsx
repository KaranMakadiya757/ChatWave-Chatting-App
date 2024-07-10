// REACT-QUERY AND FUNCTION IMPORT 
import { useQuery } from 'react-query';
import { get_dialoglist } from '../API/APICalls';

// REACT-ROUTER-DOM 
import { useNavigate, useParams } from 'react-router-dom';

// CSS
import nouser from "../../assets/Photos/No User.png"
import './Sidebar.css'

const Chatlist = () => {
  const nev = useNavigate();
  const params = useParams()

  // FETCHING THE CHATS LIST FROM SERVER 
  const { data: dialoglist, isSuccess } = useQuery('get_dialoglist', get_dialoglist,
    {
      refetchOnWindowFocus: false,
      refetchInterval: 1000
    }
  )

  // HANDLING THE CHAT SELECTION FUNCTIONALITY 
  const handleclick = (data) => {
    nev(`/home/${data._id}`)
  }


  return (
    <div className='chatlist'>

      {isSuccess && dialoglist.data.items.map((d) => (
        <div
          key={d._id}
          className={`chat ${params.id === d._id && 'selected'}`}
          onClick={() => handleclick(d)}>

          <img src={nouser} />

          <div className='chatinfo'>
            <h3>{d.name}</h3>
            {d.last_message && <p>{d.last_message}</p>}
          </div>

          {d.unread_messages_count != 0 &&
            <div className='count'>
              {/* <p>{d.unread_messages_count}</p> */}
            </div>
          }
        </div>
      ))}

    </div>
  );
};

export default Chatlist;
