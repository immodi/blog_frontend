import axios from "axios";
import { useEffect, useState } from "react";
import Header from '../components/home/Header'
import Content from '../components/home/Content'



const url = "http://127.0.0.1:8000/posts"

function Posts({setDisableNav}) {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState({})
    setDisableNav(false);

    useEffect(() => {
        axios.get(url).then((res) => {
            setData(res.data);
            setLoading(false)
        });
    }, [loading]);
    
    return (
        !loading
        ?
        <>
            <Header headerText={"All Posts"} headerSubText={""}></Header>
            <Content data={data}></Content>
        </>
        :
        <>
            <Header headerText={"All Posts"} headerSubText={""}></Header>
            <Content data={["Loading...", ]}></Content>
        </>
        
    )
}

export default Posts