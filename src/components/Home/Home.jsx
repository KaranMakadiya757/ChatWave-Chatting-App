import Sidebar from '../Side Panel/Sidebar'
import Chats from "../Chats/Chats";

import './Home.css'
import logo from '../../assets/Photos/logo2.png'

const Home = () => {
    return (
        <div className='home_container'>
            <div className='logo'>
                <img src={logo} />
                <h3>CHAT WAVE</h3>
            </div>
            <div className="home_wrapper">
                <Sidebar />
                <Chats />
            </div>
        </div>
    );
};

export default Home;
