import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { CountryReponse, MyMsgResponse } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";

import Link from "next/link";

const EditProfile = () => {
	const router = useRouter();

	const list = useAtomValue(atom.project.api.my_msgs);
	const user = useAtomValue(atom.storage.user);
	const notifs = useAtomValue(atom.project.api.notifs);
	//const [shownotification, setshownotification] = useState(false);

	const [opt, setOpt] = useAtom(atom.project.api.list_opt);

	useEffect(() => {
		api.project.my_msgs({ params: opt });
		api.project.notifs({});
	}, []);

	const allnotification = () => {
		window.location.href = '/account/allNotification'

	}
	const formatDate = (val) => {
		const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
		const date: string = val;
		const datenew = date?.slice(0, 10)
		const day = datenew?.slice(8, 10)
		const month = monthList[Number(datenew?.slice(5, 7)) - 1]
		const year = datenew?.slice(0, 4)

		const finaldate = day + "-" + month + "," + year
		return finaldate;

	}




	console.log("notifications-->", notifs);

	let pusharray = [];

	const handleChange = (event) => {
		if (event.target.checked) {
			console.log("checked", event.target.name)
			pusharray.push(event.target.name)
			console.log(pusharray)
		} else {
			console.log("unchecked", event.target.name)
			let index = pusharray.indexOf(event.target.name)
			pusharray.splice(index, 1);
			console.log(pusharray)
		}
	};



	console.log("List are:- ", list)



	const readmsgs = async (a, b, c) => {
		const d = {
			role_id: user?.role_id,
			project_id: a
		}
		await api.project.update_read_my_msgs({ body: d });
		router.push(
			`/machining/msg/${a}/${b}/${c}`,
		)
	}

	useEffect(() => {
		api.project.inbox_count({ params: { id: user?.id, role_id: user?.role_id } })
	}, [])

	const inbox_count = useAtomValue(atom.project.api.inbox_count)


	const handlePageClick = (i) => {
		router
			.replace({
				pathname: router.pathname,
				query: {
					page: i + 1,
				},
			})
			.then(() => {
				api.project.my_msgs({ params: { ...opt, page: i } });
			});
	};


	const pageSize = 10; // Number of items per page
	const visiblePages = 10; // Number of visible page buttons
	const getPageNumbers = () => {
		const startPage = Math.max(0, opt.page - Math.floor(visiblePages / 2));
		const endPage = Math.min(opt.total_pages, startPage + visiblePages - 1);
		return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
	};

	useEffect(() => {
		const pageQueryParam = new URLSearchParams(location.search).get('page');
		const pageNumber = parseInt(pageQueryParam) || 1;
		console.log("Page number is ", pageNumber)
		api.project.my_msgs({ params: { ...opt, page: pageNumber - 1 } });
	}, []);

	return (
		<>
			<div
				className='banner_wp sign_banner'
				style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
				<div className='container'>
					<div className='row'>
						<div className='banner_text inner_banner_text'>
							<h1 className='yh'>Inbox</h1>
						</div>
					</div>
				</div>
			</div>
			<div className='container cjw'>
				<div className='row'>
					<div className="col-sm-4">
						<AccountSideBar />
					</div>

					<div className='col-sm-8'>
						{user?.role_id == 2 ? (
							<div className='profile_box mb-4'>
								<h3 className='pb-0'>
									Notifications <span className='darkblue-text '>({notifs.length})</span>{" "}
								</h3>
								<hr className='dashed-hr' />
								<div className='inbox-box'>
									{notifs.length ? notifs.slice(0, 2).map((n) => {
										return (
											<>
												<div className='border-0 pb-0 qwe'>

													<p className='admin-text qwe1'><span className='dpt-box'></span> Admin</p>

													<p className='inbox'>
														{n.email_subject}
													</p>
													<p className="qwe2">{formatDate(n?.notif_date)}</p>
												</div>
											</>
										)

									}) : (<></>)}
									<hr className='dashed-hr' />

									<div className='project_loop text-end border-0 pb-0'>
										<a onClick={allnotification} className='view-text'>
											View all notifications
										</a>
									</div>
								</div>
							</div>
						) : (<></>)}
						<div className='profile_box'>
							<h3 className='pb-0'>Messages {inbox_count ? (<span className='darkblue-text '>({inbox_count})</span>) : (<></>)}</h3>

							<hr className='dashed-hr' />
							<div className='table-responsive inbox-table mt-4'>
								<table className='table table-bordered table-lg'>
									<thead>
										<tr className="table-primary">
											<th></th>
											<th>User</th>
											<th>Project title</th>
											<th className=''>Last message</th>
											<th></th>
										</tr>
									</thead>
									<tbody>
										{list.length ? list.map((l) => {
											return (
												<>



													<tr className='dummy-anchor cursor-pointer' onClick={() => readmsgs(l?.project_id, l?.from_id, l?.to_id)}>
														<td>
															<div className="msgform"><i className="fa fa-square"></i></div>

														</td>
														<td className='dummy-anchor darkblue-text cursor-pointer'>

															{l?.user_name}
														</td>
														<td>{l?.project_name}</td>
														<td className='dummy-anchor cursor-pointer' onClick={() => readmsgs(l?.project_id, l?.from_id, l?.to_id)}>

															{user?.role_id == 1 && l?.buyer_message_status == "U" ? (
																<b>{l?.message}</b>
															) : user?.role_id == 1 && l?.buyer_message_status == "R" ? (
																<>{l?.message}</>
															) : user?.role_id == 2 && l?.programmer_message_status == "U" ? (
																<b>{l?.message}</b>
															) : user?.role_id == 2 && l?.programmer_message_status == "R" ? (
																<>{l?.message}</>
															) : (<>{l?.message}</>)}
														</td>

													</	tr>
												</>
											)
										}) : (<></>)}
									</tbody>
								</table>
							</div>
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
									{/* {(opt.total_pages < 10 ? (Array.from({ length: opt.page + 1 })) : (Array.from({ length: 10 }))).map(
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
									)} */}

									{opt.total_count > 0 && getPageNumbers().map((page) => (

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
		</>
	);
};

export default EditProfile;
