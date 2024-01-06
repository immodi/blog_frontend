import { Link } from "react-router-dom";

function NavBar({authenticated, isAdmin, setCredentials}) {
    return (
        <nav className="navbar navbar-expand-lg navbar-light navbar-custom" id="mainNav">
            <div className="container px-4 px-lg-5">
                <Link to='/' className="navbar-brand">Home</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i className="fas fa-bars"></i>
                </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">
                    <ul className="navbar-nav ms-auto py-4 py-lg-0">
                        
                        <li className="nav-item">
                            <Link to='/posts' className="nav-link px-lg-3 py-3 py-lg-4 pointer">Posts</Link>
                        </li>
                        
                        <li className="nav-item">
                            <Link to='/about' className="nav-link px-lg-3 py-3 py-lg-4 pointer">About</Link>
                        </li>
                        
                        <li className="nav-item">
                            {
                            isAdmin
                            ?
                            <Link to='/make-post' className="nav-link px-lg-3 py-3 py-lg-4 pointer">Add Post</Link>
                            :
                            <></>
                            }
                        </li>
                        
                        <li className="nav-item">
                        {
                            !authenticated 
                            ?        
                            <Link to='/login' className="nav-link px-lg-3 py-3 py-lg-4 pointer">Login</Link>
                            :
                            <Link to='/' onClick={() => {
                                setCredentials({
                                    userName: null,
                                    password: null
                                })
                            }} className="nav-link px-lg-3 py-3 py-lg-4 pointer">Logout</Link>                        
                        }
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar