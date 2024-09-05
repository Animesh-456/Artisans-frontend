import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Router from 'next/router';
import toast from 'react-hot-toast';



const Jobs = ({ paymentStatus, error }) => {
    const router = useRouter();

    // Redirect to project page
    const RedirectProject = () => {
        // const projectData = JSON.parse(localStorage.getItem('project_data'));
        // if (projectData) {
        //     Router.replace(`/inbox/${projectData.id}/${projectData.programmer_id}/${projectData.creator_id}`);
        // } else {
        //     toast.error('No project data found.');
        // }

        Router.replace(localStorage.getItem('items'))

    };

    return (
        <>
            {/* <section className="inner_banner_wp" style={{ backgroundImage: `url(/img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>Payment {paymentStatus?.order_status === 'PAID' ? "Done" : "Pending"}</h1>
                </div>
            </section> */}
            <section className="inner_banner_wp" style={{ "backgroundImage": `url(../../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1 className='yh'>Payment {paymentStatus?.order_status === 'PAID' ? "Done" : "Pending"}</h1>
                </div>
            </section>

            {/* <section className="myproject">
                <div className="container">
                    <div className="row" style={{ justifyContent: 'center' }}>
                        <div className="col-sm-8 profile_box">
                            <div className="payment_s">
                                {paymentStatus?.order_status === 'PAID' ? (

                                    <>
                                        <img src="/img/tick.png" width="55px" alt="tick" />
                                        <p>We confirm that your payment has been made.<br />
                                            Thank you for depositing the funds. We have sent you a confirmation email.<br />
                                            Your Machinist will start working on your order.</p>
                                    </>
                                ) : (
                                    <>
                                        <img src="/img/cancel.png" width="55px" alt="tick" />
                                        <p>Payment failed. Please check your card details or use a different payment method. <br />
                                            For assistance, contact our support team.<br />
                                            We apologize for the inconvenience and appreciate your understanding</p>
                                    </>
                                )}
                                <div className="submit_cancel">
                                    <a style={{ cursor: 'pointer' }} onClick={RedirectProject}>
                                        Return to Your Project <img src="/img/arrow.png" width="11px" alt="arrow" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            {paymentStatus?.order_status === 'PAID' ? (<>
                                <div className="success1">

                                    <h2> Payment successful!</h2>


                                    {/* <p>Thank you for joining Aartstudio. You will </p>

                                    <p> received email message shortly</p> */}
                                    <p>
                                        We confirm that your payment has been made.
                                        Thank you for depositing the funds. We have sent you a confirmation email.
                                        Your Artist will start working on your order.
                                    </p>
                                    <img src="../../img/tick.png" />
                                    <br />
                                    <br />
                                    <div>
                                        <button type='submit' name='submit' className="button123" onClick={RedirectProject}>
                                            Return to Your Project
                                        </button>
                                    </div>
                                </div>
                            </>) : (<>
                                <div className="success1">

                                    <h2> Oops! Payment Failed</h2>


                                    {/* <p>Thank you for joining Aartstudio. You will </p>

                                    <p> received email message shortly
                                    </p> */}

                                    <p>
                                        Payment failed. Please check your card details or use a different payment method.
                                        For assistance, contact our support team.
                                        We apologize for the inconvenience and appreciate your understanding
                                    </p>
                                    <img src="../../img/cancel.png" />
                                    <br />
                                    <br />
                                    <div>
                                        <button type='submit' name='submit' className="button123" onClick={RedirectProject}>
                                            Return to Your Project
                                        </button>
                                    </div>
                                </div>

                            </>)}

                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </div>
            </section>
        </>
    );
};

export async function getStaticPaths() {
    // Return an empty array since paths are unknown at build time
    return {
        paths: [],
        fallback: 'blocking', // Render on-demand
    };
}

export const getStaticProps = async (context) => {
    const { params } = context;

    if (!params.order_id) {
        return {
            props: {
                paymentStatus: null,
                error: 'No order ID provided',
            },
        };
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_CASHFREEAPIURL}pg/orders/${params.order_id}`, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'x-api-version': `${process.env.NEXT_PUBLIC_X_API_VERSION}`,
                'x-client-id': `${process.env.NEXT_PUBLIC_XClientId}`,
                'x-client-secret':  `${process.env.NEXT_PUBLIC_XClientSecret}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        return {
            props: {
                paymentStatus: data,
                error: null,
            },
        };
    } catch (error) {
        console.error('Error fetching payment status:', error.message);

        return {
            props: {
                paymentStatus: null,
                error: error.message,
            },
        };
    }
};

export default Jobs;
