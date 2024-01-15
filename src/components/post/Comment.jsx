import axios from "axios";
import { useState } from "react";

export default function Comment({ url, showComments, setShowComments, data, commentData, setLoading }) {
    const [content, setContent] = useState(null)
    url = url + 'comment'

    return (
        <section style={{backgroundColor: '#ffffff'}}>
            <div className="container my-5 py-5 text-dark">
                <div className="row d-flex justify-content-center">
                <div className="col-md-12 col-lg-10 col-xl-8">
                    <h5 className="text-dark mb-0">Write a Comment</h5>
                    <div className="card-footer py-3 border-0" style={{backgroundColor: '#fff'}} >
                        <div className="d-flex flex-start w-100">
                        {/* <img className="rounded-circle shadow-1-strong me-3"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp" alt="avatar" width="40"
                            height="40" /> */}
                        <div className="form-outline w-100">
                            <textarea className="form-control" onChange={(e) => setContent(e.target.value)} id="textAreaExample" rows="3" style={{background: '#fff', resize: 'none'}}>
                            </textarea>
                        </div>
                        </div>
                        <div className="float-end mt-2 pt-1 h6">
                            <button type="button" onClick={(e) => {
                                e.currentTarget.disabled = true
                                makeComment(url, commentData, content, setLoading)
                            }} className="btn btn-primary btn-sm">Post comment</button>
                        </div>
                    </div>

                    <br />
                    <br />
                    <br />

                    <div className="d-flex justify-content-between align-items-center mb-4">
                    <h4 className="text-dark mb-0">Comments</h4>
                    <div className="card">
                        <div className="card-body p-2 d-flex align-items-center">
                        <h6 className="text-primary fw-bold small mb-0 me-1">Comments "ON"</h6>
                        <div className="form-check form-switch">
                            <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onClick={() => setShowComments(!showComments)} defaultChecked />
                            <label className="form-check-label" htmlFor="flexSwitchCheckChecked"></label>
                        </div>
                        </div>
                    </div>
                    </div>
                    {
                        showComments
                        ?
                        data.map(comment => {
                            return (
                                <div key={comment.id} className="card mb-3">
                                    <div className="card-body">
                                        <div className="d-flex flex-start">
                                        {/* <img className="rounded-circle shadow-1-strong me-3"
                                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(26).webp" alt="avatar" width="40"
                                            height="40"
                                        /> */}
                                        <div className="w-100">
                                            <div className="d-flex justify-content-between align-items-center mb-3">
                                            <h6 className="text-primary fw-bold mb-0">
                                                {comment.name}
                                                <span className="text-dark ms-2">{comment.content}</span>
                                            </h6>
                                            <p className="mb-0">{comment.created_on}</p>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-center">
                                            {/* <p className="small mb-0" style={{color: '#aaa'}}>
                                                <a href="#!" className="link-grey">Remove</a> •
                                                <a href="#!" className="link-grey">Reply</a> •
                                                <a href="#!" className="link-grey">Translate</a>
                                            </p> */}
                                            {/* <div className="d-flex flex-row">
                                                <i className="fas fa-star text-warning me-2"></i>
                                                <i className="far fa-check-circle" style={{color: '#aaa'}}></i>
                                            </div> */}
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                </div>    
                            )
                        })
                        :
                        <></>    
                    }   
                </div>
              </div>
            </div>
        </section>
    )
}


function makeComment(url, commentData, content, setLoading) {
    if (content != null && content != "") {
        axios.post(url, {
            name: commentData.userName !== null ? commentData.userName : "Anonymous",
            content: content,
            post_id: commentData.postId 
        },{
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }}).then(res => {
            setLoading(true)
            console.log(res.data);
        })
    }
}