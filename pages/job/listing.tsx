import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import Head from "next/head";

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
import axios from "axios";
import toast from "react-hot-toast";
import { BiSortAlt2 } from "react-icons/bi";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
type Props = {};

export const getStaticProps = async () => {
    try {
        const params: any = {
            id: 8,
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
                prp: data
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                prp: null
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
    const [category, setCategory] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [expandedCategories, setExpandedCategories] = useState([]);
    const toggleCategoryExpansion = (index) => {
        setExpandedCategories(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    const Category_subcategory: any = useAtomValue(atom.project.api.get_category_subcategory)
    const [sortOption, setSortOption] = useState("newest");

    const [arr, setArr] = useState([]);

    const RefLink = (l) => {
        localStorage.setItem('items', (l));
        router.replace(l)
    }

    const handleApply = () => {
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
        console.log("Page number for handle apply ", pageNumber)

        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: 0,
                    category: category,
                    searchQuery: searchQuery,
                    sort: sortOption
                },
            })
            .then(() => {
                api.project.list({ params: { ...opt, page: 0, category: category, searchQuery: searchQuery, sortBy: sortOption } });
            });
    }

    useEffect(() => {
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
        console.log("Page number is ", pageNumber)

        const pageQueryParam2 = new URLSearchParams(location.search).get('category');
        const urlCategory = pageQueryParam2 || "";

        const pageQueryParam3 = new URLSearchParams(location.search).get('searchQuery');
        const urlsearchQuery = pageQueryParam3 || "";

        const pageQueryParam4 = new URLSearchParams(location.search).get('sort');
        const sort = pageQueryParam4 || "";

        api.project.list({ params: { ...opt, page: pageNumber - 1, category: urlCategory, searchQuery: urlsearchQuery, sortBy: sort } });
        api.project.get_category_subcategory({})
    }, []);

    const handlePageClick = (i) => {
        // router
        //     .replace({
        //         pathname: router.pathname,
        //         query: {
        //             page: i + 1,
        //         },
        //     })
        //     .then(() => {
        //         api.project.list({ params: { ...opt, page: i } });
        //     });

        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                    category: category,
                    searchQuery: searchQuery,
                    sort: sortOption
                },
            })
            .then(() => {
                api.project.list({ params: { ...opt, page: i, category: category, searchQuery: searchQuery, sortBy: sortOption } });
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

    useEffect(() => {
        if (user) {
            api.project.public_profile_total_jobs({ params: { id: user?.id } })
        }
    }, [])

    const totaljobs = useAtomValue(atom.project.api.total_jobs)

    console.log("This users total jobs:- ", totaljobs)

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    console.log("projects attach------------->", list);

    const visiblePages = 10;
    const getPageNumbers = () => {
        const startPage = Math.max(0, opt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(opt.total_pages, startPage + visiblePages - 1);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const handleCategoryChange = (e) => {
        setCategory(e.target.value);
    };
    console.log("category is", category)
    console.log("searchQuery is", searchQuery)

    useEffect(() => {
        const pageQueryParam2 = new URLSearchParams(location.search).get('category');
        const pageQueryParam3 = new URLSearchParams(location.search).get('searchQuery');
        if (pageQueryParam2 != category) {
            setCategory(pageQueryParam2)
        }
        if (pageQueryParam3 != searchQuery) {
            setSearchQuery(pageQueryParam3)
        }
        return
    }, [location.search])
    // FILTER

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    const sortProjects = (projects) => {
        switch (sortOption) {
            case "oldest":
                return [...projects].sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime());
            case "newest":
                return [...projects].sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());
            case "az":
                return [...projects].sort((a, b) => a.project_name.localeCompare(b.project_name));
            case "za":
                return [...projects].sort((a, b) => b.project_name.localeCompare(a.project_name));
            default:
                return projects;
        }
    };
    ////FILTER
    return (
        <>
            <Head>
                <title>{`${prp?.prp?.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
            </Head>

            <section className="breadcrumb_sec">
                <div className="container">
                    <div className="row">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Artwork Jobs</li>
                        </ul>
                    </div>
                </div>
            </section>

            <section className="art_request_wp">
                <div className="container">
                    <div className="row">
                        <div className="filter_section">

                            <div className="search_bar">
                                <input type="text" value={searchQuery} name="text" placeholder="Search.." onChange={(e) => setSearchQuery(e.target.value)} />
                                <i className="fa fa-search"></i>
                            </div>

                            <div className="sort_dropdown all_categori">
                                <select value={sortOption} onChange={handleSortChange}>
                                    <option value="newest">Newest to Oldest</option>
                                    <option value="oldest">Oldest to Newest</option>
                                    <option value="az">A to Z</option>
                                    <option value="za">Z to A</option>
                                </select>
                                {/* <BiSortAlt2 className="sort-icon" /> */}
                            </div>

                            <div className="all_categori">
                                <select value={category} onChange={handleCategoryChange}>
                                    <option value="">ALL Categories</option>
                                    {Category_subcategory?.categories?.map((cat) => (
                                        <option key={cat?.id} value={cat?.id}>{cat?.category_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="post_request_button filter-btn"><a style={{ cursor: 'pointer', color: "#fff" }} onClick={handleApply}>Apply</a></div>

                            <div className="sr">
                                <p>Showing Results {opt.page * 10 + 1}-{list?.length < 10 ? ((opt.page * 10) + list?.length) : (opt.page + 1) * 10}</p>
                            </div>
                        </div>
                    </div>

                    {list?.length ? list?.map((l, index) => {
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
                        const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;

                        return (
                            <React.Fragment key={l.id}>
                                <div className="row">
                                    <div className="col-sm-3">
                                        <div className="latest_request_pic">
                                            {l?.attachment_name?.includes(",") ? (
                                                <Link href={`/${l?.project_name?.split(" ").join("-")}-${l?.id}`}>
                                                    <img className="art-img1" src={common.get_attachment(
                                                        (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
                                                    ) || "../img/pic2.png"} alt="" />
                                                </Link>
                                            ) : (
                                                <Link href={`/${l?.project_name?.split(" ").join("-")}-${l?.id}`}>
                                                    <img className="art-img1" src={common.get_attachment(
                                                        (l?.attachment_name), formattedDate) || "../img/pic2.png"} alt="art-image" />
                                                </Link>
                                            )}

                                            {l?.project_status >= "1" && (
                                                <img className="cir" src={"/img/circle.png"} alt="awarded-img" />
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-sm-9">
                                        <div className="latest_request_text">
                                            <h1>
                                                <a href={`/${l?.project_name?.split(" ").join("-")}-${l?.id}`}>{l?.project_name}</a>
                                            </h1>
                                            <h6>
                                                <span>Category:</span> &nbsp;
                                                <span className="category-names">
                                                    {l?.category_names?.length > 3 ? (
                                                        <>
                                                            {expandedCategories.includes(index) ? (
                                                                l?.category_names.join(', ')
                                                            ) : (
                                                                <>
                                                                    {l?.category_names.slice(0, 3).join(', ')}
                                                                    <span
                                                                        style={{ color: '#1772eb', cursor: 'pointer', marginLeft: '5px' }}
                                                                        onClick={() => toggleCategoryExpansion(index)}
                                                                    >
                                                                        {l?.category_names.length - 3} more
                                                                    </span>
                                                                </>
                                                            )}
                                                        </>
                                                    ) : (
                                                        l?.category_names?.join(', ')
                                                    )}
                                                </span>
                                            </h6>

                                            {l?.description.length > 250 ? (
                                                <>
                                                    {expandedRows.includes(index) ? (
                                                        <></>
                                                    ) : (
                                                        <p>{l?.description.slice(0, 250).concat("...")}  <MdOutlineKeyboardArrowDown style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></p>
                                                    )}
                                                </>
                                            ) : (<p>{l?.description}</p>)}
                                            {expandedRows.includes(index) && (
                                                <p>{l?.description} <MdOutlineKeyboardArrowUp style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></p>
                                            )}

                                            <div>
                                                <span>by {l?.creator?.user_name} <i className="fa fa-check-circle"></i></span>
                                                <span>Posted: {diffInDays} d {hourDifference} h ago</span>
                                                <span style={{ color: "#ef6100" }}>{l?.bids_count} offers</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                            </React.Fragment>
                        )
                    }) : "No results Found"}

                    <nav className="pagination_wp">
                        <ul className="pagination justify-content-center">
                            {(opt.page > 0) && (
                                <li className='page-item'>
                                    <a className="page-link" onClick={() => handlePageClick(0)} aria-label="Previous">
                                        <span aria-hidden="true">&laquo;</span>
                                    </a>
                                </li>
                            )}

                            {opt.total_count > 10 && getPageNumbers().map((page) => (
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

                            {opt.page != opt.total_pages && (
                                <li className='page-item'>
                                    <a className="page-link" onClick={() => handlePageClick(opt.total_pages)} aria-label="Next">
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