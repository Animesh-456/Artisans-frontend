import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import api from "../../../../../src/api/services/api";
import common from "../../../../../src/helpers/common";
import atom from "../../../../../src/jotai/atom";
import AccountSideBar from "../../../../../src/views/account/edit-profile/SideBar";
import { ProgressBar } from "react-bootstrap";

type Props = {};

const Message = (props: Props) => {
	const router = useRouter();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [file, setFile] = useState([]);
	const [changePic, setChangePic] = useState(false);
	const [msgs, setMsgs] = useAtom(atom.project.api.list_msgs);
	const meta: any = useAtomValue(atom.project.api.list_msg_meta);
	const [progress, setprogress] = useState(0);

	const [machineFile, setmachineFile] = useState([])
	const [changeMachinPic, setChangeMachinPic] = useState(false);

	const user = useAtomValue(atom.storage.user);
	// const [fileAttach,setAttach] = useState(false);

	const [msg, msgState] = useState({
		project_id: router?.query?.id,
		message: "",
		to_id: router?.query?.to_id,
	});
	const setMsg = common.ChangeState(msgState);
	useEffect(() => {
		if (!router.isReady) return;

		let project_id = router?.query?.id;
		let to_id = router?.query?.to_id;
	
		let from_id = router?.query?.from_id;

		if (!project_id || !to_id) {
			router.push("/");

			return;
		}

		setMsg("project_id", project_id)(null);
		setMsg("to_id", to_id)(null);


		api.project.list_msgs({ params: { project_id, to_id, from_id } });
	}, [router.isReady]);




	const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.currentTarget;
		const f = [];

		for (let i = 0; i < files.length; i++) {
			const fl = files[i];

			if (fl.size / (1024 * 1024) > 10) {
				toast.error(`${fl.name} cannot be uploaded! \n File size (${(fl.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
				continue;
			}
			setFile((p) => [...p, fl])
			setpr(0)

		}



		if (files.length) {
			//setpr(0)
			//setFile(f);
			setChangePic(true);
			setprogress(100)
		}
		// } else {
		// 	setprogress(0)
		// }
	};

	const handle_machine_file: any = (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files }: any = e.currentTarget;
		const f = [];



		for (let i = 0; i < files.length; i++) {
			const fl = files[i];

			if (fl.size / (1024 * 1024) > 10) {
				toast.error(`${fl.name} cannot be uploaded! \n File size (${(fl.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
				continue;
			}
			setmachineFile((p) => [...p, fl]);
			setpr2(0)

		}


		if (files.length) {
			//setpr2(0)
			//setmachineFile(f);
			setChangeMachinPic(true)
			//setChangePic(true);
			setprogress(100)
		} else {
			setprogress(0)
		}
	};

	const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!file && changePic) return toast.error("Please select an Image");

		let form = new FormData();
		if (file && changePic) {
			for (let i = 0; i < file.length; i++) {
				form.append("file", file[i]);
			}
		}

		if (machineFile && changeMachinPic) {
			for (let i = 0; i < machineFile.length; i++) {
				form.append("file2", machineFile[i]);
			}
		}


		for (const key of Object.keys(msg)) {
			form.append(key, msg[key]);
		}


		api.project.send_msg(
			{
				body: msg,
				file: form,
				params: changePic ? { change_pic: changePic } : {},
			},
			(d) => {
				//setMsg("message", null)
				setMsg("message", "");
				setFile(null);
				setmachineFile([])
				setChangePic(false)
				setChangeMachinPic(false)

				setMsgs((p) => {
					return [d?.data, ...p];
				});
			},
		);
		//window.location.reload();
	};

	const removeFile = () => {

		(document.getElementById('fileAttach') as HTMLInputElement).value = ''
		setChangePic(false)
	}



	const [pr, setpr] = useState(110)

	useEffect(() => {
		if (pr < 102) {
			setTimeout(() => setpr(prev => prev += 2), 50)
		}

	}, [pr]);



	function delete_files(fileIndex) {
		//setFile(file.filter(function (s) { return s !== e }))
		//setFile(null)
		const newFiles = [...file];
		newFiles.splice(fileIndex, 1);
		setFile(newFiles);
		setChangePic(false)
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}

	useEffect(() => {
		setFile(file)
	}, [])


	//////////////////


	const [pr2, setpr2] = useState(110)

	useEffect(() => {
		if (pr2 < 102) {
			setTimeout(() => setpr2(prev => prev += 2), 50)
		}

	}, [pr2]);



	function delete_files2(e) {
		setmachineFile(machineFile.filter(function (s) { return s !== e }))
		//setmachineFile(null)
		//setChangeMachinPic(false)
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}

	useEffect(() => {
		setmachineFile(machineFile)
	}, [])



	const [data, setData] = useAtom(atom.project.api.detail);




	useEffect(() => {
		if (!router.isReady) return
		const id = router.query?.id
		api.project.detail({ params: { id: id } })
	}, [router.isReady])

	return (
		<>
			<div
				className='banner_wp sign_banner'
				style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
				<div className='container'>
					<div className='row'>
						<div className='banner_text inner_banner_text'>
							<h1 className='yh'>My Profile</h1>
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
						<div className='profile_box mb-4'>
							<h3 className='pb-0 prj-link'><a href={`/machining/${meta?.project?.project_name}-${meta?.project?.id}`}>{meta?.project?.project_name}</a></h3>
							<hr className='dashed-hr' />
							<div className='project_profil'>
								<div className='project_loop border-0 pb-0'>
									<form onSubmit={handleSubmit}>
										<div className='mb-3'>
											<label className='form-label'>Posts</label>
											<textarea
												rows={5}
												value={msg.message}
												onChange={setMsg("message")}></textarea>
										</div>
										{/* <div className='reg-bottom mb-0'>
											<button type='submit' name='submit'>
												Send
											</button>
										</div> */}
										<div className='mb-3 pencil qwe20'>
											<div className='msg-attach'>
												{/* <input
												name='file'
												type='file'
												className='opacity-0 '
												onChange={handle_file_change}
											/> */}

												<div className='attach-input mymsg'>
													<h6><i className="fa fa-paperclip" /> Attached File</h6>
													<input
														name='file'
														type='file'
														multiple={true}
														id='fileAttach'
														className='opacity-0 '
														onChange={handle_file_change}
														ref={fileInputRef}
													/>
												</div>

												<div className='mb-3'>

													<label className='fileinput'>
														{/* <i className="fa fa-paperclip" /> */}
														{/* <input
													name='file'
													type='file'
													className='opacity-0 '
													onChange={handle_file_change}
												/> */}


														{pr < 101 ? (
															<ProgressBar now={pr} label={`${pr}%`} />
														) : (<></>)}
														{file && pr > 100 ? (

															file?.map((f, index) => {
																return (
																	<div className="pro_div">
																		<p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files(index)}><i className="fa fa-trash-o"></i></a></p>
																	</div>
																)
															})
														) : (<></>)}


													</label>





												</div>
											</div>

											{user?.role_id == 2 && data?.project_status < 5 ? (
												<div className='msg-attach'>
													<div className='attach-input mymsg'>


														<h6><i className="fa fa-paperclip" /> Attach photos of machined parts</h6>

														<input
															name='file'
															type='file'
															multiple={true}
															className='opacity-0 qwe18'
															onChange={handle_machine_file}
															ref={fileInputRef}
														/>
													</div>

													<div className='mb-3'>

														<label className='fileinput'>
															{/* <i className="fa fa-paperclip" /> */}
															{/* <input
													name='file'
													type='file'
													className='opacity-0 '
													onChange={handle_file_change}
												/> */}


															{pr2 < 101 ? (
																<ProgressBar now={pr2} label={`${pr2}%`} />
															) : (<></>)}
															{machineFile && pr2 > 100 ? (

																machineFile?.map((f) => {
																	return (
																		<div className="pro_div">
																			<p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files2(f)}><i className="fa fa-trash-o"></i></a></p>
																		</div>
																	)
																})
															) : (<></>)}


														</label>

													</div>

												</div>
											) : (<></>)}


										</div>

										<div className='reg-bottom mb-0'>
											<button type='submit' name='submit'>
												Post The Message
											</button>
										</div>
										<hr className='dashed-hr' />




									</form>
									<div className='profile_box shadow-none p-0'>
										<div className='table-responsive inbox-table mt-4'>
											<table
												className='table mb-0'
												style={{ border: "1px solid #dee2e6" }}>
												<thead>
													<tr>
														<th>Sender</th>
														<th>Message</th>

														<th className='text-end unid'>Date</th>
													</tr>
												</thead>
												<tbody>
													{msgs?.length ? (
														msgs?.map((m) => {
															const date = new Date(m?.created * 1000);

															const year = date.getFullYear();
															const month = String(date.getMonth() + 1).padStart(2, '0');
															const day = String(date.getDate()).padStart(2, '0');
															const hours = String(date.getHours()).padStart(2, '0');
															const minutes = String(date.getMinutes()).padStart(2, '0');
															const seconds = String(date.getSeconds()).padStart(2, '0');

															const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

															return (
																<tr>
																	<td className='darkblue-text'>
																		{m?.from_id == user?.id
																			? user?.user_name
																			: meta?.to?.user_name}
																	</td>
																	<td>
																		<pre className="custom-pre">{m?.message}</pre>
																		<br />
																		{m?.machine_parts_image?.includes(",") ? (
																			m?.machine_parts_image.split(",").map((m) => {
																				return (

																					<ul>
																						<li>

																							<a target={"_blank"} href={common.get_attachment(`${m}`, formattedDate)}><p className='darkblue-text cursor-pointer'>{m}</p></a>
																							<br />

																						</li>
																					</ul>

																				)
																			})
																		) : (<a target={"_blank"} href={common.get_attachment(`${m?.machine_parts_image}`, formattedDate)}><p className='darkblue-text cursor-pointer'>{m?.machine_parts_image}</p></a>)}


																		{m?.attach_file?.includes(",") ? (
																			m?.attach_file.split(",").map((m) => {
																				return (

																					<ul>
																						<li>

																							<a target={"_blank"} href={common.get_message(`${m}`)}><p className='darkblue-text cursor-pointer'>{m}</p></a>
																							<br />

																						</li>
																					</ul>

																				)
																			})
																		) : (<a target={"_blank"} href={common.get_message(`${m?.attach_file}`)}><p className='darkblue-text cursor-pointer'>{m?.attach_file}</p></a>)}
																	</td>


																	<td className='text-end'>
																		{moment
																			.unix(m?.created)
																			.format("DD MMM, YYYY")}
																	</td>
																</tr>
															);
														})
													) : (
														<></>
													)}
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Message;
