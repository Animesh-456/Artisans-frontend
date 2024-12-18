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
import Multiselect from "multiselect-react-dropdown";
import { compressImage } from "../../src/helpers/compressFile";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
type Props = {};

export const getStaticProps = async () => {
	try {
		const params: any = {
			id: 14,
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

const Post = (prp) => {
	console.log("SEO DATA", prp)
	const router = useRouter();

	const fileInputRef = useRef<HTMLInputElement>(null);

	const [project, projectstate] = useState({
		project_name: "",
		description: "",
		visibility: "Public",
		post_for: "4",
		name: "",
		address: "",
		zip: "",
		city: ""
	});


	const [shipping, setshipping] = useState({
		name: "",
		address: "",
		zip: "",
		city: ""
	})

	const [projectcheck, projectcheckstate] = useState({
		post_for: "4",
	})

	const setprojectcheck = common.ChangeState(projectcheckstate);

	const setproject = common.ChangeState(projectstate);
	const setDelivery = common.ChangeState(setshipping);

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



	const handleSubmit = (event) => {
		event.preventDefault();


		if (!file.length) return toast.error("Please select a file");
		if (!selectedSubCategory) return toast.error("Please select sub category")
		if (project.project_name.includes('/')) {
			return toast.error("The '/' character is not allowed in the art title.");
		}

		project["category"] = multiselectedCategory?.map(item => item.id)?.join(',');
		// project["sub_category"] = selectedSubCategory?.map(item => item.id)?.join(',');


		if (project?.city == "") return toast.error("city is required");
		if (project?.zip == "") return toast.error("postal code is required");


		let data = Validate([], schema.project.add, project);

		// Logic to validate shipping details


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

		api.project.get_category_subcategory({})
	}, []);
    const [isSubmitting, setIsSubmitting] = useState(false);

	const processSubmit = async () => {
		if (isSubmitting) return; // Prevent multiple clicks
		setIsSubmitting(true); // Disable the button when the process starts

		if (!file.length) return toast.error("Please select a file");

		if (file?.length > 10) {
			toast.error("Maximum 10 files can be uploaded")
			setIsSubmitting(false); // Re-enable the button
			return;
		}

		let form = new FormData();
		for (const key of Object.keys(file)) {
			// form.append("file", file[key]);
			const compressedFile = await compressImage(file[key]); // Compress the file
			form.append("file", compressedFile); // Append compressed file to FormData

		}


		if (otherFile.length > 0) {
			for (const key of Object.keys(otherFile)) {
				form.append("file", otherFile[key]);
			}
		}

		for (const key of Object.keys(project)) {
			form.append(key, project[key]);
		}


		//let shippingform = new FormData();



		// Appending shipping details







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
		setIsSubmitting(false); // Re-enable the button	
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

			if (file.size / (1000 * 1000) > 20) {
				toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1000 * 1000)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 20.00 MB`);
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


	const isCustomer = (user: any) => {
		return user?.role_id === 1;
	};

	// Redirect or display a message if the user is not a customer with role id 1
	// useEffect(() => {
	// 	if (user && !isCustomer(user)) {
	// 		toast.error("Artist do not have permission to post jobs.");
	// 		router.push('/'); // Redirect to home page or any other page
	// 	}
	// }, [user]);
	useEffect(() => {
		if (!user) {
			toast.error("You must be logged in as a customer to post a job.");
			router.push('/auth/sign-in'); // Redirect to login page
		} else if (user.role_id === 2) {
			toast.error("Artists do not have permission to post jobs.");
			router.push('/'); // Redirect to home page or any other page
		}
	}, [user]);

	const [loading, setLoading] = useState(false);


	const Category_subcategory: any = useAtomValue(atom.project.api.get_category_subcategory)

	const categories = Category_subcategory?.categories;
	const subCategories = [];

	Category_subcategory?.subCategories?.map((sub) => {
		subCategories.push({ id: sub?.id, parent_id: sub?.parent_id, value: sub?.category_name, label: sub?.category_name })
	})


	const [selectedCategory, setSelectedCategory]: any = useState('');
	const [selectedSubCategory, setSelectedSubCategory] = useState([]);
	const [multiselectedCategory, setmultiselectedCategory] = useState([]);
	const category = [];
	Category_subcategory?.categories?.map((sub) => {
		category.push({ id: sub?.id, value: sub?.category_name, label: sub?.category_name })
	})

	const handleCategoryChange = (event) => {
		const categoryId = parseInt(event.target.value, 10);
		console.log(event.target.value)
		setSelectedCategory(categoryId);
		if (!event.target.value) return // To keep the previous subcategories and update the category
		const filteredArray = subCategories?.filter(item => item?.parent_id == categoryId)
		setSelectedSubCategory(filteredArray);
	};


	//Handle subcategory state

	const handlemultiCategoryChange = (options) => {
		setmultiselectedCategory(options);
		//setSelectedSubCategory('');
	};

	const handleDisplayChange = (options) => {
		setSelectedSubCategory(options);
	};

	const onRemove = (selectedList) => {
		setmultiselectedCategory(selectedList)
	};

	const onRemovesecond = (selectedList) => {
		setSelectedSubCategory(selectedList)
	};





	return (
		<>


			<Head>
				<title>{`${prp?.prp?.data[0].page_title}`}</title>
				<meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
			</Head>

			{/* <section className="inner_banner_wp" style={{ "backgroundImage": `url(../img/inner-banner.jpg)` }}>
				<div className="container">
					<h1>Post Your Art Requirement</h1>
				</div>
			</section> */}




			{/* <section className="our_story_wp">
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<img src="../img/img1.jpg" alt="art-img" />
						</div>
						<div className="col-sm-6">
							<div className="our_story_content">

							</div>
						</div>
					</div>
				</div>
			</section> */}


			<section className="breadcrumb_sec">
				<div className="container">
					<div className="row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href="#">Home</a></li>
							<li className="breadcrumb-item active">Post your artwork requirement</li>

						</ul>
					</div>
				</div>
			</section>

			<section className="discover_wp" >
				<div className="container">
					<div className="row">
						<div className="heading_title latest_request_heading">
							<h1>Describe Your Art</h1>
						</div>
						<div className="describe_wp">
							<form>



								<div className="from_feild">
									<label>Title of Project: <span>*</span></label>
									<input type="text" name="text" placeholder="Type here..." autoComplete={"off"} value={project.project_name} onChange={setproject("project_name")} />
								</div>
								<div className="from_feild">
									<label>Description: <span>*</span></label>
									<textarea placeholder="Description" rows={8} cols={50} autoComplete={"off"} value={project.description} onChange={setproject("description")}></textarea>
								</div>
								<div className="b-li">
									<ul>
										<li>Explain the overall idea or theme of the artwork.</li>
										<li>Provide images or examples of artwork styles, color palettes, or compositions that inspire you.</li>
										<li>Specify the size or format of the artwork</li>
										<li>
											Mention any specific colors or palettes you'd like the artist to focus on

										</li>
										<li>
											Mention realistic timeframe when you want the artwork to be delivered.

										</li>
										<li>
											Mention your budget range if applicable

										</li>
										<li>Do not include contact details (phone number, email)
										</li>
										<li>Mention City, State where you want artwork to be delivered
										</li>



									</ul>
								</div>


								<div className="from_feild">
									<label htmlFor="category">Category(s): <span>*</span>
									</label>

									<div className="select_div1">
										{/* <select id="category" value={selectedCategory} onChange={handleCategoryChange}>
											<option value="">Select a category</option>



											{categories?.map((category, index) => (
												<option key={category?.id} value={category?.id}>
													{category.category_name}
												</option>
											))}
										</select> */}

										<Multiselect
											showCheckbox
											options={category}
											selectedValues={multiselectedCategory}
											onSelect={handlemultiCategoryChange}
											onRemove={onRemove}
											displayValue="label"
											placeholder="Select Category"
										/>
									</div>


								</div>

								<div className="from_feild">

									<div>
										{/* <label htmlFor="subCategory">Sub-Category: <span>*</span></label> */}

										{/* <div className="select_div"> */}


										{/* <select id="subCategory" value={selectedSubCategory} onChange={handleSubCategoryChange}>
													<option value="">Select a sub-category</option>
													{
														SelectedSubCategory.find((category) => category.name === selectedCategory).subCategories.map((subCategory, index) => (<option key={index} value={subCategory}>
															{subCategory}
														</option>
														))
													}

													{selectedSubCategory.map(sub => (
														<option key={sub.id} value={sub.id}>
															{sub.category_name}
														</option>
													))}
												</select> */}

										{/* <Multiselect
												disable={(selectedCategory === "NaN" || !selectedCategory) ? false : true}
												//showCheckbox={true}

												options={subCategories}
												selectedValues={selectedSubCategory}
												onSelect={handleDisplayChange}
												onRemove={onRemovesecond}
												displayValue="label"
												placeholder="Select Category"
											/> */}
										{/* </div> */}
									</div>
								</div>
								<div className="from_feild">
									<label>Attach Your Files Here: <span>*</span></label>
									<div className="upload-btn-wrapper">
										<button className="btn">Image files <i className="fa fa-upload"></i></button>
										<input type="file" name="myfile" onChange={handle_file_change} multiple={true} ref={fileInputRef} /></div>
								</div>


								<div className="upload_t file101">
									{file ? (file?.map((f, index) => {
										return (
											<>
												<p><i className="fa fa-check"></i> {f?.name}  <i className="fa fa-trash-o" style={{ cursor: "pointer" }} onClick={() => delete_files(index)}></i></p>                                                    {/* <p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files(index)}><i className="fa fa-trash-o"></i></a></p> */}
											</>
										)
									})) : (<></>)}
								</div>

								<div className="b-li">

									<ul>
										<li>Max file size: 10 MB</li>
									</ul>
								</div>
								<hr />

								{/* Delivery Information */}
								<h5>Shipping Details</h5>



								<div className="from_feild">
									<label>Name<span></span></label>
									<input type="text" name="text" placeholder="Type here..." autoComplete="name" value={project.name} onChange={setproject("name")} />
								</div>

								<div className="from_feild">
									<label>Delivery Address<span></span></label>
									<input type="text" name="text" placeholder="Type here..." autoComplete="street-address" value={project.address} onChange={setproject("address")} />
								</div>

								<div className="from_feild">
									<label>Postal Code<span>*</span></label>
									<input
										name='zcode'
										type='text'
										autoComplete="postal-code"
										value={project.zip}
										onChange={setproject("zip")}
										placeholder="Postal code"
									/>
								</div>

								<div className="from_feild">
									<label>City<span>*</span></label>
									<input
										name='city'
										type='text'
										autoComplete="address-level2"
										value={project.city}
										onChange={setproject("city")}
										placeholder="City"
									/>
								</div>


								<div className="submit_cancel">

									<button className="but111" type="submit"
										name="submit" onClick={handleSubmit}>
										Check & Submit
									</button>
									<a style={{
										cursor: 'pointer',
										borderRadius: "6px", fontFamily: "Poppins", padding: "6px 22px", transition: "box-shadow 1s", marginLeft: "15px", background: "none", color: "#080424", fontWeight: "500"
									}} onClick={handlecancel}>Cancel <img src={"../img/arrow.png"} width="11px" alt="" /></a>
								</div>
							</form>
						</div>
					</div>






				</div >

				<GlobalModal
					title='Confirm your Post'
					atom={atom.modal.confirm_project}>

					<div className="modal-body modal_design">
						<figure>
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
						</figure>
						<label>
							<h5>Attachments:</h5>
							<p>{file?.length ? (
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
							)}</p>
						</label>
						<label>
							<h5>Title:</h5>
							<p>{project.project_name}</p>
						</label>
						<label>
							<h5>Category:</h5>
							{/* <p>{categories?.find(item => item.id === selectedCategory)?.category_name}</p> */}
							<p>{multiselectedCategory?.map((sub, index) => {
								return (
									<p key={sub?.id}>{sub?.value}</p>
								)
							})}</p>
						</label>

						{/* <label>
							<h5>Subcategory:</h5>

							{selectedSubCategory?.map((sub, index) => {
								return (
									<p key={sub?.id}>{sub?.value}</p>
								)
							})}
						</label> */}
						<label>
							<h5>Comment:</h5>
							<p>{project?.description}</p>
						</label>


						{/* <label>
							<h5>I would like to receive quotes before:</h5>
							<p>{project.post_for} days</p>
						</label> */}
						<label>
							<h5>Visibility</h5>
							<p>{project.visibility}</p>
						</label>
						<div className="button_s ">
							<a style={{ cursor: "pointer", color: "#080424" }} onClick={() => setOpen(false)}>Back <img className="image101" src={"../img/arrow.png"} width="11px" alt="" /></a>
							<a style={{ cursor: isSubmitting ? "not-allowed" : "pointer", color: isSubmitting ? "#ccc" : "#	fff", pointerEvents: isSubmitting ? "none" : "auto" }} onClick={processSubmit}>
								{isSubmitting ? 'Processing...' : 'Post Request'}
							</a>
						</div>

					</div>



				</GlobalModal>

			</section >


		</>
	);

}

Post.ignorePath = true;

export default Post;