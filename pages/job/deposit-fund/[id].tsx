import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ProjectDetails } from "../../../src/@types/type";
import api from "../../../src/api/services/api";
import common from "../../../src/helpers/common";
import atom from "../../../src/jotai/atom";
import Router from "next/router";

type Props = {};

const DespositFund = (props: Props) => {
	const user = useAtomValue(atom.storage.user);
	const router = useRouter();

	const [updated, setUpdated] = useState(false);
	const [data, setData] = useAtom<ProjectDetails>(atom.project.api.detail);


	const [savecheck, setsavecheck] = useState(false)
	const changestatecheck = () => {
		if (savecheck == true) {
			setsavecheck(false)
		} else {
			setsavecheck(true)
		}
	}




	const [profile, profileState] = useState({
		name: user?.name || "",
		postalcode: user?.zcode || "",
		city: user?.city || "",
		address: user?.address1 || "",
		user_id: user?.id || "",
		project_id: data?.id || ""
	});
	const setProfile = common.ChangeState(profileState);

	const handle_confirm_address = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();

		profile["checkstate"] = savecheck

		let form = new FormData();

		for (const key of Object.keys(profile)) {
			form.append(key, profile[key]);
		}

		api.auth.save_address(
			{
				body: profile,
				file: form,
			},
			(d) => {
				setUpdated(true);
			},
		);
	};

	useEffect(() => {
		if (!router.isReady) return;

		let id = router.query?.id;

		if (!id) {
			router.push("/");
		}

		api.project.detail({ params: { id: id } });
	}, [router.isReady]);

	return (
		<>
			{/* <div
				className='banner_wp sign_banner'
				style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
				<div className='container'>
					<div className='row'>
						<div className='banner_text inner_banner_text'>
							<h1 className='yh'>Project Description</h1>
						</div>
					</div>
				</div>
			</div>
			<div className='container cjw'>
				<div className='row'>
					<div className='col-sm-6'>
						<div className='fund_d'>
							<h5>
								The funds will be transferred to your machinist only after you
								have received your custom parts and approved the quality of the
								work
							</h5>
							<div className='pr_details1'>
								<div className='gr11'>Machinist:</div>
								<div className='gr22'>{data?.programmer?.user_name}</div>
							</div>
							<div className='pr_details1'>
								<div className='gr11'>Client:</div>
								<div className='gr22'>{data?.creator?.user_name}</div>
							</div>
							<div className='pr_details1'>
								<div className='gr11'>Project Name:</div>
								<div className='gr22'>{data?.project_name}</div>
							</div>
							<div className='pr_details1'>
								<div className='gr11'>Total price incuding tax:</div>
								<div className='gr22'>
									₹
									{
										data?.bids?.find((f) => f?.user_id == data?.programmer_id)
											?.bid_amount_gbp
									}
								</div>
							</div>
							<div className='pr_details1'>
								<div className='gr11'>Shipping Date:</div>
								<div className='gr22'>
									{
										data?.bids?.find((f) => f?.user_id == data?.programmer_id)
											?.bid_days
									}{" "}
									days
								</div>
							</div>
							{updated ? (

								<button className="jhs3" onClick={() => Router.replace(`/job/deposit-fund/1/${router?.query?.id}/?amount=${data?.bids?.find((f) => f?.user_id == data?.programmer_id)
									?.bid_amount_gbp}`)}>
									Deposit</button>
							) : (
								<></>
							)}
						</div>
					</div>
					<div className='col-sm-6'>
						<div className='fund_d'>
							<h5>Delivery Address</h5>
							<form onSubmit={handle_confirm_address}>
								<div className='row'>
									<div className='col-sm-6'>
										<label>
											Name:<span>*</span>
										</label>
										<input
											type='text'
											name='name'
											value={profile.name}
											onChange={setProfile("name")}
										/>
									</div>
									<div className='col-sm-6'>
										<label>
											Address:<span>*</span>
										</label>
										<input
											type='text'
											name='name'
											value={profile.address}
											onChange={setProfile("address")}
										/>
									</div>
								</div>
								<div className='row'>
									<div className='col-sm-6'>
										<label>
											Post Code:<span>*</span>
										</label>
										<input
											type='text'
											name='name'
											value={profile.postalcode}
											onChange={setProfile("postalcode")}
										/>
									</div>
									<div className='col-sm-6'>
										<label>
											City:<span>*</span>
										</label>
										<input
											type='text'
											name='name'
											value={profile.city}
											onChange={setProfile("city")}
										/>
									</div>
								</div>
								<div className='form-group form-check'>
									<label className='form-check-label'>
										<input onChange={changestatecheck} className='form-check-input' type='checkbox' /> Save
										this address
									</label>
								</div>
								{!updated ? (
									<button type='submit'>Confirm Address</button>
								) : (
									<></>
								)}
							</form>
						</div>
					</div>
				</div>
			</div> */}



			<section className="inner_banner_wp" style={{ backgroundImage: `url(../../img/inner-banner.jpg)` }}>
				<div className="container">
					<h1>{data?.project_name}</h1>
				</div>
			</section>

			<section className="myproject">
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<div className="profile_box">
								<div className="tyhd">
									<p>The funds will be transferred to your artist only after you
										have received your custom parts and approved the quality of the
										work</p>
									<hr />
									<div className="project_details_content">
										<p><span>Artist</span><span><b>{data?.programmer?.user_name}</b></span></p>
										<p><span>Client</span><span><b>{data?.creator?.user_name}</b></span></p>
										<p><span>Project Name</span><span><b>{data?.project_name}</b></span></p>
										<p><span>Total price incuding tax:</span><span><b>₹
											{
												data?.bids?.find((f) => f?.user_id == data?.programmer_id)
													?.bid_amount_gbp
											}</b></span></p>
										<p><span>Shipping Date: </span><span><b>{
											data?.bids?.find((f) => f?.user_id == data?.programmer_id)
												?.bid_days
										}{" "}</b></span></p>
									</div>


									{updated ? (

										<button
											style={{
												background: "#ef6100",
												color: "#fff",
												borderRadius: "6px",
												boxShadow: "0px 1px 2px 2px rgb(71, 18, 15)",
												fontFamily: "Poppins",
												padding: "6px 22px",
												transition: "box-shadow 1s"
											}}
											className="jhs3" onClick={() => Router.replace(`/job/deposit-fund/1/${router?.query?.id}/?amount=${data?.bids?.find((f) => f?.user_id == data?.programmer_id)
												?.bid_amount_gbp}`)}>
											Deposit</button>
									) : (
										<></>
									)}
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="profile_box">
								<div className="tyhd">
									{/* <p>Lorem Ipsum is simply dummy text of the printing</p> */}
									<hr />
									<form onSubmit={handle_confirm_address}>
										<div className="from_feild">
											<label>Name: <span>*</span></label>
											<input type="text" required value={profile.name}
												onChange={setProfile("name")} />
										</div>
										<div className="from_feild">
											<label>Address: <span>*</span></label>
											<input type="text" required value={profile.address}
												onChange={setProfile("address")} />
										</div>
										<div className="from_feild">
											<label>Postal Code: <span>*</span></label>
											<input type="text" required value={profile.postalcode}
												onChange={setProfile("postalcode")} />
										</div>
										<div className="from_feild">
											<label>City: <span>*</span></label>
											<input type="text" required value={profile.city}
												onChange={setProfile("city")} />
										</div>
										<div className="from_feild2">
											<input onChange={changestatecheck} type="checkbox" id="vehicle1" name="vehicle1" value="Bike" />
											<label>save this address</label>
										</div>

										{!updated ? (
											<div className="discover_wp">
												<button
													style={{
														background: "#ef6100",
														color: "#fff",
														borderRadius: "6px",
														boxShadow: "0px 1px 2px 2px rgb(71, 18, 15)",
														fontFamily: "Poppins",
														padding: "6px 22px",
														transition: "box-shadow 1s"
													}}
													type='submit'>Confirm Address</button>
											</div>
										) : (
											<></>
										)}

									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default DespositFund;
