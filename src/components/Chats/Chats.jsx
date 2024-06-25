import Input from "./Input";
import Message from "./Message";
import Topbar from "./Topbar";
import './Chats.css'


const Chats = () => {
  

  return (
    <div className='chats_container'>
      <Topbar/>
      <Message />
      <Input />
    </div>
  );
};

export default Chats;
