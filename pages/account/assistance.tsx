import { useState } from "react";
import atom from "../../src/jotai/atom";
import Routes from "../../src/Routes";
const assistance = () => {
    const [cshow1, csetshow1] = useState(false)
    const [cshow2, csetshow2] = useState(false)
    const [cshow3, csetshow3] = useState(false)
    const [cshow4, csetshow4] = useState(false)
    const [cshow5, csetshow5] = useState(false)
    const [cshow6, csetshow6] = useState(false)
    const [cshow7, csetshow7] = useState(false)
    const [cshow8, csetshow8] = useState(false)
    const [cshow9, csetshow9] = useState(false)
    const [cshow10, csetshow10] = useState(false)
    const [cshow11, csetshow11] = useState(false)
    const [cshow12, csetshow12] = useState(false)
    const [cshow13, csetshow13] = useState(false)
    const [cshow14, csetshow14] = useState(false)
    const [cshow15, csetshow15] = useState(false)
    const [cshow16, csetshow16] = useState(false)
    const [cshow17, csetshow17] = useState(false)
    const [cshow18, csetshow18] = useState(false)
    const [cshow19, csetshow19] = useState(false)
    const [cshow20, csetshow20] = useState(false)
    const [cshow21, csetshow21] = useState(false)
    const [cshow22, csetshow22] = useState(false)

    const [customer, setcustomer] = useState(true);
    const [mac, setmac] = useState(false);

    const [mshow23, msetshow23] = useState(false)
    const [mshow24, msetshow24] = useState(false)

    const [mshow25, msetshow25] = useState(false)
    const [mshow26, msetshow26] = useState(false)
    const [mshow27, msetshow27] = useState(false)

    const [mshow28, msetshow28] = useState(false)
    const [mshow29, msetshow29] = useState(false)
    const [mshow30, msetshow30] = useState(false)

    const [mshow31, msetshow31] = useState(false)
    const [mshow32, msetshow32] = useState(false)
    const [mshow33, msetshow33] = useState(false)

    const [mshow34, msetshow34] = useState(false)
    const [mshow35, msetshow35] = useState(false)




    const selectcust = () => {
        if (customer == false) {
            setcustomer(true)
        }
        setmac(false)
        csetshow1(false)
        csetshow2(false)
        csetshow3(false)
        csetshow4(false)
        csetshow5(false)
        csetshow6(false)
        csetshow7(false)
        csetshow8(false)
        csetshow9(false)
        csetshow10(false)
        csetshow11(false)
        csetshow12(false)
        csetshow13(false)
        csetshow14(false)
        csetshow15(false)
        csetshow16(false)
        csetshow17(false)
        csetshow18(false)
        csetshow19(false)
        csetshow20(false)
        csetshow21(false)
        csetshow22(false)
    }

    const select_mac = () => {
        if (mac == false) {
            setmac(true)
        }
         setcustomer(false)
        msetshow23(false)
        msetshow24(false)
        msetshow25(false)
        msetshow26(false)
        msetshow27(false)
        msetshow28(false)
        msetshow29(false)
        msetshow30(false)
        msetshow31(false)
        msetshow32(false)
        msetshow33(false)
        msetshow34(false)
        msetshow35(false)
    }

    const cust_collapse1 = () => {
        if (cshow1 == true) {
            csetshow1(false)
        } else if (cshow1 == false) {
            csetshow1(true)
        }
    }

    const cust_collapse2 = () => {
        if (cshow2 == true) {
            csetshow2(false)
        } else if (cshow2 == false) {
            csetshow2(true)
        }
    }

    const cust_collapse3 = () => {
        if (cshow3 == true) {
            csetshow3(false)
        } else if (cshow3 == false) {
            csetshow3(true)
        }
    }

    const cust_collapse4 = () => {
        if (cshow4 == true) {
            csetshow4(false)
        } else if (cshow4 == false) {
            csetshow4(true)
        }
    }

    const cust_collapse5 = () => {
        if (cshow5 == true) {
            csetshow5(false)
        } else if (cshow5 == false) {
            csetshow5(true)
        }
    }

    const cust_collapse6 = () => {
        if (cshow6 == true) {
            csetshow6(false)
        } else if (cshow6 == false) {
            csetshow6(true)
        }
    }


    const cust_collapse7 = () => {
        if (cshow7 == true) {
            csetshow7(false)
        } else if (cshow7 == false) {
            csetshow7(true)
        }
    }



    const cust_collapse8 = () => {
        if (cshow8 == true) {
            csetshow8(false)
        } else if (cshow8 == false) {
            csetshow8(true)
        }
    }



    const cust_collapse9 = () => {
        if (cshow9 == true) {
            csetshow9(false)
        } else if (cshow9 == false) {
            csetshow9(true)
        }
    }


    const cust_collapse10 = () => {
        if (cshow10 == true) {
            csetshow10(false)
        } else if (cshow10 == false) {
            csetshow10(true)
        }
    }

    const cust_collapse11 = () => {
        if (cshow11 == true) {
            csetshow11(false)
        } else if (cshow11 == false) {
            csetshow11(true)
        }
    }


    const cust_collapse12 = () => {
        if (cshow12 == true) {
            csetshow12(false)
        } else if (cshow12 == false) {
            csetshow12(true)
        }
    }


    const cust_collapse13 = () => {
        if (cshow13 == true) {
            csetshow13(false)
        } else if (cshow13 == false) {
            csetshow13(true)
        }
    }



    const cust_collapse14 = () => {
        if (cshow14 == true) {
            csetshow14(false)
        } else if (cshow14 == false) {
            csetshow14(true)
        }
    }

    const cust_collapse15 = () => {
        if (cshow15 == true) {
            csetshow15(false)
        } else if (cshow15 == false) {
            csetshow15(true)
        }
    }

    const cust_collapse16 = () => {
        if (cshow16 == true) {
            csetshow16(false)
        } else if (cshow16 == false) {
            csetshow16(true)
        }
    }

    const cust_collapse17 = () => {
        if (cshow17 == true) {
            csetshow17(false)
        } else if (cshow17 == false) {
            csetshow17(true)
        }
    }

    const cust_collapse18 = () => {
        if (cshow18 == true) {
            csetshow18(false)
        } else if (cshow18 == false) {
            csetshow18(true)
        }
    }

    const cust_collapse19 = () => {
        if (cshow19 == true) {
            csetshow19(false)
        } else if (cshow19 == false) {
            csetshow19(true)
        }
    }

    const cust_collapse20 = () => {
        if (cshow20 == true) {
            csetshow20(false)
        } else if (cshow20 == false) {
            csetshow20(true)
        }
    }

    const cust_collapse21 = () => {
        if (cshow21 == true) {
            csetshow21(false)
        } else if (cshow21 == false) {
            csetshow21(true)
        }
    }

    const cust_collapse22 = () => {
        if (cshow22 == true) {
            csetshow22(false)
        } else if (cshow22 == false) {
            csetshow22(true)
        }
    }



    ////////////////////////Machinist states///////////////////////////////////////////

    const mac_collapse23 = () => {
        if (mshow23 == true) {
            msetshow23(false)
        } else if (mshow23 == false) {
            msetshow23(true)
        }
    }


    const mac_collapse24 = () => {
        if (mshow24 == true) {
            msetshow24(false)
        } else if (mshow24 == false) {
            msetshow24(true)
        }
    }

    const mac_collapse25 = () => {
        if (mshow25 == true) {
            msetshow25(false)
        } else if (mshow25 == false) {
            msetshow25(true)
        }
    }



    const mac_collapse26 = () => {
        if (mshow26 == true) {
            msetshow26(false)
        } else if (mshow26 == false) {
            msetshow26(true)
        }
    }


    const mac_collapse27 = () => {
        if (mshow27 == true) {
            msetshow27(false)
        } else if (mshow27 == false) {
            msetshow27(true)
        }
    }

    const mac_collapse28 = () => {
        if (mshow28 == true) {
            msetshow28(false)
        } else if (mshow28 == false) {
            msetshow28(true)
        }
    }




    const mac_collapse29 = () => {
        if (mshow29 == true) {
            msetshow29(false)
        } else if (mshow29 == false) {
            msetshow29(true)
        }
    }


    const mac_collapse30 = () => {
        if (mshow30 == true) {
            msetshow30(false)
        } else if (mshow30 == false) {
            msetshow30(true)
        }
    }

    const mac_collapse31 = () => {
        if (mshow31 == true) {
            msetshow31(false)
        } else if (mshow31 == false) {
            msetshow31(true)
        }
    }




    const mac_collapse32 = () => {
        if (mshow32 == true) {
            msetshow32(false)
        } else if (mshow32 == false) {
            msetshow32(true)
        }
    }


    const mac_collapse33 = () => {
        if (mshow33 == true) {
            msetshow33(false)
        } else if (mshow33 == false) {
            msetshow33(true)
        }
    }

    const mac_collapse34 = () => {
        if (mshow34 == true) {
            msetshow34(false)
        } else if (mshow34 == false) {
            msetshow34(true)
        }
    }


    const mac_collapse35 = () => {
        if (mshow35 == true) {
            msetshow35(false)
        } else if (mshow35 == false) {
            msetshow35(true)
        }
    }

    return (
        <>

            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>ASSISTANCE</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container cjw">
                <div className="col-sm-12 howit5">
                    <ul className="nav nav-pills justify-content-center" role="tablist">
                        <li className="nav-item">
                            <a className={`nav-link ${customer ? "active" : ""}`} data-toggle="tab" href="#" onClick={selectcust}>You are a Customer</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${mac ? "active" : ""}`} data-toggle="tab" href="#" onClick={select_mac}>You are a Machinist</a>
                        </li>
                    </ul>
                    <div className="tab-content">

                        <div id="customer" className={`tab-pane ${customer ? "active" : ""}`}><br></br>
                            <div className="accordion" id="faq">
                                <div className="card">
                                    <div className="card-header" id="faqhead1">
                                        <a className={`btn btn-header-link ${cshow1 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq1"
                                            aria-expanded="true" aria-controls="faq1" onClick={cust_collapse1}>How to machine parts with Machining-4u?</a>
                                    </div>

                                    <div id="faq1" className={`collapse ${cshow1 ? "show" : "hide"}`} aria-labelledby="faqhead1" data-parent="#faq">
                                        <div className="card-body">
                                            <p>Here are the steps:</p>
                                            <div className="assistance1">
                                                <ul>
                                                    <li>Post your request for free by sending your plans.</li>
                                                    <li>Receive free quotes from professional machinists.</li>
                                                    <li>Choose a machinist by consulting his profile and his evaluation history</li>
                                                    <li>Launch the machining by depositing the funds in a secure Machining-4u account</li>
                                                    <li>Receive the parts at home by tracked package</li>
                                                    <li>After verifying the conformity of your parts, release the funds for your machinist and leave an evaluation.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead2">
                                        <a className={`btn btn-header-link ${cshow2 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq2"
                                            aria-expanded="true" aria-controls="faq2" onClick={cust_collapse2}>How to properly submit a machining request to receive the best offers?</a>
                                    </div>

                                    <div id="faq2" className={`collapse ${cshow2 ? "show" : "hide"}`} aria-labelledby="faqhead2" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <ul>
                                                    <li>As a priority, we recommend that you use dimensioned plans in image or PDF format, as these formats are accessible to the greatest number of machinists.</li>
                                                    <li>The plans must be filled in with all the dimensions (dimensions). If your description is vague, it will be difficult for machinists to determine the time and tooling needed to machine your parts.</li>
                                                    <li>In particular, specify the tolerances on the various dimensions or the overall tolerance of each part. Without it, the machinists might offer you a higher price than necessary.</li>
                                                    <li>Do not forget to specify the materials to be used.</li>
                                                    <li>Check that you have defined the desired quantities of each part.</li>
                                                    <li>Also attach, if you have any, 3D files that will allow machinists to save time in machining your parts and thus reduce their price.</li>
                                                </ul>
                                            </div>
                                            <p>You can add additional information or files at any time to your machining request by clicking on the "Add Comments, Files" button</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead3">
                                        <a className={`btn btn-header-link ${cshow3 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq3"
                                            aria-expanded="true" aria-controls="faq3" onClick={cust_collapse3}>How long does it take to receive offers?</a>
                                    </div>

                                    <div id="faq3" className={`collapse ${cshow3 ? "show" : "hide"}`} aria-labelledby="faqhead3" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <ul>
                                                    <li>Connect to the site with your credentials.</li>
                                                    <li>Click on the yellow button "Add a Comment, Files" then add text and/or files. Machinists who have made an offer will be notified by email that your requestmachining has been completed.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="card">
                                    <div className="card-header" id="faqhead5">
                                        <a className={`btn btn-header-link ${cshow4 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq5"
                                            aria-expanded="true" aria-controls="faq5" onClick={cust_collapse4}>How do I change the quantities or the material I requested?</a>
                                    </div>

                                    <div id="faq5" className={`collapse ${cshow4 ? "show" : "hide"}`} aria-labelledby="faqhead5" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>
                                                    As long as you have not selected an offer, you can modify your machining request by adding a comment to your machining request. Add a comment to your advertisement (click on the yellow button "Add a Comment, Files") specifying the new quantities to be considered or your new choice ofmatter. Machinists who have already made you an offer will receive an email informing them of your comment.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead6">
                                        <a className={`btn btn-header-link ${cshow5 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq6"
                                            aria-expanded="true" aria-controls="faq6" onClick={cust_collapse5}>How do I change the quantities or the material I requested?</a>
                                    </div>

                                    <div id="faq6" className={`collapse ${cshow5 ? "show" : "hide"}`} aria-labelledby="faqhead6" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>
                                                    As long as you have not selected an offer, you can modify your machining request by adding a comment to your machining request. Add a comment to your advertisement (click on the yellow button "Add a Comment, Files") specifying the new quantities to be considered or your new choice ofmatter. Machinists who have already made you an offer will receive an email informing them of your comment.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead6">
                                        <a className={`btn btn-header-link ${cshow6 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq6"
                                            aria-expanded="true" aria-controls="faq6" onClick={cust_collapse6}>How do I keep my plans confidential?</a>
                                    </div>

                                    <div id="faq6" className={`collapse ${cshow6 ? "show" : "hide"}`} aria-labelledby="faqhead6" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>
                                                    When you establish your machining request, choose the "Private" option. The visibility of your request will be restricted to verified machinists: those who have already successfully delivered at least one order on Machining-4u. No one else will be able to see the content of your machining request, be it your plans or yourcomment.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead7">
                                        <a className={`btn btn-header-link ${cshow7 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq7"
                                            aria-expanded="true" aria-controls="faq7" onClick={cust_collapse7}>Should I choose an offer?</a>
                                    </div>

                                    <div id="faq7" className={`collapse ${cshow7 ? "show" : "hide"}`} aria-labelledby="faqhead7" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>
                                                    No, the offers you receive do not imply any obligation, you are not obliged to respond to them. But you will definitely want it!
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead8">
                                        <a className={`btn btn-header-link ${cshow8 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq8"
                                            aria-expanded="true" aria-controls="faq8" onClick={cust_collapse8}>I haven't received any offers yet, what's going on?</a>
                                    </div>

                                    <div id="faq8" className={`collapse ${cshow8 ? "show" : "hide"}`} aria-labelledby="faqhead8" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>If you haven't received an offer for your machining request after 1 or 2 days, don't worry. You should receive offers within a few days.</p>
                                                <p>If after that you haven't received any offers yet, check the following:</p>
                                                <ul>
                                                    <li>Have you posted a plan with dimensions (dimensions) in image or pdf format? Many machinists do not have access to other formats.</li>
                                                    <li>Do your plans have all the dimensions that allow a good understanding of the part?</li>
                                                    <li>Have you specified the materials to be used for each part.</li>
                                                    <li>Have you clearly defined the desired quantities of each part.</li>
                                                    <li>Finally, perhaps your parts are too complex to machine and no machine operator has felt capable of doing so.</li>
                                                </ul>
                                                <p>You can add additional information or files at any time to your machining request by clicking on the yellow "Add Comment, Files" button.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead9">
                                        <a className={`btn btn-header-link ${cshow9 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq9"
                                            aria-expanded="true" aria-controls="faq9" onClick={cust_collapse9}>How to order?</a>
                                    </div>
                                    <div id="faq9" className={`collapse ${cshow9 ? "show" : "hide"}`} aria-labelledby="faqhead9" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>Here are the steps to order:</p>
                                                <ul>
                                                    <li>Connect to the site with your credentials.</li>
                                                    <li>Go to “My Account” then to “Announcements and Current Projects” then click on the name of your project.</li>
                                                    <li>Select the offer you wish to accept by clicking on the blue “select” button on the right.</li>
                                                    <li>Once the offer has been selected, place an order by paying, by credit card or Paypal, the amount indicated in the offer. To do this, click on the yellow “Deposit funds” button. The funds will be blocked in a secure account.</li>
                                                </ul>
                                                <p>Note: you do not take any risk on Machining-4u. This amount will only be returned to your machinist after you have received and approved the quality of the parts.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead10">
                                        <a className={`btn btn-header-link ${cshow10 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq10"
                                            aria-expanded="true" aria-controls="faq10" onClick={cust_collapse10}>How do I pay my machinist once the order has been received?</a>
                                    </div>
                                    <div id="faq10" className={`collapse ${cshow10 ? "show" : "hide"}`} aria-labelledby="faqhead10" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>To release the funds, connect to Machining-4u with your identifiers, go to the page of your project then click on the yellow button "Release the funds"</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead11">
                                        <a className={`btn btn-header-link ${cshow11 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq11"
                                            aria-expanded="true" aria-controls="faq11" onClick={cust_collapse11}>What happens after I select a Machinist's offer?</a>
                                    </div>
                                    <div id="faq11" className={`collapse ${cshow11 ? "show" : "hide"}`} aria-labelledby="faqhead11" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>Once an offer has been selected, you can place an order by depositing the amount of the offer into the Machining-4u secure account. The price indicated in the offer is the total price to be paid. There will be no additional fees or charges. Delivery charges are included in the price.</p>
                                                <p>The funds you have paid for the order will not be transferred to the machiner until you have received and inspected the machined parts.</p>
                                                <p>Once an offer has been selected, you will no longer be able to modify the price of the offer. Thus, if you need to change the nature of your offer (quantities, material, etc.),ask the machinist for an update of his offer before selecting him.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead12">
                                        <a className={`btn btn-header-link ${cshow12 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq12"
                                            aria-expanded="true" aria-controls="faq12" onClick={cust_collapse12}>How much will my machined parts cost me in total?</a>
                                    </div>
                                    <div id="faq12" className={`collapse ${cshow12 ? "show" : "hide"}`} aria-labelledby="faqhead12" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>Your machined parts will cost you in total the price indicated in the offer.
                                                    There will be no additional fees or charges. Delivery costs are included in theprice.etc.,ask the machinist for an
                                                    update of his offer before selecting him.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead13">
                                        <a className={`btn btn-header-link ${cshow13 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq13"
                                            aria-expanded="true" aria-controls="faq13" onClick={cust_collapse13}>On what criteria should an offer be selected?</a>
                                    </div>
                                    <div id="faq13" className={`collapse ${cshow13 ? "show" : "hide"}`} aria-labelledby="faqhead13" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>To select an offer, consider for each offer the price, the delivery time, as well as the information that allows you to form an opinion oneach machinist: evaluations received, number of machining operations carried out, presentation page. </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead14">
                                        <a className={`btn btn-header-link ${cshow14 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq14"
                                            aria-expanded="true" aria-controls="faq14" onClick={cust_collapse14}>How can I be sure that a machinist is trustworthy?</a>
                                    </div>
                                    <div id="faq14" className={`collapse ${cshow14 ? "show" : "hide"}`} aria-labelledby="faqhead14" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>After each order delivered and paid for, customers leave an evaluation of the work carried out. This way, you can get a good idea of ​​who your machinist is before placing an order with them.</p>
                                                <p>You can check the evaluation score of a machinist by clicking on his username and thus see his profile page. This will show you the feedback score given for each order as well as the feedback left by buyers.</p>
                                                <p>The rating system is protected against false or complacent ratings. Indeed, an evaluation can only be given after aactual financial transaction has taken place on the Machining-4u website.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead15">
                                        <a className={`btn btn-header-link ${cshow15 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq15"
                                            aria-expanded="true" aria-controls="faq15" onClick={cust_collapse15}>I have selected an offer but now I want to modify my request. What can I do to get the price updated?</a>
                                    </div>
                                    <div id="faq15" className={`collapse ${cshow15 ? "show" : "hide"}`} aria-labelledby="faqhead15" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>Once you have selected an offer, your machinist will no longer be able to change the price of that offer. In this case, all you have to do is simply send anew machining request. Notify your machine operator via messaging to invite him to make you his new updated offer.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead16">
                                        <a className={`btn btn-header-link ${cshow16 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq16"
                                            aria-expanded="true" aria-controls="faq16" onClick={cust_collapse16}>I want to delete/renounce my machining request, how do I do this?</a>
                                    </div>
                                    <div id="faq16" className={`collapse ${cshow16 ? "show" : "hide"}`} aria-labelledby="faqhead16" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>Add a comment to your machining request (click on the yellow "Add Comment, Files" button) where you will indicate that you are renouncing your request.</p>
                                                <p>This will allow Machining-4u's not to waste time making new offers to you. Machinists who have already made an offer will be notified of your comment by email.</p>
                                                <p>Thank you !</p>
                                                <p>To delete your machining request, send us a message on admin@Machining-4u and we will do it for you.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead17">
                                        <a className={`btn btn-header-link ${cshow17 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq17"
                                            aria-expanded="true" aria-controls="faq17" onClick={cust_collapse17}>How do I pay and who do I buy the parts from?</a>
                                    </div>
                                    <div id="faq17" className={`collapse ${cshow17 ? "show" : "hide"}`} aria-labelledby="faqhead17" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>On Machining-4u, buyers buy parts from their machinist. Machining-4u offers a linking service and therefore does not sell machined parts.</p>
                                                <p>To place an order, the buyer pays the amount of the selected offer into the Machining-4u secure account. After receipt and inspection of the parts, the buyer releases the funds with a simple click on the account of his machinist and thus pays him. This allows :</p>
                                                <ul>
                                                    <li>the buyer not to take the risk of paying for non-compliant machined parts.</li>
                                                    <li>the machinist to have the assurance of being paid for quality work, the funds being immobilized at the time of the order.</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead18">
                                        <a className={`btn btn-header-link ${cshow18 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq18"
                                            aria-expanded="true" aria-controls="faq18" onClick={cust_collapse18}>What are the means of payment?</a>
                                    </div>
                                    <div id="faq18" className={`collapse ${cshow18 ? "show" : "hide"}`} aria-labelledby="faqhead18" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>Payments are made by traditional means: credit card, visa, Paypal, mastercard... Checks and cash payments are not accepted. </p>
                                                <p><b>Tailor-made solutions exist for companies  :</b> contact us at admin@Machining-4u.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead19">
                                        <a className={`btn btn-header-link ${cshow19 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq19"
                                            aria-expanded="true" aria-controls="faq19" onClick={cust_collapse19}>How does payment work?</a>
                                    </div>
                                    <div id="faq19" className={`collapse ${cshow19 ? "show" : "hide"}`} aria-labelledby="faqhead19" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>Once the offer of a machining center has been selected, you must, to place an order, pay the amount indicated in the offer. To do this, click on the yellow “Deposit funds” button.</p>
                                                <p>Payments are made by traditional means: credit card, visa, Paypal, mastercard... Checks and cash payments are not accepted.</p>
                                                <p><b>Tailor-made solutions exist for companies  :</b> contact us at admin@Machining-4u.</p>
                                                <p><b>Note:</b> you do not take any risk on Machining-4u. The amount will only be paid to your machinist after you have received and approved the quality of the parts. </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead20">
                                        <a className={`btn btn-header-link ${cshow20 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq20"
                                            aria-expanded="true" aria-controls="faq20" onClick={cust_collapse20}>Who sends me the invoice: the machinist or the Machining-4u site?</a>
                                    </div>
                                    <div id="faq20" className={`collapse ${cshow20 ? "show" : "hide"}`} aria-labelledby="faqhead20" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>It is up to the machinist to send you the invoice. Indeed, it is from the machinist that you buy the machined parts. Machining-4u is a linking service and does not provideno machining services.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead21">
                                        <a className={`btn btn-header-link ${cshow21 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq21"
                                            aria-expanded="true" aria-controls="faq21" onClick={cust_collapse21}>What if I'm not happy with a part?</a>
                                    </div>
                                    <div id="faq21" className={`collapse ${cshow21 ? "show" : "hide"}`} aria-labelledby="faqhead21" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>We invite you first of all to contact your machinist and explain to him what is not suitable. The machinists are very attentive to the satisfaction of their customers and your machinist will most certainly offer you a solution that will satisfy you.</p>
                                                <p>If the part does not conform to the plans and description that you communicated in your machining request, you are not required to pay yourmachinist, the funds you deposited with the order will be returned to you by us at your request (contact us at admin@Machining-4u). </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead22">
                                        <a className={`btn btn-header-link ${cshow22 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq22"
                                            aria-expanded="true" aria-controls="faq22" onClick={cust_collapse22}>What happens in the event of a dispute?</a>
                                    </div>
                                    <div id="faq22" className={`collapse ${cshow22 ? "show" : "hide"}`} aria-labelledby="faqhead22" data-parent="#faq">
                                        <div className="card-body">
                                            <div className="assistance1">
                                                <p>A dispute may arise if a machinist if you do not agree with the machinist on the quality of the service provided or if the order is not shipped on time.</p>
                                                <p>In the event of the machinist's failure to meet his quality and deadline commitments, the funds you have paid for the order will be returned to you in full and at no cost.</p>
                                                <p>In the event of a dispute, Machining-4u will provide arbitration based on all the writings at its disposal: content of the request, plans provided, messages on the site's messaging system. Machining-4u may possibly ask to appraise the machined parts that are the subject of the dispute.</p>
                                                <p>Machining-4u will always encourage the 2 parties to find a compromise and in the absence of this one, reserves the decision of the attribution of the funds to one or the other of the parties.</p>
                                                <p>If one of the two parties does not respond to any request within 15 days after being requested by Machining-4u, the funds will be paid to the other party.</p>
                                                <p>In fact, since the launch of Machining-4u in June 2014, only a few disputes have been recorded. We invite you to look at the  excellent evaluations  received by the machinists, which reach an average of 4.8/5.</p><br />
                                                <p>If you have any questions, do not hesitate to contact us at  <b>admin@Machining-4u .</b> We would be delighted to help you.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div id="machinist" className={`tab-pane ${customer ? "" : "active"}`}><br></br>
                            <div className="accordion" id="faq">
                                <div className="card">
                                    <div className="card-header" id="faqhead4">
                                        <a className={`btn btn-header-link ${mshow23 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq4"
                                            aria-expanded="true" aria-controls="faq4" onClick={mac_collapse23}>How to make an offer?</a>
                                    </div>

                                    <div id="faq4" className={`collapse ${mshow23 ? "show" : "hide"}`} aria-labelledby="faqhead4" data-parent="#faq">
                                        <div className="card-body">
                                            <p>To make an offer, you must first register on the site as a machinist.</p>

                                            <p>Once registered, complete your profile page with a description of your services, a photo or logo representing you and photos of your machines or your achievements. An attractive profile is essential to let your customers know who you are and place a first order with you.</p>

                                            <p>To make an offer on a machining request, simply go to the machining request page and use the table for writing the offer on the right of the page.</p>

                                            <p>If you need additional information before making an offer, you can send a message to the person who issued the machining request. Your message will be published on the page and the person who made the machining request will be notified by email of your message. </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead5">
                                        <a  className={`btn btn-header-link ${mshow24 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq5"
                                            aria-expanded="true" aria-controls="faq5" onClick={mac_collapse24}>Can I provide my contact details?</a>
                                    </div>

                                    <div id="faq5" className={`collapse ${mshow24 ? "show" : "hide"}`} aria-labelledby="faqhead5" data-parent="#faq">
                                        <div className="card-body">
                                            <p>Machining-4u strictly prohibits the display of any contact details on the site (email address, telephone number, website, etc.). In addition, it is not permitted to post messages that directly or indirectly encourage a user to give his contact details or to respond to a user's solicitation by communicating his contact details.</p>
                                            <p>Contact information can only be exchanged between a buyer and a user once the order has been placed by the buyer.</p>
                                            <p>Any abuse of this policy will result in account suspension or deletion. Thank you for your understanding.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead6">
                                        <a  className={`btn btn-header-link ${mshow25 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq6"
                                            aria-expanded="true" aria-controls="faq6" onClick={mac_collapse25}>How to contact a customer?</a>
                                    </div>

                                    <div id="faq6" className={`collapse ${mshow25 ? "show" : "hide"}`} aria-labelledby="faqhead6" data-parent="#faq">
                                        <div className="card-body">
                                            <p>Please note firstly that any exchange of contact details with the machinists present on Machining-4u is prohibited before the acceptance of the offer and the placing of the order. If you need to contact a machinist before accepting their offer, please follow these steps:</p>
                                            <p>To communicate, you must first be connected to the site with your identifiers.</p>
                                            <p>If you need additional information before making an offer, you can send a message to the person who issued the machining request. Your message will be published on the page and the person who made the machining request will be notified by email of your message. </p>
                                            <p>You may receive a private message from your potential customer following your offer. You will be able to reply to this message and start chatting in an open dialog window on your offer.</p>
                                            <p>Once your customer has placed an order with you, you will have access to Machining-4u messaging and you will be able to exchange messages and files.</p>
                                            <p>All the messages you send to Machining-4u private messaging are also sent to your customer by email.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="card">
                                    <div className="card-header" id="faqhead26">
                                        <a className={`btn btn-header-link ${mshow26 ? "" : "collapsed"}`}  data-toggle="collapse" data-target="#faq26"
                                            aria-expanded="true" aria-controls="faq26" onClick={mac_collapse26}>How to access "Private" machining requests</a>
                                    </div>

                                    <div id="faq26" className={`collapse ${mshow26 ? "show" : "hide"}`} aria-labelledby="faqhead26" data-parent="#faq">
                                        <div className="card-body">
                                            <p>A machinist can view and respond to "Private" machining requests once he has successfully delivered at least one order. This "Private" option, chosen by the buyer, ensures the confidentiality of the machining request by not allowing simple visitors to the site or newly registered machining operators to view it.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead27">
                                        <a className={`btn btn-header-link ${mshow27 ? "" : "collapsed"}`}  data-toggle="collapse" data-target="#faq27"
                                            aria-expanded="true" aria-controls="faq27" onClick={mac_collapse27}>Who sees the offers I make?</a>
                                    </div>

                                    <div id="faq27" className={`collapse ${mshow27 ? "show" : "hide"}`} aria-labelledby="faqhead27" data-parent="#faq">
                                        <div className="card-body">
                                            <p>Only the person who posted the machining request can view the price, shipping time, and comment that accompanies your offer. The other users of the site and the machinists cannot see the content of your offer. Once your offer has been selected, your price will be displayed and visible to everyone, but your comment and shipping time will remain hidden.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead28">
                                        <a className={`btn btn-header-link ${mshow28 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq28"
                                            aria-expanded="true" aria-controls="faq28" onClick={mac_collapse28}>What to do once my offer is accepted?</a>
                                    </div>

                                    <div id="faq28" className={`collapse ${mshow28 ? "show" : "hide"}`} aria-labelledby="faqhead28" data-parent="#faq">
                                        <div className="card-body">
                                            <p>When a buyer has selected your offer, he is invited to pay the amount of your offer to the Machining-4u secure account. As long as the amount has not been paid, the order has not yet been placed with you and it is too early to start machining.</p>
                                            <p>Once the amount has been paid, you will receive an email sent by Machining-4u informing you.</p>
                                            <p>Once you have received this email, your customer has placed an order with you. Congratulation !</p>
                                            <p>Here are the steps to follow:</p>
                                            <ul>
                                                <li>You must send a message to your customer confirming that you have taken their order into account and confirming your shipping date. To do this, we invite you to use the "prepare the message" button, in the "Confirm the shipping date" step located at the top of the project page (you must be connected to the site to access it).</li>
                                                <li>Once the order has been processed and shipped, message your customer with the shipping date and package tracking number. To do this, we invite you to use the "prepare the message" button, in the "Send the shipping message" step.</li>
                                                <li>Wait a few days for your customer to receive their package. The client has, from receipt, 7 days to release the funds to your account and thus pay you for your work. If there is no response from your client, you can use the "Request to release funds" button to request your client to release the funds. If you do not receive an answer after this, contact us on admin@Machining-4u.</li>
                                            </ul>
                                            <p>It is essential to communicate well once the order has been placed. We have found that 80% of negative feedback stems from a lack of communication on the part of the machinist.</p>
                                            <p>When a customer places an order, they expect you to contact them, not the other way around.</p>
                                            <p>Once you have delivered your order and been paid, you should encourage your customer to leave you a review if this has not been done. The more positive reviews you accumulate, the greater your chances of winning new orders.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead29">
                                        <a className={`btn btn-header-link ${mshow29 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq29"
                                            aria-expanded="true" aria-controls="faq29" onClick={mac_collapse29}>How much does Machining-4u cost me?</a>
                                    </div>

                                    <div id="faq29" className={`collapse ${mshow29 ? "show" : "hide"}`} aria-labelledby="faqhead29" data-parent="#faq">
                                        <div className="card-body">
                                            <p>There are no registration or subscription fees on Machining-4u. Bidding is completely free. We take a commission only when you are paid by your customer. So we only get paid when you get paid. And our success depends on your success.</p>
                                            <p>The commission is 14.9%. It makes it possible, among other things, to cover bank transaction costs, computer costs and promotional costs that help attract new customers to the site.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead30">
                                        <a className={`btn btn-header-link ${mshow30 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq30"
                                            aria-expanded="true" aria-controls="faq30" onClick={mac_collapse30}>What if my client does not release the funds after delivery?</a>
                                    </div>

                                    <div id="faq30" className={`collapse ${mshow30 ? "show" : "hide"}`} aria-labelledby="faqhead30" data-parent="#faq">
                                        <div className="card-body">
                                            <p>Wait a few days for your customer to receive their package. The client has, from receipt, 7 days to release the funds to your account and thus pay you for your work. If your customer does not react, you can use the "Ask to release the funds" button to ask your customer to release the funds, the site then sends a message asking the customer to release the funds. he received his order and is satisfied.</p>
                                            <p>If, once the 7 days have passed, your client has not released the funds on your account and has not responded to your requests, please send us a message on admin@Machining-4u . We will follow up with your client and if he does not respond to our requests or does not give valid reasons for not paying you within 48 hours, then we will trigger the payment of funds to your account.</p>
                                            <p>We strongly encourage you to be very attentive to your customers, respond quickly to their questions and react quickly in the event of non-compliance or delivery problems.</p>
                                            <p>We encourage you to always seek a solution to any problem arising on an order with a customer and to do your best to find a compromise that satisfies both parties.</p>
                                            <p>In the event of a dispute, and if you have not managed to find a compromise with your client, we invite you to contact us at admin@Machining-4u .</p>
                                            <p>Since its launch in June 2013 and after more than 2,500 orders have been delivered, only a few disputes have arisen on Machining-4u. We thank all the machinists for their professionalism and the quality of their work.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead31">
                                        <a className={`btn btn-header-link ${mshow31 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq31"
                                            aria-expanded="true" aria-controls="faq31" onClick={mac_collapse31}>What type of package should I use for the delivery of the order?</a>
                                    </div>

                                    <div id="faq31" className={`collapse ${mshow31 ? "show" : "hide"}`} aria-labelledby="faqhead31" data-parent="#faq">
                                        <div className="card-body">
                                            <p>By using Machining-4u, you agree to systematically use means of delivery with traceability of the package. Machinists generally use the Colissimo formula or La Poste's Letter Max in the case of small parts.</p>
                                            <p>We recommend that you communicate systematically, once the parcel has been dispatched, the tracking number of the parcel and the date of dispatch. A photo of the parts sent via Machining-4u messaging is always very much appreciated by customers.</p>
                                            <p>We recommend that you take care of the packaging of the parts. In addition to the role of protecting the parts, careful packaging is appreciated by customers and positively influences the evaluation and its comment.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead32">
                                        <a className={`btn btn-header-link ${mshow32 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq32"
                                            aria-expanded="true" aria-controls="faq32" onClick={mac_collapse32}>When should I send an invoice?</a>
                                    </div>

                                    <div id="faq32" className={`collapse ${mshow32 ? "show" : "hide"}`} aria-labelledby="faqhead32" data-parent="#faq">
                                        <div className="card-body">
                                            <p>According to the regulations, an invoice must be sent to any individual expressing the request.</p>
                                            <p>An invoice must be sent when your client is a business. Business status is visible by the green (P) to the right of your client's name on the project page.</p>
                                            <p>The amount to be indicated on the invoice is the total amount paid by your customer, the Machining-4u commission being an expense that is your responsibility.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead33">
                                        <a className={`btn btn-header-link ${mshow33 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq33"
                                            aria-expanded="true" aria-controls="faq33" onClick={mac_collapse33}>Who can register as a Machinist?</a>
                                    </div>

                                    <div id="faq33" className={`collapse ${mshow33 ? "show" : "hide"}`} aria-labelledby="faqhead33" data-parent="#faq">
                                        <div className="card-body">
                                            <p>Only professionals registered in the business directory, therefore having a SIREN number, can send offers and take orders.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead34">
                                        <a className={`btn btn-header-link ${mshow34 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq34"
                                            aria-expanded="true" aria-controls="faq34" onClick={mac_collapse34}>What contact information am I not allowed to share?</a>
                                    </div>

                                    <div id="faq34" className={`collapse ${mshow34 ? "show" : "hide"}`} aria-labelledby="faqhead34" data-parent="#faq">
                                        <div className="card-body">
                                            <p>Any exchange of contact details between buyers and machinists present on Machining-4u is prohibited before the acceptance of the offer and the placing of the order. It is forbidden to communicate in particular the following elements:</p>
                                            <ul>
                                                <li>Email addresses</li>
                                                <li>Website addresses</li>
                                                <li>Phone numbers</li>
                                                <li>All other contact details as well as implicit or concealed contact details</li>
                                                <li>Any message encouraging the communication of contact details</li>
                                                <li>Any message prompting you to search for contact details</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="card">
                                    <div className="card-header" id="faqhead35">
                                        <a className={`btn btn-header-link ${mshow35 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq35"
                                            aria-expanded="true" aria-controls="faq35" onClick={mac_collapse35}>How to post a machining request when you are a machinist?</a>
                                    </div>

                                    <div id="faq35" className={`collapse ${mshow35 ? "show" : "hide"}`} aria-labelledby="faqhead35" data-parent="#faq">
                                        <div className="card-body">
                                            <p>You can of course also have parts machined with Machining-4u. To do this, create a customer account on Machining-4u. You will need to use another email address to open this second account.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
assistance.ignorePath = true
export default assistance