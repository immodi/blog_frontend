import { useEffect, useState } from "react";
import axios from "axios";

let URL;

function useAuthentication(url, setMessagesObject, userName=null, password=null) {
    URL = url
    const [authenticated, setAuthenticated] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [token, setToken] = useState(null)
    const [messageOptions, setMessageOptions] = useState(null)
    const [credentials, setCredentials] = useState({
        userName: userName,
        password: password
    })

    useEffect(() => {
        requestToken(credentials, setAuthenticated, token, setToken, setMessageOptions, setIsAdmin)
    }, [credentials])

    useEffect(() => {
        if (messageOptions != null) {
            setMessagesObject(messageOptions)
        }
    }, [messageOptions])

    return [authenticated, isAdmin, token, credentials, setCredentials]
}

function requestToken(credentials, setAuthenticated, token, setToken, setMessageOptions, setIsAdmin) {
    if (credentials.userName != null) {
        let userName = credentials.userName
        let password = credentials.password
        axios.post(`${URL}token/`, {
            username: userName,
            password: password
        }).then(res => {
            // login successful
            setAuthenticated(true)
            setToken(res.data.token)
            isAdmin(userName, setIsAdmin, setMessageOptions)
        }).catch((e) => {
            // login failed
            setAuthenticated(false)
            setToken(null)
            sendMessage(setMessageOptions, 'error', e.message)
        })
    } else {
        if (token != null) {
            // looging out
            setAuthenticated(false)
            setToken(null)
            setIsAdmin(false)
            sendMessage(setMessageOptions, 'success', 'Logged Out :/')
        }
    }
}

async function isAdmin(userName, setIsAdmin, setMessageOptions) {
    try {
        let res = await axios.post(`${URL}user`, {username: userName}, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        setIsAdmin(res.data.isAdmin)
        sendMessage(setMessageOptions, 'success', `Welcome ${res.data.isAdmin ? 'Admin' : 'User'} '${userName}'`)
    } catch (err) {
        setIsAdmin(false)
        sendMessage(setMessageOptions, 'success', `Welcome User '${userName}'`)
    }
}

function sendMessage(setMessageOptions, status, message) {
    setMessageOptions({
        status: status,
        message: message
    })
}
export default useAuthentication