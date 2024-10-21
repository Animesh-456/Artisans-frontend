import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import { writeAtom } from "jotai-nexus";
import { toast } from "react-hot-toast";
import Multiselect from 'multiselect-react-dropdown';

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
		mobile_number: ""
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

	const handleSumbit = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
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

	return (
		<>
			<section className="inner_banner_wp" style={{ backgroundImage: "url(../img/inner-banner.jpg)" }}>
				<div className="container">
					<h1>Create Your Account</h1>
				</div>
			</section>
			<section className="myproject">
				<div className="container">
					<div className="row justify-content-center">
						<div className="offset-sm-2"></div>
						<div className="col-sm-8 profile_box">
							<div className="register_c">
								<h3>Register as artist</h3>
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

									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Secret Question <span>*</span>
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
									</div>




									<div className="row from_feild">
										<div className="col-sm-4">
											<label>Secret Answer<span>*</span>
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
									</div>

									<div className="row from_feild cont11">
										<div className="col-sm-4">
											<label>Select Category <span>*</span>
											</label>
										</div>
										<div className="col-sm-8">
											<div className="select_div">

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
												Address<span>*</span>
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
												Number<span>*</span>
											</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='mobile_number'
												type='number'
												autoComplete={"tel"}
												value={signIn.mobile_number}
												onChange={setSign("mobile_number")}
												placeholder="+91 XXXXXXX890"
											/>
										</div>
									</div>


									<div className='row from_feild'>
										<div className='col-sm-4'>
											<label>
												Post Code<span>*</span>
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
											<label>
												City <span>*</span>
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
											disable
												? { backgroundColor: "grey", color: "whitesmoke" }
												: {}
										} >Register</button>
										<button className="canl" onClick={()=> window.location.href = '/auth/sign-in'}>Cancel <img src={"../img/arrow.png"} width="11px" alt="" /></button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

CustomerSignIn.ignorePath = true;

export default CustomerSignIn;