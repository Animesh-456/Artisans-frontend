import { useAtomValue } from "jotai/utils";
import atom from "../../../../src/jotai/atom";
import { useEffect, useState } from "react";
import common from "../../../../src/helpers/common";
import router from "next/router";
import api from "../../../../src/api/services/api";
import GlobalModal from "../../../../src/views/Common/Modals/GlobalModal";
import { useAtom } from "jotai";
import Link from "next/link";
// import Image from "next/image";
import moment from "moment";
import { useRouter } from "next/router";
import { CSSProperties } from 'react';
import env from "../../../../src/config/api";
import Head from "next/head";

export async function getStaticPaths() {
    // Return an empty array since paths are unknown at build time
    return {
        paths: [],
        fallback: 'blocking', // Render on-demand
    };
}
export const getStaticProps = async () => {
    try {
        const params: any = {
            id: 39,
            status: 'active',
        };

        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${env.base_url}project/page-details?${queryString}`);
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

const Artist = (prp) => {
    const router = useRouter();
    const user = useAtomValue(atom.project.api.public_me)
    const totaljobs = useAtomValue(atom.project.api.total_jobs)
    const projects = useAtomValue(atom.project.api.public_profile_project)
    const userReviews = useAtomValue(atom.project.api.public_user_reviews)
    const get_art = useAtomValue(atom.project.api.get_art)
    const Category_subcategory: any = useAtomValue(atom.project.api.get_category_subcategory)


    useEffect(() => {
        api.project.all_lists({ params: {} });
    }, []);

    useEffect(() => {
        if (!router.isReady) return;
        let id = router.query?.id;
        api.project.public_me({ params: { id: id } })
        api.project.public_profile_total_jobs({ params: { id: id } })
        api.project.get_art({ params: { id: id } })
        api.project.public_user_reviews({ params: { id: id } })
        api.project.public_profile_api({ params: { id: id } })
        api.project.get_category_subcategory({})
    }, [router.isReady]);




    const [portfolio, setportfolio] = useState(true);
    const [artist, setartist] = useState(false);
    const [art, setGetart] = useState([get_art[0]?.id]);
    const [visibleItems, setVisibleItems] = useState(2);




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
        user_picture: user?.logo || user?.prof_pic || "",
        description: user?.description || "",
        first_name: user?.name || "",
        last_name: user?.surname || "",

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
    console.log("get art is----", get_art)

    console.log("public user reviews", public_user_reviews)

    const loadMore = () => {
        console.log('Load More Clicked');
        setVisibleItems((prevItems) => prevItems + 2)
    };


    const idsArray = user?.category
        ? user.category.split(',').map(id => parseInt(id.trim(), 10)) // Ensure IDs are numbers
        : [];

    const matchedCategories = Category_subcategory?.categories
        ? Category_subcategory.categories.filter((item: any) => idsArray.includes(item?.id))
        : [];

    const categoryNames = matchedCategories.length > 0
        ? matchedCategories.map(item => item?.category_name).join(", ")
        : "No categories available";

    console.log("User Categories Array:", idsArray);
    console.log("Matched Categories:", matchedCategories);





    console.log("Category_subcategory.categories:", Category_subcategory?.categories);

    return (


        <>


            {/* <Head>
                <title>{`${prp?.prp?.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
            </Head> */}
            <section className="inner_banner_wp1">
                <div className="container">
                    <div className="artist_pro">
                        <div className="artist_pro_l">

                            <img
                                src={
                                    common.get_profile_picture(udetails?.user_picture) ||
                                    "../../img/no-images.png"
                                }
                            />

                        </div>
                        <div className="artist_pro_r">
                            <h1> {udetails.user_name} <i className="fa fa-check-circle"></i></h1>
                            <p>{udetails.first_name} {udetails.last_name}</p>
                            {/* <p><span >category</span ><span className="www1"> : {categoryNames}</span> </p> */}
                        </div>
                    </div>
                </div>
            </section>


            <section className="artist_pro_tab">
                <div className="container">
                    <ul className="nav nav-tabs" role="tablist">

                        <li className="nav-item">
                            <a className={`nav-link ${portfolio ? "active" : ""}`} style={{ cursor: "pointer" }} data-toggle="tab" onClick={selectcust}>Portfolio</a>
                        </li>
                        <li className="nav-item">
                            <a className={`nav-link ${artist ? "active" : ""}`} style={{ cursor: "pointer" }} data-toggle="tab" onClick={select_mac}>About</a>
                        </li>
                    </ul>

                    <div className="tab-content">
                        <div id="portfolio" className={`tab-pane ${portfolio ? "active" : ""}`}>
                            <div className="row">


                                {get_art?.length
                                    ? (get_art?.map((l) => {

                                        var imageSrc = common.get_portfolio_pic(l?.main_img)


                                        return (
                                            <>
                                                <div className='col-sm-3'>
                                                    <a href={`/account/art-work/${l?.id}`} data-fancybox="gallery" data-caption="Wall Painting" >
                                                        <img
                                                            src={imageSrc}

                                                            alt={`${l?.title}`}
                                                        />
                                                    </a>
                                                    <p>{l?.title}</p>
                                                </div>
                                            </>
                                        );
                                    }))
                                    : ""}

                            </div>
                        </div>
                        <div id="about" className={`tab-pane ${portfolio ? "" : "active"}`}>
                            <div className="row ">
                                <div className="col-sm-4">
                                    <h5>About</h5>
                                </div>
                                <div className="col-sm-8">
                                    <div className="about_left">


                                        {/* {public_avg_rating && user?.role_id == 2 ? (

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

                                        )} */}


                                        <p>
                                            <div
                                                className="stars"
                                                style={{ '--rating': user?.avgRating?.toFixed(1) } as CSSProperties}
                                            ><span>{user?.avgRating?.toFixed(1)}</span></div>

                                        </p>


                                        <p>{user?.service_desc}</p>

                                        <br />
                                        <small>Member since: <p>{moment.unix(user?.created).format("DD-MMM,YYYY")}</p></small>
                                        <br />
                                        <h6>Experience</h6>
                                        <ul className="ex">
                                            <li>
                                                <h2>{totaljobs}</h2>
                                                <small> Total Jobs</small>
                                            </li>
                                            <li>

                                                <h2>{userReviews?.length}</h2>

                                                <small>Reviews</small>
                                            </li>

                                            <li>
                                                <h2>{projects?.length}</h2>
                                                <small>jobs awarded</small>
                                            </li>
                                        </ul>


                                    </div>
                                </div>
                            </div>
                            <hr />
                            <div className="row">
                                <div className="col-sm-4">
                                    <h5>Reviews</h5>
                                </div>


                                <div className="col-sm-8">
                                    {projects.length
                                        ? projects?.map((l) => {
                                            const date = new Date(l?.created * 1000);

                                            const year = date.getFullYear();
                                            const month = String(date.getMonth() + 1).padStart(2, '0');
                                            const day = String(date.getDate()).padStart(2, '0');
                                            const hours = String(date.getHours()).padStart(2, '0');
                                            const minutes = String(date.getMinutes()).padStart(2, '0');
                                            const seconds = String(date.getSeconds()).padStart(2, '0');

                                            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
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
                                                                    <b><p>{l?.project_name}</p></b>
                                                                    <br></br>
                                                                    <p><i>{r?.comments}</i></p>

                                                                    <p className="qg">
                                                                        <img src={
                                                                            common.get_profile_picture(l?.creator?.logo) ||
                                                                            "../../img/no-images.png"
                                                                        } alt="profile-picture" />
                                                                        {l?.creator?.user_name}
                                                                    </p>
                                                                    <small>{moment(l?.project_post_format_date).format("DD-MMM-YYYY")}</small>

                                                                </div>
                                                                <div className="review_right2">
                                                                    {/* <img src={common.get_attachment(
                                                                        (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
                                                                    ) || "../../img/logo.png"} alt="" /> */}

                                                                    {l?.attachment_name?.includes(",") ? (

                                                                        <img className="art-img1" src={common.get_attachment(
                                                                            (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
                                                                        ) || "../img/pic2.png"} alt="" />

                                                                    ) : (

                                                                        <img className="art-img1" src={common.get_attachment(
                                                                            (l?.attachment_name), formattedDate) || "../img/pic2.png"} alt="art-image" />

                                                                    )}
                                                                </div>
                                                            </div>
                                                        </>
                                                    ))}


                                                </>

                                            );

                                        }).slice(0, visibleItems)
                                        : "0 reviews"}

                                    {visibleItems < projects.length && (
                                        <div className="submit_cancel">
                                            <a style={{ cursor: "pointer" }} onClick={loadMore} >Load More</a>
                                        </div>
                                    )}


                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

Artist.ignorePath = true

export default Artist


