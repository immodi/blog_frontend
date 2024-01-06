import axios from "axios";
import Header from '../components/post/Header'
import Content from '../components/post/Content'
import Comment from "../components/post/Comment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


function Post({ url, setDisableNav, userName }) {
    let { id } = useParams(); 
    const URL = url + `post/${id}`;
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    const [showComments, setShowComments] = useState(true)
    const commentData = {
        postId: id,
        userName: userName
    } 

    setDisableNav(false);

    useEffect(() => {
        if (loading) {
            axios.get(URL).then((res) => {
                setData(res.data);
                setLoading(false)
                console.log(res.data);
            }).catch(err => {console.log(err.message)})
        }
    }, [loading]);
    
    return (
        !loading
        ?
        <>
            <Header header={data.title} author={data.author} date={data.created_on} />
            <Content post={[data.content]} />
            <Comment url={url}
                showComments={showComments} 
                setShowComments={setShowComments}
                data={data.comments}
                commentData={commentData}
                setLoading={setLoading}>
            </Comment>
        </>
        :
        <div>Loading...</div>
    )
}

export default Post