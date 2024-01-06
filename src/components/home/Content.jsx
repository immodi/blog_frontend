import { Link } from "react-router-dom";


function Content({data}) {
    return (
        <div className="container px-4 px-lg-5">
            <div className="row gx-4 gx-lg-5 justify-content-center">
                <div className="col-md-10 col-lg-8 col-xl-7">
                    {data.map(post => {
                    return (
                        <>
                            <div key={post.id} className="post-preview">
                                <Link to={`/post/${post.id}`} >
                                    <h2 className="post-title">{post.title}</h2>
                                </Link>
                                <p className="post-meta">
                                    Posted by <a href="#!">{post.author}</a> on {post.date}
                                </p>
                            </div>
                            <hr className="my-4" />
                        </>
                    )
                    })}
                    {/* <div className="d-flex justify-content-end mb-4"><a className="btn btn-primary text-uppercase" href="#!">Older Posts →</a></div> */}
                </div>
            </div>
        </div>
    )
}
export default Content