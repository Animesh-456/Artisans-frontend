import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { BidsMsgResponse, MsgReponse, ProjectDetails } from "../../@types/type";
import api from "../../api/services/api";
import common from "../../helpers/common";
import { ProgressBar } from "react-bootstrap";
import moment from "moment";
import { CSSProperties } from 'react';

import atom from "../../jotai/atom";
import { useAtomValue } from "jotai";
type Props = {
	bid: ProjectDetails["bids"][0];
	data: ProjectDetails;
	user: any;
	select_machinist: any;
	send_msg: any;
	revdata: any;
};

const Offer = ({ bid, data, user, send_msg, select_machinist, revdata }: Props) => {
	const router = useRouter();

	const [show, setShow] = useState(false);
	const [file, setFile] = useState([]);
	const [changePic, setChangePic] = useState(false);
	const [showMsgs, setShowMsgs] = useState(false);
	const [msg, msgState] = useState({
		project_id: bid?.project_id,
		msg_box: "",
		send_to: user?.role_id == 2 ? data.creator_id : bid.user_id,
	});
	const setMsg = common.ChangeState(msgState);

	const [msgs, setMsgs] = useState([]);

	const [albidmsg, setalbidmsg] = useState([]);
	const [allistmsg, setallistmsg] = useState([]);
	console.log("proj data----------------->>>>>>", data);
	const [progress, setprogress] = useState(0);

	const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.currentTarget;
		const filesArray = [];

		for (let i = 0; i < files.length; i++) {
			const file = files[i];

			if (file.size / (1024 * 1024) > 10) {
				toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
				continue;
			}
			//filesArray.push(file)
			setFile((p) => [...p, file]);
			setpr(0)
		}

		if (files.length) {
			//setFile(filesArray);
			setChangePic(true);
			//setpr(0)
		} else if (!files.length) {
			//setpr(110)
			setChangePic(false)
		}
	};

	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (!file && changePic) return toast.error("Please select an Image");

		let form = new FormData();
		if (file && changePic) {
			for (let i = 0; i < file.length; i++) {
				form.append("file", file[i]);
			}
		}

		for (const key of Object.keys(msg)) {
			form.append(key, msg[key]);
		}
		console.log(msg);

		api.project.send_bid_msg(
			{
				body: msg,
				file: form,
				params: changePic ? { change_pic: changePic } : {},
			},
			(d) => {
				window.location.reload();
				setShow(false);
				setMsg("msg_box", "")(null);
				setMsgs((p) => {
					return [...p, d?.data];
				});
				setalbidmsg((p) => {
					return [...p, d.data]
				})
				setFile(null);
			},
		);
	};


	useEffect(() => {
		console.log(msgs);
	}, [msgs]);

	const handle_list_msgs = () => {
		if (showMsgs) {
			setShowMsgs(true);
			return;
		}
		api.project.list_bid_msgs(
			{
				params: {
					project_id: bid?.project_id,
					from_id: user?.role_id == 2 ? bid?.user_id : data.creator_id,
					to_id: user?.role_id == 2 ? data.creator_id : bid?.user_id,
				},
			},
			(d) => {
				setMsgs(d?.data);
				setShowMsgs(true);
			},
		);
	};
	const handle_hide_msgs = () => {
		setShowMsgs(false);
	};

	const listmsg = () => {
		if (showMsgs) {
			setShowMsgs(true);
			return;
		}
		api.project.list_msgs(
			{
				params: {
					project_id: data.id,
					from_id: user?.role_id == 2 ? data.programmer_id : data.creator_id,
					to_id: user?.role_id == 2 ? data.creator_id : data.programmer_id,
				},
			},
			(d) => {
				setMsgs(d?.data);
				setShowMsgs(true);
			},
		);
	}


	const allistmsgs = () => {
		if (data?.programmer_id != null) {

			api.project.list_msgs(
				{
					params: {
						project_id: data.id,
						from_id: user?.role_id == 2 ? data.programmer_id : data.creator_id,
						to_id: user?.role_id == 2 ? data.creator_id : data.programmer_id,
					},
				},
				(d) => {
					setallistmsg(d.data)
				},
			);
		}

	}

	const allbidmsgs = () => {

		if (user) {
			api.project.list_bid_msgs(
				{
					params: {
						project_id: bid?.project_id,
						from_id: user?.role_id == 2 ? bid?.user_id : data.creator_id,
						to_id: user?.role_id == 2 ? data.creator_id : bid?.user_id,
					},
				},
				(d) => {
					setalbidmsg(d.data)
				},
			);
		}
	}

	console.log("all messages are :- ", albidmsg)

	useEffect(() => {
		// if (data.programmer_id != null) {
		// 	allistmsgs()
		// } else {
		// 	allbidmsgs()
		// }
		if (storageuser) {
			allbidmsgs()
			allistmsgs()
		}

	}, []);

	const storageuser = useAtomValue(atom.storage.user)

	console.log("data", data)

	console.log("bod", bid)


	const [pr, setpr] = useState(110)

	useEffect(() => {
		if (pr < 102) {
			setTimeout(() => setpr(prev => prev += 2), 50)
		}

	}, [pr]);

	console.log("Files are", file)

	function delete_files(e) {
		setFile(file.filter(function (s) { return s !== e }))
		//setFile(null)
	}

	useEffect(() => {
		setFile(file)
	}, [])



	console.log("bid time-->", new Date(moment.unix(bid?.bid_time).format('YYYY-MM-DD HH:mm:ss')).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" }))



	const date = new Date(bid?.bid_time * 1000);

	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, '0');
	const day = String(date.getDate()).padStart(2, '0');
	const hours = String(date.getHours()).padStart(2, '0');
	const minutes = String(date.getMinutes()).padStart(2, '0');
	const seconds = String(date.getSeconds()).padStart(2, '0');

	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

	console.log('created-------------------', formattedDate);

	function delete_additional_files(a, b) {

		api.project.delete_additional_file({
			body: {
				filename: String(a),
				id: b
			},
			params: {}
		}, (d) => {
			window.location.reload();
		}
		)

	}
	
	console.log("logo of user is :--", bid?.user?.logo)

	return (
		<div className='row fdfd3'>
			<div className='col-sm-2'>
				<div className='fdfd'>
					<figure>
						<img
							src={
								common.get_profile_picture(bid?.user?.logo) ||
								"/img/no-images.png"
							}
						/>
					</figure>
					<a href={`/account/public-profile/${bid?.user_id}`}><h5>{bid?.user?.user_name}</h5></a>
					<p>
						{revdata?.totalproject} Jobs

						<div
							className="stars"
							style={{ '--rating': revdata?.public_avg_rating ? revdata?.public_avg_rating : 0.0 } as CSSProperties}
						></div>
						<span>{revdata?.public_avg_rating ? revdata?.public_avg_rating : "0.0"}</span>
					</p>
				</div>
			</div>
			<div className='col-sm-8'>
				<div className='fdfd1'>

					{(storageuser?.id == bid?.user_id) || (data?.creator_id == storageuser?.id) ? (
						<p><pre className="custom-pre">{bid?.bid_desc}</pre></p>
					) : (<></>)}

					{storageuser?.role_id == 2 ? (
						albidmsg.length && storageuser?.id == bid?.user_id && !showMsgs ? (
							<div className='send-message-col'>
								<div className='sent-message-text'>
									{albidmsg.slice(-3).reverse().map((m) => {
										return (
											<div className='message-row'>
												<div className="qwe13">
													<h6 className='name'>
														{m?.send_from == user?.id
															? user?.user_name
															: `${user?.role_id == 1
																? bid?.user?.user_name
																: data?.creator?.user_name
															}`}
															<br />
														{m?.send_from == data?.creator_id ? "(Customer)" : "(Machinist)"}
													</h6></div>
												<div className="qwe14"><p className='text'><pre className="custom-pre">{m?.msg_box}</pre></p></div>

												<div className="qwe15"><ul className="bidmsg3">
													{String(m?.attachment).includes(",") ? (

														String(m?.attachment).split(",").map((im) => {
															return (
																<>
																	<li>

																		<a className="link-text" target={"_blank"} href={common.get_attachment(`${im}`, m?.datetime)}>{im}</a>
																		<br />

																	</li>


																</>

															)
														})
													) : (<><a className="link-text" target={"_blank"} href={common.get_attachment(`${m?.attachment}`, m?.datetime)}>{m?.attachment}</a></>)}

												</ul>
												</div>



												<div className="qwe16"><p className="bidmsg4">{moment(m?.datetime).format('YYYY-MM-DD HH:mm:ss')}</p></div>
											</div>
										);
									})}
								</div>
							</div>
						) : (<></>)
					) : (
						albidmsg.length && storageuser?.id == data?.creator_id && !showMsgs ? (
							<div className='send-message-col'>
								<div className='sent-message-text'>
									{albidmsg.slice(-3).reverse().map((m) => {
										return (
											<div className='message-row'>
												<div className="qwe13"><h6 className='name'>
													{m?.send_from == user?.id
														? user?.user_name
														: `${user?.role_id == 1
															? bid?.user?.user_name
															: data?.creator?.user_name
														}`}
														<br />
													{m?.send_from == data?.creator_id ? "(Customer)" : "(Machinist)"}
												</h6></div>
												<div className="qwe14"><p className='text'><pre className="custom-pre">{m?.msg_box}</pre></p></div>
												<div className="qwe15"><ul className="bidmsg3">

													{String(m?.attachment).includes(",") ? (

														String(m?.attachment).split(",").map((im) => {
															return (
																<>

																	<li>
																		<a className="link-text" target={"_blank"} href={common.get_attachment(`${im}`, m?.datetime)}>{im}</a>
																		<br />
																	</li>

																</>

															)
														})
													) : (<><a className="link-text" target={"_blank"} href={common.get_attachment(`${m?.attachment}`, m?.datetime)}>{m?.attachment}</a></>)}
												</ul></div>

												<div className="qwe16"><p className="bidmsg4">{moment(m?.datetime).format('YYYY-MM-DD HH:mm:ss')}</p></div>
											</div>
										);
									})}
								</div>
							</div>
						) : (<></>))}


					{!msgs?.length && showMsgs ? (
						<div className='send-message-col'>
							<div className='sent-message-text'>
								<div className='message-row'>
									<p className='text'>{"No Messages yet!"}</p>
								</div>
							</div>
						</div>
					) : msgs?.length && showMsgs ? (
						<div className='send-message-col'>
							<div className='sent-message-text'>
								{msgs.slice(0, msgs.length).reverse().map((m: BidsMsgResponse) => {
									return (
										<div className='message-row'>
											<div className="qwe13"><h6 className='name'>
												{m?.send_from == user?.id
													? user?.user_name
													: `${user?.role_id == 1
														? bid?.user?.user_name
														: data?.creator?.user_name
													}`}
													<br />
												{m?.send_to != data?.creator_id ? "(Customer)" : "(Machinist)"}
											</h6></div>
											<div className="qwe14"><p className='text'><pre className="custom-pre">{m?.msg_box}</pre></p></div>
											<div className="qwe15"><ul className="bidmsg3">


												{String(m?.attachment).includes(",") ? (

													String(m?.attachment).split(",").map((im) => {
														return (
															<>

																<li>
																	<a className="link-text" target={"_blank"} href={common.get_attachment(`${im}`, m?.datetime)}>{im}</a>
																	<br />

																</li>

															</>

														)
													})
												) : (<><a className="link-text bidmsg3" target={"_blank"} href={common.get_attachment(`${m?.attachment}`, m?.datetime)}>{m?.attachment}</a></>)}

											</ul></div>
											<div className="qwe16"><p className="bidmsg4">{moment(m?.datetime).format('YYYY-MM-DD HH:mm:ss')}</p></div>
										</div>
									);
								})}
							</div>
						</div>
					) : (
						<></>
					)}

					{albidmsg.length > 3 ? (
						showMsgs ? (
							<a onClick={handle_hide_msgs} className='d-block view-msg-btn'>
								Hide All Message
							</a>
						) : (
							user?.role_id == 2 && storageuser?.id == bid?.user_id ? (
								<a onClick={handle_list_msgs} className='d-block view-msg-btn'>
									View All Message
								</a>
							) : user?.role_id == 1 && storageuser?.id == data?.creator_id ? (
								<a onClick={handle_list_msgs} className='d-block view-msg-btn'>
									View All Message
								</a>
							) : (<></>)
						)
					) : (<></>)}



					{/* {showMsgs ? (

						<a onClick={handle_hide_msgs} className='d-block view-msg-btn'>
							Hide All Message
						</a>
					) : (
						<a onClick={data.programmer_id != null ? listmsg : handle_list_msgs} className='d-block view-msg-btn'>
							View All Message
						</a>
					)} */}


					{user?.id == data?.creator_id || user?.id == bid?.user_id ? (
						<>

							{user?.role_id == 2 && (albidmsg?.length || data?.programmer_id == bid?.user_id) ? (
								<button
									onClick={() => {
										if (
											data?.programmer_id &&
											data?.programmer_id == bid?.user_id
										) {
											router.push(
												`/machining/msg/${data?.id}/${bid?.user_id}/${data?.creator_id}`,
											);
											return;
										}
										setShow(!show);
										setprogress(0)
										setChangePic(false)
									}}>
									Send a message to the client{" "}
									{/* {user?.role_id == 2 ? "client" : "machinist"} */}
								</button>

							) : user?.role_id == 1 ? (
								<button
									onClick={() => {
										if (
											data?.programmer_id &&
											data?.programmer_id == bid?.user_id
										) {
											router.push(
												`/machining/msg/${data?.id}/${user?.id}/${bid?.user_id}`,
											);
											return;
										}
										setShow(!show);
										setprogress(0)
										setChangePic(false)
									}}>
									Send a message to the machinist{" "}
									{/* {user?.role_id == 2 ? "client" : "machinist"} */}
								</button>
							) : (
								<></>
							)}

						</>
					) : (
						<></>
					)}

					{show && (
						<div className='send-message-col'>
							<textarea
								className='form-control'
								placeholder='Type your message here'
								value={msg.msg_box}
								onChange={setMsg("msg_box")}
							/>
							<br />
							<input type={"file"} multiple onChange={handle_file_change} />
							<br />
							<br />
							{pr < 101 ? (
								<ProgressBar now={pr} label={`${pr}%`} />
							) : (<></>)}
							{file && pr > 100 ? (
								file?.map((f) => {
									return (
										<div className="pro_div">
											<p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files(f)}><i className="fa fa-trash-o"></i></a></p>
										</div>
									)
								})
							) : (<></>)}
							<br />
							<button className='mt-3' onClick={handleSubmit}>
								Send
							</button>
						</div>
					)}

					{bid?.bid_file && ((storageuser?.id == bid?.user_id) || (data?.creator_id == storageuser?.id)) && (

						<h6><b>Attachment:</b></h6>
					)}
					{bid?.bid_file && ((storageuser?.id == bid?.user_id) || (data?.creator_id == storageuser?.id)) && (

						String(bid?.bid_file).includes(",") ? (

							storageuser?.id == bid?.user_id && Number(data?.project_status) < 1  ? (
								String(bid?.bid_file).split(",").map((m) => {
									return (
										<>
											<ul>
												<li>

													<div className="pro_div">
														<p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span><a className="offattach" style={{ color: '#e9bc31' }} target={"_blank"} href={common.get_attachment_latest_ach(`${m}`)}>{m}</a><a className="delete_icon" onClick={() => delete_additional_files(m, bid?.id)}><i className="fa fa-trash-o"></i></a></p>
													</div>


												</li>
											</ul>
										</>

									)
								})
							) : (
								String(bid?.bid_file).split(",").map((m) => {
									return (
										<>
											<ul>
												<li>

													<a className="offattach" style={{ color: '#e9bc31' }} target={"_blank"} href={common.get_attachment_latest_ach(`${m}`)}>{m}</a>


												</li>
											</ul>
										</>

									)
								})
							)
						) : (<>

							{storageuser?.id == bid?.user_id ? (
								<div className="pro_div">
									<p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span><a className="offattach" style={{ color: '#e9bc31' }} target={"_blank"} href={common.get_attachment_latest_ach(`${bid?.bid_file}`)}>{bid?.bid_file}</a><a className="delete_icon" onClick={() => delete_additional_files(bid?.bid_file, bid?.id)}><i className="fa fa-trash-o"></i></a></p>
								</div>
							) : (
								<a className="offattach" style={{ color: '#e9bc31' }} target={"_blank"} href={common.get_attachment_latest_ach(`${bid?.bid_file}`)}>{bid?.bid_file}</a>
							)}

						</>)

					)}
				</div>
			</div>
			{/* <div className='col-sm-2'>
				<div className='fdfd2'>
					{bid?.user_id == data?.programmer_id ? (
						<h3>
							<img src='/img/selected.png' alt='' />
						</h3>
					):((data?.pro_job.toString()=="1") ?(((data?.creator_id == user?.id) || (user?.role_id==2 && user?.pro_user==1))?
								 <h3>
							<img src='/img/selected.png' alt='' />
						</h3>:(<></>)):<h3>
							<img src='/img/selected.png' alt='' />
						</h3> 
					)}
					{(user?.role_id == 1 && data?.creator_id == user?.id) ||
						bid?.user_id == user?.id ? (
						<>
							<h3>{bid?.bid_amount_gbp ? `£${bid?.bid_amount_gbp}` : ""}</h3>
							<h4>Shipping Fee Included</h4>
							<h4>Shipping Time: {bid?.bid_days} days</h4>
						</>
					) : (
						<></>
					)}
					<p>{new Date(moment.unix(bid?.bid_time).format('YYYY-MM-DD HH:mm:ss')).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })}</p>
					{user?.role_id == 1 &&
						data?.creator_id == user?.id &&
						!data?.programmer_id && bid?.no_offer == 1 ? (
						<>
							<a href='#' onClick={select_machinist(bid)}>
								Select
							</a>
						</>
					) : (
						<></>
					)}
				</div>
			</div> */}
			<div className='col-sm-2'>
				<div className='fdfd2'>
					{bid?.user_id == data?.programmer_id ? (

						data?.visibility.toLowerCase() == "pro" ? (
							bid?.user_id == data?.programmer_id || (storageuser?.role_id == "2" && storageuser?.pro_user == "1") ? (
								<h3>
									<img src='/img/selected.png' alt='' />
								</h3>
							) : (<></>)
						) : (
							<h3>
								<img src='/img/selected.png' alt='' />
							</h3>
						)

					) : (
						<></>
					)}

					{/* tva price */}

					{(user?.role_id == 1 && data?.creator_id == user?.id) ||
						bid?.user_id == user?.id ? (
						<>  {bid?.user?.pro_user == 1 ? (<>
							<div className="tva_desc">
								<h6>{bid?.user?.pro_vat == 0 ? "Self-employed manufacturer, not subject to VAT" : ""}</h6>
							</div>
							<h3>{bid?.bid_amount_gbp ? `£${bid?.bid_amount_gbp}TTC £${(bid?.bid_amount_gbp / Number(1 + (bid?.user?.pro_vat) / 100)).toFixed(2)}HT` : ""}</h3></>) : (<>
								{bid?.no_offer == 2 ? (
									<h3>Price Unspecified</h3>
								) : (
									<><h3>{bid?.bid_amount_gbp ? `£${bid?.bid_amount_gbp}` : ""}</h3></>
								)}
							</>)}

							<h4>Shipping Fee Included</h4>
							<h4>Shipping Time: {bid?.bid_days} days</h4>
						</>
					) : (
						(bid?.no_offer == 2 ? (
							(user ? (
								<><h3>Price Unspecified</h3></>
							) : (<></>))
						) : (
							(data?.programmer_id != null && bid?.user_id == data?.programmer_id ? (
								<h3>{bid?.bid_amount_gbp ? `£${bid?.bid_amount_gbp}` : ""}</h3>
							) : (<><h3>Hidden Price</h3></>))
						))
					)}

					<p>{new Date(moment.unix(bid?.bid_time).format('YYYY-MM-DD HH:mm:ss')).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })}</p>
					{user?.role_id == 1 &&
						data?.creator_id == user?.id &&
						!data?.programmer_id && bid?.no_offer == 1 ? (
						<>
							<a href='#' onClick={select_machinist(bid)}>
								Select
							</a>
						</>
					) : (
						<></>
					)}
				</div>
			</div>
		</div >
	);
};

export default Offer;
