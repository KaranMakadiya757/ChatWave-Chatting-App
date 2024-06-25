import Chatlist from './Chatlist';
import Navbar from "./Navbar";
import './Sidebar.css'

const Sidebar = () => {

    return (
        <div className='sidebar'>
            <Navbar />
            <Chatlist />
        </div>
    )
}

export default Sidebar
