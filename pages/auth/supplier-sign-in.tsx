import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import { writeAtom } from "jotai-nexus";
import { toast } from "react-hot-toast";
import Multiselect from 'multiselect-react-dropdown';
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";
import { Validate } from "../../src/validation/utils/test";
import schema from "../../src/validation/schema/schema";
type Props = {};

const CustomerSignIn = (props: Props) => {
	const router = useRouter();
	const [user, setUser] = useAtom(atom.storage.user);

	const [signIn, signstate] = useState({
		role: 2,
		check: false,
		user_name: "",
		email: router?.query?.email || "",
		password: "",
		password_confirmation: "",
		name: "",
		surname: "",
		address1: "",
		zcode: "",
		city: "",
		company_name: "",
		company_number: "",
		Squestion: "What is your pet's name?",
		answer: "",
		mobile_number: "",
		category: ""
	});
	const setSign = common.ChangeState(signstate);
	// const BaseURL = "http://localhost:4000/";
	const BaseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`;

	const [disable, setDisable] = useState(false);
	const [storedProject, setStoredProject] = useAtom(atom.storage.project);
	// const [selectedCategory, setSelectedCategory] = useState('');
	// const [selectedSubCategory, setSelectedSubCategory] = useState('');
	// const [displayOptions, setDisplayOptions] = useState([]);
	const [categories, setcategories] = useState([]); // To set multiple categories
	const Category_subcategory: any = useAtomValue(atom.project.api.get_category_subcategory)
	const [otp, setotp] = useState("");
	const [open, setOpen] = useAtom(atom.modal.confirm_project);
	const [visiblity, setvisibility] = useState(true);

	const [timeLeft, setTimeLeft] = useState(60); // Countdown starting from 60 seconds
	const [isTimerRunning, setIsTimerRunning] = useState(false);
	const category = [];

	Category_subcategory?.categories?.map((sub) => {
		category.push({ id: sub?.id, value: sub?.category_name, label: sub?.category_name })
	})


	useEffect(() => {

		api.project.get_category_subcategory({})

		let time = setTimeout(() => {
			setDisable(false);
		}, 3000);
		return () => {
			clearTimeout(time);
		};
	}, []);

	const handleSumbit = () => {

		//if (disable) return;
		if (!checkbox) {
			toast.error("Please accept the terms")
			return
		};
		//if (disable) return;
		setDisable(true);
		signIn["category"] = categories?.map(item => item.id)?.join(',');
		if (signIn.mobile_number.length > 10 || signIn.mobile_number.length < 10) return toast.error("Mobile number should be of 10 digits")
		api.auth.supplier_register({ body: signIn }, (d) => {
			// if (storedProject != null) {
			// 	setUser(d.data);
			// 	router.push("/auth/suppliersuccess").then(() => {
			// 		api.project.get_temp(
			// 			{ body: { project_ids: [storedProject] } },
			// 			(d) => {
			// 				setStoredProject(null);
			// 				router.push("/auth/suppliersuccess");

			// 			},
			// 		);
			// 	});
			// } else {
			// 	const requestOptions = {
			// 		method: "POST",
			// 		headers: { "Content-Type": "application/json" },
			// 		body: JSON.stringify({ email_username: signIn.email, password: signIn.password }),
			// 	};
			// 	fetch(`${BaseURL}user/auth/login`, requestOptions)
			// 		.then((response) => response.json())
			// 		.then((d) => {
			// 			if (d.status) {
			// 				toast.success(d.message);
			// 				writeAtom(atom.storage.user, d.data);
			// 				localStorage.setItem("UserData", JSON.stringify(d.data));

			// 				writeAtom(atom.storage.loginmodal, true)
			// 				router.push("/auth/suppliersuccess")

			// 			} else {
			// 				toast.error(d.message);
			// 			}
			// 		});

			// }

			router.push("/auth/suppliersuccess")
		});


	};
	const [checkbox, setchexbox] = useState(false);

	const check = (event) => {
		if (event.target.checked) {
			setchexbox(true)
		} else if (!event.target.checked) {
			setchexbox(false)
		}
	}

	const handleCategoryChange = (options) => {
		setcategories(options);
		//setSelectedSubCategory('');
	};

	const options = [
		{ value: 'Painting', label: 'Painting' },
		{ value: 'Sculpture', label: 'Sculpture' },
		{ value: 'Printmaking', label: 'Printmaking' },
		{ value: 'Photography', label: 'Photography' },
		{ value: 'Textile Art', label: 'Textile Art' },
		{ value: 'Ceramics', label: 'Ceramics' },
		{ value: 'Glass Art', label: 'Glass Art' },
		{ value: 'Digital Ar', label: 'Digital Art' },
		{ value: 'Mixed Media', label: 'Mixed Media' },
		{ value: 'Calligraphy', label: 'Calligraphy' },
		{ value: 'Jewelry Design', label: 'Jewelry Design' },
		{ value: 'Graffiti and Street Art', label: 'Graffiti and Street Art' },
		{ value: 'Installation Art', label: 'Installation Art' },
	];



	const onRemove = (selectedList) => {
		setcategories(selectedList)
	};

	useEffect(() => {
		let timerId: NodeJS.Timeout | null = null;

		if (isTimerRunning && timeLeft > 0) {
			timerId = setInterval(() => {
				setTimeLeft((prevTime) => prevTime - 1);
			}, 1000);
		} else if (timeLeft === 0) {
			setIsTimerRunning(false);
			setvisibility(true);
			// Stop the timer when it reaches 0
		}

		// Cleanup function
		return () => {
			if (timerId) {
				clearInterval(timerId);
			}
		};
	}, [isTimerRunning, timeLeft]);


	const startRegister = async (event) => {
		event.preventDefault();
		// let data = Validate([], schema.auth.supplier_register, signIn)
		// if(!data) return;
		if (signIn.mobile_number.length > 10 || signIn.mobile_number.length < 10) return toast.error("Mobile number should be of 10 digits");
		if (!checkbox) {
			toast.error("Please accept the terms")
			return
		};
		// //setDisable(true);
		// signIn["category"] = categories?.map(item => item.id)?.join(',');
		if (!signIn.user_name) {
			return toast.error("Please enter username");
		}
		// if (!signIn.category || signIn.category.trim() === "") {
		// 	return toast.error("Please select at least one category");
		// }


		// Validate email
		if (!signIn.email) {
			return toast.error("Please enter a valid email address");
		}

		// if (!signIn.address1) {
		// 	return toast.error("Please enter your address");
		// }
		// Validate password
		if (!signIn.password || signIn.password.length < 6) {
			return toast.error("Password must be at least 6 characters long");
		}

		// Validate password confirmation
		if (signIn.password !== signIn.password_confirmation) {
			return toast.error("Passwords do not match");
		}









		try {
			const data = { body: { phoneNumber: signIn.mobile_number, email: signIn.email, user_name: signIn.user_name } };
			const response = await api.auth.register_mobileOtp(data);
			if (response.status) {
				toast.success("OTP sent successfully");
				setvisibility(false);
				setIsTimerRunning(true);
				setTimeLeft(60);
				setOpen(true);
			} else {
				toast.error("Error sending OTP: " + response.message);
			}
		} catch (error) {
			console.error(error);
			toast.error(error?.message || "Unknown error, check logs");
		}
		// setOpen(true);

	};

	const verifyOTP = async (event) => {
		event.preventDefault();

		try {
			// Replace `otp` and `phoneNumber` with actual values from state or input fields
			const response: any = await api.auth.registerverify_mobileOtp({
				body: {
					code: otp,
					phoneNumber: signIn.mobile_number
				}
			});

			if (response.status) {
				toast.success("OTP verified successfully");

				handleSumbit();
				router.push("/auth/suppliersuccess")
				// Perform actions upon successful verification, such as redirecting or opening a modal
				setOpen(false); // Close OTP modal on success
			} else {
				toast.error("OTP verification failed: " + response.message);
			}
		} catch (error) {
			console.error("Error verifying OTP:", error);
			toast.error(error?.message || "Unknown error, check logs");
		}
	};

	const resendOtp = async () => {
		setotp("")

		//  Call api to send otp to mobile number
		// api.auth.send_mobileOtp(
		//     { params: {}, body: { phoneNumber: mobile } },
		//     (d) => {
		//         if (d?.status === true) {
		//             setvisibility(true);
		//             setIsTimerRunning(true);
		//             setTimeLeft(60);
		//         }
		//     }
		// );


		console.log("Current phoneNumber value:", signIn.mobile_number);
		try {
			const data = { body: { phoneNumber: signIn.mobile_number } };
			const response = await api.auth.register_mobileOtp(data);
			if (response.status) {
				toast.success("OTP sent successfully");
				setOpen(true);
				setvisibility(false);
				setIsTimerRunning(true);
				setTimeLeft(60);
			} else {
				toast.error("Error sending OTP: " + response.message);
			}
		} catch (error) {
			console.error(error);
			toast.error(error?.message || "Unknown error, check logs");
		}
	}

	return (
		<>


			<section className="breadcrumb_sec">
				<div className="container">
					<div className="row">
						<ul className="breadcrumb">
							<li className="breadcrumb-item"><a href={"/"}>Home</a></li>
							<li className="breadcrumb-item active">Artist Register</li>


						</ul>
					</div>
				</div>
			</section>
			<section className="myproject">
				<div className="container">
					<div className="row justify-content-center">
						<div className="offset-sm-2"></div>
						<div className="col-sm-8 profile_box">
							<div className="register_c">
								<h3>Register as Artist</h3>
								<form onSubmit={handleSumbit}>
									<h4>Please Provide Your Information Below:</h4>

									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Username  <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<input className="text" name="uname" type="text" placeholder="user Name"

												value={signIn.user_name}
												onChange={setSign("user_name")}
												autoComplete={"username"}
											/>
											<small>
												Choose a Username to represent you on www.artisans.studio. It can
												not be changed later.
											</small>
										</div>
									</div>




									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Email Address <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<input className="text m_b_none" name="email" type="text" placeholder="Enter your Email Address"
												autoComplete={"email"}
												value={signIn.email}
												onChange={setSign("email")}
											/>
											<small>Your email address will not be shared.
											</small>
										</div>
									</div>
									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Create Password <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<input className="text" name="password" type="password" placeholder="Create Password"
												autoComplete={""}
												value={signIn.password}
												onChange={setSign("password")}
											/>
										</div>
									</div>
									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Confirm Password <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<input className="text" name="ConfirmPassword" autoComplete={""}
												type='password'
												value={signIn.password_confirmation}
												onChange={setSign("password_confirmation")} placeholder="Confirm Password"
											/>
										</div>
									</div>

									{/* <div className="row from_feild">
										<div className="col-sm-4">
											<label>Secret Question
											</label>
										</div>
										<div className="col-sm-8">
											<select name='Squestion'>
												<option value='pet'>What is your pet's name?</option>
												<option value='f_name'>Name of your father</option>
												<option value='mobile_no'>
													Name of your first school
												</option>
											</select>
										</div>
									</div> */}




									{/* <div className="row from_feild">
										<div className="col-sm-4">
											<label>Secret Answer
											</label>
										</div>
										<div className="col-sm-8">
											<input
												name='ans'
												type='password'
												autoComplete={"off"}
												value={signIn.answer}
												onChange={setSign("answer")}
												placeholder="**********"
											/>
										</div>
									</div> */}

									<div className="row from_feild cont11">
										<div className="col-sm-4">
											<label>Select Category
											</label>
										</div>
										<div className="col-sm-8">
											<div className="select_div1">

												<Multiselect

													options={category}
													selectedValues={categories}
													showCheckbox
													onSelect={handleCategoryChange}
													onRemove={onRemove}
													displayValue="label"
													placeholder="Select Category"
												/>
											</div>


										</div>
									</div>
									<hr />
									<h4>Contact Information</h4>
									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>
												First Name <span>*</span>
											</label>
										</div>
										<div className='col-sm-8'>
											<input
												className='text'
												name='username'
												type='text'
												autoComplete="given-name"
												value={signIn.name}
												onChange={setSign("name")}
												placeholder="First Name"
											/>
										</div>
									</div>

									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>
												Last Name <span>*</span>
											</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='lname'
												type='text'
												autoComplete="family-name"
												value={signIn.surname}
												onChange={setSign("surname")}
												placeholder="Last Name"
											/>
										</div>
									</div>

									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>
												Phone<span>*</span>
											</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='mobile_number'
												type='text'
												autoComplete={"tel"}
												value={signIn.mobile_number}
												onChange={setSign("mobile_number")}
												placeholder="+91 XXXXXXX890"
											/>
											<small>Your One-Time Password will be sent to this mobile number.</small>
										</div>
									</div>

									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>
												Address
											</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='address'
												type="text"
												autoComplete="street-address"
												value={signIn.address1}
												onChange={setSign("address1")}
												placeholder="Address"
											/>
										</div>
									</div>


									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>
												City
											</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='city'
												type='text'
												autoComplete="address-level2"
												value={signIn.city}
												onChange={setSign("city")}
												placeholder="City"
											/>
										</div>
									</div>

									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>
												Post Code
											</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='zcode'
												type='text'
												autoComplete="postal-code"
												value={signIn.zcode}
												onChange={setSign("zcode")}
												placeholder="Postal code"
											/>
										</div>
									</div>

									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>Company Name</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='company'
												type='text'
												autoComplete="organization"
												value={signIn.company_name}
												onChange={setSign("company_name")}
												placeholder="Company Name"
											/>
										</div>
									</div>

									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>Company Registration Number</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='cno'
												type='text'
												autoComplete={"off"}
												value={signIn.company_number}
												onChange={setSign("company_number")}
												placeholder="Company Registration Number"
											/>
										</div>
									</div>
									<br />

									<div className="form-check signcheck">
										<label className="form-check-label">
											<input type="checkbox" className="form-check-input" onClick={check} />I have read and accept the <a href={'/account/terms'}>terms</a> of of use of Aart Studio </label>
									</div>

									<div className="form-check signcheck">
										<label className="form-check-label">
											<input type="checkbox" className='form-check-input' onClick={check} />
											<span>*</span>I agree to receive all payments from
											www.artisans.studio.uk clients using the www.artisans.studio
											Payment System. I understand that my account can be closed
											if I request or receive payments from www.artisans.studio
											clients using another payment system.
										</label>
									</div>
									<br />
									<br />
									<div className="reg-bottom">
										<button type="submit" name="submit" style={
											!visiblity
												? { backgroundColor: "grey", color: "whitesmoke" }
												: {}
										} disabled={!visiblity} onClick={startRegister}>Register</button>
										<button className="canl" onClick={(event) => {
											event.preventDefault();
											window.location.href = '/auth/sign-in';
										}}>Cancel <img src={"../img/arrow.png"} width="11px" alt="" /></button>										</div>
								</form>
							</div>
						</div>
					</div>

					<GlobalModal
						title='Verify Your OTP'
						atom={atom.modal.confirm_project}>

						<div className="modal-body modal_design">

							<div className="from_feild">
								<label>Enter OTP: <span>*</span></label>
								<input type="text" name="text" placeholder="OTP" value={otp} onChange={(e) => setotp(e.target.value)} />
							</div>

							<div className="signin_btn">
								<a href="#"
									onClick={verifyOTP}>Verify</a>
							</div>
							{/* <div className="resend_otp">
								<a href="#">Resend OTP</a>
							</div> */}
							<div className="resend_otp">
								{isTimerRunning ? (<a href="#">Resend OTP in {timeLeft}s</a>) : (<a href="#" onClick={resendOtp}>Resend OTP</a>)}
							</div>
							<div className="button_s ">
								{/* <a style={{ cursor: "pointer", color: "#080424" }} onClick={() => setOpen(false)}>Back <img className="image101" src={"../img/arrow.png"} width="11px" alt="" /></a> */}
								{/* <a style={{ cursor: "pointer", color: "#fff" }} onSubmit={handleSumbit}>Submit</a> */}
							</div>

						</div>



					</GlobalModal>
				</div>
			</section>
		</>
	);
};

CustomerSignIn.ignorePath = true;

export default CustomerSignIn;