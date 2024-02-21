








const ProjectDetail = () => {
    //console.log("prp is----", prp)


    return (
        <>
            <div className="container">
                <div className="proj_d1"><h1>Project description</h1></div>
                <div className="row project_des">
                    <div className="col-sm-3">
                        <div className="proj_i">
                            <img src="/img/pic5.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="proj_d">
                            <p><span>Posted: </span>4-Oct,2023</p>
                            <p><span>Visibility: </span>Audience</p>
                            <p><span>Remaining time: </span>3d 16h</p>
                            <p><span>Posted by: </span>purchase</p>
                            <p><span>Offers received: </span> 0 Offer</p>
                            <p><span>Attachments: </span>chapeverinpoussoir1.pdf</p>
                        </div>
                    </div>
                </div>
                <div className="project_des1">
                    <div className="proj_d1"><h1>description</h1></div>
                    <p>Hello,Price request with urgent deadline.The quantities and material are indicated on the plans.3D files will be given to order.</p>
                    ____________________
                    <br />
                    <p>added on 06/09/2023  07:15</p><br />
                    <p>Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type ...</p><br />
                    <p>Line1</p><br />
                    <p>Line 2</p><br />
                    <button>Add a comment or files</button>
                </div>
                <div className="project_des1">
                    <div className="proj_d1"><h1>Offer (1)</h1></div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="tgh">
                                <figure>
                                    <img src="/img/work-icon3.png" alt="" />
                                </figure>
                                <div>
                                    <h2>debraj41</h2>
                                    <p>1 jobs <i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star"></i><i className="fa fa-star-o"></i> <span>4.0</span></p>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="tgh1">
                                <p>08-09-2023 11:10:15</p>
                            </div>
                        </div>
                    </div>
                    <div className="row tgh4">
                        <div className="col-sm-8">
                            <div className="tgh2">
                                <h5>i can do</h5>
                                <h5>Line 3</h5>
                                <h5>Line 4</h5><br />
                                <button>Send message to the machinist</button>
                                <p>Attachments: chapeverinpoussoir1.jpg</p>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="tgh3">
                                <h6>$30</h6>
                                <p>Shipping fee Included</p>
                                <p>Shipping time: 10 Days</p><br />
                                <button>Select</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
ProjectDetail.ignorePath = true;

export default ProjectDetail;