import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import schema from "../../src/validation/schema/schema";
import { Validate } from "../../src/validation/utils/test";
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";
import path from "path";
import { ProgressBar } from "react-bootstrap";
import { Document, Page, pdfjs } from 'react-pdf';
import Head from "next/head";
import env from "../../src/config/api";
import Spinner from 'react-bootstrap/Spinner';

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

const Post = (prp) => {
	const router = useRouter();

	const fileInputRef = useRef<HTMLInputElement>(null);

	const [project, projectstate] = useState({
		project_name: "",
		description: "",
		visibility: "Public",
		post_for: 4,
	});
	const setproject = common.ChangeState(projectstate);

	const [file, setFile] = useState([]);
	const [otherFile, setFileOther] = useState([]);

	const [open, setOpen] = useAtom(atom.modal.confirm_project);
	const [storedProject, setStoredProject] = useAtom(atom.storage.project);
	const user = useAtomValue(atom.storage.user);
	const [progress, setprogress] = useState(0);
	const [progressOth, setprogressOth] = useState(0);
	const [fileAttach, setAttach] = useState(false);
	const [fileAttachOth, setAttachOth] = useState(false);

	const [numPages, setNumPages] = useState(null);
	const [filename, setFilename] = useState("");
	const onDocumentLoadSuccess = ({ numPages }) => {
		
		setNumPages(numPages);
	};

	const handleSubmit = () => {
		if (!file.length) return toast.error("Please select a file");

		let data = Validate([], schema.project.add, project);

		if (!data) {
			return;
		}
		setOpen(true);
	};

	useEffect(() => {
		if (typeof storedProject == "string") {
			api.project.my_temp({ params: { project_id: storedProject } }, (d) => {
				for (const key of Object.keys(project)) {
					setproject(key, d?.data[key])(null);
				}
			});
		}
	}, []);

	const processSubmit = () => {
		if (!file.length) return toast.error("Please select a file");
		let form = new FormData();
		for (const key of Object.keys(file)) {
			form.append("file", file[key]);
		}


		if (otherFile.length > 0) {
			for (const key of Object.keys(otherFile)) {
				form.append("file", otherFile[key]);
			}
		}

		for (const key of Object.keys(project)) {
			form.append(key, project[key]);
		}



		if (!user) {
			api.project.add_temp(
				{
					body: project,
					file: form,
					params: storedProject ? { temp_id: storedProject } : {},
				},
				(d) => {
					for (const key of Object.keys(project)) {
						setproject(key, "");
					}
					setFile([]);
					setStoredProject(d?.data?.id);
					setOpen(false);
				},
			);
			return;
		}

		api.project.add({ body: project, file: form }, (d) => {
			for (const key of Object.keys(project)) {
				setproject(key, "");
			}
			setFile([]);
			setOpen(false);
		});
	};
	const [fileData, setFileData] = useState(null);
	const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.currentTarget;

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);



			if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "jpeg" && extension.toLowerCase() !== "png") {
				toast.error(`File extension .${extension} is not allowed`);
				continue;
			}

			if (file.size / (1024 * 1024) > 10) {
				toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
				continue;
			}
			setpr(0)
			setLoading(true);
			// Simulating file loading or processing
			setTimeout(() => {
				setLoading(false);
				// Your file processing logic goes here
			}, 4000); // Simulating 2 seconds of file processing time
			setFile((p) => [...p, file]);



		}


		const file = e.currentTarget.files?.[0];
		const reader = new FileReader();
		setFilename(file.name)

	
		reader.onloadend = () => {
			const fileData = reader.result as string;
			setNumPages(null); // Reset the number of pages when a new file is selected
			setFileData(fileData);
		};

		reader.readAsDataURL(file as Blob);





		// if (files.length) {
		// 	setpr(0)
		// }

	};




	const handle_file_change_other: any = (e: React.MouseEvent<HTMLInputElement>) => {
		e.preventDefault();
		const { files } = e.currentTarget;


		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);
			// if (extension.toLowerCase() !== "zip" && extension.toLowerCase() !== "rar" && extension.toLowerCase() !== "docx" && extension.toLowerCase() !== "exe" && extension.toLowerCase() !== "dwg" && extension.toLowerCase() !== "svg" && extension.toLowerCase() !== "sldasm" && extension.toLowerCase() !== "slddrw" && extension.toLowerCase() !== "ipt" && extension.toLowerCase() !== "pptx" && extension.toLowerCase() !== "igs" && extension.toLowerCase() !== "sldprt" && extension.toLowerCase() !== "stl" && extension.toLowerCase() !== "step" && extension.toLowerCase() !== "skp" && extension.toLowerCase() !== "sat" && extension.toLowerCase() !== "pdf") {
			// 	toast.error(`File extension .${extension} is not allowed`);
			// 	continue;
			// }

			if (extension.toLowerCase() !== "zip" && extension.toLowerCase() !== "rar" && extension.toLowerCase() !== "docx" && extension.toLowerCase() !== "exe" && extension.toLowerCase() !== "dwg" && extension.toLowerCase() !== "svg" && extension.toLowerCase() !== "sldasm" && extension.toLowerCase() !== "slddrw" && extension.toLowerCase() !== "ipt" && extension.toLowerCase() !== "pptx" && extension.toLowerCase() !== "igs" && extension.toLowerCase() !== "sldprt" && extension.toLowerCase() !== "stl" && extension.toLowerCase() !== "step" && extension.toLowerCase() !== "skp" && extension.toLowerCase() !== "sat") {
				toast.error(`File extension .${extension} is not allowed`);
				continue;
			}

			if (file.size / (1024 * 1024) > 10) {
				toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
				continue;
			}
			setFileOther((p) => [...p, file]);
			setpr2(0)
		}

		

		//setFileOther((p) => [...p, ...files]);
	};


	
	const [pr, setpr] = useState(110)
	const [pr2, setpr2] = useState(110)

	useEffect(() => {
		if (pr < 102) {
			setTimeout(() => setpr(prev => prev += 2), 50)
		}

	}, [pr]);

	

	function delete_files(fileIndex) {
		//setFile(file.filter(function (s) { return s !== e }))

		const newFiles = [...file];
		newFiles.splice(fileIndex, 1);
		setFile(newFiles);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}
	}

	useEffect(() => {
		setFile(file)
	}, [file])



	////////////////////////////////For second loader /////////////////////////


	useEffect(() => {
		if (pr2 < 102) {
			setTimeout(() => setpr2(prev => prev += 2), 50)
		}

	}, [pr2]);


	function delete_files2(fileIndex) {


		const newFiles = [...otherFile];
		newFiles.splice(fileIndex, 1);
		setFileOther(newFiles);
		if (fileInputRef.current) {
			fileInputRef.current.value = '';
		}


		//setFileOther(otherFile.filter(function (s) { return s !== e }))
	}

	useEffect(() => {
		setFileOther(otherFile)
	}, [otherFile])


	const handlecancel = () => {
		router.push("/")
	}





	const [loading, setLoading] = useState(false);

	return (
		<>
			<section className="cjw">
				<div className="container job_listing">
					<div className="col-sm-12">
						<div className="job-l">
							<p>  Simply create your free listing and wait for quotes to come in. You do not have to commit to anything until you are happy with a quote provided. <br />Enter the details of your custom machined part requirement below. Make sure you provide enough information for the artist to make an accurate assessment. Provide a full description, including dimensions and images. </p>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<div className="job-r">
								<h3>Describe Your Project</h3>
								<div className="row">
									<div className="col-sm-12">
										<label>Title of Project:</label>
										<input type="text" name="name" placeholder="Ex : 5 steel spacers for motorcycle wheel"
											autoComplete={"off"}
											value={project.project_name}
											onChange={setproject("project_name")}
										/>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<label>Comment:</label>
										<textarea name="descri" rows={4}
											autoComplete={"off"}
											value={project.description}
											onChange={setproject("description")}
										></textarea>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12">
										<div className="b-li">
											<p>Specify the materials to be used, the tolerances and the total number of parts</p>
											<p>If delivery outside mainland UK, please specify the delivery location</p>
											<p>Please do not provide your contact details here.</p>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="attach-file">
								<h3>Attach your files here</h3>
								<div className="row">
									<div className="col-sm-12">
										<h4> Image files*</h4>
										<div className="upload-btn-wrapper">
											<button className="btn" style={{ backgroundColor: '#7fc0ac' }}>
												<i className="fa fa-upload"></i> Choose your  Images </button>
											<input type="file" name="myfile"
												onChange={handle_file_change}
												multiple={true}
												ref={fileInputRef}
											/>
										</div>


										<br /><br /><br />
										{pr < 101 ? (
											<ProgressBar now={pr} label={`${pr}%`} />

										) : (<></>)}

										{/* {loading && <Spinner animation="border" variant="info" />} */}

										{!loading ? (
											file?.map((f, index) => {

												return (
													<>
														<div className="pro_div">
															<p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files(index)}><i className="fa fa-trash-o"></i></a></p>
														</div>
													</>
												)

											})
										) : (<></>)}
									</div>
									<div className="col-sm-12">
										<br /><br />
										<h4>3D files or other format (optional)</h4>
										<div className="upload-btn-wrapper">
											<button className="btn" style={{ backgroundColor: '#7fc0ac' }}>
												<i className="fa fa-upload"></i> Select your 3D files </button>
											<input type="file" name="myfile"
												onChange={handle_file_change_other}
												multiple={true}
											/>
										</div>


										{pr2 < 101 ? (
											<ProgressBar now={pr2} label={`${pr2}%`} />
										) : (<></>)}

										{otherFile && pr2 > 100 ? (
											otherFile?.map((f, index) => {
												return (
													<>
														<div className="pro_div">
															<p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files2(index)}><i className="fa fa-trash-o"></i></a></p>
														</div>
													</>
												)
											})
										) : (<></>)}

										<br /><br /><br />
									</div>
									<div className="col-sm-12">
										<div className="b-li">
											<p>The first file will be used for a thumbnail picture</p>
											<p>Max file size: 3 MB</p>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row">
						<div className="col-sm-6">
							<div className="other_info">
								<h3>Other information</h3>
								<h4>I would like to receive quotes before:</h4>
								<select name="post_for">
									<option value="">Choose a number of days</option>
									<option value="4">4 Days</option>
									<option value="8">8 Days</option>
								</select>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="other_info">
								<h3>Visibility</h3>
								<div className="form-check">
									<label className="form-check-label">
										<input type="radio" className="form-check-input" name="optradio"

											value={"Public"}
											checked={project.visibility == "Public" ? true : false}
											onChange={setproject("visibility")}
										/>Public (you will receive more quotes) </label>
								</div>
								<div className="form-check">
									<label className="form-check-label">
										<input type="radio" className="form-check-input" name="optradio"

											value={"Private"}
											checked={project.visibility == "Private" ? true : false}
											onChange={setproject("visibility")}
										/>Private (visibility restricted to confirmed artists) </label>
								</div>
							</div>
						</div>
					</div><br /><br /><br />
					<div className="reg-bottom">
						<button type="submit" name="submit" onClick={handlecancel}>Cancel</button>
						<button type="submit" name="submit" onClick={handleSubmit}>Check & Submit</button>
					</div>
				</div>

				<GlobalModal
					title='Confirm your Post'
					atom={atom.modal.confirm_project}>
					<div className='wjgf'>
						{file?.length ? file[0]?.type?.includes("pdf") ? (
							<div className="pdf-container"><Document
								file={file[0]}
								onLoadSuccess={onDocumentLoadSuccess}
							>
								<Page pageNumber={1} width={200} />
							</Document> </div>
						) : (
							<img src={file?.length ? URL.createObjectURL(file[0]) : ""} />
						) : (<></>)}



						<div className='cnfm-job-details post'>
							<div className='cnfm-job-attchmnts'>
								<div className="post-jb-modal">
									<h5>Attachments: </h5>
									<div>
										{file?.length ? (
											file?.map((f, i) => {

												return (
													<>
														<ul>
															<li>
																<a rel="noreferrer" href={URL.createObjectURL(f)} target={"_blank"}>
																	{path.parse(f?.name)?.name?.slice(0, 8)}
																	{path.extname(f?.name)}{" "}
																</a>
															</li>
														</ul>
													</>
												);

											})
										) : (
											<></>
										)}


										{otherFile?.length ? (
											otherFile?.map((f, i) => {

												return (
													<>
														<ul>
															<li>
																<a rel="noreferrer" href={URL.createObjectURL(f)} target={"_blank"}>
																	{path.parse(f?.name)?.name?.slice(0, 8)}
																	{path.extname(f?.name)}{" "}
																</a>
															</li>
														</ul>
													</>
												);

											})
										) : (
											<></>
										)}
									</div>
								</div>
								<br />

							</div>

							<span>
								<div className="post-jb-modal">

									<h5>Title: </h5>
									<p className="abcdxy">{project.project_name}</p>
								</div>
							</span>
							<span>

								<div className="post-jb-modal">
									<h5>Comment: </h5>
									<pre className="custom-pre"><p>{project?.description}</p></pre>
								</div>
							</span>
							<span>
								<div className="post-jb-modal">
									<h5>I would like to receive quotes before: </h5>
									<p>{project.post_for} Days</p>
								</div>
							</span>
							<span>
								<div className="post-jb-modal">
									<h5>Visibility: </h5>
									<p>{project.visibility}</p>
								</div>
							</span>
						</div>
						<div className='reg-bottom'>
							<button type='submit' name='submit' onClick={() => setOpen(false)}>
								Back
							</button>
							<button type='submit' name='submit' onClick={processSubmit}>
								Post Request
							</button>
						</div>
					</div>
				</GlobalModal>
			</section>

		</>
	);

}

Post.ignorePath = true;

export default Post;
