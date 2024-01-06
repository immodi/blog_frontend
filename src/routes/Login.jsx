import { Link } from "react-router-dom";
import "../style/forms.css"
import { useRef } from "react";

function Login({setDisableNav, setCredentials}) {
    setDisableNav(true)
    const homeLink = useRef(null)

    return (
        <div className="container-custom">
            <h1 className="display-3 display-3-custom">Login</h1>
            <form className="w-75 form-custom" onSubmit={(e) => handleFormSubmition(e, setCredentials, homeLink)}>
                <div className="form-group mt-4">
                    <label className="form-label-custom" htmlFor="exampleInputEmail1">Username</label>
                    <input type="text" name="userName" className="form-control" placeholder="Enter Username" required/>
                </div>
                <div className="form-group mt-4">
                    <label className="form-label-custom" htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" name="password" className="form-control" id="exampleInputPassword1" placeholder="Password" required/>
                </div>
                <button type="submit" className="btn btn-custom mt-4">
                    Login
                </button>
                <hr className="hr hr-blurry" style={{color: "white"}}/>
                <span className="h6 signup-button-custom">Don't have an account? <Link to="/signup"> Sign Up</Link></span>
                <Link to="/" className="d-none" ref={homeLink}></Link>
            </form>
            
        </div>
    )
}

function handleFormSubmition(e, setCredentials, homeLink) {
    e.preventDefault()
    let form = e.target
    let data =  new FormData(form)
    let userName = data.get("userName")
    let password = data.get("password")
    setCredentials({
        userName: userName,
        password: password
    })
    homeLink.current.click()
}

export default Login