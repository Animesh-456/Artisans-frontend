import { useAtomValue } from "jotai";

import React, { useEffect, useState } from "react";
import api from "../../../src/api/services/api";
import common from "../../../src/helpers/common";
import atom from "../../../src/jotai/atom";
import moment from "moment";
import AccountSideBar from "../../../src/views/account/edit-profile/SideBar";
import { useRouter } from "next/router";
import auth from "../../../src/validation/schema/auth";
import { CSSProperties } from 'react';
import Link from "next/link";
import Carousel from 'react-bootstrap/Carousel';
let Reviews_data = []
let job_list = []


const EditProfile = () => {
    const router = useRouter();
    const usr = useAtomValue(atom.storage.user);
    const user = useAtomValue(atom.project.api.public_me)
    const list = useAtomValue(atom.project.api.my);
    const opt = useAtomValue(atom.project.api.my_proj_opt);
    // const projects = useAtomValue(atom.project.api.my_project);

    const projects = useAtomValue(atom.project.api.public_profile_project)



    const transactions = useAtomValue(atom.auth.api.user_spent);

    const user_id = {
        id: router?.query?.id
    };


    const RefLink = (l) => {
        localStorage.setItem('items', (l));
        router.replace(l)
    }

    // useEffect(() => {
    //     api.auth.user_spent({ params: { id: router?.query?.id } });
    //     api.project.my_projects({ params: { ...opt, status: 1 } });

    // }, []);


    const udetails = {
        name: user?.name || "",
        user_name: user?.user_name || "",
        user_rating: user?.user_rating || "",
        user_picture: user?.logo || ""

    }


    // useEffect(() => {
    //     api.auth.public_me({})
    // }, [])



    const totaljobs = useAtomValue(atom.project.api.total_jobs)

    useEffect(() => {
        if (!router.isReady) return;
        let id = router.query?.id;
        api.project.public_me({ params: { id: id } })
        api.project.public_profile_api({ params: { id: id } })
        api.project.public_profile_total_jobs({ params: { id: id } })
        api.project.public_user_reviews({ params: { id: id } })
        api.project.public_profile_finalised_image({ params: { id: id } })

    }, [router.isReady]);

    const public_profile_finalised_image = useAtomValue(atom.project.api.public_profile_finalised_image);

    const public_user_reviews = useAtomValue(atom.project.api.public_user_reviews)

    let public_reviews = [];

    let public_avg_rating = 0;

    public_reviews = public_user_reviews;

    public_reviews.forEach(function (curr) {
        public_avg_rating += curr.rating;
    });


    public_avg_rating = (public_avg_rating / public_reviews?.length);

    public_avg_rating = Number(public_avg_rating.toFixed(2));




    // useEffect(() => {
    //     setSlide(project_images[0])
    // }, [])



    let ab = String(user?.prot_pic)

    let project_images = user?.prot_pic != null ? user?.prot_pic.split(",") : ''

    const [index, setIndex] = useState(0);
    const [slide, setSlide] = useState(project_images[0]);
    const [slides, setSlides] = useState([]);


    const prevSlide = () => {
        if (index == 0) {
            setIndex(slides?.length - 1);
        }
        else {
            setIndex(index - 1);
        }
        //setSlide(project_images[index]);


    }


    const nextSlide = () => {
        if (index == slides?.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }

    }



    useEffect(() => {
        if (user?.prot_pic?.length) {
            let p = user?.prot_pic?.split(",")
            setSlides(p)
        }
    }, [user?.prot_pic])









    return (
        // <>

        //     <div className='container cjw'>
        //         <div className='row'>


        //             <AccountSideBar />


        //             <div className='col-sm-8'>
        //                 <div className='profile_box'>
        //                     <div className='overview-head'>
        //                         <figure>
        //                             <img
        //                                 src={
        //                                     common.get_profile_picture(udetails?.user_picture) ||
        //                                     "/img/no-images.png"
        //                                 }
        //                             />
        //                         </figure>
        //                         <div>
        //                             <h3>{udetails.user_name}</h3>
        //                             {/* <p>{udetails.user_name}</p> */}
        //                             <div className='location_a1'>
        //                                 <div className='location_l2'>
        //                                     <h5>Feedback</h5>
        //                                 </div>
        //                                 <div className='location_r2'>
        //                                     {public_avg_rating && user?.role_id == 2 ? (
        //                                         <p>
        //                                             <div
        //                                                 className="stars"
        //                                                 style={{ '--rating': public_avg_rating } as CSSProperties}
        //                                             ><span>{public_avg_rating}</span></div>

        //                                         </p>
        //                                     ) : (
        //                                         <p>
        //                                             <div
        //                                                 className="stars"
        //                                                 style={{ '--rating': 0.0 } as CSSProperties}
        //                                             ><span>0.0</span></div>

        //                                         </p>
        //                                     )}
        //                                 </div>
        //                             </div>
        //                             <div className='location_a1'>
        //                                 <div className='location_l2'>
        //                                     <h5>Jobs Completed</h5>
        //                                 </div>
        //                                 <div className='location_r2'>
        //                                     <p>{totaljobs}</p>
        //                                 </div>
        //                             </div>




        //                         </div>
        //                     </div>



        //                     {user?.role_id == 2 && user?.service_desc?.length ? (


        //                         <>
        //                             <br />
        //                             <h5>Description</h5>


        //                             <pre className="custom-pre">
        //                                 <p>{user?.service_desc}</p>
        //                             </pre>
        //                             <br />
        //                         </>

        //                     ) : user?.role_id == 1 && user?.description?.length ? (
        //                         <>
        //                             <br />
        //                             <h5>Description</h5>


        //                             <pre className="custom-pre">
        //                                 <p>{user?.description}</p>
        //                             </pre>
        //                             <br />
        //                         </>
        //                     ) : (
        //                         <></>
        //                     )}

        //                     {user?.role_id == 2 && public_profile_finalised_image?.length ? (
        //                         <>
        //                             <h5>Finalised images</h5>
        //                             <div className='row'>
        //                                 {public_profile_finalised_image?.length
        //                                     ? (public_profile_finalised_image?.slice(0, 4).map((l) => {
        //                                         var imageSrc = common.get_attachment(l?.a, l?.d);
        //                                         if (imageSrc = '/public/404.jpg') {
        //                                             imageSrc = common.get_attachment_latest_ach(l?.a)
        //                                         }
        //                                         console.log("image src is :--", imageSrc)
        //                                         return (
        //                                             <>

        //                                                 <div className='col-sm-3'>
        //                                                     <div className='last_l'>
        //                                                         <figure>
        //                                                             <a data-toggle="tooltip" data-placement="top" title={l?.project_name}>


        //                                                                 <Link href={`/machining/${l?.b?.split(" ").join("-")}-${l?.c}`}>
        //                                                                     <img
        //                                                                         src={imageSrc}

        //                                                                     //onClick={() => RefLink(`/machining/${l?.b}-${l?.c}`)}
        //                                                                     />
        //                                                                 </Link>

        //                                                             </a>
        //                                                         </figure>
        //                                                     </div>

        //                                                 </div>
        //                                             </>
        //                                         );
        //                                     }))
        //                                     : ""}
        //                                 <div className='all_request_button'>
        //                                     <Link href={`/account/finalised/${user?.id}`}>
        //                                         <a>
        //                                             All pictures <i className='fa fa-angle-right' />
        //                                         </a>
        //                                     </Link>
        //                                 </div>
        //                             </div>
        //                         </>
        //                     ) : (
        //                         <></>
        //                     )}



        //                     {user?.role_id == 2 ? (
        //                         <>

        //                             {user?.prot_pic?.length ? (

        //                                 <div className='gallery_photo'>
        //                                     <h4>Portfolio</h4>
        //                                     <div id='demo' className='carousel slide' data-ride='carousel'>
        //                                         <div className='carousel-inner'>
        //                                             <div className='carousel-item active'>
        //                                                 <img src={common.get_portfolio_pic(`${slides[index]}`)} id="curr_img" />
        //                                             </div>
        //                                         </div>
        //                                         <button
        //                                             className='carousel-control-prev'
        //                                             onClick={prevSlide}
        //                                             data-slide='prev'>
        //                                             <i className="fa fa-angle-left"></i>
        //                                         </button>
        //                                         <button
        //                                             className='carousel-control-next'
        //                                             onClick={nextSlide}
        //                                             data-slide='next'>
        //                                             <i className="fa fa-angle-right"></i>
        //                                         </button>
        //                                     </div>
        //                                 </div>
        //                             ) : (<></>)}
        //                         </>
        //                     ) : (
        //                         <></>
        //                     )}


        //                     <div>
        //                         <h5>
        //                             Work History ({totaljobs})
        //                         </h5>

        //                         {projects.length
        //                             ? projects?.map((l) => {
        //                                 return (
        //                                     <>
        //                                         <div className='project_loop'>
        //                                             <h4>

        //                                                 {l?.pro_job == 1 ? (
        //                                                     user?.id == usr?.id ? (
        //                                                         <a href={`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`} ><b>{l?.project_name}</b></a>
        //                                                     ) : (
        //                                                         <a><b>Pro Job</b></a>
        //                                                     )
        //                                                 ) : (
        //                                                     <a href={`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`} ><b>{l?.project_name}</b></a>
        //                                                 )}
        //                                                 <span>
        //                                                     Posted :{" "}
        //                                                     {moment(l?.project_post_format_date).format("DD-MMM-YYYY")}
        //                                                 </span>
        //                                             </h4>
        //                                             <p>{l?.visibility}  {l?.programmer?.user_name ? ` | Machined by  ${l?.programmer?.user_name}` : ``}  </p>


        //                                             {l.reviews.map((r) => (

        //                                                 <div>
        //                                                     <p>Rating: {r?.rating}</p>

        //                                                     <div
        //                                                         className="stars"
        //                                                         style={{ '--rating': r?.rating } as CSSProperties}
        //                                                     ><span>{r?.rating}</span></div>
        //                                                 </div>
        //                                             ))}
        //                                             {l.reviews.map((r) => (

        //                                                 <div className="comment1">

        //                                                     {/* <div className="comment">
        //                                                     <div className="quality"
        //                                                         style={{ '--rating': r?.rating } as CSSProperties}
        //                                                     >
        //                                                         <span>Quality</span>
        //                                                     </div>


        //                                                 </div> */}

        //                                                     <div className="rating-color pub-rat">
        //                                                         <p>

        //                                                             <div
        //                                                                 className="quality"
        //                                                                 style={{ '--rating': r?.provider_rate1 } as CSSProperties}
        //                                                             ></div>
        //                                                             <span> Quality </span>
        //                                                         </p>

        //                                                         <p>

        //                                                             <div
        //                                                                 className="time"
        //                                                                 style={{ '--rating': r?.provider_rate2 } as CSSProperties}
        //                                                             ></div>
        //                                                             <span> Deadlines </span>
        //                                                         </p>

        //                                                         <p>

        //                                                             <div
        //                                                                 className="communication"
        //                                                                 style={{ '--rating': r?.provider_rate3 } as CSSProperties}
        //                                                             ></div>
        //                                                             <span> Communication</span>

        //                                                         </p>

        //                                                         <p>

        //                                                             <div
        //                                                                 className="professionalism"
        //                                                                 style={{ '--rating': r?.provider_rate4 } as CSSProperties}
        //                                                             ></div>
        //                                                             <span> Professional</span>
        //                                                         </p>
        //                                                     </div>


        //                                                     <div className="public">

        //                                                         <p>{moment(r?.review_post_date).format("DD-MM-YYYY")} | Machined By {l?.programmer?.user_name} | <a href="#" onClick={() => RefLink(`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`)}>Project Details</a></p>

        //                                                         <p><b>Rating Comments: </b> <br />{r?.comments} <br /> <a href={`/account/public-profile/${l?.creator?.id}`} >-{l?.creator?.user_name}</a></p>

        //                                                     </div>


        //                                                 </div>

        //                                             ))}
        //                                         </div>
        //                                     </>

        //                                 );

        //                             })
        //                             : ""}

        //                     </div>


        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>

        <>

            <section className="inner_banner_wp" style={{ backgroundImage: `url(../../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>My Profile</h1>
                </div>
            </section>
            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <AccountSideBar />
                        </div>
                        <div className="col-sm-8">
                            <div className="profile_box">
                                <div className="overview-head">
                                    <figure>
                                        <img
                                            src={
                                                common.get_profile_picture(udetails?.user_picture) ||
                                                "../../img/man.jpg"
                                            }
                                        />
                                    </figure>
                                    <div>
                                        <h3>{udetails.user_name}</h3>
                                        <div className="location_a1">
                                            <div className="location_l2">
                                                <h5>Feedback</h5>
                                            </div>
                                            <div className="location_r2">
                                                {/* <p>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <span>5.0</span>
                                            </p> */}

                                                {/* Dynamic logic */}

                                                {public_avg_rating && user?.role_id == 2 ? (
                                                    <div className="location_r2">
                                                    <p>
                                                        <div
                                                            className="stars"
                                                            style={{ '--rating': public_avg_rating } as CSSProperties}
                                                        ><span>{public_avg_rating}</span></div>

                                                    </p>
                                                    </div>
                                                ) : (
                                                        <div className="location_r2">
                                                    <p>
                                                        <div
                                                            className="stars"
                                                            style={{ '--rating': 0.0 } as CSSProperties}
                                                        ><span>0.0</span></div>

                                                    </p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="location_a1">
                                            <div className="location_l2">
                                                <h5>Jobs Completed</h5>
                                            </div>
                                            <div className="location_r2">
                                                <p> {totaljobs} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* <div className="gallery_photo">
                                <h4>Portfolio</h4>
                                <div id="demo" className="carousel slide" data-ride="carousel">
                                    <div className="carousel-inner">
                                        <div className="carousel-item">
                                            <img src="img/pic4.jpg" alt="" />
                                        </div>
                                        <div className="carousel-item">
                                            <img src="img/pic5.jpg" alt="" />
                                        </div>
                                        <div className="carousel-item active">
                                            <img src="img/pic2.jpg" alt="" />
                                        </div>
                                    </div>
                                    <a className="carousel-control-prev" href="#demo" data-slide="prev">
                                        <i className="fa fa-angle-double-left"></i>
                                    </a>
                                    <a className="carousel-control-next" href="#demo" data-slide="next">
                                        <i className="fa fa-angle-double-right"></i>
                                    </a>
                                </div>
                            </div> */}

                                {/* Portfolio logic */}




                                {user?.role_id == 2 ? (
                                    <>

                                        {user?.prot_pic?.length ? (

                                            // <div className='gallery_photo'>
                                            //     <h4>Portfolio</h4>
                                            //     <div id='demo' className='carousel slide' data-ride='carousel'>
                                            //         <div className='carousel-inner'>
                                            //             <div className='carousel-item active'>
                                            //                 <img src={common.get_portfolio_pic(`${slides[index]}`)} id="curr_img" />
                                            //             </div>
                                            //         </div>
                                            //         <button
                                            //             className='carousel-control-prev'
                                            //             onClick={prevSlide}
                                            //             data-slide='prev'>
                                            //             <i className="fa fa-angle-left"></i>
                                            //         </button>
                                            //         <button
                                            //             className='carousel-control-next'
                                            //             onClick={nextSlide}
                                            //             data-slide='next'>
                                            //             <i className="fa fa-angle-right"></i>
                                            //         </button>
                                            //     </div>
                                            // </div>

                                            <Carousel>
                                                {user?.prot_pic?.split(',').map((m, index) => (
                                                    <Carousel.Item key={index} interval={4000}>
                                                        <div className="carousel-item active">
                                                            <img src={common.get_portfolio_pic(m)} id="curr_img" />
                                                        </div>
                                                    </Carousel.Item>
                                                ))}
                                            </Carousel>


                                        ) : (<></>)}
                                    </>
                                ) : (
                                    <></>
                                )}

                                {user?.role_id == 2 && user?.service_desc?.length ? (


                                    <>
                                        <br />
                                        <div className="rys1">
                                            <h5>Description</h5>


                                            <pre className="custom-pre">
                                                <p>{user?.service_desc}</p>
                                            </pre>
                                        </div>
                                        <br />
                                    </>

                                ) : user?.role_id == 1 && user?.description?.length ? (
                                    <>
                                        <br />
                                        <div className="rys1">
                                            <h5>Description</h5>


                                            <pre className="custom-pre">
                                                <p>{user?.description}</p>
                                            </pre>
                                        </div>
                                        <br />
                                    </>
                                ) : (
                                    <></>
                                )}
                                <div>
                                    <div className="rys">
                                        <h5>Work History <span>({totaljobs})</span></h5>
                                    </div>
                                    {projects.length
                                        ? projects?.map((l) => {
                                            return (
                                                <>
                                                    <div className='project_loop'>
                                                        <h4>

                                                            {l?.pro_job == 1 ? (
                                                                user?.id == usr?.id ? (
                                                                    <a href={`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`} ><b>{l?.project_name}</b></a>
                                                                ) : (
                                                                    <a><b>Pro Job</b></a>
                                                                )
                                                            ) : (
                                                                <a href={`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`} ><b>{l?.project_name}</b></a>
                                                            )}

                                                        </h4>

                                                        <p>{l?.visibility}  {l?.programmer?.user_name ? ` | Artist by  ${l?.programmer?.user_name}` : ``}  </p>
                                                        <p> Posted :{" "}
                                                            {moment(l?.project_post_format_date).format("DD-MMM-YYYY")}</p>

                                                        {l.reviews.map((r) => (
                                                            <>
                                                                <div>
                                                                    <p>Rating: {r?.rating}</p>

                                                                    <div
                                                                        className="stars"
                                                                        style={{ '--rating': r?.rating } as CSSProperties}
                                                                    ><span>{r?.rating}</span></div>
                                                                </div>
                                                            </>
                                                        ))}
                                                        {l.reviews.map((r) => (

                                                            <>

                                                                <div className="comment1">



                                                                    <div className="rating-color pub-rat">
                                                                        <p>

                                                                            <div
                                                                                className="quality"
                                                                                style={{ '--rating': r?.provider_rate1 } as CSSProperties}
                                                                            ></div>
                                                                            <span> Quality </span>
                                                                        </p>

                                                                        <p>

                                                                            <div
                                                                                className="time"
                                                                                style={{ '--rating': r?.provider_rate2 } as CSSProperties}
                                                                            ></div>
                                                                            <span> Deadlines </span>
                                                                        </p>

                                                                        <p>

                                                                            <div
                                                                                className="communication"
                                                                                style={{ '--rating': r?.provider_rate3 } as CSSProperties}
                                                                            ></div>
                                                                            <span> Communication</span>

                                                                        </p>

                                                                        <p>

                                                                            <div
                                                                                className="professionalism"
                                                                                style={{ '--rating': r?.provider_rate4 } as CSSProperties}
                                                                            ></div>
                                                                            <span> Professional</span>
                                                                        </p>
                                                                    </div>


                                                                    <div className="public">

                                                                        <p>{moment(r?.review_post_date).format("DD-MM-YYYY")} | Artist By {l?.programmer?.user_name} | <a href="#" onClick={() => RefLink(`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`)}>Project Details</a></p>

                                                                        <p><b>Rating Comments: </b> <br />{r?.comments} <br /> <a href={`/account/public-profile/${l?.creator?.id}`} >-{l?.creator?.user_name}</a></p>

                                                                    </div>


                                                                </div>

                                                            </>

                                                        ))}
                                                    </div>
                                                </>

                                            );

                                        })
                                        : ""}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );




};

EditProfile.ignorePath = true

export default EditProfile;
