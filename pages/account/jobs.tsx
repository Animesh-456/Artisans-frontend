import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ProjectDetails } from "../../src/@types/type";
import api from "../../src/api/services/api";
import atom from "../../src/jotai/atom";
import Routes from "../../src/Routes";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import { useRouter } from "next/router";
import { writeAtom } from "jotai-nexus";
import { Modal } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import common from "../../src/helpers/common";
import toast from "react-hot-toast";
import Router from "next/router";
import env from "../../src/config/api";
import Head from "next/head";

type Props = {};


export const getStaticProps = async () => {
    try {
        const params: any = {
            id: 26,
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


const Jobs = (prp) => {
    const router = useRouter();

    const list = useAtomValue(atom.project.api.my);
    const opt = useAtomValue(atom.project.api.my_proj_opt);
    const [index, setIndex] = useAtom(atom.storage.job_tab);
    let loginmodal = useAtomValue(atom.storage.loginmodal);

    const user = useAtomValue(atom.storage.user);

    const RefLink = (l) => {
        //const router = useRouter();
        localStorage.setItem('items', (l));
        router.replace(l)
    }
    useEffect(() => {

        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;

        api.project.my_jobs({ params: { ...opt, page: pageNumber - 1, status: index } });
    }, [index]);



    const [dropdown, setOptions] = useState(0);

    const handleOptions = () => {

        var ele = (document.getElementById("project_status")) as HTMLSelectElement;

        var sel = ele.selectedIndex;
        var option_p = ele.options[sel];
        var value = Number(option_p.value);

        setOptions(value)
        if (value == 0) {
            setIndex(1);
        }
        else if (value == 1) {
            setIndex(5);
        }
        else if (value == 2) {
            setIndex(6);
        }
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;


        api.project.my_jobs({ params: { ...opt, page: pageNumber - 1, status: index } });
    }
    const [show, setShow] = useState(true);

    const handleClose = () => {
        if (checkbox == true) {
            setShow(false);
            writeAtom(atom.storage.loginmodal, false)
            let b = {
                id: user?.id,
                showmodal: 1
            }
            api.auth.update_modal({ body: b })
        } else if (checkbox == false) {
            setShow(false);
            writeAtom(atom.storage.loginmodal, false)
        }
    }

    const [signIn, signstate] = useState({
        company_name: "",
        SIREN: "",
        pro_user: 1,
        id: user?.id
    });

    const setSign = common.ChangeState(signstate);

    const handlesubmit = () => {
        setShow(false);
        writeAtom(atom.storage.loginmodal, false)
        Router.push("/account/procust")
    }
    const [checkbox, setchexbox] = useState(false);


    const check = (event) => {
        if (event.target.checked) {
            setchexbox(true)
        } else if (!event.target.checked) {
            setchexbox(false)
        }
    }


    const handlePageClick = (i) => {
        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.my_jobs({ params: { ...opt, page: i, status: index } });
            });
    };




    const visiblePages = 10; // Number of visible page buttons
    const getPageNumbers = () => {
        const startPage = Math.max(0, opt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(opt.total_pages, startPage + visiblePages - 1);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (

        //For dynamic data we can use this 👇
        // <section>
        //     <div className='container cjw'>
        //         <div className='row'>
        //             <AccountSideBar />

        //             <div className='col-sm-8'>
        //                 <div className='profile_box'>
        //                     <h3>
        //                         My Projects
        //                         {list?.length ? <span>({opt.total_count})</span> : ""}
        //                     </h3>

        //                     <div className='row help-ico'>
        //                         <div className='col-sm-6'>

        //                             {user?.role_id == 2 ? (
        //                                 <select id='project_status' onChange={handleOptions}>
        //                                     <option value={0} selected={true}>
        //                                         Other
        //                                     </option>
        //                                     <option value={1}>
        //                                         Awarded but not yet Funded projects
        //                                     </option>
        //                                     <option value={2}>
        //                                         Finalized Orders without a Review
        //                                     </option>
        //                                 </select>
        //                             ) : (
        //                                 <></>
        //                             )}

        //                         </div>
        //                         <div className='col-sm-6'>
        //                             <a href='#' data-toggle='modal' data-target='#myhelp'>
        //                                 <strong>
        //                                     <i className='fa fa-question-circle' /> Help
        //                                 </strong>
        //                             </a>
        //                         </div>
        //                     </div>
        //                     <div className='uys5'>
        //                         <ul className='nav nav-pills' role='tablist'>
        //                             {user?.role_id == 2 ? (
        //                                 Routes.jobsTab.map((j) => {
        //                                     return (
        //                                         <>
        //                                             <li className='nav-item'>
        //                                                 <p
        //                                                     className={`nav-link c-p ${j.id == index ? "active" : ""
        //                                                         }`}
        //                                                     style={{
        //                                                         cursor: "pointer",
        //                                                         color: j.id == index ? "white" : "black",
        //                                                     }}
        //                                                     onClick={(e) => {
        //                                                         if (index == j.id) return;
        //                                                         e.preventDefault();
        //                                                         setIndex(j.id);
        //                                                         console.log("tab id->", j.id);
        //                                                         api.project.my_jobs({
        //                                                             params: { ...opt, page: 0, status: j.id },
        //                                                         });
        //                                                     }}>
        //                                                     {j.title}
        //                                                 </p>
        //                                             </li>
        //                                         </>
        //                                     );
        //                                 })
        //                             ) : (
        //                                 <></>
        //                             )}
        //                         </ul>


        //                         {/* <div className='tab-content'>
        // 							<div id='all' className='tab-pane active'>
        // 								<div className='project_loop'>
        // 									<h4>
        // 										<a href='#'>
        // 											Lorem Ipsum is simply dummy text of the printing
        // 										</a>
        // 									</h4>
        // 									<p>Public </p>
        // 									<p>Posted : 16-Jun,2022</p>
        // 								</div>
        // 							</div>
        // 							<div id='mybid' className='tab-pane fade'>
        // 								<div className='project_loop'>
        // 									<h4>
        // 										<a href='#'>
        // 											Lorem Ipsum is simply dummy text of the printing and
        // 											typesetting industry.
        // 										</a>
        // 									</h4>
        // 									<p>Public | Open</p>
        // 									<p>Posted : 16-Jun,2022</p>
        // 								</div>
        // 							</div>
        // 							<div id='orderprogress' className='tab-pane fade'>
        // 								<div className='project_loop'>
        // 									<h4>
        // 										<a href='#'>
        // 											Lorem Ipsum is simply dummy text of the printing and
        // 											typesetting industry. Lorem Ipsum has been the
        // 											industry's standard
        // 										</a>
        // 									</h4>
        // 									<p>Public | Open</p>
        // 									<p>Posted : 16-Jun,2022</p>
        // 								</div>
        // 							</div>
        // 							<div id='finalizeorder' className='tab-pane fade'>
        // 								<div className='project_loop'>
        // 									<h4>
        // 										<a href='#'>
        // 											Lorem Ipsum is simply dummy text of the printing and
        // 											typesetting industry. Lorem Ipsum has been the
        // 											industry's
        // 										</a>
        // 									</h4>
        // 									<p>Public | Open</p>
        // 									<p>Posted : 16-Jun,2022</p>
        // 								</div>
        // 							</div>
        // 						</div> */}
        //                     </div>

        //                     {list.length
        //                         ? list?.map((l: ProjectDetails) => {
        //                             return (
        //                                 <>
        //                                     <div className='project_loop'>
        //                                         <div className="project_loop_jobs">
        //                                             <h4>

        //                                                 <a href={`/${l?.project_name?.split(" ").join("-")}-${l?.id}`}>{l?.project_name}</a>
        //                                             </h4>
        //                                             <p>  Posted :{" "}
        //                                                 {moment(l?.project_post_date).format("DD-MMM-YYYY")}</p>

        //                                         </div>
        //                                         <p>{l?.visibility}</p>
        //                                     </div>
        //                                 </>
        //                             );
        //                         })
        //                         : (<> </>)}
        //                     <ul className='pagination'>
        //                         {(opt.page > 0) ? <li className='page-item'>
        //                             <a className='page-link' onClick={() => handlePageClick(0)}>
        //                                 First
        //                             </a>
        //                         </li> : ""}
        //                         {(opt.page > 0) ? <li className='page-item'>
        //                             <a className='page-link' onClick={() => handlePageClick(opt.page - 1)}>
        // Previous
        //                             </a>
        //                         </li> : ""}
        //                         {/* {(opt.total_pages < 10 ? (Array.from({ length: opt.page + 1 })) : (Array.from({ length: 10 }))).map(
        // 								(d, i: any) => {
        // 									return (
        // 										<li
        // 											className={`page-item ${parseFloat((router?.query?.page || 0).toString()) -
        // 												1 ==
        // 												i
        // 												? "active"
        // 												: ""
        // 												}`}>
        // 											<Link href={`${router.pathname}?page=${i}`}>
        // 												<a
        // 													className='page-link'
        // 													onClick={(e) => {
        // 														e.preventDefault();
        // 														handlePageClick(i);
        // 													}}>
        // 													{i + 1}
        // 												</a>
        // 											</Link>
        // 										</li>
        // 									);
        // 								},
        // 							)} */}

        //                         {opt.total_count && getPageNumbers().map((page) => (
        //                             <>
        //                                 <li
        //                                     className={`page-item ${parseFloat((router?.query?.page || 0).toString()) - 1 ==
        //                                         page
        //                                         ? "active"
        //                                         : ""
        //                                         }`}>
        //                                     <Link href={`${router.pathname}?page=${page}`}>
        //                                         <a
        //                                             className='page-link'
        //                                             onClick={(e) => {
        //                                                 e.preventDefault();
        //                                                 handlePageClick(page);
        //                                             }}>
        //                                             {page + 1}
        //                                         </a>
        //                                     </Link>
        //                                 </li>
        //                             </>

        //                         ))}




        //                         {opt.page != opt.total_pages ?
        //                             <li className='page-item'>
        //                                 <a className='page-link' onClick={() => handlePageClick(opt.page + 1)}>
        //                                     Next
        //                                 </a>
        //                             </li> : ""}
        //                         {opt.page != opt.total_pages ? <li className='page-item'>
        //                             <a className='page-link' onClick={() => handlePageClick(opt.total_pages)}>
        //                                 Last
        //                             </a>
        //                         </li> : ""}
        //                     </ul>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </section>

        // New logic goes here 👇


        <>


            <Head>
                <title>{`${prp?.prp?.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
            </Head>
            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <AccountSideBar />
                        </div>
                        <div className="col-sm-8">
                            <div className="profile_box">
                                <div className="prof111">
                                    <h4>My Projects <span>{list?.length ? <span>({opt.total_count})</span> : ""}</span>
                                    </h4>
                                </div>

                                <div className="uys5">
                                    <ul className="nav nav-pills" role="tablist">



                                    </ul>
                                    <div className="tab-content">
                                        {/* <div id="all" className="tab-pane active"> */}




                                        {/* Loop logic here  */}



                                        {list.length
                                            ? list?.map((l: ProjectDetails) => {
                                                return (
                                                    <>
                                                        {/* <div  className='tab-pane fade'> */}
                                                        <div id="all" className="tab-pane active">
                                                            <div className='project_loop'>

                                                                <h4>
                                                                    <a href={`/${l?.project_name?.split(" ").join("-")}-${l?.id}`}>{l?.project_name}</a>
                                                                </h4>
                                                                <p>{l?.visibility} | Open </p>
                                                                <p>  Posted :{" "}
                                                                    {moment(l?.project_post_date).format("DD-MMM-YYYY")}</p>



                                                            </div>
                                                        </div>
                                                        {/* </div> */}
                                                    </>
                                                );
                                            })
                                            : (<> </>)}




                                        {/* </div> */}

                                    </div>
                                    {/* <ul className="pagination justify-content-center">
                                    <li className="page-item"><a className="page-link" href="javascript:void(0);"><i className="fa fa-angle-double-left"></i></a></li>
                                    <li className="page-item"><a className="page-link" href="javascript:void(0);">1</a></li>
                                    <li className="page-item"><a className="page-link" href="javascript:void(0);">2</a></li>
                                    <li className="page-item"><a className="page-link" href="javascript:void(0);"><i className="fa fa-angle-double-right"></i></a></li> */}



                                    {/* New Pagination 👇 */}


                                    <ul className='pagination'>
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


                                        {opt.total_count && getPageNumbers().map((page) => (
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
                        </div>
                    </div>
                </div>
            </section >
        </>
    );
};

export default Jobs;
