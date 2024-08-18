import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ProjectDetails } from "../../../../src/@types/type";
import api from "../../../../src/api/services/api";
import atom from "../../../../src/jotai/atom";
import Router from "next/router";



import { loadStripe } from '@stripe/stripe-js';

import StripeCheckout from 'react-stripe-checkout';

import toast from "react-hot-toast";
import env from "../../../../src/config/api"
import {
    CreateOrderActions,
    CreateOrderData,
    loadScript,
    OnApproveActions,
    OnApproveData,
} from "@paypal/paypal-js";
import {
    PayPalButtons,
    PayPalScriptProvider,
    usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { Button } from "react-bootstrap";


import { load } from '@cashfreepayments/cashfree-js'

type Props = {};

const Paypalprovider = () => {


    const [{ isPending, options, isInitial, isRejected, isResolved }] =
        usePayPalScriptReducer();

    useEffect(() => { }, [isPending]);

    return <></>;
};

const DepositFund1 = (props: Props) => {

    let cashfree;

    let insitialzeSDK = async function () {

        cashfree = await load({
            mode: "sandbox",
        })
    }

    insitialzeSDK()


    const router = useRouter();

    const [data, setData] = useAtom<ProjectDetails>(atom.project.api.detail);

    const [initiated, setInitiated] = useState(false);

    const elemref = useRef(null);

    const [orderId, setOrderId] = useState("")


    const [success, setSuccess] = useState(false);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!router.isReady) return;

        let id = router.query?.id;

        if (!id) {
            router.push("/");
        }

        api.project.detail({ params: { id: id } }, () => {
            setLoaded(true);
        });
    }, [router.isReady]);


    const getSessionId = async () => {
        try {
            let res = await api.wallet.create_order({ params: {}, body: { id: data?.id } });


            if (res.data.id && res.data.id.payment_session_id) {

                console.log(res.data.id)
                await setOrderId(res.data.id.order_id)

                return { sessionId: res.data.id.payment_session_id, orderId: res.data.id.order_id }
            }


        } catch (error) {
            console.log(error)
        }
    }


    const createOrder = async () => {


        try {

            localStorage.setItem('items', (`/${data?.project_name?.split(" ").join("-")}-${data?.id}`));

            let sessionId = await getSessionId()
            let checkoutOptions = {
                paymentSessionId: sessionId.sessionId,
                redirectTarget: "_self",
            }

            // cashfree.checkout(checkoutOptions).then(async (res) => {
            //     console.log("payment initialized", res)
            //     await verifyPayment(sessionId.orderId)

            // })

            cashfree.checkout(checkoutOptions).then((data) => {
                console.log("After payment data", data)
            }).catch((error) => {
                console.log("After payment error", error)
            })


        } catch (error) {
            console.log(error)
        }

    };




    const verifyPayment = async (orderId) => {
        try {

            // let result: any = await api.project.addpayment({ params: {}, body: { project_id: router.query?.id, order_id: orderId } });
            // console.log("result after verification", result)
            // return
            await api.project.afterCashfree({ params: {}, body: { project_id: router.query.id, order_id: orderId } }, (d) => {
                let project = d?.data?.project;
                localStorage.setItem('ProjectData', JSON.stringify(project))
                localStorage.setItem('TableShow', '1')

                localStorage.setItem('items', (`/${project?.project_name?.split(" ").join("-")}-${project?.id}`));

                Router.replace(`/account/AfterPaypalView`)
            })

        } catch (error) {
            alert("error occured!")
        }
        toast.success("Verified")
    }









    return (
        <>

            {/* <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Project Description</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container cjw'>
                <div className='row'>
                    <div className='col-sm-8 offset-md-2'>
                        <div className='fund_d1'>
                            <h5>
                                The funds will be transferred to your machinist only after you
                                have received your custom parts and approved the quality of
                                the work
                            </h5>
                            <div className='table-responsive'>
                                <table className='table table-bordered table-sm'>
                                    <thead>
                                        <tr className='table-primary'>
                                            <td>Machinist</td>
                                            <td>Project Name</td>
                                            <td>Shipping Date</td>
                                            <td>Client</td>
                                            <td>Price</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{data?.programmer?.user_name}</td>
                                            <td>{data?.project_name}</td>
                                            <td>
                                                {
                                                    data?.bids?.find(
                                                        (f) => f?.user_id == data?.programmer_id,
                                                    )?.bid_days
                                                }{" "}
                                                Days
                                            </td>
                                            <td>{data?.creator?.user_name}</td>
                                            <td>
                                                ₹
                                                {
                                                    data?.bids?.find(
                                                        (f) => f?.user_id == data?.programmer_id,
                                                    )?.bid_amount_gbp
                                                }
                                                (Shipping fee included)
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <br />
                            <div id='paypal-button-container' ref={elemref}>

                                <Button onClick={createOrder}>Create Order</Button>
                            </div>
                            <h5>

                            </h5>
                            <div className='progress'>
                                <div
                                    className='progress-bar bg-success progress-bar-striped progress-bar-animated'
                                    style={{ width: "100%" }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

            </div> */}




            <section className="inner_banner_wp" style={{ backgroundImage: `url(../../../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>Deposit Funds</h1>
                </div>
            </section>

            <section className="myproject">
                <div className="container">
                    <div className="row" style={{ justifyContent: "center" }}>
                        <div className="offset-sm-2"></div>
                        <div className="col-sm-8 profile_box">
                            <div className="fund_d1">
                                <p>The funds will be transferred to your artist only afteryou have recevied your custom parts and approved the quality of the work</p>
                                <div className="table-responsive">
                                    <table className="table table-bordered table-sm">
                                        <thead>
                                            <tr className="table-primary">
                                                <th>Machinist</th>
                                                <th>Project Name</th>
                                                <th>Shipping Date</th>
                                                <th>Client</th>
                                                <th>Price</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{data?.programmer?.user_name}</td>
                                                <td>{data?.project_name}</td>
                                                <td>{
                                                    data?.bids?.find(
                                                        (f) => f?.user_id == data?.programmer_id,
                                                    )?.bid_days
                                                }{" "}
                                                    Days</td>
                                                <td>{data?.creator?.user_name}</td>
                                                <td> ₹
                                                    {
                                                        data?.bids?.find(
                                                            (f) => f?.user_id == data?.programmer_id,
                                                        )?.bid_amount_gbp
                                                    }
                                                    (Shipping fee included)</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <p>
                                    {/* <b>Please wait while you are redirected to Paypal.....</b> */}
                                    <Button onClick={createOrder}>Pay ₹ {
                                        data?.bids?.find(
                                            (f) => f?.user_id == data?.programmer_id,
                                        )?.bid_amount_gbp
                                    }</Button>
                                </p>
                                {/* <div className="progress">
                                    <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" style={{ width: "100%" }}></div>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    );
};

export default DepositFund1;
