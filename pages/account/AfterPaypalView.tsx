import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import Link from "next/link";
import React, { useEffect } from "react";
import { ProjectDetails } from "../../src/@types/type";
import api from "../../src/api/services/api";
import atom from "../../src/jotai/atom";
import Routes from "../../src/Routes";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import { BsCheckCircleFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { useRouter } from "next/router";
import Router from "next/router";
import toast from "react-hot-toast";
type Props = {};


const RedirectProject = () => {
    //const router = useRouter();
    //  router.push(localStorage.getItem('items'))
    //window.location.href = localStorage.getItem('items')
    Router.replace(localStorage.getItem('items'))

}




const Jobs = () => {

    const router = useRouter();

    const projectData = JSON.parse(localStorage.getItem('project_data'));
    console.log("proj data-->", projectData);

    const RedirectMsg = () => {
        //router.push(`/machining/msg/${projectData.id}/${projectData.programmer_id}/${projectData.creator_id}`)
        Router.replace(`/machining/msg/${projectData.id}/${projectData.programmer_id}/${projectData.creator_id}`)
    }

    return (<>

        {/* <div
            className='banner_wp sign_banner'
            style={{ backgroundImage: "url(/img/banner1.jpg)", marginTop: '3rem' }}>
            <div className='container'>
                <div className='row'>
                    <div className='banner_text inner_banner_text'>
                        <h1 className='yh'>Deposit funds</h1>

                    </div>
                </div>
            </div>
        </div>
     

        <div style={{ marginTop: '1rem' }} className="container">
            <div className="col-sm-12">
                <div className="deposit-fund">

                    <BsCheckCircleFill color='green' style={{ height: '50px', width: '110px' }} />
                    <p>We confirm that your payment has been made.<br />
                        Thank you for depositing the funds. We have sent you a confirmation email.<br />
                        Your Machinist will start working on your order.
                    </p>
                    <div className="tydh1">
                        <Button onClick={RedirectProject} variant="secondary">  Return to the project page</Button>
                        <Button style={{ backgroundColor: '#7fc0ac', border: 'none' }} onClick={RedirectMsg}> Send a message to your machinist </Button>
                    </div>
                </div>
            </div>
        </div> */}




        <section className="inner_banner_wp" style={{ backgroundImage: `url(../../img/inner-banner.jpg)` }}>
            <div className="container">
                <h1>Payment Success</h1>
            </div>
        </section>

        <section className="myproject">
            <div className="container">
                <div className="row" style={{ justifyContent: "center" }}>
                    <div className="offset-sm-2"></div>
                    <div className="col-sm-8 profile_box">
                        <div className="payment_s">
                            <img src={"../img/tick.png"} width="55px" alt="tick" />
                            <p>We confirm that your payment has been made.<br />
                                Thank you for depositing the funds. We have sent you a confirmation email.<br />
                                Your Machinist will start working on your order.</p>
                            <div className="submit_cancel">
                                <a style={{ cursor: "pointer", color: "#fff" }} onClick={RedirectMsg}>Send a Message to Your Artist</a>
                                <a style={{ cursor: "pointer" }} onClick={RedirectProject}>Return to Your Project <img src={"../img/arrow.png"} width="11px" alt="arrow" /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </>);
};

export default Jobs;
