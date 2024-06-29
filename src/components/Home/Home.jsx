import Sidebar from '../Side Panel/Sidebar'
import Chats from "../Chats/Chats";

import './Home.css'

const Home = () => {
    return (
        <div className='home_container'>
            <div className="home_wrapper">
                <Sidebar />
                <Chats />
            </div>
        </div>
    );
};

export default Home;
