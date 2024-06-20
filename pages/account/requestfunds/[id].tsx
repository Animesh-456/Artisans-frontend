import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import api from "../../../src/api/services/api";
import atom from "../../../src/jotai/atom";
import { useAtom, useAtomValue } from "jotai";
import Router from "next/router";
import { useRouter } from "next/router";


const Requestfunds = () => {
    const router = useRouter();
    //const user = useAtomValue(atom.storage.user);
    const data = useAtom(atom.project.api.detail);

    //const setmsgs2 = common.ChangeState(setfinal);

    const handlesubmit = () => {

        api.project.request_release_funds({ body: { project_id: router.query?.id }, params: {} }, (d) => {
            if (d.status == true) {
                Router.replace(`/machining/${data[0]?.project_name.split(" ").join("-")}-${data[0].id}`)
            }
        })


    }

    const handlecancel = () => {
        Router.push(`/machining/${data[0]?.project_name}-${data[0].id}`)
    }
    const steps_completed_supplier: any = useAtomValue(atom.project.api.steps_completed_supplier);


    useEffect(() => {
        let id = router.query?.id;
        const url = window.location.href
        const parts = url.split("/");
        const id2 = parts[parts.length - 1];
        api.project.detail({ params: { id: id2 } });

    }, []);
    return (
        <>
            {/* <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>REQUEST RELEASE OF FUNDS</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container cjw">
                <div className="row">
                    <div className="col-sm-8 offset-md-2">
                        <div className="fund_d1">
                            <h4>Please wait until the customer has received their order before requesting payment. Customers have 7 days from receipt of orders before
                                releasing funds so they may check the quality of the parts.
                                <br />
                                Once funds have been released, they will be available immediately in the "Withdraw Funds" menu of your account.</h4>

                            <br />
                            <div className="oksign2">
                                <Button className="oksign1" variant="secondary" onClick={handlecancel}>
                                    Cancel
                                </Button>
                                <Button className="oksign" variant="primary" onClick={handlesubmit}>
                                    Ask Client to release funds
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <section className="inner_banner_wp" style={{backgroundImage: `url(../../img/inner-banner.jpg)`}}>
                <div className="container">
                    <h1>Ask To Be Paid</h1>
                </div>
            </section>

            <section className="myproject">
                <div className="container">
                    <div className="row" style={{justifyContent:"center"}}>
                        <div className="offset-sm-2"></div>
                        <div className="col-sm-8 profile_box">
                            <div className="discover_wp ewer">
                                <p>Before asking your customer to pay you, wait until they have received their package. Usineur.fr customers can only pay their Machinist after having been able to control the quality of the parts. they have 7 days to do this upon receipt.
                                    You will be paid immediately once the funds have been released by your client. The Funds will be visible on the “Withdraw Funds” page in the “My Account” menu</p>
                                <hr />
                                <form>
                                    <div className="submit_cancel">
                                        <a style={{cursor:"pointer", color:"#fff" }} onClick={handlesubmit}>Request to Release Funds</a>
                                        <a style={{cursor:"pointer"}} onClick={handlecancel}>Cancel <img src={"../../img/arrow.png"} width="11px" alt=""/></a>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




        </>
    )
}

export default Requestfunds;