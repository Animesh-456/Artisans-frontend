import Link from "next/link";
import { CSSProperties } from 'react';

const contact = () => {



    return (
        <>


            <section className="inner_banner_wp" style={{ backgroundImage: "url(../img/inner-banner.jpg)" }}>
                <div className="container">
                    <h1>Contact Us</h1>
                </div>
            </section>

            <section className="our_story_wp">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contact_content">
                                <div className="heading_title">
                                    <h1>Need a hand? Or a high five? Here's how to reach us.</h1>
                                </div>
                                <p>
                                    <img src="../img/call-icon.png" alt="" /> <a href="tel:(+91) 89 815 15 666">+91 8981515666</a>
                                </p>
                                <p>
                                    <img src="../img/email-icon.png" alt="" /> <a href="mailto:Info@aartstudio.in">Info@aartstudio.in</a>
                                </p>
                                {/* <p>
                                    <img src="../img/location-icon.png" alt="" /> Kapten Japa West ST. 1190 DPS, Bali
                                </p> */}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <img src="../img/contact-img.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="discover_wp dya">
                <div className="container">
                    <div className="row">
                        <div className="heading_title latest_request_heading">
                            <h1>Submit a Help Request</h1>
                        </div>
                        <div className="describe_wp">
                            <form>
                                <div className="from_feild">
                                    <label>Are you a customer or a artist: <span>*</span></label>
                                    <div className="select_div">
                                        <select>
                                            <option>Select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="from_feild">
                                    <label>Your Name: <span>*</span></label>
                                    <input type="text" name="text" placeholder="Type here..." />
                                </div>
                                <div className="from_feild">
                                    <label>Your Email Address: <span>*</span></label>
                                    <input type="email" name="text" placeholder="Type here..." />
                                </div>
                                <div className="from_feild">
                                    <label>Phone Number: <span>*</span></label>
                                    <input type="tel" name="text" placeholder="Type here..." />
                                </div>
                                <div className="from_feild">
                                    <label>Subject: <span>*</span></label>
                                    <input type="text" name="text" placeholder="Type here..." />
                                </div>
                                <div className="from_feild">
                                    <label>Comment: <span>*</span></label>
                                    <textarea placeholder="Please enter the details of your request" rows={6} cols={50}></textarea>
                                </div>
                                <div className="from_feild">
                                    <label>Attachments: <span>*</span></label>
                                    <div className="upload-btn-wrapper">
                                        <button className="btn">Add file or drop file here <i className="fa fa-upload"></i></button>
                                        <input type="file" name="myfile" multiple />
                                    </div>
                                </div>
                                <div className="submit_cancel1">
                                    <a href="#">Submit Now</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

contact.ignorePath = true

export default contact;