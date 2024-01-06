import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import NavBar from './components/common/NavBar'
import Footer from './components/common/Footer'
import Script from './components/common/Script.jsx'
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import MakePost from './routes/MakePost.jsx'
import ErrorPage from './routes/ErrorPage.jsx' 
import Home from './routes/Home.jsx';
import About from './routes/About.jsx';
import Post from './routes/Post.jsx'
import Posts from './routes/Posts.jsx';
import SignUp from './routes/SignUp.jsx';
import Login from './routes/Login.jsx';
import useAuthentication from './hooks/useAuthentication.js';
import { PrimeReactProvider } from 'primereact/api';
import { Messages } from 'primereact/messages';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import useMessage from './hooks/useMessage.js';

function App() {
    const url = "http://127.0.0.1:8000/"
    const [disableNav, setDisableNav] = useState(false)
    const [mes, messagesObject, setMessagesObject] = useMessage()
    const [authenticated, isAdmin, token, credentials, setCredentials] = useAuthentication(url, setMessagesObject)
    
    return (
        <BrowserRouter>
            <PrimeReactProvider>
                {!disableNav ? <NavBar authenticated={authenticated} isAdmin={isAdmin} setCredentials={setCredentials}/> : <></>} 
                <Script />
                <div className='messages-container'>
                    <Messages ref={mes} className="messages-custom"/>
                </div>
                <Routes>
                    <Route path='/' element={<Home setDisableNav={setDisableNav} url={url} />} />
                    <Route path='post/:id' element={<Post url={url} setDisableNav={setDisableNav} userName={credentials.userName} />} />
                    <Route path='posts' element={<Posts setDisableNav={setDisableNav} />} />
                    <Route path='make-post' element={<MakePost 
                        isAdmin={isAdmin}
                        setDisableNav={setDisableNav}
                        userName={credentials.userName}
                        url={url}
                        token={token}    
                    /> } />
                    <Route path='about' element={<About setDisableNav={setDisableNav}/>} />
                    <Route path="login" element={<Login setCredentials={setCredentials} setDisableNav={setDisableNav} />} />
                    <Route path="signup" element={<SignUp url={url} setDisableNav={setDisableNav} setCredentials={setCredentials}/>} />
                    <Route path="*" element={<ErrorPage setDisableNav={setDisableNav} />} />
                </Routes>
                {!disableNav ? <Footer /> : <></>} 
            </PrimeReactProvider>
        </BrowserRouter>
    )
}

export default App