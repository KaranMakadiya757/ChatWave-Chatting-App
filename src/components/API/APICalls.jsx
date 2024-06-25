import axios from 'axios'
import CryptoJS from 'crypto-js';

/* -------------------------------- REGISTER NEW USER -------------------------------- */

export const Create_User = (registerdata) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/users.json`, { user: registerdata }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `ApiKey ${import.meta.env.VITE_API_KEY}`,
        }
    })
}

/* -------------------------------- USER LOGIN -------------------------------- */

export const Login_User = (logindata) => {
    const timestamp = Math.floor(Date.now() / 1000);
    const nonce = Math.random().toString(36).substring(2, 8);
    const sign = CryptoJS.enc.Hex.stringify(CryptoJS.HmacSHA1(`application_id=${import.meta.env.VITE_APP_ID}&auth_key=${import.meta.env.VITE_AUTH_KEY}&nonce=${nonce}&timestamp=${timestamp}&user[login]=${logindata.login}&user[password]=${logindata.password}`, import.meta.env.VITE_AUTH_SECRET));

    return axios.post(`${import.meta.env.VITE_API_URL}/session.json`,
        {
            application_id: import.meta.env.VITE_APP_ID,
            auth_key: import.meta.env.VITE_AUTH_KEY,
            timestamp: timestamp,
            nonce: nonce,
            signature: sign,
            user: logindata
        },
        { headers: { "Content-Type": "application/json" } }
    )
}

/* -------------------------------- FETCH SINGLE USER DATA -------------------------------- */

export const fetchuser = () => {
    return axios.get(`${import.meta.env.VITE_API_URL}/users/${sessionStorage.getItem('userid')}.json`,
        {
            headers: { Authorization: `ApiKey ${import.meta.env.VITE_API_KEY}` }
        })
};

/* -------------------------------- FETCH USER LIST -------------------------------- */

export const fetchuserlist = () => {
    return axios.get(`${import.meta.env.VITE_API_URL}/users.json?filter[]=number+id+ne+${sessionStorage.getItem('userid')}&order=asc+ string +login`,
        {
            params: { per_page: 100 },
            headers: { Authorization: `ApiKey ${import.meta.env.VITE_API_KEY}` }
        })
};

/* -------------------------------- CRETAE PERSONAL CHAT DIALOG -------------------------------- */

export const createchat = (id) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/chat/Dialog.json`,
        {
            type: 3,
            occupants_ids: id
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'QB-Token': sessionStorage.getItem('QBtoken')
            }
        })
};

/* -------------------------------- CRETAE GROUP CHAT DIALOG -------------------------------- */

export const creategrpchat = (name, ids) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/chat/Dialog.json`,
        {
            type: 2,
            name: name,
            occupants_ids: ids,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'QB-Token': sessionStorage.getItem('QBtoken')
            }
        })
};

/* -------------------------------- FETCH DIALOGLIST -------------------------------- */

export const fetchdialoglist = () => {
    return axios.get(`${import.meta.env.VITE_API_URL}/chat/Dialog.json`,
        {
            headers: {
                'QB-Token': sessionStorage.getItem('QBtoken')
            }
        })
};

/* -------------------------------- CREATE A MESSAGE -------------------------------- */

export const createmsg = (id, msg) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/chat/Message.json`,
        {
            chat_dialog_id: id,
            message: msg
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'QB-Token': sessionStorage.getItem('QBtoken')
            }
        })
};
/* -------------------------------- FETCH MESSAGELIST FOR A DIALOG -------------------------------- */

export const fetchmsglist = (id) => {
    return axios.get(`${import.meta.env.VITE_API_URL}/chat/Message.json?chat_dialog_id=${id}`,
        {
            headers: {
                'QB-Token': sessionStorage.getItem('QBtoken')
            }
        })
};

/* -------------------------------- DELETE CHAT DIALOG -------------------------------- */

export const deletechat = (id) => {
    return axios.delete(`https://api.quickblox.com/chat/Dialog/${id}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `ApiKey ${import.meta.env.VITE_API_KEY}`
        }
    })
};