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

            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Free up Funds for your Machinist</h1>

                        </div>
                    </div>
                </div>
            </div>

            {/* <div style={{ width: '100%', background: '#365d9c', height: '80px', paddingTop: '20px', paddingLeft: '40px', paddingBottom: '20px' }}>
                <h3 style={{ color: 'whitesmoke', marginBottom: '10px' }}>Free up Funds for your Machinist</h3>
            </div> */}

            <div className="container">
                <div className="col-sm-12 tydh3">
                    <p>
                        Thanks. Your Machinist will be paid immediately. Can you now leave a very short evaluation of the work carried out by your Machinist?
                    </p>

                    <div className="tydh1">
                        <Button  onClick={RedirectProject} >Continue</Button>
                    </div>
                </div>
            </div>







        </>
    );
};

export default jobs;
