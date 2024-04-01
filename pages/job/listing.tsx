import { useAtom, useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";
import { ProjectResponse } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from "react-icons/md"
import { Document, Page, pdfjs } from 'react-pdf';
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import { writeAtom } from "jotai-nexus";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
type Props = {};


const Listing = (props: Props) => {



	const router = useRouter();


	const [opt, setOpt] = useAtom(atom.project.api.list_opt);
	const [list, setlist] = useAtom(atom.project.api.list);
	const user = useAtomValue(atom.storage.user);
	const [numPages, setNumPages] = useState(null);
	//const totaljobs = useAtomValue(atom.project.api.total_jobs)
	const [arr, setArr] = useState([]);





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






	useEffect(() => {
		if (user) {
			api.project.public_profile_total_jobs({ params: { id: user?.id } })
		}

	}, [])

	const totaljobs = useAtomValue(atom.project.api.total_jobs)



	const onDocumentLoadSuccess = ({ numPages }) => {

		setNumPages(numPages);
	};



	const visiblePages = 10; // Number of visible page buttons
	const getPageNumbers = () => {
		const startPage = Math.max(0, opt.page - Math.floor(visiblePages / 2));
		const endPage = Math.min(opt.total_pages, startPage + visiblePages - 1);

		return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	};







	return (
		<>

			<section className="cjw">
				<div className="container">
					<div className="row">

						<div className='col-sm-4'>


							{user?.role_id == 2 || user?.role_id == 1 ? (
								<>

									<AccountSideBar />

								</>
							) : (<>


								<div className='looking_m' style={{ backgroundImage: `url(/img/about-bg.jpg)` }}>
									<h3>Looking for a artist?</h3>
									<p>Post your request and receive quotes for free.</p>
									<Link href='/job/post'>
										<a>Post your request</a>
									</Link>
									<h3>Are you a artist?</h3>
									<p>Create a profile and start working.</p>
									<Link href='/auth/sign-in'>
										<a onClick={() => writeAtom(atom.storage.radio_login, "2")}>Create Your Profile</a>
									</Link>
								</div>

							</>)}

						</div>
						<div className='col-sm-8'>
							<div className='machin_req'>
								<>
									<h3>

										Artisans Requests <span>showing results {opt.page * 10 + 1}-{list?.length < 10 ? ((opt.page * 10) + list?.length) : (opt.page + 1) * 10}</span>
									</h3>
									{list.length
										? (list.map((l, index) => {

											const strt = new Date(l?.project_post_format_date)


											let n = new Date().toLocaleString('en-US', {
												timeZone: 'Asia/Kolkata',
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


											const date = new Date(l?.created * 1000);

											const year = date.getFullYear();
											const month = String(date.getMonth() + 1).padStart(2, '0');
											const day = String(date.getDate()).padStart(2, '0');
											const hours = String(date.getHours()).padStart(2, '0');
											const minutes = String(date.getMinutes()).padStart(2, '0');
											const seconds = String(date.getSeconds()).padStart(2, '0');

											const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;




											/////////////////////////////////for log/////////////////////////////









											const givenDateTime2 = moment(l?.project_post_format_date, 'YYYY-MM-DD HH:mm:ss');
											const nowDateTime2 = moment();

											// Step 2: Calculate the time difference using the diff method
											const timeDifference2 = nowDateTime2.diff(givenDateTime2);

											// Step 3: Extract the days and hours from the difference using Moment's duration methods
											const duration2 = moment.duration(timeDifference2);
											const days2 = duration2.days();
											const hours2 = duration2.hours();





											return (

												(l?.pro_job == 1) ? ((user?.role_id == 2 && user?.pro_user == 1) || (user?.email == l?.creator?.email)) ?
													<>
														<h1>hiii</h1>



														<div className='machin_req_li' key={l?.id}>
															{l?.programmer_id ? (
																<div className='award'>
																	<img src={'/img/awarded.png'} />
																</div>
															) : (
																<></>
															)}

															{l?.programmer_id && l?.project_status == "5" ? (

																<h1>gtgt</h1>

															) : (
																<></>
															)}
															<div className='machin_req_li_img'>
																{l?.attachment_name?.includes(",") ? (
																	(l?.visibility.toLowerCase() == "private") ? (
																		user && (l?.creator_id == user?.id || (user?.role_id == 2 && Number(totaljobs) >= 1))) ? l?.attachment_name?.substring(0, l?.attachment_name?.indexOf(',')).includes("pdf") ?
																		<div className="pdf-container"><Document
																			file={common.get_attachment((l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate)}
																			onLoadSuccess={onDocumentLoadSuccess}
																		>
																			<Page pageNumber={1} width={200} />
																		</Document> </div> : (<img
																			src={common.get_attachment(
																				(l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
																			)}
																		/>) : (<img
																			src='/img/private.jpg'
																		/>)

																		: l?.attachment_name?.substring(0, l?.attachment_name?.indexOf(',')).includes("pdf") ?
																			<div className="pdf-container"><Document
																				file={common.get_attachment((l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate)}
																				onLoadSuccess={onDocumentLoadSuccess}
																			>
																				<Page pageNumber={1} width={200} />
																			</Document> </div> : (<img
																				src={common.get_attachment(
																					(l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
																				)}
																			/>)
																) : (
																	(l?.visibility.toLowerCase() == "private") ? (
																		(l?.creator_id == user?.id || (user?.role_id == 2 && Number(totaljobs) >= 1))) ? (l?.attachment_name?.includes("pdf")) ?
																		<div className="pdf-container"><Document
																			file={common.get_attachment((l?.attachment_name), formattedDate)}
																			onLoadSuccess={onDocumentLoadSuccess}
																		>
																			<Page pageNumber={1} width={200} />
																		</Document> </div> : (<img
																			src={common.get_attachment(
																				(l?.attachment_name), formattedDate)}
																		/>) : (<img
																			src='/img/private.jpg'
																		/>)

																		: (l?.attachment_name?.includes("pdf") ?
																			<div className="pdf-container"><Document
																				file={common.get_attachment((l?.attachment_name), formattedDate)}
																				onLoadSuccess={onDocumentLoadSuccess}
																			>
																				<Page pageNumber={1} width={200} />
																			</Document> </div> : (
																				<img
																					src={common.get_attachment(
																						(l?.attachment_name), formattedDate)}
																				/>))
																)}
															</div>



															<div className='machin_req_li_text'>
																STATUS: {l?.project_status}


																{(user?.pro_user == 1 || l?.pro_job == 0) ? (<h4>
																	<a href={`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`} >{l?.project_name}</a>
																</h4>) : (<h4>{l?.project_name}</h4>)}


																<p>
																	<span>
																		Posted{" "}
																		{diffInDays} d {hourDifference} h ago

																	</span>
																	<span>
																		End:{" "}
																		{diffInDays2 >= 0 && hourDifference2 >= 0 ? (
																			<>{diffInDays2} d {hourDifference2} h</>
																		) : (<>0 d 0 h</>)}

																	</span>{" "}
																	{l?.bids_count ? (
																		<span>{l?.bids_count} Offers</span>
																	) : (
																		<></>
																	)}
																</p>
																{l?.visibility.toLowerCase() == "private" ? (
																	user && (l?.creator_id == user?.id || (user?.role_id == 2 && Number(totaljobs) != 0)) ? (
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
																	) : (<></>)
																) : (
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
																)}
																{l?.visibility.toLowerCase() == "private" ? (
																	user && (l?.creator_id == user?.id || (user?.role_id == 2 && Number(totaljobs) != 0)) ? (
																		<a href={`/account/public-profile/${l?.creator?.id}`} className="qwe5">{l?.creator?.user_name}</a>
																	) : (<></>)
																) : (<a href={`/account/public-profile/${l?.creator?.id}`} className="qwe5">{l?.creator?.user_name}</a>
																)}


															</div>
															<div>
																{l?.pro_job == 1 ? (<div className="pro_tag"><img src='/img/pro_icon.png' alt='' /></div>) : (<></>)}

															</div>


														</div>

													</> : <></>
													:
													<>

														<div className='machin_req_li' key={l?.id}>
															{l?.programmer_id ? (
																<div className='award'>
																	<img src='/img/awarded.png' />
																</div>
															) : (
																<></>
															)}


															<div className='machin_req_li_img'>
																{l?.attachment_name?.includes(",") ? (
																	(l?.visibility.toLowerCase() == "private") ? (user && (l?.creator_id == user?.id || (user?.role_id == 2 && Number(totaljobs) != 0))) ? l?.attachment_name?.substring(0, l?.attachment_name?.indexOf(',')).includes("pdf") ?
																		<div className="pdf-container"><Document
																			file={common.get_attachment((l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate)}
																			onLoadSuccess={onDocumentLoadSuccess}
																		>
																			<Page pageNumber={1} width={200} />
																		</Document> </div> : (<img
																			src={common.get_attachment(
																				(l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
																			)}
																		/>) : (<img
																			src='/img/private.jpg'
																		/>)

																		: l?.attachment_name?.substring(0, l?.attachment_name?.indexOf(',')).includes("pdf") ?
																			<div className="pdf-container"><Document
																				file={common.get_attachment((l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate)}
																				onLoadSuccess={onDocumentLoadSuccess}
																			>
																				<Page pageNumber={1} width={200} />
																			</Document> </div> : (<img
																				src={common.get_attachment(
																					(l?.attachment_name)?.substring(0, l?.attachment_name.indexOf(',')), formattedDate
																				)}
																			/>)
																) : (
																	(l?.visibility.toLowerCase() == "private") ? (user && (l?.creator_id == user?.id || (user?.role_id == 2 && Number(totaljobs) != 0))) ? l?.attachment_name?.includes("pdf") ?
																		<div className="pdf-container"><Document
																			file={common.get_attachment((l?.attachment_name), formattedDate)}
																			onLoadSuccess={onDocumentLoadSuccess}
																		>
																			<Page pageNumber={1} width={200} />
																		</Document> </div> : (<img
																			src={common.get_attachment(
																				(l?.attachment_name), formattedDate)}
																		/>) : (<img
																			src='/img/private.jpg'
																		/>)

																		: (l?.attachment_name?.includes("pdf") ?
																			<div className="pdf-container"><Document
																				file={common.get_attachment((l?.attachment_name), formattedDate)}
																				onLoadSuccess={onDocumentLoadSuccess}
																			>
																				<Page pageNumber={1} width={200} />
																			</Document> </div> : (<img
																				src={common.get_attachment(
																					(l?.attachment_name), formattedDate)}
																			/>))
																)}
															</div>



															<div className='machin_req_li_text'>
																{(user?.pro_user == 1 || l?.pro_job == 0) ? (<h4>
																	<a href={`/machining/${l?.project_name?.split(" ").join("-")}-${l?.id}`} >{l?.project_name}</a>
																</h4>) : (<h6>{l?.project_name}</h6>)}

																<p>
																	<span>
																		Posted{" "}
																		{/* {moment().format("YYYY-MM-DD") ==
																		l?.project_post_date
																		? "today"
																		: moment(l?.project_post_date).fromNow(true)} */}



																		{diffInDays} d {hourDifference} h ago
																	</span>
																	<span>
																		End:{" "}

																		{diffInDays2 >= 0 ? (
																			<>{diffInDays2} d {hourDifference2} h</>
																		) : (<>0 days 0 hours</>)}

																		{/* {moment(
																		moment
																			.unix(parseInt(l?.post_for))
																			.format("YYYY-MM-DD HH:mm:ss"),
																	).toNow(true)} */}
																	</span>{" "}
																	{l?.bids_count ? (
																		<span className="offers-now">{l?.bids_count} Offers</span>
																	) : (
																		<></>
																	)}
																</p>
																{l?.visibility.toLowerCase() == "private" ? (
																	user && (l?.creator_id == user?.id || (user?.role_id == 2 && Number(totaljobs) != 0)) ? (
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
																	) : (<></>)
																) : (
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
																)}
																{/* <p>{l?.pro_job} job type</p> */}
																{l?.visibility.toLowerCase() == "private" ? (
																	user && (l?.creator_id == user?.id || (user?.role_id == 2 && Number(totaljobs) != 0)) ? (
																		<div className="flx-dsp">
																			<a href={`/account/public-profile/${l?.creator?.id}`} className="qwe5">{l?.creator?.user_name}</a>
																			{l?.project_status == "5" ? (
																				// <span className="a-green-logo">A</span>
																				<></>
																			) : (
																				<></>
																			)}
																		</div>



																	) : (<></>)
																) : (

																	<div className="flx-dsp">
																		<a href={`/account/public-profile/${l?.creator?.id}`} className="qwe5">{l?.creator?.user_name}</a>
																		{l?.project_status == "5" ? (
																			// <span className="a-green-logo">A</span>
																			<></>
																		) : (
																			<></>
																		)}
																	</div>
																)}


															</div>
															<div>
																{l?.pro_job == 1 ? (<div className="pro_tag"><img src='/img/pro_icon.png' alt='' /></div>) : (<></>)}

															</div>


														</div>



													</>
											)



										})
										)
										: ""}

									<div className='pagination-wrap'>
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
								</>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

Listing.ignorePath = true;

export default Listing;