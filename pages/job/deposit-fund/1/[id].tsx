import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { ProjectDetails } from "../../../../src/@types/type";
import api from "../../../../src/api/services/api";
import atom from "../../../../src/jotai/atom";
import Router from "next/router";

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

type Props = {};

const Paypalprovider = () => {
    const [{ isPending, options, isInitial, isRejected, isResolved }] =
        usePayPalScriptReducer();

    useEffect(() => { }, [isPending]);

    return <></>;
};

const DepositFund1 = (props: Props) => {
    const router = useRouter();

    const [data, setData] = useAtom<ProjectDetails>(atom.project.api.detail);

    const [initiated, setInitiated] = useState(false);

    const elemref = useRef(null);

    const [order_id, setOrderId] = useState(null);

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

    useEffect(() => {
        if (!loaded) return;
        // loadScript({
        // 	"client-id":
        // 		"AdttYSVnm8UEVFoLjLFNdUXxpAX8DOZxpXU4QvU50_1X6lTy0lvfO99-dG921aPbbIaVddVZtLs7dcbG",
        // })
        // 	.then((paypal) => {
        // 		console.log(paypal);

        // 		paypal
        // 			.Buttons({
        // 				createOrder: createOrder,
        // 				onApprove: onApprove,
        // 				onError: onError,

        // 				style: {
        // 					layout: "vertical",
        // 					color: "gold",
        // 					shape: "rect",
        // 					label: "paypal",
        // 				},

        // 				onClick: (data, actions) => {
        // 					console.log(data, actions);
        // 				},
        // 			})
        // 			.render("#paypal-button-container")
        // 			.then((d) => {
        // 				setInitiated(true);
        // 				// var iframes: any =
        // 				// 	document.getElementsByClassName("component-frame");
        // 				// console.log(
        // 				// 	"🚀 ~ file: [id].tsx ~ line 21 ~ useEffect ~ iframe",
        // 				// 	iframes?.length,
        // 				// );
        // 				// if (iframes && iframes?.length) {
        // 				// 	let iframe = iframes[0];
        // 				// 	console.log(
        // 				// 		"🚀 ~ file: [id].tsx ~ line 26 ~ Array.from ~ e",
        // 				// 		iframe,
        // 				// 	);

        // 				// 	// The second argument to postMessage() can be '*' to indicate no preference about the origin of the destination. A target origin should always be provided when possible, to avoid disclosing the data you send to any other site.

        // 				// 	var elmnt =
        // 				// 		iframe?.contentWindow?.document?.getElementsByClassName(
        // 				// 			"paypal-button",
        // 				// 		);

        // 				// 	if (elmnt) {
        // 				// 		console.log(elmnt);
        // 				// 	}
        // 				// }
        // 			});

        // 		// start to use the PayPal JS SDK script
        // 	})
        // 	.catch((err) => {
        // 		console.error("failed to load the PayPal JS SDK script", err);
        // 	});
    }, [loaded]);

    const createOrder = async (dat: CreateOrderData, actions: CreateOrderActions) => {


        try {
            let d = await api.wallet.create_order({ params: {}, body: { id: data?.id } });
            console.log(d);
                return d?.data?.id;
        } catch (err) {
            return err;
        }
    };

    const onApprove = async (_data: OnApproveData, actions: OnApproveActions) => {
        // return actions.order.capture().then((details) => {
        //     const { payer } = details;
        //     try {









        //         api.project.addpayment(
        //             {
        //                 body: {
        //                     project_id: router?.query?.id,
        //                     amount: details.purchase_units[0].amount.value,
        //                 },
        //             },
        //             (d) => {

        //                 let project = d?.data?.project;
        //                 //			console.log("datas------",project)
        //                 localStorage.setItem('ProjectData', JSON.stringify(project))
        //                 localStorage.setItem('TableShow', '1')
        //                 // console.log("data1---",JSON.parse(localStorage.getItem('ProjectData')))

        //                 localStorage.setItem('items', (`/machining/${project?.project_name?.split(" ").join("-")}-${project?.id}`));
        //                 // router.replace(
        //                 // 	`/machining/${project?.project_name?.split(" ").join("-")}-${
        //                 // 		project?.id
        //                 // 	}`,
        //                 // );
        //                 // window.location.href = 'http://35.179.7.135/account/AfterPaypalView'
        //                 Router.replace(`/account/AfterPaypalView`)

        //             },
        //         );
        //     } catch (error) {

        //         console.log("err", error)

        //     }
        //     //window.location.href='account/AfterPaypalView';
        //     // window.location.href = 'http://35.179.7.135/account/AfterPaypalView' 
        //     Router.replace(`/account/AfterPaypalView`)
        //     setSuccess(true);
        // });
    

        console.log("approve is:-", _data)

		const dataToSend = {
			key1: _data
		};


	const response = await api.wallet.paypal_transaction_complete({ params: {}, body: { key1: _data } },(d)=>{
            console.log("the data after approve is", d?.data?.result?.result?.purchase_units[0]?.payments?.captures[0].amount.value)
             
                try {
                    api.project.addpayment(
                        {
                            body: {
                                project_id: router?.query?.id,
                                amount: d?.data?.result?.result?.purchase_units[0]?.payments?.captures[0].amount.value,
                            },
                        },
                        (d) => {

                            let project = d?.data?.project;
                            localStorage.setItem('ProjectData', JSON.stringify(project))
                            localStorage.setItem('TableShow', '1')

                            localStorage.setItem('items', (`/machining/${project?.project_name?.split(" ").join("-")}-${project?.id}`));

                            Router.replace(`/account/AfterPaypalView`)

                        },
                    );
                } catch (error) {

                    console.log("err", error)

                }
            
        })

        return response

    };

    const onError = () => {
        console.log("Error");
    };

    return (
        <>
            <PayPalScriptProvider
                options={{
                    "client-id":
                         "AX70eVDhpDXiUvF5zsWh_HePlHTuBhg0HEiXyfx1Ir4uPgTwRy_EJ9-eWGeGakxKxT7wXgFkvgSQtPUM",
                         currency:"GBP"
                }}>
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
                                    <PayPalButtons
                                        createOrder={createOrder}
                                        style={{
                                            layout: "vertical",
                                            color: "gold",
                                            shape: "rect",
                                            label: "paypal",
                                        }}
                                        onApprove={onApprove}
                                        onInit={() => {
                                            setInitiated(true);
                                        }}
                                    />
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
                    <Paypalprovider />
                </div>
            </PayPalScriptProvider>
        </>
    );
};

export default DepositFund1;
