// COMPONENET IMPORT   
import Input from "./Input";
import Message from "./Message";
import Topbar from "./Topbar";

// REACT-QUERY AND FUNCTION IMPORT 
import { useQuery } from "react-query";
import { get_dialog } from "../API/APICalls";

// REACT-ROUTER-DOM 
import { useParams } from "react-router-dom";

// CSS 
import './Chats.css'


const Chats = () => {
  // GETTING ID FROM URL 
  const params = useParams()

  // FETCHING SELECTED DIALOG 
  const { data, isSuccess } = useQuery(
    ['get_dialog', params.id],
    get_dialog,
    {
      enabled: !!params.id,
      keepPreviousData: true
    })

  return (
    <div className='chats_container'>
      {isSuccess &&
        <>
          <Topbar name={data.data.items[0].name} id={data.data.items[0]._id} />
          <Message id={data.data.items[0]._id} type={data.data.items[0].type} />
          <Input id={data.data.items[0]._id} />
        </>
      }
    </div>
  );
};

export default Chats;
