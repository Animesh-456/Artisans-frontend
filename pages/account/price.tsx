import { useAtom, useAtomValue } from "jotai";
import { CSSProperties } from 'react';
import React, { useEffect, useState } from "react";
import { ProjectResponse } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import moment from "moment";
import Link from "next/link";
import Layout from "../../src/views/Layouts/Main";
import Head from "next/head";
import env from "../../src/config/api";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { Document, Page, pdfjs } from 'react-pdf';
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
const Price = (prp) => {
    console.log("the users from static props  are : -", prp?.prp)
    // reviewed project list
    // project price of each
    // ratings recieved
    // project image
    const router = useRouter();


    const [opt, setOpt] = useAtom(atom.project.api.rev_proj_opt);
    const [search, setSearch] = useState("")
    const [projects, setproj] = useAtom(atom.project.api.reviewed_projects);
    const [searchBtn, setSearchBtn] = useState(false)
    const [desOpenView, setdesOpenView] = useState(false)

    //const setkey = common.ChangeState(setOpt);
    //api.project.review_projects({ params: opt });

    useEffect(() => {
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
        if (!searchBtn)
            api.project.review_projects({ params: { ...opt, page: pageNumber - 1 } });
    }, [searchBtn])






    const handlePageClick = (i) => {
        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.review_projects({ params: { ...opt, page: i } });
            });
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value)
    }


    const handleSearch = (e) => {

        //const searchKey = (document.getElementById("exampleFormControlInput5") as HTMLInputElement).value


        opt.search = search


        setSearchBtn(true)
        //console.log("search key", search);
        console.log("opt search key", opt);
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
        api.project.review_projects({ params: { ...opt, page: pageNumber - 1 } })

    }

    const readDesc = () => {
        if (!desOpenView)
            setdesOpenView(true)
        else {
            setdesOpenView(false)
        }

    }


    const [expandedRows, setExpandedRows] = useState([]);
    const toggleRowExpansion = (rowIndex) => {

        if (expandedRows.includes(rowIndex)) {
            setExpandedRows(expandedRows.filter((i) => i !== rowIndex));
        } else {
            setExpandedRows([...expandedRows, rowIndex]);
        }
    };

    //console.log("dtaa recieved----------------------?>>>>>>>>>>>>>>>>>>>", projects);

    const visiblePages = 10; // Number of visible page buttons
    const getPageNumbers = () => {
        const startPage = Math.max(0, opt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(opt.total_pages, startPage + visiblePages - 1);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        console.log("total page in pdf", numPages);
        setNumPages(numPages);
    };


    return (

        <>
             <Head>
                <title>{`${prp?.prp?.data[5].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[5].page_desc}`} />
                <meta name="robots" content="noindex" />

<meta name="googlebot" content="noindex" />

            </Head>
            <div className="container cjw">
                <div className="col-sm-12">
                    <div className="search-key">
                        <h3>How much should you pay for your custom machined parts?</h3>
                        <p>Machining-4U provides you with the lowest prices available for your custom CNC machining needs. By connecting directly with independent machinists, you can avoid the huge markups charged by large CNC manufacturing companies.</p>
                        <p>Whether you're looking for CNC routing, CNC milling, or any other CNC machining services, you will be able to find what you need at an affordable price.</p>
                        <p>To give you a better idea of what you should expect to pay for your precision machining job, search for the latest custom machined part prices below.</p>
                        <p>There are no hidden costs or unwanted surprises. The price you see is the price you pay.</p>
                        <ul>
                            <li>Shipping fees are included in the price.</li>
                            <li>Jobs posted in "private" mode are not displayed here.</li>
                        </ul>
                        <p>Enter the type of part you are looking for. For example : <a href="#">spacer,</a> <a href="#">ring,</a> <a href="#">plate,</a> <a href="#">axis,</a> <a href="#">cylinder</a> ...</p>
                    </div>
                    <form className="frmSearch" method="post" action="#">
                        <div className="row col-md-6 offset-md-3">
                            <div className="form-group col-md-9">
                                <input id="exampleFormControlInput5" onChange={handleSearchChange} type="text" placeholder="What're you searching for?" className="form-control form-control-underlined" />
                            </div>
                            <div className="form-group col-md-3">
                                <button onClick={handleSearch} type="button" className="btn btn-primary rounded-pill btn-block shadow-sm">Search</button>
                            </div>
                        </div>
                    </form>

                    {projects.length
                        ? projects.map((l, index) => {
                            const date = new Date(l?.created * 1000);

                            const year = date.getFullYear();
                            const month = String(date.getMonth() + 1).padStart(2, '0');
                            const day = String(date.getDate()).padStart(2, '0');
                            const hours = String(date.getHours()).padStart(2, '0');
                            const minutes = String(date.getMinutes()).padStart(2, '0');
                            const seconds = String(date.getSeconds()).padStart(2, '0');

                            const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

console.log("The file name this--->",l?.attachment_name?.includes);
                            if(l?.attachment_name?.includes(",")){
                                console.log("wait here is the file", (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')))
                            }
                            return (
                                <div className="machin_price_li">
                                    <div className="machin_price_li_img">
                                        {l?.attachment_name?.includes(",") ? (

                                            l?.attachment_name?.substring(0, l?.attachment_name?.indexOf(',')).includes("pdf") ? (
                                                <div className="pdf-container"><Document
                                                    file={common.get_attachment((l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate)}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                >
                                                    <Page pageNumber={1} width={200} />
                                                </Document> </div>
                                            ) :  l?.attachment_name?.substring(0, l?.attachment_name?.indexOf(',')).toLowerCase().includes("img") || l?.attachment_name?.substring(0, l?.attachment_name?.indexOf(',')).toLowerCase().includes("png") || l?.attachment_name?.substring(0, l?.attachment_name?.indexOf(',')).toLowerCase().includes("jpg") || l?.attachment_name?.substring(0, l?.attachment_name?.indexOf(',')).toLowerCase().includes("jpeg") || l?.attachment_name?.substring(0, l?.attachment_name?.indexOf(',')).toLowerCase().includes("svg")?
                                            
                                            (

                                                < img
                                                    src={common.get_attachment(
                                                        (l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
                                                    )}
                                                />
                                            ) : (
                                                < img
                                                    src="/img/404U.jpg"
                                                />
                                            )

                                        ) : (
                                            l?.attachment_name?.includes("pdf") ? (
                                                <div className="pdf-container"><Document
                                                    file={common.get_attachment((l?.attachment_name), formattedDate)}
                                                    onLoadSuccess={onDocumentLoadSuccess}
                                                >
                                                    <Page pageNumber={1} width={200} />
                                                </Document> </div>
                                            ) :  l?.attachment_name?.includes("img") || l?.attachment_name?.includes("png") || l?.attachment_name?.includes("jpg") || l?.attachment_name?.includes("jpeg") || l?.attachment_name?.includes("svg")?
                                            
                                            (
                                                < img
                                                    src={common.get_attachment(
                                                        (l?.attachment_name), formattedDate
                                                    )}
                                                />
                                            ) :  (
                                                < img
                                                    src="/img/404U.jpg"
                                                />
                                            )
                                        )}
                                    </div><div className="machin_price_li_text">
                                        <h4><a href={`/machining/${l?.project_name}-${l?.id}`}>{l?.project_name}</a></h4>

                                        <p><span>{l?.visibility} </span> | <span>Posted on :{l?.project_post_date}</span> </p>
                                        {/* {desOpenView == true ? <>
                                            <p>{l?.description}</p></>
                                            :
                                            (
                                                <>
                                                    <p><span>{(l?.description).slice(0, (l?.description).length / 2)}</span><span id="dots">...</span>-</p></>
                                            )
                                        } */}
                                        <div>

                                            {l?.description.length > 50 ? (
                                                <div>

                                                    <>

                                                        {expandedRows.includes(index) ? (

                                                            <></>

                                                        ) : (
                                                            <p>{l?.description.slice(0, 50).concat("...")}  <MdOutlineKeyboardArrowDown style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></p>
                                                        )}

                                                    </>

                                                </div>
                                            ) : (<p>{l?.description}</p>)}
                                            {expandedRows.includes(index) && (

                                                <p>{l?.description} <MdOutlineKeyboardArrowUp style={{ color: "red", cursor: "pointer" }} onClick={() => toggleRowExpansion(index)} /></p>

                                            )}

                                        </div>

                                        <div className="username">

                                            <a href={`/account/public-profile/${l?.creator_id}`} className="listing_creator_name">{l?.creator.user_name}</a>
                                            <a href="#" data-toggle="tooltip" data-placement="top" title="has already made a purchase!"><span className="alpha-ico">A</span></a>
                                        </div>
                                    </div><div className="machin_price_li_text1">
                                        <p>Purchased for</p>
                                        <div className="project_amount">
                                            <a href="#">{l?.transactions[0].amount_gbp.toFixed(2)}&nbsp;<span>£</span></a>
                                            <div className="amount_details1">(inc VAT)</div>
                                        </div>
                                    </div><div className="machin_price_li_text2">
                                        <p>Rating received </p>
                                        <div className="ratings-sml">
                                            <div
                                                className="stars"
                                                style={{ '--rating': l?.reviews[0].rating } as CSSProperties}
                                            ><span>{l?.reviews[0].rating}</span></div>

                                        </div>
                                        <div className="rating-color">
                                            <p>

                                                <div
                                                    className="quality"
                                                    style={{ '--rating': l?.reviews[0].provider_rate1 } as CSSProperties}
                                                ></div>
                                                <span> Quality </span>
                                            </p>

                                            <p>

                                                <div
                                                    className="time"
                                                    style={{ '--rating': l?.reviews[0].provider_rate2 } as CSSProperties}
                                                ></div>
                                                <span> Time </span>
                                            </p>

                                            <p>

                                                <div
                                                    className="communication"
                                                    style={{ '--rating': l?.reviews[0].provider_rate3 } as CSSProperties}
                                                ></div>
                                                <span> Communication</span>

                                            </p>

                                            <p>

                                                <div
                                                    className="professionalism"
                                                    style={{ '--rating': l?.reviews[0].provider_rate4 } as CSSProperties}
                                                ></div>
                                                <span> Professionalism</span>
                                            </p>
                                        </div>


                                    </div>

                                </div>
                            );

                        })

                        : ""}


                    <ul className="pagination justify-content-end">
                        {(opt.page > 0) ? <li className='page-item'>
                            <a className='page-link' onClick={() => handlePageClick(0)}>
                                First
                            </a>
                        </li> : ""}
                        {(opt.page > 0) ? <li className='page-item'>
                            <a className='page-link' onClick={() => handlePageClick(opt.page - 1)}>
                                Previous
                            </a>
                        </li> : ""}
                        {/*Array.from({ length: opt.total_pages + 1 }).map(
                            (d, i: any) => {
                                return (
                                    <li
                                        className={`page-item ${parseFloat((router?.query?.page || 0).toString()) -
                                            1 ==
                                            i
                                            ? "active"
                                            : ""
                                            }`}>
                                        <Link href={`${router.pathname}?page=${i}`}>
                                            <a
                                                className='page-link'
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    handlePageClick(i);
                                                }}>
                                                {i + 1}
                                            </a>
                                        </Link>
                                    </li>
                                );
                            },
                        )*/}

                        {opt.total_count > 10 && getPageNumbers().map((page) => (

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

                        ))}

                        {opt.page != opt.total_pages ?
                            <li className='page-item'>
                                <a className='page-link' onClick={() => handlePageClick(opt.page + 1)}>
                                    Next
                                </a>
                            </li> : ""}
                        {opt.page != opt.total_pages ? <li className='page-item'>
                            <a className='page-link' onClick={() => handlePageClick(opt.total_pages)}>
                                Last
                            </a>
                        </li> : ""}

                    </ul>

                </div>
            </div>


        </>
    )

}
Price.ignorePath = true
export default Price

