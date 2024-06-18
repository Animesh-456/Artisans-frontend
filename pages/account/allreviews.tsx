import Link from "next/link";
import { CSSProperties } from 'react';

import { useEffect } from "react";
import atom from "../../src/jotai/atom";
import { useAtomValue } from "jotai";
import api from "../../src/api/services/api"
import { useRouter } from "next/router";
import { useAtom } from "jotai";
const allreviews = () => {
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


            <section className="inner_banner_wp" style={{ backgroundImage: "url(../img/inner-banner.jpg)" }}>
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
                                    <a href="#">Post your request</a>
                                    <h3>Are you a Artist?</h3>
                                    <p>Create a profile and start working.</p>
                                    <a href="#">Create Your Profile</a>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8">
                            <div className="profile_box">


                                <div className="rys">
                                    <h5>Review received by artist <span>(595 ratings)</span></h5>
                                </div>
                                <div className="project_loop">
                                    <h4>
                                        <a href="#">Lorem Ipsum </a>
                                    </h4>
                                    <p>Public | Artist by - abc custom</p>
                                    <div>
                                        <div className="stars">
                                            <p>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <span>5.0</span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="comment1">
                                        <div className="rating-color pub-rat">
                                            <div className="quality">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <span> Quality </span>
                                            </div>
                                            <div className="time">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <span> Details </span>
                                            </div>
                                            <div className="communication">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <span> Communication</span>
                                            </div>
                                            <div className="professionalism">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star-half-o"></i>
                                                <span> Professionnalisme</span>
                                            </div>
                                        </div>
                                        <div className="public">
                                            <p>03-05-2024 | Artist by debraj41 | <a href="#">Project Details</a>
                                            </p>
                                            <p>
                                                <b> Comment: </b>
                                                <br>Excellent service. The parts were made and shipped quickly, are exactly as described, and I even received two spares!</br>
                                                    <a href="#">-kazi111</a>
                                                </p>
                                                </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="project_loop">
                                        <h4>
                                            <a href="#">Lorem Ipsum </a>
                                        </h4>
                                        <p>Public | Artist by - abc custom</p>
                                        <div>
                                            <div className="stars">
                                                <p>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-half-o"></i>
                                                    <i className="fa fa-star-half-o"></i>
                                                    <span>5.0</span>
                                                </p>
                                            </div>
                                        </div>
                                        <div className="comment1">
                                            <div className="rating-color pub-rat">
                                                <div className="quality">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-half-o"></i>
                                                    <i className="fa fa-star-half-o"></i>
                                                    <span> Quality </span>
                                                </div>
                                                <div className="time">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-half-o"></i>
                                                    <i className="fa fa-star-half-o"></i>
                                                    <span> Details </span>
                                                </div>
                                                <div className="communication">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-half-o"></i>
                                                    <span> Communication</span>
                                                </div>
                                                <div className="professionalism">
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star"></i>
                                                    <i className="fa fa-star-half-o"></i>
                                                    <span> Professionnalisme</span>
                                                </div>
                                            </div>
                                            <div className="public">
                                                <p>03-05-2024 | Artist by debraj41 | <a href="#">Project Details</a>
                                                </p>
                                                <p>
                                                    <b> Comment: </b>
                                                    <br>Excellent service. The parts were made and shipped quickly, are exactly as described, and I even received two spares!</br>
                                                        <a href="#">-kazi111</a>
                                                    </p>
                                                    </div>
                                            </div>
                                        </div>
                                        <nav className="pagination_wp">
                                            <ul className="pagination justify-content-center">
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Previous">
                                                        <span aria-hidden="true">«</span>
                                                        <span className="sr-only">Previous</span>
                                                    </a>
                                                </li>
                                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                                <li className="page-item">
                                                    <a className="page-link" href="#" aria-label="Next">
                                                        <span aria-hidden="true">»</span>
                                                        <span className="sr-only">Next</span>
                                                    </a>
                                                </li>
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

allreviews.ignorePath = true

export default allreviews;