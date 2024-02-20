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
        api.project.allreviews({ params: { ...opt, page: pageNumber-1 } });
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
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>ALL REVIEWS</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container cjw'>
                <div className='row'>
                    <div className='col-sm-4'>
                        <div className='looking_m'>
                            <h3>Looking for a Machinist?</h3>
                            <p>Post your request and receive quotes for free.</p>
                            <Link href='/job/post'>
                                <a>Post your request</a>
                            </Link>
                            <h3>Are you a Machinist?</h3>
                            <p>Create a profile and start working.</p>
                            <Link href='/account/profile'>
                                <a>Create Your Profile</a>
                            </Link>
                        </div>
                    </div>

                    <div className='col-sm-8'>


                        <div className='profile_box'>
                            <h3 className='pb-0'>Evaluations received by machinists <span className='darkblue-text '>({opt?.total_count + " ratings"})</span>{""}</h3>
                            <hr className='dashed-hr' />




                            <div className='machin_req'>
                                <>
                                    {list?.length ? list.map((l) => {
                                        return (
                                            <div className='row'>
                                                {/* <div className='latest_r'> */}
                                                <div className="container">

                                                    <div className="heading1">
                                                        <h3><a href={`/machining/${l?.project?.project_name}-${l?.project?.id}`}>{l?.project?.project_name}</a></h3>
                                                        <p>{l?.project?.visibility} | Machined by - {l?.provider?.user_name}</p>
                                                    </div>

                                                    <div className="heading2">
                                                        <div className="heading2sub">

                                                            <div className='rf85f'>
                                                                <p>
                                                                    <div
        className="stars"
        style={{ '--rating': l?.rating } as CSSProperties}
      ></div>
                                                                    <span>{l?.rating}</span>
									
                                                                </p>
                                                            </div>

                                                            <div className="rating-color">
                                                                <p>
                                                                     <span> Quality </span>
 <div
        className="quality"
        style={{ '--rating': l?.provider_rate1 } as CSSProperties}
      ></div>
                                                                   
                                                                </p>

                                                                <p>
								 <span> Time </span>                                                                  
   <div
        className="time"
        style={{ '--rating': l?.provider_rate2 } as CSSProperties}
      ></div>
                                                                   
                                                                </p>

                                                                <p>
                                                                  <span> Communication</span>
  <div
        className="communication"
        style={{ '--rating': l?.provider_rate3 } as CSSProperties}
      ></div>
                                                                    
                                                                </p>

                                                                <p>
                                                                  <span> Professionalism </span>
					  <div
        className="professionalism"
        style={{ '--rating': l?.provider_rate4 } as CSSProperties}
      ></div>
                                                                   
                                                                </p>
                                                            </div>


                                                        </div>

                                                        <div className="heading2sub2">

                                                            <div>

                                                                <h5>{new Date(l?.review_post_date).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })} | Machined by {l?.provider?.user_name} | <a href={`/machining/${l?.project?.project_name}-${l?.project?.id}`}>Project Details</a></h5>
                                                                <h3> <b>Comment Evaluation:</b></h3>

                                                                <h4>"
                                                                    {l?.comments}"
                                                                </h4>
                                                                <div className="gr2">- 
                                                                <a href={`/account/public-profile/${l?.buyer_id}`}>{l?.buyer?.user_name} </a>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <br />

                                                </div>
                                                {/* </div> */}
                                                <hr className='dashed-hr' />
                                            </div>
                                        )
                                    }).slice(0, 10) : (<></>)}
                                </>
                            </div>

				 <ul className="pagination justify-content-end">
                {(opt.page > 0) ? <li className='page-item'>
                                       						 <a className='page-link' onClick={() => handlePageClick(0)}>
                                           						 First
                                        					 </a>
                                    					</li>: ""}
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

                {opt.total_count>10 && getPageNumbers().map((page) => (

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
									{opt.page != opt.total_pages ?<li className='page-item'>
                                       								 <a className='page-link' onClick={() => handlePageClick(opt.total_pages)}>
                                            										Last
                                        							 </a>
                                    						</li> : ""}

                      </ul>  


                        </div>

                    </div>
 
                </div>
		
  </div>

          

        </>
    )
}

allreviews.ignorePath = true

export default allreviews;