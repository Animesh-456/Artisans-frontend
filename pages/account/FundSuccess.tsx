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
import Router from "next/router";

type Props = {};

const RedirectProject = () => {
    //const router = useRouter();
    //  router.push(localStorage.getItem('items'))
    //window.location.href = localStorage.getItem('items')
    Router.replace(`${localStorage.getItem('items')}`)
    console.log("funds success", localStorage.getItem('items'))

}
const jobs = () => {

    return (
        <>

            {/* <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)", marginTop: '2rem' }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Free up Funds for your Machinist</h1>

                        </div>
                    </div>
                </div>
            </div>

           

            <div className="container">
                <div className="col-sm-12 tydh3">
                    <p>
                        Thanks. Your Machinist will be paid immediately. Can you now leave a very short evaluation of the work carried out by your Machinist?
                    </p>

                    <div className="tydh1">
                        <Button style={{ backgroundColor: '#7fc0ac', border: 'none' }} onClick={RedirectProject} >Continue</Button>
                    </div>
                </div>
            </div> */}





            <section className="inner_banner_wp" style={{ backgroundImage: `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>Free Up Funds For Your Artist</h1>
                </div>
            </section>

            <section className="myproject">
                <div className="container">
                    <div className="row" style={{ justifyContent: "center" }}>
                        <div className="offset-sm-2"></div>
                        <div className="col-sm-8 profile_box">
                            <div className="payment_s">
                                <p>Thanks. Your Artist will be paid immediately. Can you now leave a very short evaluation of the work carried out by your Artist?</p>

                                <div className="submit_cancel">
                                    <a onClick={RedirectProject} style={{ cursor: "pointer", color: "#fff" }}>Continue</a>
                                    <a style={{ display: "none" }}></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>







        </>
    );
};

export default jobs;
