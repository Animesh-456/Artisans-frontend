import { useState } from "react";
import atom from "../../src/jotai/atom";
import Routes from "../../src/Routes";
import env from "../../src/config/api";

export const getStaticProps = async () => {
    try {
        const response = await fetch(`${env.base_url}project/page-details`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();


        const params: any = {
            id: 27,  // Extracted ID from the first API response
            status: 'active', // Any other parameters you want to pass
        };

        // Convert params object to query string
        const queryString = new URLSearchParams(params).toString();
        const response2 = await fetch(`${env.base_url}project/page-content-details?${queryString}`);
        if (!response2.ok) {
            throw new Error('Failed to fetch data from the second API');
        }
        const data2 = await response2.json();

        return {
            props: {
                prp: data,
                prp2: data2 // Assuming the fetched data structure matches what's expected
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
const assistance = (prp) => {
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

            {/* <Head>
                <title>{`${prp?.prp?.data[4].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[4].page_desc}`} />

            </Head> */}

            <section className="inner_banner_wp" style={{ backgroundImage: ` url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>FAQ</h1>
                </div>
            </section>



            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 howit5">
                            <ul className="nav nav-pills justify-content-center" role="tablist">
                                <li className="nav-item">
                                    <a className={`nav-link ${customer ? "active" : ""}`} data-toggle="tab" href="#customer" onClick={selectcust}>You are a Customer</a>
                                </li>
                                <li className="nav-item">
                                    <a className={`nav-link ${mac ? "active" : ""}`} data-toggle="tab" href="#" onClick={select_mac}>You are a Artist</a>
                                </li>
                            </ul>




                            <div className="container cjw">
                                <div className="col-sm-12 howit5">
                                    <ul className="nav nav-pills justify-content-center" role="tablist">
                                        <li className="nav-item">
                                            {/* <a className={`nav-link ${customer ? "active" : ""}`} data-toggle="tab" href="#" onClick={selectcust}>You are a Customer</a> */}
                                        </li>
                                        <li className="nav-item">
                                            {/* <a className={`nav-link ${mac ? "active" : ""}`} data-toggle="tab" href="#" onClick={select_mac}>You are a Machinist</a> */}
                                        </li>
                                    </ul>
                                    <div className="tab-content">

                                        <div id="customer" className={`tab-pane ${customer ? "active" : ""}`}><br></br>
                                            <div className="accordion" id="faq">
                                                <div className="card">
                                                    <div className="card-header" id="faqhead1">
                                                        <a className={`btn btn-header-link ${cshow1 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq1"
                                                            aria-expanded="true" aria-controls="faq1" onClick={cust_collapse1}>What is Art?</a>
                                                    </div>

                                                    <div id="faq1" className={`collapse ${cshow1 ? "show" : "hide"}`} aria-labelledby="faqhead1" data-parent="#faq">
                                                        <div className="card-body">
                                                            <p>A common way of describing a definition is to delimit its genus (the general class of things to which it belongs) and differentia (how this particular class of things differs from the others of its genus). The genus of art is “works of expression”. This includes a broad variety of expressive things such as journalism, ordinary speech, temper tantrums, clothing styles, technical manuals, and of course art. The identifying characteristic of expressive works (of all kinds, not just art) is that they convey information by the intentional manipulation of a medium (as opposed to the way we discover information by just observing things directly which we might call “observation” rather than expression).</p>

                                                            <div className="assistance1">
                                                                <ul>
                                                                    <li>Post your request for free by sending your plans.</li>
                                                                    <li>Receive free quotes from professional art.</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="faqhead2">
                                                        <a className={`btn btn-header-link ${cshow2 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq2"
                                                            aria-expanded="true" aria-controls="faq2" onClick={cust_collapse2}>What Makes Good Art Good and Bad Art Bad?</a>
                                                    </div>

                                                    <div id="faq2" className={`collapse ${cshow2 ? "show" : "hide"}`} aria-labelledby="faqhead2" data-parent="#faq">
                                                        <div className="card-body">
                                                            <div className="assistance1">
                                                                <p>
                                                                    This is an important question but it is one that requires a bit more general context to answer adequately, and that is the answer to the question “What makes anything good or bad?”. My answer is that you can only say that something is good in the context of a purpose or goal that it facilitates or inhibits. For example, you can only say that a hammer, a chair, or a bucket is “good” by reference to the purpose of the thing, namely, to pound things, to provide a platform to sit on, or to hold some substance. To understand how the thing is effective at accomplishing the goal it is necessary to understand the features of the thing that make it more or less effective at being that kind of thing.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="faqhead3">
                                                        <a className={`btn btn-header-link ${cshow3 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq3"
                                                            aria-expanded="true" aria-controls="faq3" onClick={cust_collapse3}>But it is impossible to make objective judgments! You are just arrogantly asserting your opinions as fact, aren’t you?</a>
                                                    </div>

                                                    <div id="faq3" className={`collapse ${cshow3 ? "show" : "hide"}`} aria-labelledby="faqhead3" data-parent="#faq">
                                                        <div className="card-body">
                                                            <div className="assistance1">
                                                                <p>The whole nature of evaluating the goodness or badness of something arises from how that thing relates to some purpose or goal. Is a rain storm good or bad? Well, that depends on whether you are a farmer hoping for a drought to break or a backpacker hoping to keep his sleeping bag dry. The goodness or badness isn’t an intrinsic property of the thing itself (as if there’s drop of goodness or evil somewhere inside the thing), but rather how the properties of the thing relate to some contextual goal against which it is being judged.</p>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>


                                                <div className="card">
                                                    <div className="card-header" id="faqhead5">
                                                        <a className={`btn btn-header-link ${cshow4 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq5"
                                                            aria-expanded="true" aria-controls="faq5" onClick={cust_collapse4}>Isn’t there something incomprehensible, magical, or mystical about art?</a>
                                                    </div>

                                                    <div id="faq5" className={`collapse ${cshow4 ? "show" : "hide"}`} aria-labelledby="faqhead5" data-parent="#faq">
                                                        <div className="card-body">
                                                            <div className="assistance1">
                                                                <p>
                                                                    Art can be subtle, complex, hard to understand, or difficult to explain, but there’s nothing literally magical about it and nothing about it which inherently defies analysis. I think the reason some people believe this is that art (good art anyway) often excites the emotions, and people think (or feel) that emotions are incomprehensible, magical, or beyond explaining, and because of this error and the relationship between art and emotion, they conclude that art is therefore similarly incomprehensible, magical, etc.
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="faqhead6">
                                                        <a className={`btn btn-header-link ${cshow5 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq6"
                                                            aria-expanded="true" aria-controls="faq6" onClick={cust_collapse5}>Why is this even an issue? Why not just enjoy art without rocking the boat?</a>
                                                    </div>

                                                    <div id="faq6" className={`collapse ${cshow5 ? "show" : "hide"}`} aria-labelledby="faqhead6" data-parent="#faq">
                                                        <div className="card-body">
                                                            <div className="assistance1">
                                                                <p>I hope that the above discussion outlines what makes a work of art good, but I think there’s another issue that deserves attention which is why this issue isn’t completely obvious to everyone. After all, plumbers don’t sit around wondering whether or not there is such a thing as good plumbing and they sure don’t go around denying that there’s such a thing. Unfortunately, this is exactly what so many docents, professors, and journalists have been doing for past hundred years.  </p>

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
                                                            aria-expanded="true" aria-controls="faq4" onClick={mac_collapse23}>Isn’t art inherently subjective and therefore impossible to evaluate in any general way?</a>
                                                    </div>

                                                    <div id="faq4" className={`collapse ${mshow23 ? "show" : "hide"}`} aria-labelledby="faqhead4" data-parent="#faq">
                                                        <div className="card-body">
                                                            <p>In a word, no. Of course we experience art in a direct and tangible way that might be expressed in specific emotional ways, but how is that different from anything else we experience in life?</p>

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="faqhead5">
                                                        <a className={`btn btn-header-link ${mshow24 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq5"
                                                            aria-expanded="true" aria-controls="faq5" onClick={mac_collapse24}>How can you lump together all of these different styles and movements and call them “Modernist”?</a>
                                                    </div>

                                                    <div id="faq5" className={`collapse ${mshow24 ? "show" : "hide"}`} aria-labelledby="faqhead5" data-parent="#faq">
                                                        <div className="card-body">
                                                            I generally do (unless I am talking about narrow sectarian disputes) talk about “modernism” as a very broad general category that encompasses a number of different fashions and sects that have developed over the past 100 years or so.

                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="faqhead6">
                                                        <a className={`btn btn-header-link ${mshow25 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq6"
                                                            aria-expanded="true" aria-controls="faq6" onClick={mac_collapse25}>But weren’t the Modernists important and influential?</a>
                                                    </div>

                                                    <div id="faq6" className={`collapse ${mshow25 ? "show" : "hide"}`} aria-labelledby="faqhead6" data-parent="#faq">
                                                        <div className="card-body">
                                                            <p>From a purely historical point of view, there’s no way to understand what was going on in the 20th century without understanding the prominence, (lack of) quality of these paintings, and how they pulled the wool over people’s eyes.</p>

                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="card">
                                                    <div className="card-header" id="faqhead26">
                                                        <a className={`btn btn-header-link ${mshow26 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq26"
                                                            aria-expanded="true" aria-controls="faq26" onClick={mac_collapse26}>How can you say bad things about Picasso, Pollock, and Rothko? They were great artistic geniuses!</a>
                                                    </div>

                                                    <div id="faq26" className={`collapse ${mshow26 ? "show" : "hide"}`} aria-labelledby="faqhead26" data-parent="#faq">
                                                        <div className="card-body">
                                                            <p>                         can say bad things about them because they were not geniuses and because they didn’t create good art. In fact, they made their fortunes based on the idea of producing things that were not even close to being good art, or art at all. Instead, they one way or another produced poor or non-art and “got away with it”.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <div className="card-header" id="faqhead27">
                                                        <a className={`btn btn-header-link ${mshow27 ? "" : "collapsed"}`} data-toggle="collapse" data-target="#faq27"
                                                            aria-expanded="true" aria-controls="faq27" onClick={mac_collapse27}>Isn’t it impolite to be critical of any art? Wouldn’t it be better if we were always positive about it all?</a>
                                                    </div>

                                                    <div id="faq27" className={`collapse ${mshow27 ? "show" : "hide"}`} aria-labelledby="faqhead27" data-parent="#faq">
                                                        <div className="card-body">
                                                            <p>It is true that feelings can be hurt when art is criticized. So what? What is more important, understanding and spreading the truth or soothing the hurt feelings of hacks and those who have become convinced for whatever reasons to adopt an emotional attachment to their work? There’s no need to be overly rude, but the idea that one should never make anyone upset by departing from an erroneous orthodoxy is a recipe for intellectual stagnation and the perpetual spread of error. That’s a lot worse than the risk of making someone upset.</p>
                                                        </div>
                                                    </div>
                                                </div>








                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
assistance.ignorePath = true
export default assistance