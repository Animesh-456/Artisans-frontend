import Link from "next/link";
import { CSSProperties } from 'react';
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";

const contact = () => {



    return (
        <>


            <section className="inner_banner_wp" style={{ backgroundImage: "url(../img/inner-banner.jpg)" }}>
                <div className="container">
                    <h1>My Art work</h1>
                </div>
            </section>



            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <AccountSideBar />
                        </div>
                        <div className="col-sm-8">
                            <div className="profile_box">
                                <div className="manage_p">
                                    <h4>Manage portfolio design</h4>
                                    <p>Add Art workto your portfolio! Uploading artwork to Artstudio as a portfolio involves showcasing your work in an organized and visually appealing manner.</p>
                                    <a href="#" className="tgs">Go to your portfolio <img src="../img/arrow.png" alt="" /></a>
                                    <a href="#" className="tgs1">Add Artwork</a>
                                    <form>
                                        <div className="from_feild">
                                            <label>Title: <span>*</span></label>
                                            <input type="text" name="text" placeholder="Email or Username" />
                                        </div>
                                        <div className="from_feild">
                                            <label>Description: <span>*</span></label>
                                            <input type="text" name="text" placeholder="Type here" />
                                        </div>
                                        <div className="from_feild">
                                            <select>
                                                <option>Select Category</option>
                                                <option>1</option>
                                                <option>2</option>
                                                <option>3</option>
                                            </select>
                                        </div>
                                        <div className="from_feild">
                                            <label>Upload image/video: <span>*</span></label>
                                            <div className="upload-btn-wrapper">
                                                <button className="btn">Upload <i className="fa fa-upload"></i></button>
                                                <input type="file" name="myfile" multiple />
                                            </div>
                                            <small>Video size limit 50MB</small>
                                        </div>
                                        <div className="submit_cancel">
                                            <a href="#">Add Artwork</a>
                                            <a href="#">Cancel <img src="../img/arrow.png" width="11px" alt="" /></a>
                                        </div>
                                    </form>
                                    <hr />
                                    <div className="manage_p1">
                                        <div className="manage_p2">
                                            <p>Wall Pinting</p>
                                            <img src="../img/pic15.jpg" alt="" />
                                            <i className="fa fa-times-circle"></i>
                                        </div>
                                        <div className="manage_p2">
                                            <p>Wall Pinting</p>
                                            <img src="../img/pic16.jpg" alt="" />
                                            <i className="fa fa-times-circle"></i>
                                        </div>
                                        <div className="manage_p2">
                                            <p>Wall Pinting</p>
                                            <img src="../img/pic17.jpg" alt="" />
                                            <i className="fa fa-times-circle"></i>
                                        </div>
                                        <div className="manage_p2">
                                            <p>Wall Pinting</p>
                                            <img src="../img/pic18.jpg" alt="" />
                                            <i className="fa fa-times-circle"></i>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

contact.ignorePath = true

export default contact;