import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import api from "../../../src/api/services/api";
import atom from "../../../src/jotai/atom";
import { useAtom, useAtomValue } from "jotai";
import Router from "next/router";
import { useRouter } from "next/router";


const requestfunds = () => {
    const router = useRouter();
    //const user = useAtomValue(atom.storage.user);
    const data = useAtom(atom.project.api.detail);

    //const setmsgs2 = common.ChangeState(setfinal);

    const handlesubmit = () =>{
	 
    api.project.request_release_funds({ body: { project_id: router.query?.id }, params:{} }, (d)=>{
        if(d.status == true){
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
            <div
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
                            <h4>Please wait until the customer has received their order before requesting payment. Machining-4u customers have 7 days from receipt of orders before
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
            </div>




        </>
    )
}

export default requestfunds;