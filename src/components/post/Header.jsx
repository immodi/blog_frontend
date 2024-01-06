function Header({header, author, date}) {
    return (
        <header className="masthead">
            <div className="container position-relative px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        <div className="post-heading">
                            <h1>{header}</h1>
                            <span className="meta">
                                Posted by
                                {" "}
                                <a href="#!">{author}</a>
                                {" "}
                                on {date}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header