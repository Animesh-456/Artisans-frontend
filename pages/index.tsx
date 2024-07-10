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
                                    <Link href={`/machining/listing?searchQuery=${searchQuery}`}><span className="fa fa-search"></span></Link>
                                    <input value={searchQuery} onChange={(e) => setsearchQuery(e.target.value)} placeholder="Search for any service..." />
                                </div>
                                <div className="popular_wp">
                                    Popular:
                                    <span onClick={() => setsearchQuery("Painting")}>Painting</span>
                                    <span onClick={() => setsearchQuery("Music")}>Music</span>
                                    <span onClick={() => setsearchQuery("Animation")}>Animation</span>
                                </div>
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
                    <div className="heading_title">
                        <h1>Popular Category</h1>
                    </div>
                    <a className="view_all" href="#">View all categories <img src={"img/arrow.png"} width="11px" alt="" /></a>
                    <ul className="popular_category_listing">
                        <li>
                            <a href={`/machining/listing?category=Painting`}>
                                <img src="img/icon.png" alt="" />
                                <p>Painting</p>
                            </a>
                        </li>
                        <li>
                            <a href={`/machining/listing?category=Drawing`}>
                                <img src="img/icon.png" alt="" />
                                <p>Drawing</p>
                            </a>
                        </li>
                        <li>
                            <a href={`/machining/listing?category=Sculpture`}>
                                <img src="img/icon.png" alt="" />
                                <p>Sculpture</p>
                            </a>
                        </li>
                        <li>
                            <a href={`/machining/listing?category=Photography`}>
                                <img src="img/icon.png" alt="" />
                                <p>Photography</p>

                            </a>
                        </li>
                        <li>
                            <a href={`/machining/listing?category=Printmaking`}>
                                <img src="img/icon.png" alt="" />
                                <p>Printmaking</p>
                            </a>
                        </li>
                        <li>
                            <a href={`/machining/listing?category=Mixed+Media`}>
                                <img src="img/icon.png" alt="" />
                                <p>Mixed Media</p>
                            </a>
                        </li>
                        <li>
                            <a href={`/machining/listing?category=Textile+Art`}>
                                <img src="img/icon.png" alt="" />
                                <p>Textile Art</p>
                            </a>
                        </li>
                    </ul>
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


            <section className="discover_wp" style={{ backgroundImage: `url(./img/bg1.jpg)` }}>
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
                            <p>
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
                            </p>

                            <Link href={`/job/post`}>Know More</Link>
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



            <section className="latest_request" style={{ backgroundImage: `url(./img/bg2.jpg)` }}>
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
                                                <p>{l?.description?.length > 80 ? (l?.description?.slice(0, 80) + '...') : (l?.description)} </p>
                                                <div>
                                                    <span>by {l?.creator?.user_name} <i className="fa fa-check-circle"></i></span>
                                                    <span>Posted: {diffInDays} days {hourDifference} hours</span>
                                                    <span></span>
                                                    <span><a href="#">{l?.bids_count} offers</a></span>
                                                </div>
                                                <a href={`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`}>View Details</a>
                                            </div>
                                        </div>
                                    </div>
                                    <hr></hr>
                                </>

                            );
                        }).slice(0, 3)
                        : ""}

                    <hr />

                    <a className="view_all viewall_center" href={"/machining/listing"}>View all <img src="img/arrow.png" width="11px" alt="" /></a>
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


            <section className="top_artist" style={{ backgroundImage: `url(./img/bg3.jpg)` }}>
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

                <section className="customer_wp" style={{ backgroundImage: `url(./img/bg4.jpg)` }}>
                    <div className="container">


                        <div className="heading_title testimonial_heading">
                            <h1>What Our Customers Are Saying</h1>
                        </div>
                        <div className="owl-carousel owl-carousel1 owl-theme">
                            <CustomerSays />
                        </div>
                        <div className="testimonial_animation">
                            <img src={"../img/icon1.png"} alt="" />
                        </div>

                    </div>
                </section>
            ) : (<></>)}




        </>
    );
}


Home.ignorePath = true;
export default Home;
