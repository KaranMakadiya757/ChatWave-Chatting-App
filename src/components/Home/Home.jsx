import Sidebar from '../Side Panel/Sidebar'
import Chats from "../Chats/Chats";
import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchdialoglist, fetchmsglist } from "../App/APISlice";
import './Home.css'

const Home = () => {
    // const dispatch = useDispatch();
    // const id = useSelector(state => state.API.selecteduser)

    // useEffect(() => {
    //     const intervalId = setInterval(() => {
    //         dispatch(fetchdialoglist());
    //         if (id._id) {
    //             dispatch(fetchmsglist(id._id));
    //         }
    //     }, 500);

    //     return () => clearInterval(intervalId);
    // }, [id._id, dispatch]);

    return (
        <div className='home_container'>
            <div className='home_wrapper'>
                <Sidebar />
                <Chats />
            </div>
        </div>
    );
};

export default Home;
