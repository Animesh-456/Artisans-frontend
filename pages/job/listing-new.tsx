import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import common from "../../src/helpers/common";

import Link from "next/link";
import { useRouter } from "next/router";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md";

const Listing = () => {
    const router = useRouter();
    const [list, setList] = useState([]);
    const [numPages, setNumPages] = useState(null);
    const [category, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedRows, setExpandedRows] = useState([]);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 10,
        total_pages: 0,
        total_count: 0,
    });

    useEffect(() => {
        const fetchJobs = async () => {
            const pageQueryParam = new URLSearchParams(window.location.search).get('page');
            const pageNumber = parseInt(pageQueryParam) || 1;
            const params = {
                page: pageNumber - 1,
                limit: pagination.limit,
                category: category !== "ALL Categories" ? category : "",
                searchQuery
            };
            console.log('Fetching jobs with params:', params); // Log the params

            try {
                const response = await axios.get('/api/list', { params });
                console.log('API Response:', response); // Log the API response

                setList(response.data.data);
                setPagination({
                    ...pagination,
                    page: response.data.pagination.current_page,
                    total_pages: response.data.pagination.total_pages,
                    total_count: response.data.pagination.total_count,
                });
            } catch (error) {
                console.error('Error fetching job listings:', error);
            }
        };
        fetchJobs();
    }, [category, searchQuery, router.query.page]);

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        router.push({
            pathname: router.pathname,
            query: { ...router.query, searchQuery, page: 1 }
        });
    };

    const handlePageClick = (i) => {
        router.push({
            pathname: router.pathname,
            query: { ...router.query, page: i + 1 }
        });
    };

    const toggleRowExpansion = (rowIndex) => {
        if (expandedRows.includes(rowIndex)) {
            setExpandedRows(expandedRows.filter((i) => i !== rowIndex));
        } else {
            setExpandedRows([...expandedRows, rowIndex]);
        }
    };

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const visiblePages = 10;
    const getPageNumbers = () => {
        const startPage = Math.max(0, pagination.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(pagination.total_pages, startPage + visiblePages - 1);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

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
                            <div className="post_request_button"><a href={"/artrequest"}>Post Art Request</a></div>
                            <form className="search_bar" onSubmit={handleSearchSubmit}>
                                <input type="text" name="searchQuery" placeholder="Search.." value={searchQuery} onChange={handleSearchChange} />
                                <i className="fa fa-search" onClick={handleSearchSubmit}></i>
                            </form>
                            <div className="all_categori">
                                <select value={category} onChange={handleCategoryChange}>
                                    <option>ALL Categories</option>
                                    <option>Painting</option>
                                    <option>Sculpture</option>
                                    <option>Printmaking</option>
                                    <option>Photography</option>
                                    <option>Textile Art</option>
                                    <option>Ceramics</option>
                                    <option>Glass Art</option>
                                    <option>Digital Art</option>
                                    <option>Mixed Media</option>
                                    <option>Calligraphy</option>
                                    <option>Jewelry Design</option>
                                    <option>Graffiti and Street Art</option>
                                    <option>Installation Art</option>
                                </select>
                            </div>
                            <div className="sr">
                                <p>Showing Results {pagination.page * pagination.limit + 1}-{list.length < pagination.limit ? (pagination.page * pagination.limit) + list.length : (pagination.page + 1) * pagination.limit} of {pagination.total_count}</p>
                            </div>
                        </div>
                    </div>
                    {list.length ? list.map((l, index) => {
                        const strt = new Date(l?.project_post_format_date);
                        const n = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
                        const nd = new Date(n);
                        const timeDiff = nd.getTime() - strt.getTime();
                        const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                        const hourDifference = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
                        const strt2 = new Date(n);
                        const nd2 = new Date(l?.project_expiry_date);
                        const timeDiff2 = nd2.getTime() - strt2.getTime();
                        const diffInDays2 = Math.floor(timeDiff2 / (1000 * 60 * 60 * 24));
                        const hourDifference2 = Math.floor((timeDiff2 % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const date = new Date(l?.created * 1000);
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0');
                        const day = String(date.getDate()).padStart(2, '0');
                        const hours = String(date.getHours()).padStart(2, '0');
                        const minutes = String(date.getMinutes()).padStart(2, '0');
                        const seconds = String(date.getSeconds()).padStart(2, '0');
                        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                        const givenDateTime2 = moment(l?.project_post_format_date, 'YYYY-MM-DD HH:mm:ss');
                        const nowDateTime2 = moment();
                        const timeDifference2 = nowDateTime2.diff(givenDateTime2);
                        const duration2 = moment.duration(timeDifference2);
                        const days2 = duration2.days();
                        const hours2 = duration2.hours();

                        return (
                            <div key={l.id}>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="latest_request_pic">
                                            {l?.attachment_name?.includes(",") ? (
                                                <img className="art-img1" src={common.get_attachment(
                                                    l?.attachment_name.substring(0, l?.attachment_name.indexOf(',')), formattedDate
                                                ) || "../img/pic2.png"} alt="" />
                                            ) : (
                                                <img className="art-img1" src={common.get_attachment(
                                                    l?.attachment_name, formattedDate) || "../img/pic2.png"} alt="art-image" />
                                            )}
                                            {l?.project_status >= "1" && (
                                                <img className="cir" src={"/img/circle.png"} alt="awarded-img" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="latest_request_text">
                                            <h1>{l?.project_name}</h1>
                                            <div className="request_like">
                                                <ul>
                                                    <li>
                                                        <a href="#"><i className="fa fa-heart-o" aria-hidden="true"></i> Save</a>
                                                    </li>
                                                    <li>
                                                        <a href="#"><i className="fa fa-share-alt" aria-hidden="true"></i> Share</a>
                                                    </li>
                                                    <li>
                                                        <button
                                                            onClick={() => toggleRowExpansion(index)}
                                                            className={`btn btn-link ${expandedRows.includes(index) ? "expanded" : ""}`}
                                                        >
                                                            {expandedRows.includes(index) ? <MdOutlineKeyboardArrowUp /> : <MdOutlineKeyboardArrowDown />}
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                            <p className="text-justify" style={{ display: expandedRows.includes(index) ? 'block' : 'none' }}>{l?.description}</p>
                                            <div>
                                                <span>by {l?.creator?.user_name} <i className="fa fa-check-circle"></i></span>
                                                <span>Posted: {days2} d {hours2} h ago</span>
                                                <span><a href="#">{l?.bids_count} offers</a></span>
                                            </div>
                                            <Link href={`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`}>View Details</Link>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </div>
                        );
                    }) : (<div>No data available</div>)}

                    <nav className="pagination_wp">
                        <ul className="pagination justify-content-center">
                            {pagination.page > 0 && (
                                <li className="page-item">
                                    <a className="page-link" onClick={() => handlePageClick(0)} aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                            )}
                            {pagination.total_count > 10 && getPageNumbers().map((page) => (
                                <li
                                    key={page}
                                    className={`page-item ${parseFloat((router?.query?.page || 0).toString()) - 1 == page ? "active" : ""}`}>
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
                            ))}
                            {pagination.page != pagination.total_pages && (
                                <li className="page-item">
                                    <a className="page-link" onClick={() => handlePageClick(pagination.total_pages)} aria-label="Next">
                                        <span aria-hidden="true">&raquo;</span>
                                    </a>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
            </section>
        </>
    );
};

Listing.ignorePath = true;

export default Listing;
