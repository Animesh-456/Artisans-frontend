import { useState, useEffect } from "react";
import { useAtom, useAtomValue } from "jotai";
import atom from "../../src/jotai/atom";
import { writeAtom } from "jotai-nexus";
import Link from "next/link";
import Layout from "../../src/views/Layouts/Main";
import Head from "next/head";
import Client from "../../src/api/Client";
import env from "../../src/config/api";

let metadata= {
    title:"abcd",
    description: "how its works"
}

const api = new Client();

export const getStaticProps = async () => {
    try {
        const response = await fetch(`${env.base_url}project/page-details`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();
        
        return {
            props: {
                prp: data // Assuming the fetched data structure matches what's expected
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                prp: null // Or any default value indicating an error occurred
            }
        };
    }
};


const how_it_works = (prp) => {

   
    const [customer, setcustomer] = useState(true);
    const [mac, setmac] = useState(false);

    console.log("the users from static props  are : -", prp?.prp)

    const mt = {
        title: 'Animesh Titile',
        description: 'Animesh Page Description',
    }

    const selectcust = () => {
        if (customer == false) {
            setcustomer(true)
        }
        setmac(false)
    }

    const select_mac = () => {
        if (mac == false) {
            setmac(true)
        }
        setcustomer(false)
    }

   return (
<>
     <Head>
                <title>{`${prp?.prp?.data[4].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[4].page_desc}`} />
                <meta name="robots" content="noindex" />

                <meta name="googlebot" content="noindex" />

            </Head>
<div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>HOW IT WORKS</h1>
                        </div>
                    </div>
                </div>
            </div>

        <div className="container cjw">
            <div className="col-sm-12 howit5">
                <ul className="nav nav-pills justify-content-center" role="tablist">
                    <li className="nav-item">
                        <a className={`nav-link ${customer ? "active" : ""}`} data-toggle="tab" href="#" onClick={selectcust}>You are a customer</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link ${mac ? "active" : ""}`} data-toggle="tab" href="#" onClick={select_mac}>You are a Machinist</a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div id="customer" className={`tab-pane ${customer ? "active" : ""}`}><br />
                        <div className="howit1">
                            <h3>You can receive affordable, custom-machined parts from Machining-4U in six easy steps!</h3>
                            <ul>
                                <li> <a href="/job/post">Post your CNC machining request</a> by describing the work required and attaching your blueprints. It's completely free to list your custom machined part requirement at Machining-4U.</li>
                                <li>Receive proposals from machinists straight away.</li>
                                <li>Select the proposal that best meets your needs.</li>
                                <li>Confirm your order by funding your project. Payment will be held in a secure account.</li>
                                <li>Receive custom machined parts at your door.</li>
                                <li>Check your parts, release payment to your machinist and leave a review about his work. </li>
                            </ul>
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Getting custom machined parts has never been so easy and affordable</h3>
                                    <p>Machining-4U is a CNC service that gives you instant access to the best machinists. You can get your custom machined parts easily, quickly, and at an affordable price.</p>
                                    <p>Finding a machinist is easy: just post your request and wait for proposals from experienced machinists.</p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/Ecran%20final2.png" alt="Machining" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Results Guaranteed</h3>
                                    <p>You don't take any risks with Machining-4U. When you order your custom machined parts, your money is held in a secure Machining-4U account. The funds are transferred to the machinist only after you have received your machined part and approved its quality. All the machinists on Machining-4U are reviewed by past customers, making it easy to choose the best person for the job.</p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/cadenas3.jpg" alt="Machining" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Machining-4u is free for customers.</h3>
                                    <p>Posting a CNC machining job on Machining-4U is free! There are no hidden fees or additional charges to receive quotes or accept proposals. Our service fee (14.9%) is paid by your machinist. You pay not a penny more than the quote you choose.   </p>
                                </div>
				

                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/euro%20symbole.jpg" alt="Machining" />
                                    </figure>
                                </div>
                            </div>
				<div className="qwe21 all_request_button"> 
				<a href='/account/assistance'>Learn More?<i className='fa fa-angle-right' /></a>
				<a href='/auth/sign-in'>Are you a machinist?<i className='fa fa-angle-right' /></a>
					</div>
                            <div className="howit6">
                                <a href="/auth/sign-in">SignUp</a>
                            </div>
                        </div>
                    </div>
                    <div id="machinist" className={`tab-pane ${customer ? "" : "active"}`}><br />
                        <div className="howit1">
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Search our latest machining jobs and send proposals for free.</h3>
                                    <p>Signing up to Machining-4u is completely free, with no commitments or contracts. Simply send offers to clients and start working!</p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/Offre%20Usinage2.png" alt="" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Get Paid. Guaranteed.</h3>
                                    <p>The Machining-4u principle is simple: you deliver quality work and you get paid. To begin a contract, customers must deposit funds into a secure Machining-4u account. The funds are released to you when your customer receives the custom machined parts and approved the quality of your work.</p>
                                    <p>A 14.9% service fee is deducted to help cover payment processing costs. Everything else on Machining-4u is 100% free! </p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/piggy-bank.jpg" alt="Machining" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit2">
                                <div className="howit3">
                                    <h3>Create your profile</h3>
                                    <p>Introduce yourself, inspire confidence and convince new customers to place an order with you. Easily create a complete portfolio of your past machining work and customer testimonials. Display photo galleries of your equipment and your best machining pieces.</p>
                                </div>
                                <div className="howit4">
                                    <figure>
                                        <img src="https://www.usineur.fr/Profilfinal2.png" alt="Machining" />
                                    </figure>
                                </div>
                            </div>
                            <div className="howit6">
                                <Link href='/auth/sign-in'>
                                        <a onClick={() => writeAtom(atom.storage.radio_login, "2")}>SignUp</a>
                                    </Link>
				
                                     
                                   
                            </div>
				
                        </div>
                    </div>
                </div>
            </div>
        </div>
</>
    )
}
how_it_works.ignorePath = true

export default how_it_works