import { useAtomValue } from "jotai/utils";
import atom from "../../../src/jotai/atom";
import { useEffect, useState } from "react";
import common from "../../../src/helpers/common";
import router from "next/router";
import api from "../../../src/api/services/api";
import GlobalModal from "../../../src/views/Common/Modals/GlobalModal";
import { useAtom } from "jotai";
import Link from "next/link";
// import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import { CSSProperties } from 'react';


const artist = () => {
    const router = useRouter();
    const all_list = useAtomValue(atom.project.api.all_list);
    const project_gallery = useAtomValue(atom.project.api.project_gallery)
    const user = useAtomValue(atom.project.api.public_me)
    const totaljobs = useAtomValue(atom.project.api.total_jobs)
    const projects = useAtomValue(atom.project.api.public_profile_project)


    useEffect(() => {
        api.project.all_lists({ params: {} });
        // api.project.public_me({ params: { id: "17281" } })
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        let id = router.query?.id;
        api.project.public_me({ params: { id: id } })
        api.project.public_profile_total_jobs({ params: { id: id } })

        // api.project.public_user_reviews({ params: { id: id } })
        api.project.public_profile_api({ params: { id: id } })

    }, [router.isReady]);

    useEffect(() => {
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
        console.log("Page number is ", pageNumber)
        api.project.project_gallery({ params: { ...galleryopt, page: pageNumber - 1 } });
    }, [])

    console.log("all lists are: ------------->", all_list)

    const RefLink = (l) => {
        localStorage.setItem('items', (l));
        router.replace(l)
    }



    const [index, setIndex] = useState(0);
    const [open_img, setOpen_img] = useAtom(atom.modal.img_viewer);
    const [slide, setSlide] = useState(project_gallery[0]?.a);

    const [project_name, setproject_name] = useState(project_gallery[0]?.a)
    const [id, setid] = useState(project_gallery[0]?.c)
    const [dt, setdt] = useState(project_gallery[0]?.d)
    const [portfolio, setportfolio] = useState(true);
    const [artist, setartist] = useState(false);


    const prevSlide = () => {

        if (index == 0) {
            setIndex(project_gallery.length - 1);
        }
        else {
            setIndex(index - 1);
        }
        setSlide(project_gallery[index]?.a);
        setproject_name(project_gallery[index]?.b)
        setid(project_gallery[index]?.c)
        setdt(project_gallery[index]?.d)
        console.log("prev slide ", slide);




    }


    const nextSlide = () => {

        if (index == project_gallery.length - 1) {
            setIndex(0)
            setSlide(project_gallery[index]?.a);
            setproject_name(project_gallery[index]?.b)
            setid(project_gallery[index]?.c)
            setdt(project_gallery[index]?.d)
        } else {
            setIndex((prevState) => prevState + 1)
            setSlide(project_gallery[index]?.a);
            setproject_name(project_gallery[index]?.b)
            setid(project_gallery[index]?.c)
            setdt(project_gallery[index]?.d)
        }


        console.log("next slide ", slide);

        console.log("index is->>>>", index)

        console.log("modal slide-->", img_modal)

    }

    console.log("gallery images :-", project_gallery)

    console.log("index is :- ", index)

    console.log("slide is:-", slide)

    // useEffect(() => {
    //     setSlide(project_gallery[index]?.a);
    //     setproject_name(project_gallery[index]?.b)
    //     setid(project_gallery[index]?.c)
    //     setdt(project_gallery[index]?.d)
    //     console.log("useeffect all states", index, slide, project_name, id, dt)
    // }, [index])


    const handlePageClick = (i) => {

        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.project_gallery({ params: { ...galleryopt, page: i } });
            });
    };


    const galleryopt = useAtomValue(atom.project.api.gallery_opt);

    const visiblePages = 10; // Number of visible page buttons
    const getPageNumbers = () => {
        const startPage = Math.max(0, galleryopt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(galleryopt.total_pages, startPage + visiblePages - 1);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const [img_modal, setimg_modal] = useState(null)

    // useEffect(() => {
    //     let md = common.get_attachment(slide, dt)
    //     if (md = '/public/404.jpg') {
    //         setimg_modal(common.get_attachment_latest_ach(slide))
    //     } else {
    //         setimg_modal(common.get_attachment(slide, dt))
    //     }
    // }, [])

    const modal_img = (a, b) => {
        let md = common.get_attachment(a, b)
        if (md = '/public/404.jpg') {
            md = common.get_attachment_latest_ach(a)
            setimg_modal(md)
        } else {
            md = common.get_attachment(a, b)
            setimg_modal(md)
        }

        return md
    }

    // useEffect(() => {
    //     var md = common.get_attachment(project_gallery[index]?.a, project_gallery[index]?.d);
    //     if (md = '/public/404.jpg') {
    //         md = common.get_attachment_latest_ach(project_gallery[index]?.a)
    //     }

    //     console.log("md is", md)
    //     setimg_modal(md)
    //     console.log("img modal useeffect",img_modal)
    //     //setimg_modal(common.get_attachment(slide, dt))
    // }, [index])

    useEffect(() => {
        console.log("index in useeffect", index)

        var md = common.get_attachment(project_gallery[index]?.a, project_gallery[index]?.d)
        if (md = '/public/404.jpg') {
            md = common.get_attachment_latest_ach(project_gallery[index]?.a)
            setimg_modal(md)
        } else {
            setimg_modal(md)
        }
    }, [index])

    const selectcust = () => {
        if (portfolio == false) {
            setportfolio(true)
        }
        setartist(false)

    }

    const select_mac = () => {
        if (artist == false) {
            setartist(true)
        }
        setportfolio(false)

    }

    const udetails = {
        name: user?.name || "",
        user_name: user?.user_name || "",
        user_rating: user?.user_rating || "",
        user_picture: user?.prof_pic || "",
        description: user?.description || ""

    }
    const public_user_reviews = useAtomValue(atom.project.api.public_user_reviews)

    let public_reviews = [];

    let public_avg_rating = 0;

    public_reviews = public_user_reviews;

    public_reviews.forEach(function (curr) {
        public_avg_rating += curr.rating;
    });


    public_avg_rating = (public_avg_rating / public_reviews?.length);

    public_avg_rating = Number(public_avg_rating.toFixed(2));

    return (


        <>



            <section className="inner_banner_wp1" style={{ backgroundImage: `url(../../img/header-banner-bg.jpg)` }}>
                <div className="container">
                    <div className="artist_pro">
                        <div className="artist_pro_l">
                            {/* <img src="../../img/man.jpg" alt="artist" /> */}

                            <img
                                src={
                                    common.get_profile_picture(udetails?.user_picture) ||
                                    "../../img/no-images.png"
                                }
                            />

                        </div>
                        <div className="artist_pro_r">
                            <h1> {udetails.user_name} <i className="fa fa-check-circle"></i></h1>
                            <p>Sculpture Artist</p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="artist_pro_tab">
                <div className="container">
                    <ul className="nav nav-tabs" role="tablist">

                        <li className="nav-item">
                            <a className={`nav-link ${portfolio ? "active" : ""}`} data-toggle="tab" href="#portfolio" onClick={selectcust}>Portfolio</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${artist ? "active" : ""}`} data-toggle="tab" href="#" onClick={select_mac}>About</a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div id="portfolio" className={`tab-pane ${portfolio ? "active" : ""}`}>
                            <div className="row">
                                <div className="col-sm-3">
                                    <a href="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23373548/2023/5/24/56145130-901f-4458-96d8-7fd79395f6161684916789570WallArt1.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="https://assets.myntassets.com/h_720,q_90,w_540/v1/assets/images/23373548/2023/5/24/56145130-901f-4458-96d8-7fd79395f6161684916789570WallArt1.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="https://assets.myntassets.com/f_webp,h_560,q_90,w_420/v1/assets/images/24688614/2023/8/28/324c1459-9208-462f-80b9-eb2ac7b7d1951693204534842WallArt1.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="https://assets.myntassets.com/f_webp,h_560,q_90,w_420/v1/assets/images/24688614/2023/8/28/324c1459-9208-462f-80b9-eb2ac7b7d1951693204534842WallArt1.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="https://assets.myntassets.com/f_webp,h_560,q_90,w_420/v1/assets/images/22935384/2023/4/28/88b4ce07-02cc-4b94-95d2-af2dc74cadce1682675775271WallArt1.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="https://assets.myntassets.com/f_webp,h_560,q_90,w_420/v1/assets/images/22935384/2023/4/28/88b4ce07-02cc-4b94-95d2-af2dc74cadce1682675775271WallArt1.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="https://assets.myntassets.com/f_webp,h_560,q_90,w_420/v1/assets/images/29559872/2024/5/15/6aa7e156-d6ad-4688-8a57-9a8db1d392c81715753553385WallArt1.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="https://assets.myntassets.com/f_webp,h_560,q_90,w_420/v1/assets/images/29559872/2024/5/15/6aa7e156-d6ad-4688-8a57-9a8db1d392c81715753553385WallArt1.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="https://assets.myntassets.com/f_webp,h_560,q_90,w_420/v1/assets/images/18858602/2022/6/24/0adb28ee-996d-4e5a-9a15-9e4735581fcb1656073249955999StoreBluePinkAbstractWallArt1.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="https://assets.myntassets.com/f_webp,h_560,q_90,w_420/v1/assets/images/18858602/2022/6/24/0adb28ee-996d-4e5a-9a15-9e4735581fcb1656073249955999StoreBluePinkAbstractWallArt1.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="img/pic16.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="img/pic16.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="img/pic17.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="img/pic17.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="img/pic18.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="img/pic18.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="img/pic15.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="img/pic15.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="img/pic16.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="img/pic16.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="img/pic17.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="img/pic17.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                                <div className="col-sm-3">
                                    <a href="img/pic18.jpg" data-fancybox="gallery" data-caption="Wall Painting">
                                        <img src="img/pic18.jpg" alt="" />
                                        <p>Wall Painting</p>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div id="machinist" className={`tab-pane ${portfolio ? "" : "active"}`}>
                            <div className="row ">
                                <div className="col-sm-4">
                                    <h5>About</h5>
                                </div>
                                <div className="col-sm-8">
                                    <div className="about_left">


                                        {public_avg_rating && user?.role_id == 2 ? (

                                            <p>
                                                <div
                                                    className="stars"
                                                    style={{ '--rating': public_avg_rating } as CSSProperties}
                                                ><span>{public_avg_rating}</span></div>

                                            </p>

                                        ) : (

                                            <p>
                                                <div
                                                    className="stars"
                                                    style={{ '--rating': 0.0 } as CSSProperties}
                                                ><span>0.0</span></div>

                                            </p>

                                        )}
                                        <p>{user?.service_desc}</p>
                                        <br />

                                        <br />
                                        <small>Member since: <p>{moment.unix(user?.created).format("DD-MMM,YYYY")}</p></small>
                                        <br /><br />
                                        <h6>Experience</h6>
                                        <ul className="ex">
                                            <li>
                                                <h2>{totaljobs}</h2>
                                                <small> Total Jobs</small>
                                            </li>
                                            <li>

                                                {public_avg_rating && user?.role_id == 2 ? (

                                                    <>
                                                        <h2>{public_avg_rating}</h2>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h2>0</h2>
                                                    </>
                                                )}

                                                <small>Reviews</small>
                                            </li>

                                            <li>
                                                <h2>100%</h2>
                                                <small>jobs awarded</small>
                                            </li>
                                        </ul>

                                        <br />

                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <h5>Reviews</h5>
                                </div>
                                {/* <div className="col-sm-8">
                                    <div className="review_right">
                                        <div className="review_right1">
                                            <p>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <i className="fa fa-star-half-o"></i>
                                            </p><br />
                                            <p><i>"Lorem Ipsum is simply dummy text of the"</i></p>
                                            <a href="#">Full Review</a>
                                            <p className="qg">
                                                <img src="img/man.jpg" alt="" />
                                                Kazi
                                            </p>
                                            <small>reviewed 15 days ago</small>
                                        </div>
                                        <div className="review_right2">
                                            <img src="img/about-img1.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="review_right">
                                        <div className="review_right1">
                                            <p>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <i className="fa fa-star-half-o"></i>
                                            </p><br />
                                            <p><i>"Lorem Ipsum is simply dummy text of the"</i></p>
                                            <a href="#">Full Review</a>
                                            <p className="qg">
                                                <img src="img/man.jpg" alt="" />
                                                Kazi
                                            </p>
                                            <small>reviewed 15 days ago</small>
                                        </div>
                                        <div className="review_right2">
                                            <img src="img/pic12.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="review_right">
                                        <div className="review_right1">
                                            <p>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <i className="fa fa-star-half-o"></i>
                                            </p><br />
                                            <p><i>"Lorem Ipsum is simply dummy text of the"</i></p>
                                            <a href="#">Full Review</a>
                                            <p className="qg">
                                                <img src="img/man.jpg" alt="" />
                                                Kazi
                                            </p>
                                            <small>reviewed 15 days ago</small>
                                        </div>
                                        <div className="review_right2">
                                            <img src="img/pic11.jpg" alt="" />
                                        </div>
                                    </div>
                                    <div className="review_right">
                                        <div className="review_right1">
                                            <p>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <i className="fa fa-star-half-o"></i>
                                            </p><br />
                                            <p><i>"Lorem Ipsum is simply dummy text of the"</i></p>
                                            <a href="#">Full Review</a>
                                            <p className="qg">
                                                <img src="img/man.jpg" alt="" />
                                                Kazi
                                            </p>
                                            <small>reviewed 15 days ago</small>
                                        </div>
                                        <div className="review_right2">
                                            <img src="img/about-img3.jpg" alt="" />
                                        </div>
                                    </div>
                                </div> */}

                                <div className="col-sm-8">
                                    {projects.length
                                        ? projects?.map((l) => {
                                            return (
                                                <>
                                                    {l.reviews.map((r) => (
                                                        <>
                                                            <div className="review_right">
                                                                <div className="review_right1">
                                                                    <p>
                                                                        <div
                                                                            className="stars"
                                                                            style={{ '--rating': r?.rating } as CSSProperties}
                                                                        ><span>{r?.rating}</span></div>
                                                                    </p><br />
                                                                    <p><i>{r?.comments}</i></p>

                                                                    <p className="qg">
                                                                        <img src={
                                                                            common.get_profile_picture(l?.buyer?.logo) ||
                                                                            "../../img/no-images.png"
                                                                        } alt="profile-picture" />
                                                                        {l?.creator?.user_name}
                                                                    </p>
                                                                    <small>{moment(l?.project_post_format_date).format("DD-MMM-YYYY")}</small>

                                                                </div>
                                                                <div className="review_right2">
                                                                    <img src="../../img/about-img1.jpg" alt="" />
                                                                </div>
                                                            </div>
                                                        </>
                                                    )).slice(0, 5)}


                                                </>

                                            );

                                        })
                                        : "0 reviews"}
                                </div>



                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

artist.ignorePath = true

export default artist


