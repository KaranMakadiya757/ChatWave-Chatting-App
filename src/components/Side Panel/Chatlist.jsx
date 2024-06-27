import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { setselecteduser } from '../../components/App/Slice'
import { get_dialoglist } from '../API/APICalls';
import './Sidebar.css'
import { useNavigate } from 'react-router-dom';

const Chatlist = () => {
  const dispatch = useDispatch();
  const nev = useNavigate();

  const handleclick = (data) => {
    console.log(data)
    nev(`/home/${data._id}`)
    dispatch(setselecteduser(data));
  }

  const dialoglist = useQuery('get_dialoglist', get_dialoglist)

  return (
    <div className='chatlist'>
      {dialoglist.isSuccess && dialoglist.data.data.items.map((d) => (
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
