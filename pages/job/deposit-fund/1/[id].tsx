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
                setOrderId(res.data.id.order_id)
                return res.data.id.payment_session_id
            }


        } catch (error) {
            console.log(error)
        }
    }


    const createOrder = async () => {


        try {

            let sessionId = await getSessionId()
            let checkoutOptions = {
                paymentSessionId: sessionId,
                redirectTarget: "_modal",
            }

            cashfree.checkout(checkoutOptions).then(async (res) => {
                console.log("payment initialized")
                await verifyPayment(orderId)

            })


        } catch (error) {
            console.log(error)
        }




    };




    const verifyPayment = async (orderId) => {
        try {

            let result: any = await api.project.addpayment({ params: {}, body: { orderId: orderId } });
            console.log("result after verification", result)
            return

            // if (result.data) {
            //     toast.success("Verified")
            // }
        } catch (error) {
            alert("error occured!")
        }
        toast.success("Verified")
    }





    return (
        <>

            <div
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
                                                £
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

            </div>

        </>
    );
};

export default DepositFund1;
