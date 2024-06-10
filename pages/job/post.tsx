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

			<section className="inner_banner_wp" style={{ "backgroundImage": `url(../img/inner-banner.jpg)` }}>
				<div className="container">
					<h1>Post Your Art Request</h1>
				</div>
			</section>

		


			<section className="our_story_wp">
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<img src="../img/img1.jpg" alt="" />
						</div>
						<div className="col-sm-6">
							<div className="our_story_content">
								<div className="heading_title">
									<h2>Let's Start Our Story</h2>
								</div>
								<p>
									Egestas maecenas pharetra convallis posuere morbi. Nunc pulvinar sapien et ligula ullamcorper. Tincidunt lobortis feugiat vivamus at augue eget arcu dictum varius. Lorem sed risus ultricies tristique. Nulla at volutpat diam ut venenatis tellus.Pellentesque adipiscing commodo elit at imperdiet dui. Sed euismod nisi porta lorem mollis aliquam.<br/><br/>
										Augue eget arcu dictum varius. Lorem sed risus ultricies tristique. Nulla at volutpat diam ut venenatis tellus.Pellentesque adipiscing commodo elit at imperdiet dui. Sed euismod nisi porta lorem mollis aliquam.
									</p>
									</div>
							</div>
						</div>
					</div>
			</section>



			<section className="discover_wp dya" style={{ "backgroundImage": `url(../img/bg1.jpg)` }}>
				<div className="container">
					<div className="row">
						<div className="heading_title latest_request_heading">
							<h1>Describe Your Art</h1>
						</div>
						<div className="describe_wp">
							<form>
								<div className="from_feild">
									<label>Title of Project: <span>*</span></label>
									<input type="text" name="text" placeholder="Type here..." />
								</div>
								<div className="from_feild">
									<label>Comment: <span>*</span></label>
									<textarea placeholder="Comment" rows="6" cols="50"></textarea>
								</div>
								<div className="b-li">
									<p>Specify the materials to be used, the tolerances and the total number of parts</p>
									<p>If delivery outside mainland UK, please specify the delivery location</p>
									<p>Please do not provide your contact details here.</p>
								</div>
								<div className="from_feild">
									<label>Attach Your Files Here: <span>*</span></label>
									<div className="upload-btn-wrapper">
										<button className="btn">PDF or Image files <i className="fa fa-upload"></i></button>
										<input type="file" name="myfile" multiple="" />
									</div>
								</div>
								<div className="b-li">
									<p>The first file will be used for a thumbnail picture</p>
									<p>Max file size: 3 MB</p>
								</div>
								<div className="from_feild">
									<label>I would like to receive quotes before: <span>*</span></label>
									<div className="form-check">
										<label className="form-check-label">
											<input type="radio" className="form-check-input" name="optradio" value="Public" checked="" /> 4 Days
										</label>
									</div>
									<div className="form-check">
										<label className="form-check-label">
											<input type="radio" className="form-check-input" name="optradio" value="Public" checked="" />6 Days
										</label>
									</div>
								</div>
								<div className="from_feild">
									<label>Visibility: <span>*</span></label>
									<div className="form-check">
										<label className="form-check-label">
											<input type="radio" className="form-check-input" name="optradio" value="Public" checked="" />Public (you will receive more quotes)
										</label>
									</div>
									<div className="form-check">
										<label className="form-check-label">
											<input type="radio" className="form-check-input" name="optradio" value="Public" checked="" />Private (visibility restricted to confirmed machinists)
										</label>
									</div>
								</div>
								<div className="submit_cancel">
									<a href="#">Check & Submit</a>
									<a href="#">Cancel <img src="../img/arrow.png" width="11px" alt="" /></a>
								</div>
							</form>
						</div>
					</div>
				</div>
			</section>
			

		</>
	);

}

Post.ignorePath = true;

export default Post;
