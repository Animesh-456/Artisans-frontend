import Link from "next/link";
import { CSSProperties } from 'react';

const SecurePayment = () => {



    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Secure Payment</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container cjw">
                <div className="row">
                    <div className="col-sm-12">
                        <div className="fund_d1_securePayment">

                            <br />
                            <p>On Usineur.fr, buyers buy their pieces to their usinier machinist. The buyer shall pay the funds to the command on a secure account Usineur.fr. After receipt and inspection of parts, the buyer releases the funds with a simple click on the account of his machinist and so pay it. This allows:</p>
                            <ul className="term">
                                <li>the buyer to pay only if the machined parts received conform.</li>
                                <li>to the factory to have the assurance of being paid for quality work, with funds secured from the order.</li>
                            </ul>

                            <p>Payments are made by conventional means: credit card, Visa, Paypal, MasterCard ... Cheques and liquids payments are not accepted. <span><b>However, tailored solutions exist for companies (contact us on admin@usineur.fr).</b></span></p>




                            <h4>What is secure payment?</h4>
                            <p>A payment is secure told when my transaction on the Internet is protected against unauthorized interception.

                                You then see the website address that begins with https://The "s" meaning secure or secure French and a lock icon at the bottom of your browser.</p>

                            <h4>Paypal payments</h4>
                            <p>To secure your purchases and allow you Usineur.fr the choice of payment method we chose Paypal car :</p>
                            <ul className="term">
                                <li>PayPal allows you to offer payment <span><b>several cards :</b></span> especially Carte Bleue, Visa, Mastercard, Aurora, ...</li>
                                <li>This allows you to <span><b>pay with your Paypal account</b></span> if you have one.</li>
                                <li>Paypal is known, recognized, used by millions of people and especially is <span><b>totally secure.</b></span></li>
                            </ul>

                            <p>To secure Paypal transactions in particular uses SSL. This payment protocol is standard and recognized worldwide for the protection of data transmitted over the internet. It is available on almost all browsers (Firefox, Chrome, Internet Explorer, Safari, Mozilla, etc ...).</p>

                            <p>At no time will we have access to your bank data, only collects data through the time of the transaction.</p>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}

SecurePayment.ignorePath = true

export default SecurePayment;