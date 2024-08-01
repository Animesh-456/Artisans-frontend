import { useEffect, useState } from "react";
import { CSSProperties } from 'react';
import test from "../src/validation/schema/test";
import { perfTest, Pick, Validate } from "../src/validation/utils/test";
import _ from "lodash";
import Joi from "joi";
import Carousel from 'react-bootstrap/Carousel';
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import Link from "next/link";
import api from "../src/api/services/api";
import HomeHeader from "../src/views/index/HomeHeader";
import LastJobPictures from "../src/views/index/LastJobPictures";
import { useAtomValue } from "jotai";
import atom from "../src/jotai/atom";
import { ProjectDetails } from "../src/@types/type";
import moment from "moment";
import common from "../src/helpers/common";
import router from "next/router";
import axios from "axios"
import { writeAtom } from "jotai-nexus";
import { Document, Page, pdfjs } from 'react-pdf';
import { useAtom } from "jotai";
import env from "../src/config/api";
import Head from "next/head";
import $ from 'jquery'; // Import jQuery

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;





import Crou from "./Crou";
import CustomerSays from "./CustomerSays"
import Recentart from "./Recentart";
import Popular from "./Popular";


// export const getStaticProps = async () => {
//     try {
//         const response = await fetch(`${env.base_url}project/page-details`);
//         if (!response.ok) {
//             throw new Error('Failed to fetch');
//         }
//         const data = await response.json();

//         return {
//             props: {
//                 prp: data // Assuming the fetched data structure matches what's expected
//             }
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return {
//             props: {
//                 prp: null // Or any default value indicating an error occurred
//             }
//         };
//     }
// };



const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};



