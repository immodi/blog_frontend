import Header from '../components/home/Header'
import Content from '../components/home/Content'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Home({ setDisableNav, url }) {
    const [data, setData] = useState([])
    url = url + "posts/home"
    setDisableNav(false)
    useEffect(() => {
        getHomePosts(url, setData)
    }, [])

    return (
        <>
            <Header headerText={"Blog"} headerSubText={"A Blog About Anything and Everyting"}/> 
            <Content data={data}/>
        </>
    )
}

function getHomePosts(url, setData) {
    axios.get(url).then(res => {
        setData(res.data.reverse())
    }).catch(e => {
        console.log(e.message);
    })
}

export default Home