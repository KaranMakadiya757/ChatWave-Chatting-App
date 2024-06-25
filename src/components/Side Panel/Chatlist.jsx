// import { useDispatch, useSelector } from 'react-redux';
// import { setselecteduser } from "../App/APISlice";
import './Sidebar.css'

const Chatlist = () => {
  const data = useSelector(state => state.API.dialoglist);
  const dispatch = useDispatch();

  const handleclick = (data) => {
    dispatch(setselecteduser(data));
  }

  return (
    <div className={style.chatlist}>
      {data.map((d) => (
        <div key={d._id} className={style.chat} onClick={() => handleclick(d)}>
          <img src='https://cdn1.vectorstock.com/i/1000x1000/20/65/man-avatar-profile-vector-21372065.jpg' className={style.img} />
          <div className={style.chatinfo}>
            <span className={style.span}>{d.name}</span>
            <p className={style.p}>{d.last_message}</p>
          </div>
          {d.unread_messages_count != 0 && <div className={style.count}>{d.unread_messages_count}</div>}
        </div>
      ))}
    </div>
  );
};

export default Chatlist;
