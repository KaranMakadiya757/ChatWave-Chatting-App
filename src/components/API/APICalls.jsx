import axios from 'axios'
import CryptoJS from 'crypto-js';

export const Create_User = (registerdata) => {
    return axios.post(`${import.meta.env.VITE_API_URL}/users.json`, { user: registerdata }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `ApiKey ${import.meta.env.VITE_API_KEY}`,
        }
    })
}

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