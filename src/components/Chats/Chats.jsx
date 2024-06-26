import Input from "./Input";
import Message from "./Message";
import Topbar from "./Topbar";
import { useQuery } from "react-query";
import { fetchdialog } from "../API/APICalls";
import './Chats.css'
import { useParams } from "react-router-dom";


const Chats = () => {
  const params  = useParams()

  const {data} = useQuery(['fetchdialog', params.id], fetchdialog,
    {
      enabled: !!params.id,
      onSuccess: d => console.log(d.data.items[0]),
      keepPreviousData: true
    })

  return (
    <div className='chats_container'>
      {console.log(data.data.items[0])}
      <Topbar name={data.data.items[0].name} id={data.data.items[0]._id}/>
      <Message id={data.data.items[0]._id} type={data.data.items[0].type}/>
      <Input id={data.data.items[0]._id}/>
    </div>
  );
};

export default Chats;
