import { Link } from "react-router-dom";
import "../style/forms.css"
import axios from "axios";
import { useRef, useState } from "react";

function SignUp({url, setDisableNav, setCredentials}) {
    url = url + "user/register"
    const [data, setData] = useState({
        userName: null,
        email: null,
        password: null,
        isStaff: null
    })
    const homeRef = useRef(null)
    setDisableNav(true)
    
    return (
        <div className="container-custom">
            <h1 className="display-3 display-3-custom">Sign Up</h1>
            <form className="w-75 form-custom">
                <div className="form-group mt-4">
                    <label className="form-label-custom" htmlFor="exampleInputEmail1">Username</label>
                    <input type="text" onChange={(e) => {
                        setData({...data, userName: e.target.value})
                    }} className="form-control" placeholder="Enter Username" />
                </div>
                <div className="form-group mt-4">
                    <label className="form-label-custom" htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" onChange={(e) => {
                        setData({...data, email: e.target.value})
                    }} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div className="form-group mt-4">
                    <label className="form-label-custom" htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"  onChange={(e) => {
                        setData({...data, password: e.target.value})
                    }} className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>

                <div className="form-group mt-4">
                    <label className="form-label-custom" style={{marginRight: '1rem'}}>Account Type</label> {" "}
                    <div className="btn-group mr-5" role="group" aria-label="Basic radio toggle button group">
                        <input type="radio" className="btn-check btn-outline-primary" onChange={() => {
                            setData({...data, isStaff: false})
                        }} name="btnradio" id="btnradio1" autoComplete="off" />
                        <label className="btn btn-outline-dark btn-label-custom" htmlFor="btnradio1">Viewer</label>

                        <input type="radio" className="btn-check btn-outline-primary" onChange={() => {
                            setData({...data, isStaff: true})
                        }} name="btnradio" id="btnradio2" autoComplete="off" />
                        <label className="btn btn-outline-dark btn-label-custom" htmlFor="btnradio2">Writer</label>
                    </div>
                </div>
                <button type="submit" onClick={(e) => registerUser(e, url, data, setCredentials, homeRef.current)} className="btn btn-custom mt-4">Sign Up</button>
                <hr className="hr hr-blurry" style={{color: "white"}}/>
                <span className="h6 signup-button-custom">Already have an account? <Link to="/login"> Login</Link></span>
                <Link to='/' className="d-none" ref={homeRef}></Link>
            </form>
        </div>
    )
}

function registerUser(e, url, data, setCredentials, homeRef) {
    e.preventDefault()
    axios.post(url, {
        username: data.userName,
        email: data.email,
        password: data.password,
        is_staff: data.isStaff,
    }, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(res => {
        setCredentials({
            userName: data.userName,
            password: data.password,
        })
        homeRef.click()
    }).catch(err => console.log(err.message))
}

export default SignUp