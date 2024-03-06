import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
// import { useHistory  } from 'react-dom';
import { toast } from "react-hot-toast";
import { UserDetails, ProjectDetails } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";
import Offer from "../../src/views/project/Offer";
import Q_A from "../../src/views/project/Q_A";
import ReactStar from "react-star-ratings";
import { Document, Page, pdfjs } from 'react-pdf';
import Router from "next/router";
import env from "../../src/config/api";
import Head from "next/head";
import axios from 'axios';


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
type Props = {};
import { Button, ProgressBar } from "react-bootstrap";


const ProjectDetail = () => {
    //console.log("prp is----", prp)

    let d = useAtomValue(atom.storage.project_id)
    const router = useRouter();

    useEffect(() => {
        if (router.isReady == true) {

            window.location.reload()


        }


    }, [])







    const [data, setData] = useAtom(atom.project.api.detail);
    const [delivery, setdelivery] = useAtom(atom.auth.api.delivery_contacts);
    const [open, setOpen] = useAtom(atom.modal.project_help);
    const [open_offer, setOpen_offer] = useAtom(atom.modal.create_offer);
    const [open_machinist, setOpen_machinist] = useAtom(atom.modal.slct_mchnst);
    const user = useAtomValue(atom.storage.user);
    const [will_submit, setwill_submit] = useState(false);
    const [selected_machinist, setselected_machinist] = useState(null);
    const [open_review, setOpenReview] = useAtom(atom.modal.review_machinist);
    const [progress, setprogress] = useState(0);
    const reviewCust: any = useAtom(atom.project.api.project_review);
    const [numPages, setNumPages] = useState(null);
    const [filename, setFilename] = useState("");


    console.log("current review--->", reviewCust);
    console.log("project data---->>>>>>>", data);
    const steps_completed_supplier: any = useAtom(atom.project.api.steps_completed_supplier);

    const [question, questionstae] = useState({
        project_id: "",
        message: "",
    });
    const setQuestion = common.ChangeState(questionstae);

    const [review, reviewstae] = useState({
        project_id: "",
        comments: "",
        provider_rate1: 0,
        provider_rate2: 0,
        provider_rate3: 0,
        provider_rate4: 0,
    });
    const setreview = common.ChangeState(reviewstae);

    const [bid, bidstae] = useState({
        bid_desc: "",
        bid_amount: "",
        bid_amount_gbp: "",
        bid_days: "",
        project_id: "",
        user_id: "",
    });
    const setbid = common.ChangeState(bidstae);

    const [bid_id, setBid_id] = useState(null);

    const [file, setFile] = useState([]);

    const [pr, setpr] = useState(110)

    const project_status = useAtomValue(atom.storage.project_status);

    useEffect(() => {

        if (bid.bid_amount_gbp) {
            let amount = parseFloat(bid.bid_amount_gbp);
            let fix_value = 0.149;
            let paid_to_me = amount - (amount * fix_value);
            setbid("bid_amount", paid_to_me.toFixed(2))(null);
        } else {
            setbid("bid_amount", "")(null);
            setbid("bid_amount_gbp", "")(null);
        }
    }, [bid.bid_amount_gbp]);

    const handleQuestion = () => {
        let idString = String(router.query.name);

        const segments = idString.split('-');
        let id = segments[segments.length - 1];
        api.project.askQuestion({ body: question }, () => {
            setQuestion("message", "")(null);
            setOpen_offer(false);
            api.project.detail({ params: { id: id } });
        });
    };

    const handleSubmitReview = () => {
        let idString = String(router.query.name);
        const segments = idString.split('-');
        let id = segments[segments.length - 1];
        api.project.review_machinist({ body: review }, () => {
            setreview("comments", "")(null);
            setOpenReview(false);
            localStorage.setItem('ShowReview', '2')
            api.project.detail({ params: { id: id } });
            api.project.project_review({ params: { id: id } });
        });

    };

    const handleAddBid = () => {
        if (!will_submit && !bid.bid_amount && !bid.bid_amount_gbp) {
            return toast.error("Please submit the amount");
        }

        let form = new FormData();

        if (file) {
            for (let i = 0; i < file.length; i++) {
                form.append("file", file[i]);
            }
        }

        for (const key of Object.keys(bid)) {
            form.append(key, bid[key]);
        }

        if (bid_id) {
            api.project.update_bid(
                { body: bid, file: form, params: { id: bid_id } },
                () => {
                    setOpen_offer(false);
                    setwill_submit(false);
                    for (const key of Object.keys(bid)) {
                        setbid(key, "")(null);
                    }
                    setFile(null);
                    let idString = String(router.query.name);

                    const segments = idString.split('-');
                    let id = segments[segments.length - 1];

                    if (!id) {
                        router.push("/");
                    }

                    setQuestion("project_id", id)(null);
                    setBid_id(null);
                    setbid("project_id", id)(null);
                    setbid("user_id", user?.id)(null);
                    api.project.detail({ params: { id: id } });
                },
            );

            return true;
        }

        api.project.add_bid({ body: bid, file: form }, () => {
            setOpen_offer(false);
            setwill_submit(false);
            for (const key of Object.keys(bid)) {
                setbid(key, "")(null);
            }
            setFile(null);
            let idString = String(router.query.name);

            const segments = idString.split('-');
            let id = segments[segments.length - 1];

            if (!id) {
                router.push("/");
            }

            setQuestion("project_id", id)(null);
            setbid("project_id", id)(null);
            setbid("user_id", user?.id)(null);

            api.project.detail({ params: { id: id } });
        });
    };

    useEffect(() => {
        if (!router.isReady) return;

        let idString = String(router.query.name);

        const segments = idString.split('-');
        let id = segments[segments.length - 1];

        if (!id) {
            router.push("/");
        }

        setQuestion("project_id", id)(null);
        setreview("project_id", id)(null);
        setbid("project_id", id)(null);
        setbid("user_id", user?.id)(null);

        console.log("review status", localStorage.getItem('ShowReview'))



        console.log("project id--->", id);
        api.project.detail({ params: { id: id } });
        api.project.get_additional_comment({ params: { id: id } });


        if (user) {
            api.project.project_review({ params: { id: id } });
            api.project.steps_completed_supplier({
                params: {
                    id: id
                }
            });
        }

        console.log("project status1234------>", project_status)


        console.log("showreview value", localStorage.getItem('ShowReview'))
        console.log("reviewCust[0]?.rating", reviewCust[0]?.rating)

        if (user?.role_id == 1 && localStorage.getItem('ShowReview') == '1' && reviewCust[0]?.rating == null) {
            setOpenReview(true)
        }

    }, [router.isReady]);

    console.log("project rev------>", reviewCust)


    const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;
        const filesArray = [];

        for (let i = 0; i < files.length; i++) {
            const fl = files[i];

            if (fl.size / (1024 * 1024) > 10) {
                toast.error(`${fl.name} cannot be uploaded! \n File size (${(fl.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
                continue;
            }
            setFile((p) => [...p, fl])
            //filesArray.push(file)
            setpr(0)
        }
        if (files.length) {
            //setFile(files[0]);
            //setpr(0)
            //setFile(filesArray)
            setprogress(100)
        } else if (!files.length) {
            setprogress(0)
            return
        }
    };

    const select_machinist =
        (bid) => (e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            setOpen_machinist(true);
            setselected_machinist({
                programmer_id: bid.user_id,
                ...bid?.user,
                amount: bid?.bid_amount_gbp,
                bid_id: bid?.id,
            });
        };

    const handle_select_machinist = () => {
        if (!selected_machinist) return toast.error("Please select a machinist");

        api.project.select_machinist(
            {
                params: {
                    programmer_id: selected_machinist.programmer_id,
                    project_id: data?.id,
                    bid_id: selected_machinist.bid_id,
                },
            },
            () => {
                setOpen_machinist(false);
                window.scrollTo(0, 0);
                let idString = String(router.query.name);

                const segments = idString.split('-');
                let id = segments[segments.length - 1];

                if (!id) {
                    router.push("/");
                }
                api.project.detail({ params: { id: id } });
            },
        );
    };

    const send_msg = (bid) => () => {
        router.push(`/machining/msg/${data.id}/${data.creator_id}/${bid.user_id}`);
    };

    const pay_machinist = () => {
        //localStorage.setItem('ShowReview','1')
        window.location.href = '/account/CustomerRealeasePayment'
        //Router.replace(`/account/CustomerRealeasePayment`)
    };
    let idString = String(router.query.name);

    const segments = idString.split('-');
    let p_id = segments[segments.length - 1];
    const avgrat = (review.provider_rate1 + review.provider_rate2 + review.provider_rate3 + review.provider_rate4) / 4;
    console.log("rev-", reviewCust);

    useEffect(() => {

        // if (!router.isReady) return;

        let idString = String(router.query.name);

        const segments = idString.split('-');
        let id = segments[segments.length - 1];

        console.log("datasssssssssssssssssssssssssssssss are:-", id)

        console.log("datas22222222222222 are: - ", data)

        console.log("storage atom project:-", d)

        if (user) {

            api.project.steps_completed_supplier({
                params: {
                    id: d
                }
            }, (d) => {
                console.log("useeffect after", d.status)
            })
            api.project.project_review({ params: { id: d } });

        }



    }, [])

    const ReviewBox = ({ r }) => {




        const [rating, setRating] = useState(0);
        return (
            <div className='review_machinist_rating'>
                <h6>{r.name}</h6>
                <ReactStar
                    rating={review[r.key]}
                    starRatedColor='gold'
                    changeRating={(newRating) => {
                        console.log(r.key, newRating);
                        setreview(r.key, newRating)(null);
                        // setRating(newRating);
                    }}
                    numberOfStars={5}
                    starHoverColor='gold'
                    starDimension='30px'
                    name='rating'
                />

            </div>

        );
    };
    //const UserData = JSON.parse(localStorage.getItem('UserData'));
    const UserData = useAtomValue<UserDetails>(atom.auth.api.me);
    console.log("UserData from pg-", UserData)
    let reviewStatus = localStorage.getItem('ShowReview')
    let table_status = '0'
    console.log("datas--", data?.project_status)
    console.log("data_status--", data?.project_status, typeof (data?.project_status))


    console.log("table status", table_status)

    useEffect(() => {
        if (user) {
            api.auth.me({});
        }
        console.log("cuurr proj id----->", d);
        if (user) {
            api.auth.delivery_contacts({ params: { id: d } });
        }


    }, []);

    if (data?.project_status >= '4') {

        console.log("going -- status")

        localStorage.setItem('TableShow', '1')
        table_status = '1'

        console.log("table status", table_status)


    }

    if (data?.project_status <= '4') {
        localStorage.setItem('ShowReview', '0')

    }
    else if (data?.project_status == '5' && reviewCust[0]?.rating != null) {
        localStorage.setItem('ShowReview', '2')

    }


    const formatDate = (val) => {
        const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date: string = val;
        const datenew = date?.slice(0, 10)
        const day = datenew?.slice(8, 10)
        const month = monthList[Number(datenew?.slice(5, 7)) - 1]
        const year = datenew?.slice(0, 4)

        const finaldate = day + "-" + month + "," + year

        console.log("finaldate is --", finaldate)
        return finaldate;
    }



    let n = new Date().toLocaleString('en-US', {
        timeZone: 'Europe/Paris',
    });


    const strt2 = new Date(n)
    const nd2 = new Date(data?.project_expiry_date)

    const today2 = new Date(data?.project_post_format_date)
    nd2.setHours(today2.getHours(), today2.getMinutes(), today2.getSeconds());


    // Calculate the tim2e difference in milliseconds
    const timeDiff2 = nd2.getTime() - strt2.getTime();

    // Calculate the number of days
    const diffInDays = Math.floor(timeDiff2 / (1000 * 60 * 60 * 24));

    // Calculate the number of remaining hours
    const hourDifference = Math.floor((timeDiff2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    console.log("ndis2", diffInDays, hourDifference)

    console.log("REVIEW TESTING", reviewCust[0].rating)
    console.log("data proj------>", data);
    console.log("user data------>", user);

    useEffect(() => {
        if (user) {
            api.project.public_profile_total_jobs({ params: { id: user?.id } })
        }
    }, [])



    console.log("LOG USER-------->>", user);
    const totaljobs = useAtomValue(atom.project.api.total_jobs)





    useEffect(() => {
        if (pr < 102) {
            setTimeout(() => setpr(prev => prev += 2), 50)
        }

    }, [pr]);

    console.log("Files are", file)

    function delete_files(e) {
        setFile(file.filter(function (s) { return s !== e }))
    }

    useEffect(() => {
        setFile(file)
    }, [file])

    const [ischecked, setischecked] = useState(false)
    const onDocumentLoadSuccess = ({ numPages }) => {
        console.log("total page in pdf", numPages);
        setNumPages(numPages);
    };


    useEffect(() => {
        if (!router.isReady) return
        let idString = String(router.query.name);
        const segments = idString.split('-');
        let id = segments[segments.length - 1];
        api.project.offer_reviews_feedback({ params: { id: id } })
    }, [router.isReady])


    useEffect(() => {
        if (!router.isReady) return
        let idString = String(router.query.name);
        const segments = idString.split('-');
        let id = segments[segments.length - 1];
        api.project.project_finalise_image({ params: { id: id } });

    }, [router.isReady]);
    const finalise_image: any = useAtomValue(atom.project.api.project_finalise_image)
    console.log("project_finalise_image-------", finalise_image)
    const offr_rev_feed = useAtomValue(atom.project.api.offer_reviews_feedback)

    console.log("Offer reviews from backend is ", offr_rev_feed)
    const date = new Date(data?.created * 1000);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    console.log('created-------------------', formattedDate);


    /////////////////For Additional Comment or File portion////////////////


    const [additional, setadditional] = useState(false);
    const [additionalfile, setadditionalfile] = useState([]);
    const [additionalcomment, setadditionalcomment] = useState('');

    const [pr2, setpr2] = useState(110);
    const handleadditionalcomment: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;


        for (let i = 0; i < files.length; i++) {
            const file = files[i];

            if (file.size / (1024 * 1024) > 10) {
                toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
                continue;
            }
            setpr2(0)
            setadditionalfile((p) => [...p, file]);
        }

    }

    function delete_additional_files(e) {
        setadditionalfile(additionalfile.filter(function (s) { return s !== e }))
    }

    useEffect(() => {
        if (pr2 < 102) {
            setTimeout(() => setpr2(prev => prev += 2), 50)
        }

    }, [pr2]);

    const handleadditionalsubmit = () => {

        const bodytosend = {
            project_id: d,
            description: additionalcomment
        }
        //post request to send the data to backend

        let form = new FormData();



        if (additionalfile) {
            for (let i = 0; i < additionalfile.length; i++) {
                form.append("file", additionalfile[i]);
            }
        }



        for (const key of Object.keys(bodytosend)) {
            form.append(key, bodytosend[key]);
        }



        api.project.add_desccomment({

            body: {
                description: additionalcomment,
                project_id: String(d)
            },
            file: form,
            params: {
                id: d
            }

        }, (d) => {
            setadditionalcomment('');
            setadditionalfile([]);
            setadditional(false);
            window.location.reload();

        });
    }

    console.log("additionalfile", additionalfile, additionalcomment)


    useEffect(() => {
        api.project.get_additional_comment({ params: { id: d } });
    }, [])

    const additionalcomments: any[] = useAtomValue(atom.project.api.get_additional_comment)

    console.log("additionalcomments", additionalcomments)

    console.log("review status", reviewStatus);
    console.log("table_status", table_status);

    var finalised_price = 0;



    for (let i = 0; i < data?.bids_count; i++) {
        if (data?.bids[i].user_id == data.programmer_id) {
            //return data?.bids[i].bid_amount_gbp
            finalised_price = data?.bids[i].bid_amount_gbp;
        } else {
            continue
        }
    }


    var f_imgs = common.get_attachment(
        (finalise_image[0]?.attach_file),
        finalise_image[0]?.post_date,
    )

    console.log("the f_img is: -", f_imgs)
    if (f_imgs = '/public/404.jpg') {
        f_imgs = common.get_attachment_latest_ach(finalise_image[0]?.attach_file)
    }

    {
        finalise_image?.length && finalise_image?.map((c, index) => {
            console.log("finalise map is --", c[index]?.attach_file)
        })
    }



    console.log("prj_img", data?.attachment_name?.split(',')[0])






    return (

        <>

            <div className="container">

                {user && user?.id == data?.creator_id && data?.project_status >= 1 && (

                    <div className="row stepwrapper">
                        <div className="col-sm-4">
                            <div className="step_wp">
                                <span className="triangle"></span>
                                <div className="step_wp1">
                                    <div>1</div>
                                    <h3>Deposit funds</h3>
                                    {data?.project_status == '1' ? <p>
                                        Deposit your funds
                                    </p> : <p>The funds were deposited on {formatDate(data?.project_fund_date_format)}</p>}
                                    {data?.project_status == "1" && (
                                        <Link href={`/job/deposit-fund/${p_id}`}>
                                            Deposit Funds
                                        </Link>

                                        // <a href={`/job/deposit-fund/${p_id}`}>Deposit Fund</a>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="step_wp">
                                <span className="triangle"></span>
                                <div className="step_wp1">
                                    <div>2</div>
                                    <h3>Pay your artist</h3>
                                    {data?.project_status == '5' ? <p>
                                        Approved parts. Funds released to your artist on {formatDate(data?.fund_release_date)}.
                                    </p> : <p>You have received your order. You are satisfied with the result. Release your funds and your artist will be paid immediately.</p>}
                                    {data?.project_status == "4" && (
                                        <button
                                            className='btn btn-warning text-white'
                                            onClick={pay_machinist}>
                                            Pay Artist
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="step_wp">
                                <div className="step_wp1">
                                    <div>3</div>
                                    <h3>Review the Artists work</h3>

                                    {(data?.project_status == '5' && reviewCust[0]?.rating != null) ? <p>
                                        Evaluation performed the {formatDate(reviewCust[0]?.review_post_date)}
                                    </p> : <p>Evaluate the work of your Machinist.</p>}

                                    {(data?.project_status == '5' && reviewCust[0]?.rating == null) && (
                                        <Button onClick={() => setOpenReview(true)}>Review</Button>

                                    )}



                                    {(data?.project_status == '5' && reviewCust[0]?.rating != null) && <h6>Rating : {reviewCust[0]?.rating}</h6>}
                                </div>
                            </div>
                        </div>
                    </div>
                )}


                {/* Supplier side steps */}




                {user && user?.id == data?.programmer_id && data?.project_status >= 4 && (

                    <div className="row stepwrapper">
                        <div className="col-sm-4">
                            <div className="step_wp">
                                <span className="triangle"></span>
                                <div className="step_wp1">
                                    <div>1</div>
                                    <h3>Confirm Shipment Date</h3>

                                    {steps_completed_supplier[0]?.step1 != 1 ? (
                                        <p>
                                            The client has confirmed the order and the funds have been deposited.
                                        </p>
                                    ) : (
                                        <>
                                            <p>Confirmation message sent</p>
                                            <p>Sent Date: - {new Date(data?.expedition_day).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })}</p>
                                        </>
                                    )}


                                    {steps_completed_supplier[0]?.step1 != 1 && data?.project_status < "5" ? (
                                        <Link href={`/account/machinistConfirmationMessage/${data.id}`}>
                                            <a>Send Message</a>
                                        </Link>
                                    ) : (<></>)}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="step_wp">
                                <span className="triangle"></span>
                                <div className="step_wp1">
                                    <div>2</div>
                                    <h3>Shipping now</h3>
                                    {steps_completed_supplier[0]?.step2 != 1 ? (
                                        <p>
                                            Inform your client that you have shipped their order (parcel tracking is compulsory).
                                        </p>
                                    ) : (
                                        <>
                                            <p>Shipment message sent</p>
                                            <p>Sent Date: - {new Date(data?.expedition_day2).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })}</p>
                                            <p>Tracking Number: - {data?.track_number}</p>
                                        </>
                                    )}


                                    {steps_completed_supplier[0]?.step2 != 1 && data?.project_status < "5" ? (
                                        <Link href={`/account/machinistShippingMessage/${data.id}`}>
                                            <a>Send Message</a>
                                        </Link>
                                    ) : (<></>)}
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="step_wp">
                                <div className="step_wp1">
                                    <div>3</div>
                                    <h3>Request release of funds</h3>
                                    {steps_completed_supplier[0]?.step3 != 1 ? (

                                        <p>
                                            Once your customer has confirmed receipt of their order, request that funds be released into your account.
                                        </p>
                                    ) : (
                                        <>
                                            <p>Request sent</p>
                                        </>
                                    )}


                                    {steps_completed_supplier[0]?.step3 != 1 && data?.project_status < "5" ? (
                                        <Link href={`/account/requestfunds/${data.id}`}>
                                            <a>Request Funds</a>
                                        </Link>
                                    ) : (<></>)}
                                </div>
                            </div>
                        </div>
                    </div>
                )}





                <div className="container">
                    <div className="proj_d1"><h1>Project description</h1></div>
                    <div className="row project_des">
                        <div className="col-sm-3">
                            <div className="proj_i">
                                <img
                                    src={common.get_attachment(
                                        (data?.attachment_name?.split(',')[0]),
                                        formattedDate,
                                    )}
                                    alt="ABC"
                                />
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="proj_d">
                                <p><span>Posted: </span>{moment(data?.project_post_date).format("DD-MMMM-YYYY")}</p>
                                <p><span>Visibility: </span>{data?.visibility}</p>
                                <p><span>Remaining time: </span>{diffInDays >= 0 && hourDifference >= 0 ? (
                                    <>{diffInDays} days {hourDifference} hours</>
                                ) : (
                                    <>0 days</>
                                )}</p>
                                <p><span>Posted by: </span><a rel="nofollow" href={`/account/public-profile/${data?.creator?.id}`}>{data?.pro_job == 1 ? (((data?.creator_id == user?.id) || (user?.role_id == 2 && user?.pro_user == 1)) ?
                                    data?.creator?.user_name : "User") : data?.creator?.user_name}</a></p>
                                <p><span>Offers received: </span> {data?.bids_count} Offers</p>
                                <p><span>Attachments: </span>

                                    {data?.attachment_name?.includes(",") ? (
                                        data?.attachment_name?.split(",").map((d) => {
                                            return (
                                                <>
                                                    <ul>
                                                        <li>
                                                            <a
                                                                href={common.get_attachment(d, formattedDate)}
                                                                rel={"noreferrer"}
                                                                target={"_blank"}>
                                                                {d}

                                                            </a>
                                                        </li>
                                                    </ul>
                                                </>
                                            )
                                        })
                                    ) : (
                                        <a
                                            href={common.get_attachment(data?.attachment_name, formattedDate)}
                                            rel={"noreferrer"}
                                            target={"_blank"}>
                                            {data?.attachment_name}
                                        </a>
                                    )}


                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="project_des1">
                        <div className="proj_d1"><h1>description</h1></div>
                        <pre className="custom-pre">{data?.description}</pre>
                        <br />

                        <br />


                        {additionalcomments.map((a, index) => (
                            <>
                                <div className="addtional-p-tag">
                                    <p>-------------------------</p>
                                    <p>comment added on {a?.post_date_time}</p>
                                    <p key={index}><pre className="custom-pre">{a?.description}</pre></p>
                                    <br />
                                </div>
                            </>

                        ))}











                        {additional && (
                            <div className='send-message-col'>
                                <textarea
                                    className='form-control'
                                    placeholder='Type your additional comment here'
                                    value={additionalcomment}
                                    onChange={(e) => setadditionalcomment(e.target.value)}
                                />
                                <br />


                                <div className='upload-btn-wrapper'>
                                    <button>
                                        <i className='fa fa-upload' /> Add files
                                    </button>
                                    <input
                                        type='file'
                                        name='myfile'
                                        onChange={handleadditionalcomment}
                                        multiple={true}
                                    />
                                </div>
                                <br />
                                <br />
                                {pr2 < 101 ? (
                                    <ProgressBar now={pr2} label={`${pr2}%`} />
                                ) : (<></>)}
                                {additionalfile && pr2 > 100 ? (
                                    additionalfile?.map((f) => {
                                        return (
                                            <>
                                                <div className="pro_div">
                                                    <p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_additional_files(f)}><i className="fa fa-trash-o"></i></a></p>
                                                </div>
                                            </>
                                        )
                                    })
                                ) : (<></>)}
                                <br />
                                <div className="upload-btn-wrapper1">
                                    <button type="submit" onClick={handleadditionalsubmit} className='btn mt-3'>
                                        Send
                                    </button>
                                </div>
                            </div>
                        )}


                        {data?.creator_id == user?.id && data?.project_status < 1 && (
                            <div className="upload-btn-wrapper2">
                                {additional ? (
                                    <a type="button" onClick={() => setadditional(false)}>Cancel</a>
                                ) : (
                                    <button onClick={() => setadditional(true)}>Add Additional comment/File</button>
                                )}
                            </div>
                        )}




                        {user && (
                            <>
                                {user?.role_id == 2 &&
                                    !data?.programmer_id &&
                                    data?.bids?.filter((f) => f?.user_id == user?.id).length >
                                    0 ? (

                                    <div className="upload-btn-wrapper2">
                                        <button
                                            style={{ width: '20rem' }}
                                            type='submit'
                                            onClick={() => {
                                                setOpen_offer(true);
                                                setBid_id(
                                                    data?.bids?.filter((f) => f?.user_id == user?.id)[0]
                                                        ?.id,
                                                );

                                                let find_bid = data?.bids?.find(
                                                    (f) => f?.user_id == user?.id,
                                                );

                                                if (find_bid) {
                                                    for (const key of Object.keys(bid)) {
                                                        setbid(key, find_bid[key] || "")(null);
                                                    }
                                                }
                                                setischecked(false)
                                            }}>
                                            Edit Offer
                                        </button>
                                    </div>
                                ) : user?.role_id == 2 && !data?.programmer_id ? (
                                    (String(data?.visibility).toLocaleLowerCase() == "private" ? (
                                        (Number(totaljobs) >= 1 ? (

                                            <div className="upload-btn-wrapper2">
                                                <button style={{ width: '20rem' }} type='submit' onClick={() => {
                                                    setOpen_offer(true); setischecked(false); setprogress(0)
                                                    setFile([])
                                                }}>
                                                    Create Offer
                                                </button>
                                            </div>
                                        ) : (<></>))

                                    ) : (
                                        <>

                                            <div className="upload-btn-wrapper2">
                                                <button style={{ width: '20rem' }} type='submit' onClick={() => {
                                                    setOpen_offer(true); setischecked(false); setprogress(0)
                                                    setFile([])
                                                }}>
                                                    Create Offer
                                                </button>
                                            </div>
                                        </>

                                    ))
                                ) : (
                                    <></>
                                )}
                            </>
                        )}





                        {user && data?.prebid_messages?.length && data?.pro_job == 1 ? (((data?.creator_id == user?.id) || (user?.role_id == 2 && user?.pro_user == 1)) ?
                            <>
                                <h3 className='cus'>Questions and Answers :</h3>
                                <div className='row'>
                                    {data?.prebid_messages?.length
                                        ? data?.prebid_messages?.map((d, index) => {
                                            return <Q_A key={index} d={d} user={user} data={data} />;
                                        })
                                        : ""}
                                </div>
                            </>
                            : <></>) : <>
                            {data?.prebid_messages?.length ? (
                                <h3 className='cus'>Questions and Answers :</h3>
                            ) : (<></>)}
                            <div className='row'>
                                {data?.prebid_messages?.length
                                    ? data?.prebid_messages?.map((d, index) => {
                                        return <Q_A key={index} d={d} user={user} data={data} />;
                                    })
                                    : ""}
                            </div>
                        </>
                        }





                        <hr />

                        <>
                            <h3 className='cus'>Offers ({data?.bids_count})</h3>
                            <div className='col-sm-12'>
                                {data?.bids?.length ? (
                                    data?.bids?.map((bid, index) => {
                                        return (
                                            <Offer
                                                bid={bid}
                                                data={data}
                                                select_machinist={select_machinist}
                                                send_msg={send_msg}
                                                user={user}
                                                key={bid?.id}
                                                revdata={offr_rev_feed[index]?.id == bid?.user_id ? offr_rev_feed[index] : null}
                                            />
                                        );
                                    })
                                ) : (
                                    <></>
                                )}
                            </div>
                            <hr />
                        </>
                    </div>





                </div>





                <GlobalModal title='Create Your Offer' atom={atom.modal.create_offer}>
                    <div className='fdfd4'>
                        <div className='css-ung'>
                            <p>Post a Public Message or a Question to the client (optional).</p>
                            <label>Send a public message to the client..</label>
                            <textarea
                                name='message'
                                rows={4}
                                placeholder='Write your message here ...'
                                defaultValue={""}
                                value={question.message}
                                onChange={setQuestion("message")}
                            />
                            <input
                                type='submit'
                                defaultValue='Send your Message'
                                name='Prebid'
                                onClick={handleQuestion}
                            />
                            <hr />
                            <div className='row'>
                                <div className='col-sm-12'>
                                    <h5>Make an offer</h5>
                                    <p>1.Describe what you are offering in detail.</p>
                                    <p>
                                        2.Do not include your contact details (email, phone, address
                                        etc ...).
                                    </p>
                                    <p>
                                        3.The shipping costs (with parcel tracking) must be included
                                        in the price offered to the customer.
                                    </p>
                                    <textarea
                                        name='message2'
                                        rows={4}
                                        placeholder='Describe your offer here ...'
                                        defaultValue={""}
                                        value={bid.bid_desc}
                                        onChange={setbid("bid_desc")}
                                    />
                                </div>
                            </div>
                            <div className='upload-btn-wrapper'>
                                <button className='btn'>
                                    <i className='fa fa-upload' /> Add files (Max. &lt; 3 Mb)
                                </button>
                                <input type='file' name='myfile' multiple onChange={handle_file_change} />
                            </div>


                            {pr < 101 ? (
                                <ProgressBar now={pr} label={`${pr}%`} />
                            ) : (<></>)}


                            {file && pr > 100 ? (
                                file?.map((f) => {
                                    return (
                                        <>
                                            <div className="pro_div">
                                                <p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files(f)}><i className="fa fa-trash-o"></i></a></p>
                                            </div>
                                        </>
                                    )
                                })
                            ) : (<></>)}





                            <div className='row css-kjus'>
                                <div className='col-sm-6'>
                                    <label>Paid to Me : £</label>
                                    <input
                                        name='txtPrice'
                                        type='text'
                                        disabled
                                        value={bid.bid_amount}
                                        onChange={setbid("bid_amount")}
                                    />
                                </div>
                                <div className='col-sm-6'>
                                    <label>
                                        Price for client: £ <small>Includes Machining-4U fees</small>
                                    </label>
                                    <input
                                        name='bidAmt'
                                        type='text'
                                        value={bid.bid_amount_gbp}
                                        disabled={ischecked}
                                        onChange={setbid("bid_amount_gbp")}
                                    />
                                </div>
                                <div className='col-sm-12'>
                                    <label>Estimated Days Until Shipping:</label>
                                    <div className='form-inline1'>
                                        <select
                                            name='days'
                                            value={bid.bid_days}
                                            onChange={setbid("bid_days")} disabled={ischecked}>
                                            <option value={0}>-- Select --</option>
                                            <option value={2}>2 Days</option>
                                            <option value={3}>3 Days</option>
                                            <option value={4}>4 Days</option>
                                            <option value={5}>5 Days</option>
                                            <option value={6}>6 Days</option>
                                            <option value={7}>7 Days</option>
                                            <option value={8}>8 Days</option>
                                            <option value={9}>9 Days</option>
                                            <option value={10}>10 Days</option>
                                            <option value={11}>11 Days</option>
                                            <option value={12}>12 Days</option>
                                            <option value={13}>13 Days</option>
                                            <option value={14}>14 Days</option>
                                            <option value={15}>15 Days</option>
                                            <option value={16}>16 Days</option>
                                            <option value={17}>17 Days</option>
                                            <option value={18}>18 Days</option>
                                            <option value={19}>19 Days</option>
                                            <option value={20}>20 Days</option>
                                            <option value={21}>21 Days</option>
                                            <option value={22}>22 Days</option>
                                            <option value={23}>23 Days</option>
                                            <option value={24}>24 Days</option>
                                            <option value={25}>25 Days</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='col-sm-4'>
                                    <div className='form-group form-check'>
                                        <label className='form-check-label'>
                                            <input
                                                className='form-check-input'
                                                type='checkbox'
                                                onChange={(e) => {
                                                    setwill_submit(e.target.checked);
                                                    if (e.target.checked) {
                                                        setbid("bid_amount", "0")(null);
                                                        setbid("bid_amount_gbp", "0")(null);
                                                        setbid("bid_days", "0")(0);
                                                        setischecked(true)
                                                    } else if (!e.target.checked) {
                                                        setischecked(false)
                                                    }
                                                }}
                                            />{" "}
                                            Will Submit Amount Later
                                        </label>
                                    </div>
                                </div>
                                <div className='col-sm-12'>
                                    <input
                                        type='submit'
                                        defaultValue='Send your offer'
                                        name='Prebid'
                                        onClick={handleAddBid}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </GlobalModal>
                <GlobalModal title='Select Machinist' atom={atom.modal.slct_mchnst}>
                    <div className='slct-machinist-modal'>
                        {selected_machinist ? (
                            <>
                                <p>
                                    Are you sure, you want to select the offer from{" "}
                                    {selected_machinist?.user_name} for £
                                    {selected_machinist?.amount} ?
                                </p>
                                <p>This choice is final</p>
                                <p>The price can not be changed</p>
                                <div className='reg-bottom slct-mchinst'>
                                    <button
                                        type='submit'
                                        name='submit'
                                        onClick={() => {
                                            setOpen_machinist(false);
                                            setselected_machinist(null);
                                        }}>
                                        Cancel
                                    </button>
                                    <button
                                        type='submit'
                                        name='submit'
                                        onClick={handle_select_machinist}>
                                        Confirm
                                    </button>
                                </div>
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                </GlobalModal>

                <GlobalModal
                    title='Review Your Machinist'
                    atom={atom.modal.review_machinist}>
                    <div className='fdfd4'>
                        <div className='css-ung'>
                            {/* <p>Post a Public Message or a Question to the client (optional).</p> */}
                            <label>Add a valuable comment for the machinist</label>
                            <textarea
                                name='message'
                                rows={4}
                                placeholder='Write your message here ...'
                                defaultValue={""}
                                value={review.comments}
                                onChange={setreview("comments")}
                            />

                            {common.reviews_meta.map((r, index) => {
                                return <ReviewBox key={index} r={r} />;
                            })}
                            <br />



                            <h6>Average rating : {avgrat}</h6>

                            <br />

                            <input
                                type='submit'
                                defaultValue='Send your Message'
                                name='Prebid'
                                onClick={handleSubmitReview}
                            />
                            <hr />
                        </div>
                    </div>
                </GlobalModal>

            </div>
        </>

    );
};
ProjectDetail.ignorePath = true;

export default ProjectDetail;