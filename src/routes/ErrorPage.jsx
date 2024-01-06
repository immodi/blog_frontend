import { Link } from "react-router-dom";
import "../style/forms.css"


export default function ErrorPage({setDisableNav}) {
    setDisableNav(true)

    return (
        <div className="d-flex align-items-center justify-content-center container-custom" style={{backgroundColor: "#3D414B"}}>
            <div className="text-center">
                <h1 className="display-1 fw-bold">404</h1>
                <p className="fs-3"> <span className="text-danger">Opps!</span> Page not found.</p>
                <p className="lead">
                    The page you’re looking for doesn’t exist.
                </p>
                <Link to={'/'} className="btn btn-custom">
                    Go Home
                </Link>
            </div>
        </div>
    );
}