function Home(prp) {
    const latest = useAtomValue(atom.project.api.latest);
    const allreviews = useAtomValue(atom.project.api.allreviews);
    const all_list = useAtomValue(atom.project.api.all_list);
    const [numPages, setNumPages] = useState(null);
    const [filename, setFilename] = useState("");
    const [opt, setOpt] = useAtom(atom.project.api.list_opt);

    const [searchQuery, setsearchQuery] = useState("");

    const user = useAtomValue(atom.storage.user);

    const onDocumentLoadSuccess = ({ numPages }) => {
        //console.log("total page in pdf", numPages);
        setNumPages(numPages);
    };

    const totaljobs = useAtomValue(atom.project.api.total_jobs)


    useEffect(() => {
        api.project.latest({ params: { page: 0 } });
    }, []);

    useEffect(() => {
        api.project.allreviews({ params: opt });
    }, []);


    return (
        <>

            {/* <div id="myCarousel" className="carousel slide" data-ride="carousel">

                <Carousel>
                    <Carousel.Item interval={5000}>
                        <div className="carousel-item active">
                            <h1><b>Free shipping on all order</b> <a href="#">out now</a></h1>
                            <img src="img/SLIDER-_1.jpg" alt="" />
                            <div className="capt_ion">
                                <h2>600+ artworks</h2>
                                <p>Transform Your Space with Stunning Wall Art</p>
                            </div>
                        </div>
                    </Carousel.Item>
                    <Carousel.Item interval={5000}>
                        <div className="carousel-item active">
                            <h1><b>Free shipping on all order</b> <a href="#">out now</a></h1>
                            <img src="img/SLIDER-_2.jpg" alt="" />
                            <div className="capt_ion">
                                <h2>600+ artworks</h2>
                                <p>Transform Your Space with Stunning Wall Art</p>
                            </div>
                        </div>
                    </Carousel.Item>
                </Carousel>
            </div> */}


            <section className="banner_wp" style={{ backgroundImage: `url(./img/header-banner-bg.jpg)` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="banner_pic">
                                <img className="carve" src={"img/carve.png"} alt="carve-img" />
                                <img src={"img/banner-img.png"} alt="banner-img" />
                                <div className="createdby">
                                    <a href="#"><img src={"img/man.jpg"} alt="man-img" /> Created by Raveart</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-7">
                            <div className="banner_text">
                                <h1>Inspiring</h1>
                                <h2>Original Art Work</h2>
                                <div className="search">
                                    <Link href={`/artworklisting?searchQuery=${searchQuery}`}><span className="fa fa-search"></span></Link>
                                    <input value={searchQuery} onChange={(e) => setsearchQuery(e.target.value)} placeholder="Search for any service..." />
                                </div>

                                <div className="mt-60 d-flex flex-column flex-sm-row flex-wrap gap-4 align-items-center">
                                    <div className="d-flex gap-3 align-items-center">
                                        <div className="hero-group-img-wrapper">
                                            <img src="https://workzone.mamunuiux.com/uploads/custom-images/intro-two--2024-07-10-12-24-55-5158.webp" className="hero-group-img" alt="" />
                                        </div>
                                        <div>
                                            <h3 className="hero-counter-title fw-bold"> 35M+ </h3>
                                            <p className="fd">Happy Customers</p>
                                        </div>
                                    </div>
                                    <div className="hero-rating">
                                        <h3 className="hero-counter-title fw-bold">4.9</h3>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="66" height="11" viewBox="0 0 66 11" fill="none">
                                            <path d="M11.1141 4.15628C11.0407 3.92385 10.8406 3.75929 10.6048 3.73731L7.38803 3.43649L6.11676 0.370622C6.0229 0.145376 5.80934 0 5.57163 0C5.33392 0 5.12027 0.145376 5.02701 0.370622L3.75574 3.43649L0.538508 3.73731C0.302669 3.75973 0.102963 3.92429 0.0291678 4.15628C-0.0442024 4.3887 0.0235566 4.64364 0.201923 4.80478L2.63351 7.0011L1.91656 10.2539C1.8641 10.493 1.95422 10.7403 2.14687 10.8838C2.25042 10.9613 2.37208 11 2.49417 11C2.59908 11 2.70407 10.9713 2.79785 10.9135L5.57163 9.20504L8.3449 10.9135C8.54835 11.0387 8.80417 11.0272 8.99639 10.8838C9.18904 10.7403 9.27916 10.493 9.22671 10.2539L8.50975 7.0011L10.9413 4.80478C11.1196 4.64364 11.1875 4.38923 11.1141 4.15628Z" fill="white"></path>
                                            <path d="M24.8282 4.15628C24.7548 3.92385 24.5547 3.75929 24.3189 3.73731L21.1021 3.43649L19.8309 0.370622C19.737 0.145376 19.5235 0 19.2857 0C19.048 0 18.8344 0.145376 18.7411 0.370622L17.4699 3.43649L14.2526 3.73731C14.0168 3.75973 13.8171 3.92429 13.7433 4.15628C13.6699 4.3887 13.7377 4.64364 13.916 4.80478L16.3476 7.0011L15.6307 10.2539C15.5782 10.493 15.6683 10.7403 15.861 10.8838C15.9645 10.9613 16.0862 11 16.2083 11C16.3132 11 16.4182 10.9713 16.512 10.9135L19.2857 9.20504L22.059 10.9135C22.2625 11.0387 22.5183 11.0272 22.7105 10.8838C22.9032 10.7403 22.9933 10.493 22.9408 10.2539L22.2239 7.0011L24.6555 4.80478C24.8337 4.64364 24.9016 4.38923 24.8282 4.15628Z" fill="white"></path>
                                            <path d="M38.5428 4.15628C38.4694 3.92385 38.2693 3.75929 38.0335 3.73731L34.8167 3.43649L33.5455 0.370622C33.4516 0.145376 33.2381 0 33.0003 0C32.7626 0 32.549 0.145376 32.4557 0.370622L31.1845 3.43649L27.9672 3.73731C27.7314 3.75973 27.5317 3.92429 27.4579 4.15628C27.3845 4.3887 27.4523 4.64364 27.6306 4.80478L30.0622 7.0011L29.3453 10.2539C29.2928 10.493 29.3829 10.7403 29.5756 10.8838C29.6791 10.9613 29.8008 11 29.9229 11C30.0278 11 30.1328 10.9713 30.2266 10.9135L33.0003 9.20504L35.7736 10.9135C35.9771 11.0387 36.2329 11.0272 36.4251 10.8838C36.6178 10.7403 36.7079 10.493 36.6554 10.2539L35.9385 7.0011L38.3701 4.80478C38.5483 4.64364 38.6162 4.38923 38.5428 4.15628Z" fill="white"></path>
                                            <path d="M52.2567 4.15628C52.1833 3.92385 51.9832 3.75929 51.7473 3.73731L48.5306 3.43649L47.2593 0.370622C47.1655 0.145376 46.9519 0 46.7142 0C46.4765 0 46.2629 0.145376 46.1696 0.370622L44.8983 3.43649L41.6811 3.73731C41.4452 3.75973 41.2455 3.92429 41.1717 4.15628C41.0984 4.3887 41.1661 4.64364 41.3445 4.80478L43.7761 7.0011L43.0591 10.2539C43.0067 10.493 43.0968 10.7403 43.2894 10.8838C43.393 10.9613 43.5147 11 43.6367 11C43.7417 11 43.8467 10.9713 43.9404 10.9135L46.7142 9.20504L49.4875 10.9135C49.6909 11.0387 49.9467 11.0272 50.139 10.8838C50.3316 10.7403 50.4217 10.493 50.3693 10.2539L49.6523 7.0011L52.0839 4.80478C52.2622 4.64364 52.33 4.38923 52.2567 4.15628Z" fill="white"></path>
                                            <path opacity="0.3" d="M65.9708 4.15628C65.8974 3.92385 65.6973 3.75929 65.4614 3.73731L62.2447 3.43649L60.9735 0.370622C60.8796 0.145376 60.666 0 60.4283 0C60.1906 0 59.977 0.145376 59.8837 0.370622L58.6124 3.43649L55.3952 3.73731C55.1594 3.75973 54.9597 3.92429 54.8859 4.15628C54.8125 4.3887 54.8802 4.64364 55.0586 4.80478L57.4902 7.0011L56.7732 10.2539C56.7208 10.493 56.8109 10.7403 57.0036 10.8838C57.1071 10.9613 57.2288 11 57.3509 11C57.4558 11 57.5608 10.9713 57.6545 10.9135L60.4283 9.20504L63.2016 10.9135C63.405 11.0387 63.6609 11.0272 63.8531 10.8838C64.0457 10.7403 64.1359 10.493 64.0834 10.2539L63.3664 7.0011L65.798 4.80478C65.9763 4.64364 66.0442 4.38923 65.9708 4.15628Z" fill="white"></path>
                                        </svg>
                                    </div>
                                </div>
                                {/* <div className="popular_wp">
                                    Popular:
                                    <span onClick={() => setsearchQuery("Painting")}>Painting</span>
                                    <span onClick={() => setsearchQuery("Music")}>Music</span>
                                    <span onClick={() => setsearchQuery("Animation")}>Animation</span>
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* <div className="container">
                <div className="yh4d yh1d"><h1>latest art</h1></div>
                <div className="row">
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic2.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic3.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic2.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic1.jpg" alt="" />
                        </div>
                    </div>
                    <div className="col-sm-4">
                        <div className="yh5d">
                            <img src="img/pic3.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div> */}



            <section className="popular_category">
                <div className="container">

                    {/* <a className="view_all" href="#">View all categories <img src={"img/arrow.png"} width="11px" alt="" /></a> */}
                    <ul className="popular_category_listing">
                        <li>
                            <a href={`/artworklisting?category=Painting`}>
                                <img src="img/icon.png" alt="" />
                                <p>Painting</p>
                            </a>
                        </li>
                        <li>
                            <a href={`/artworklisting?category=Drawing`}>
                                <img src="img/icon.png" alt="" />
                                <p>Drawing</p>
                            </a>
                        </li>
                        <li>
                            <a href={`/artworklisting?category=Sculpture`}>
                                <img src="img/icon.png" alt="" />
                                <p>Sculpture</p>
                            </a>
                        </li>
                        <li>
                            <a href={`/artworklisting?category=Photography`}>
                                <img src="img/icon.png" alt="" />
                                <p>Photography</p>

                            </a>
                        </li>
                        <li>
                            <a href={`/artworklisting?category=Printmaking`}>
                                <img src="img/icon.png" alt="" />
                                <p>Printmaking</p>
                            </a>
                        </li>
                        <li>
                            <a href={`/artworklisting?category=Mixed+Media`}>
                                <img src="img/icon.png" alt="" />
                                <p>Mixed Media</p>
                            </a>
                        </li>
                        <li>
                            <a href={`/artworklisting?category=Textile+Art`}>
                                <img src="img/icon.png" alt="" />
                                <p>Textile Art</p>
                            </a>
                        </li>
                    </ul>


                    {/* <Popular /> */}



                </div>
            </section>

            {/* <div className="container-fluid qwe2">
                <div className="yh4d howw"><h1>how we works</h1></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="yh3d">
                                <h5>send your ideas</h5>
                                <img src="img/work-icon.png" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="yh3d">
                                <h5>choose product</h5>
                                <img src="img/work-icon1.png" alt="" />
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="yh3d">
                                <h5>Pay after delivery<br /> only if satisfied</h5>
                                <img src="img/work-icon2.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}


            <section className="discover_wp" >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-5 discover_left">
                            <div className="heading_title">
                                <h1>Discover Your  <br /> Artwork</h1>
                            </div>
                            <br /><br />
                            <p>
                                Welcome to AARTSTUDIO, the premier online platform where talented artisans and artists are
                                ready to create custom artwork just for you. Whether you're envisioning a unique painting, a
                                stunning sculpture, or any other form of artwork, AARTSTUDIO makes the process easy and
                                enjoyable.
                            </p>
                            <p>Browse through our extensive directory of skilled artisans, each showcasing their unique style
                                and portfolio. You'll find a variety of artistic talents, ensuring you can discover an artist whose
                                work resonates with your vision.</p>
                            {/* <p>
                                Share your custom art needs and ideas on AARTSTUDIO. Detail your vision, preferences, and any
                                specific requirements to give the artisans a clear understanding of what you’re looking for.
                                AARTSTUDIO will connect you with the right artist to create your perfect custom artwork.
                            </p>
                            <p>
                                Discovering and commissioning custom artwork has never been easier. AARTSTUDIO simplifies
                                the process of commissioning custom art, providing a seamless and enjoyable experience for
                                both customers and artisans.
                            </p>
                            <p>
                                Explore the world of art, and let us help you discover your next masterpiece!
                            </p> */}

                            <Link href={`/artrequest`}>Know More</Link>
                        </div>
                        <div className="col-sm-7">
                            <div className="discover_img">
                                <img className="carve_pic" src="img/pic1.png" alt="" />
                                <img className="pic1" src="img/pic.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* <div className="container-fluid recent-art">
                <div className="yh4d yh1d"><h1>recent art from our artists</h1></div>
                <Recentart />
            </div> */}



            <section className="latest_request" >
                <div className="container">
                    <div className="heading_title latest_request_heading">
                        <h1>Latest Requests</h1>
                    </div>




                    {latest?.length
                        ? latest?.map((l) => {
                            const strt = new Date(l?.project_post_format_date)


                            let n = new Date().toLocaleString('en-US', {
                                timeZone: 'Asia/Kolkata',
                            });
                            const nd = new Date(n)

                            const today = new Date()
                            nd.setHours(nd.getHours(), nd.getMinutes(), nd.getSeconds());

                            const timeDiff = nd.getTime() - strt.getTime();

                            const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));


                            const hourDifference = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);


                            const date = new Date(l?.created * 1000);

                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            const seconds = String(date.getSeconds()).padStart(2, '0');

                            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                            const dt = new Date();
                            console.log("current date--------->>", dt);

                            return (
                                <>
                                    <div className="row">


                                        {l?.visibility.toLowerCase() == "public" ? (
                                            <div className="col-sm-3">
                                                <div className="latest_request_pic">
                                                    {l?.attachment_name?.includes(",") ? (
                                                        <>
                                                            <img className="art-img1" src={common.get_attachment(
                                                                (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
                                                            ) || "../img/logo.png"} alt="" /></>
                                                    ) : (
                                                        <>

                                                            <img className="art-img1" src={common.get_attachment(
                                                                (l?.attachment_name), formattedDate) || "../img/logo.png"} alt="art-image" />
                                                        </>
                                                    )}
                                                    {l?.project_status >= "1" ? (

                                                        <img className="cir" src={"/img/circle.png"} alt="awarded-img" />
                                                    ) : (
                                                        <></>
                                                    )}
                                                </div>
                                            </div>
                                        ) : l?.visibility.toLowerCase() == "private" ? (
                                            (user && (user?.role_id == 2 && Number(totaljobs) >= 1) || (user?.id == l?.creator_id) ? (
                                                <div className="col-sm-3">
                                                    <div className="latest_request_pic">
                                                        {l?.attachment_name?.includes(",") ? (
                                                            <>
                                                                <img className="art-img1" src={common.get_attachment(
                                                                    (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
                                                                ) || "../img/logo.png"} alt="" /></>
                                                        ) : (
                                                            <>

                                                                <img className="art-img1" src={common.get_attachment(
                                                                    (l?.attachment_name), formattedDate) || "../img/logo.png"} alt="art-image" />
                                                            </>
                                                        )}
                                                        {l?.project_status >= "1" ? (

                                                            <img className="cir" src={"/img/circle.png"} alt="awarded-img" />
                                                        ) : (
                                                            <></>
                                                        )}
                                                    </div>
                                                </div>
                                            ) : (<figure><img
                                                src='../img/logo.png'
                                            /></figure>))
                                        ) : (<></>)}



                                        <div className="col-sm-9">
                                            <div className="latest_request_text">
                                                <h1>{l?.project_name}</h1>
                                                <p>{l?.description?.length > 80 ? (l?.description?.slice(0, 150) + '...') : (l?.description)} </p>
                                                <div>
                                                    <span>by {l?.creator?.user_name} <i className="fa fa-check-circle"></i></span>
                                                    <span>Posted: {diffInDays} days {hourDifference} hours</span>
                                                    <span></span>
                                                    <span><a href="#">{l?.bids_count} offers</a></span>
                                                </div>
                                                <a href={`/${l?.project_name?.split(" ").join("-")}-${l?.id}`}>View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                </>

                            );
                        }).slice(0, 3)
                        : ""}



                    <a className="view_all viewall_center" style={{ color: "#080424" }} href={"/artworklisting"}>View All <img src="img/arrow.png" width="11px" alt="" /></a>
                </div>
            </section>

            {/* <div className="container-fluid recent-art">
                <div className="yh4d yh1d"><h1>artist & artisans</h1></div>
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="artist1">
                                <img src="img/pic1.jpg" alt="" />
                                <h4>incorporate abstract wall art print in your home decor</h4>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="artist1">
                                <img src="img/pic2.jpg" alt="" />
                                <h4>incorporate abstract wall art print in your home decor</h4>
                            </div>
                        </div>
                        <div className="col-sm-4">
                            <div className="artist1">
                                <img src="img/pic3.jpg" alt="" />
                                <h4>incorporate abstract wall art print in your home decor</h4>
                            </div>
                        </div>
                    </div>
                    <div className="view_all">
                        <a href="#">view all</a>
                    </div>
                </div>
            </div> */}


            <section className="top_artist" >
                <div className="container">
                    <div className="heading_title top_artist_heading">
                        <h1>Top Artist & Their Work</h1>
                    </div>

                    <div className="owl-carousel top_artist_slide owl-theme">
                        <Crou />
                    </div>
                </div>
            </section>



            {allreviews?.length ? (

                <section className="customer_wp" >
                    <div className="container">


                        <div className="heading_title testimonial_heading">
                            <h1>What Our Customers Are Saying</h1>
                        </div>
                        <div className="owl-carousel owl-carousel1 owl-theme">
                            <CustomerSays />
                        </div>
                        {/* <div className="testimonial_animation">
                            <img src={"../img/icon1.png"} alt="" />
                        </div> */}

                    </div>
                </section>
            ) : (<></>)}




        </>
    );
}


Home.ignorePath = true;
export default Home;
