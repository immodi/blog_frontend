import { useEffect, useRef, useState } from "react";
import ErrorPage from "./ErrorPage";
import ReactQuill from 'react-quill/dist/react-quill.js';
import 'react-quill/dist/quill.snow.css';
import '../style/make-post.css'
import axios from "axios";
import { Link } from "react-router-dom";

export default function MakePost({ isAdmin, setDisableNav, userName, url, token}) {
    let URL = url + 'post/create'
    const homeRef = useRef(null)
    const [postId, setPostId] = useState(null)
    const [content, setContent] = useState("Default Text!")
    const [data, setData] = useState({
        title: null,
        author: userName
    })
    
    useEffect(() => {
        if (postId != null) {
            homeRef.current.click()
        }
    }, [postId])

    if (!isAdmin) setDisableNav(true)
    
    return (
        isAdmin
        ?
        <form action="post" className="w-100 mt-5 mb-3 d-flex justify-content-center flex-column">
            <div className="input-group mb-3" style={{
                placeSelf: 'center',
                width: '60%',
            }}>
                <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroup-sizing-lg">Title</span>
                </div>
                <input type="text" onChange={(e) => setData({...data, title: e.target.value})} className="form-control" aria-label="Default" />
            </div>
            <div className="d-flex justify-content-center" style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '98dvw',
                marginBottom: '5rem'
            }}>
                <ReactQuill
                    theme='snow'
                    value={content}
                    onChange={setContent}
                    style={{
                        width: '90%',
                        height: '60dvh',
                    }}
                />
            </div>
            <button type="button" onClick={() => {submitPost(data, URL, content, token, setPostId)}} class="btn mt-0 mb-0 btn-secondary make-post-button">Post</button>
            <Link to={`/post/${postId}`} className="d-none" ref={homeRef}></Link>
        </form>
        :
        <ErrorPage setDisableNav={setDisableNav} />
    );
}


function submitPost(data, url, content, token, setPostId) {
    axios.post(url, {
        title: data.title,
        content: content,
        author: data.author
    }, {
        headers: {
            'Authorization': `Token ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        setPostId(res.data.id)
    }).catch(err => console.log(err.message))

}
