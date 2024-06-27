import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { Document, Page, pdfjs } from 'react-pdf';
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import env from "../../src/config/api";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
type Props = {};

export const getStaticProps = async () => {
    try {
        const response = await fetch(`${env.base_url}project/page-details`);
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

const Listing = (prp) => {
    const router = useRouter();
    const [opt, setOpt] = useAtom(atom.project.api.list_opt);
    const [list, setlist] = useAtom(atom.project.api.list);
    const user = useAtomValue(atom.storage.user);
    const [numPages, setNumPages] = useState(null);
    //const totaljobs = useAtomValue(atom.project.api.total_jobs)
    const [arr, setArr] = useState([]);


    //console.log("This users total jobs:- ", totaljobs)


    const RefLink = (l) => {
        //const router = useRouter();
        localStorage.setItem('items', (l));
        router.replace(l)
    }

    useEffect(() => {
        common.r("hello");
        //api.project.list({ params: opt });
        //api.project.public_profile_total_jobs({ params: { id: user?.id } })
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
        console.log("Page number is ", pageNumber)
        api.project.list({ params: { ...opt, page: pageNumber - 1 } });


    }, []);


    const handlePageClick = (i) => {

        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.list({ params: { ...opt, page: i } });
            });
    };

    const [expandedRows, setExpandedRows] = useState([]);
    const toggleRowExpansion = (rowIndex) => {

        if (expandedRows.includes(rowIndex)) {
            setExpandedRows(expandedRows.filter((i) => i !== rowIndex));
        } else {
            setExpandedRows([...expandedRows, rowIndex]);
        }
    };
    console.log("list projects-->", list);
    console.log("user projects-->", user);





    useEffect(() => {
        if (user) {
            api.project.public_profile_total_jobs({ params: { id: user?.id } })
        }

    }, [])

    const totaljobs = useAtomValue(atom.project.api.total_jobs)

    console.log("This users total jobs:- ", totaljobs)

    const onDocumentLoadSuccess = ({ numPages }) => {
        console.log("total page in pdf", numPages);
        setNumPages(numPages);
    };

    console.log("projects attach------------->", list);

    const visiblePages = 10; // Number of visible page buttons
    const getPageNumbers = () => {
        const startPage = Math.max(0, opt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(opt.total_pages, startPage + visiblePages - 1);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    console.log("Page is ", opt.page)
    console.log("Page limitis ", opt.limit)


    return (
        <>


            <section className="inner_banner_wp" style={{ "backgroundImage": `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>Art Request</h1>
                </div>
            </section>


            <section className="art_request_wp">
                <div className="container">
                    <div className="row">
                        <div className="filter_section">
                            <div className="post_request_button"><a href={"/job/post"}>Post Art Request</a></div>
                            <div className="search_bar">
                                <input type="text" name="text" placeholder="Search.." />
                                <i className="fa fa-search"></i>
                            </div>
                            <div className="all_categori">
                                <select>
                                    <option>ALL Categories</option>
                                    <option>1</option>
                                    <option>2</option>
                                </select>
                            </div>
                            <div className="sr">
                                <p>Showing Results {opt.page * 10 + 1}-{list?.length < 10 ? ((opt.page * 10) + list?.length) : (opt.page + 1) * 10}</p>
                            </div>
                        </div>
                    </div>



                    {list?.length ? list?.map((l, index) => {
                        const strt = new Date(l?.project_post_format_date)


                        let n = new Date().toLocaleString('en-US', {
                            timeZone: 'Europe/Paris',
                        });
                        const nd = new Date(n)

                        const today = new Date()
                        nd.setHours(nd.getHours(), nd.getMinutes(), nd.getSeconds());


                        // Calculate the time difference in milliseconds
                        const timeDiff = nd.getTime() - strt.getTime();

                        // Calculate the number of days
                        const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

                        // Calculate the number of remaining hours
                        const hourDifference = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);

                        console.log("ndis", diffInDays, hourDifference)



                        const strt2 = new Date(n)
                        const nd2 = new Date(l?.project_expiry_date)

                        const today2 = new Date(l?.project_post_format_date)
                        nd2.setHours(today2.getHours(), today2.getMinutes(), today2.getSeconds());


                        // Calculate the tim2e difference in milliseconds
                        const timeDiff2 = nd2.getTime() - strt2.getTime();

                        // Calculate the number of days
                        const diffInDays2 = Math.floor(timeDiff2 / (1000 * 60 * 60 * 24));

                        // Calculate the number of remaining hours
                        const hourDifference2 = Math.floor((timeDiff2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

                        console.log("ndis2", diffInDays2, hourDifference2)
                        const date = new Date(l?.created * 1000);

                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');
                        const seconds = String(date.getSeconds()).padStart(2, '0');

                        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

                        console.log('created-------------------', formattedDate);





                        const givenDateTime2 = moment(l?.project_post_format_date, 'YYYY-MM-DD HH:mm:ss');
                        const nowDateTime2 = moment();

                        // Step 2: Calculate the time difference using the diff method
                        const timeDifference2 = nowDateTime2.diff(givenDateTime2);

                        // Step 3: Extract the days and hours from the difference using Moment's duration methods
                        const duration2 = moment.duration(timeDifference2);
                        const days2 = duration2.days();
                        const hours2 = duration2.hours();

                        console.log("The new time diff2 is", days2, hours2)
                        return (
                            <>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="latest_request_pic">
                                            {/* <img src={} alt="" /> */}
                                            {l?.attachment_name?.includes(",") ? (
                                                <>
                                                    <img src={common.get_attachment(
                                                        (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
                                                    ) || "../img/pic2.png"} alt="" /></>
                                            ) : (
                                                <>

                                                    <img src={common.get_attachment(
                                                        (l?.attachment_name), formattedDate) || "../img/pic2.png"} alt="art-image" />
                                                </>
                                            )}

                                            {l?.project_status > 4 ? (

                                                <img className="cir" src={"/img/circle.png"} alt="awarded-img" />
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="latest_request_text">
                                            <h1>{l?.project_name}</h1>
                                            <p>
                                                <div>

                                                    {l?.description.length > 250 ? (
                                                        <div>

                                                            <>

                                                                {expandedRows.includes(index) ? (

                                                                    <></>

                                                                ) : (
                                                                    <h5>{l?.description.slice(0, 250).concat("...")}  <MdOutlineKeyboardArrowDown style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></h5>
                                                                )}

                                                            </>

                                                        </div>
                                                    ) : (<h5>{l?.description}</h5>)}
                                                    {expandedRows.includes(index) && (

                                                        <h5>{l?.description} <MdOutlineKeyboardArrowUp style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></h5>

                                                    )}



                                                </div>
                                            </p>
                                            <div>
                                                <span>by {l?.creator?.user_name} <i className="fa fa-check-circle"></i></span>
                                                <span>Posted: {diffInDays} d {hourDifference} h ago</span>
                                                <span>End: {diffInDays2 >= 0 ? (
                                                    <>{diffInDays2} d {hourDifference2} h</>
                                                ) : (<>0 days 0 hours</>)}</span>
                                                <span><a href="#">{l?.bids_count} offers</a></span>
                                            </div>
                                            <Link href={`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`}>View Details</Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </>
                        )
                    }) : (<></>)}





                    <nav className="pagination_wp">
                        <ul className="pagination justify-content-center">
                            <li className="page-item">



                                {(opt.page > 0) ? <li className='page-item'>
                                    <a className="page-link" onClick={() => handlePageClick(0)} aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li> : ""}

                            </li>


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

                            <li className="page-item">

                                {opt.page != opt.total_pages ? <li className='page-item'>

                                    <a className="page-link" onClick={() => handlePageClick(opt.total_pages)} aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>

                                    </a>

                                </li> : ""}
                            </li>
                        </ul>
                    </nav>
                </div>
            </section>


            {/* <div className='container'>
                <div className='row job_machin_wp'>

                    {user?.role_id == 2 || user?.role_id == 1 ? (
                        <>
                            <AccountSideBar />
                        </>
                    ) : (<>
                    </>)}



                </div>
            </div> */}

        </>
    );
};

Listing.ignorePath = true;

export default Listing;