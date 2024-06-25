// import { useDispatch, useSelector } from 'react-redux';
// import { setselecteduser } from "../App/APISlice";
import { useQuery, useQueryClient } from 'react-query';
import { fetchdialoglist } from '../API/APICalls';
import './Sidebar.css'

const Chatlist = () => {
  const queryclient = useQueryClient()
  // const data = useSelector(state => state.API.dialoglist);
  // const dispatch = useDispatch();

  const handleclick = (data) => {
    // dispatch(setselecteduser(data));
  }

  const dialoglist = useQuery('fetchdialoglist', fetchdialoglist)

  return (
    <div className='chatlist'>
      {console.log(dialoglist.data)}
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
