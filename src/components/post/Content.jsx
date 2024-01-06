import parse from 'html-react-parser';

function Content({post}) {
    return (
        <article className="mb-4">
            <div className="container px-4 px-lg-5">
                <div className="row gx-4 gx-lg-5 justify-content-center">
                    <div className="col-md-10 col-lg-8 col-xl-7">
                        {
                            post.map((text, index) => {
                                return <div key={index}>{parse(text)}</div>
                            })
                        }
                    </div>
                </div>
            </div>
        </article>
    )
}

export default Content