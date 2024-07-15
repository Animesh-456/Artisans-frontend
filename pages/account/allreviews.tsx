import Link from "next/link";
import { CSSProperties } from 'react';

import { useEffect } from "react";
import atom from "../../src/jotai/atom";
import { useAtomValue } from "jotai";
import api from "../../src/api/services/api"
import { useRouter } from "next/router";
import { useAtom } from "jotai";
const Allreviews = () => {
    const router = useRouter()
    const list = useAtomValue(atom.project.api.allreviews)
    const [opt, setOpt] = useAtom(atom.project.api.list_opt);
    useEffect(() => {
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
        api.project.allreviews({ params: { ...opt, page: pageNumber - 1 } });
    }, []);

    console.log("All reviews are: -", list)
    const visiblePages = 10; // Number of visible page buttons
    const getPageNumbers = () => {
        const startPage = Math.max(0, opt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(opt.total_pages, startPage + visiblePages - 1);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };


    const handlePageClick = (i) => {
        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.allreviews({ params: { ...opt, page: i } });
            });
    };
    return (
        <>


            <section className="inner_banner_wp" style={{ backgroundImage: `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>All Reviews</h1>
                </div>
            </section>

            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="sidebar">
                                <div className="looking_m">
                                    <h3>Looking for a Artist?</h3>
                                    <p>Post your request and receive quotes for free.</p>
                                    <a href={"/artrequest"}>Post your request</a>
                                    <h3>Are you a Artist?</h3>
                                    <p>Create a profile and start working.</p>
                                    <a href={"/account/profile"}>Create Your Profile</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="profile_box">


                                <div className="rys">
                                    <h5>Review received by artist <span>({opt?.total_count + " ratings"})</span></h5>
                                </div>





                                {list?.length ? list.map((l) => {
                                    return (
                                        <>
                                            <div className="project_loop">

                                                <h4><a href={`/${l?.project?.project_name}-${l?.project?.id}`}>{l?.project?.project_name}</a></h4>
                                                <p>{l?.project?.visibility} | Machined by - {l?.provider?.user_name}</p>
                                                <div>

                                                    <i
                                                        className="stars"
                                                        style={{ '--rating': l?.rating } as CSSProperties}
                                                    ></i>

                                                    <span>{l?.rating}</span>

                                                </div>
                                                <div className="comment1">
                                                    <div className="rating-color pub-rat">
                                                        <div className="quality q-1">


                                                            <i
                                                                className="stars"
                                                                style={{ '--rating': l?.provider_rate1 } as CSSProperties}
                                                            ></i>
                                                            <span> Quality </span>
                                                        </div>
                                                        <div className="time q-1">
                                                            <i
                                                                className="stars"
                                                                style={{ '--rating': l?.provider_rate2 } as CSSProperties}
                                                            ></i>
                                                            <span> Details </span>
                                                        </div>
                                                        <div className="communication q-1">
                                                            <i
                                                                className="stars"
                                                                style={{ '--rating': l?.provider_rate3 } as CSSProperties}
                                                            ></i>
                                                            <span> Communication</span>
                                                        </div>
                                                        <div className="professionalism q-1">
                                                            <i
                                                                className="stars"
                                                                style={{ '--rating': l?.provider_rate4 } as CSSProperties}
                                                            ></i>
                                                            <span> Professionnalisme</span>
                                                        </div>
                                                    </div>
                                                    <div className="public">
                                                        <p>{new Date(l?.review_post_date).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })} | Artist by {l?.provider?.user_name} | <a href={`/${l?.project?.project_name}-${l?.project?.id}`}>Project Details</a>




                                                        </p>
                                                        <p>
                                                            <b> Comment: </b>
                                                            <br /> "{l?.comments}"<br />
                                                            <a href={`/account/public-profile/${l?.buyer_id}`}>{l?.buyer?.user_name} </a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            <hr />
                                        </>
                                    )
                                }).slice(0, 10) : (<></>)}






                                <nav className="pagination_wp">
                                    <ul className="pagination justify-content-center">

                                        {(opt.page > 0) ? <li className='page-item'>
                                            <a className="page-link" href="#" aria-label="Previous" onClick={() => handlePageClick(opt.page - 1)}>
                                                <span aria-hidden="true">«</span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                        </li> : ""}



                                        {opt.total_count > 10 && getPageNumbers().map((page) => (

                                            <>

                                                <li
                                                    className={`page-item ${parseFloat((router?.query?.page || 0).toString()) - 1 ==
                                                        page
                                                        ? "active"
                                                        : ""
                                                        }`}>
                                                    <Link href={`${router.pathname}?page=${page}`}>
                                                        <a
                                                            className='page-link'
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handlePageClick(page);
                                                            }}>
                                                            {page + 1}
                                                        </a>
                                                    </Link>
                                                </li>
                                            </>

                                        ))}



                                        {opt.page != opt.total_pages ?
                                            <li className='page-item'>
                                                <a className="page-link" href="#" aria-label="Next" onClick={() => handlePageClick(opt.page + 1)}>
                                                    <span aria-hidden="true">»</span>
                                                    <span className="sr-only">Next</span>
                                                </a>
                                            </li> : ""}


                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

Allreviews.ignorePath = true

export default Allreviews;