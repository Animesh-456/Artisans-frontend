import { useAtomValue } from "jotai";
import React, { useState } from "react";
import { UserDetails } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";

type Props = {};

const ChangePassword = (props: Props) => {
	const user = useAtomValue<UserDetails>(atom.storage.user);

	const [values, valuesState] = useState({
		old_password: "",
		new_password: "",
		password_confirmation: "",
	});

	const setValues = common.ChangeState(valuesState);

	const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
		e.preventDefault();
		api.auth.change_password({ body: values });
	};

	return (
		<>
			{/* <div
				className='banner_wp sign_banner'
				style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
				<div className='container'>
					<div className='row'>
						<div className='banner_text inner_banner_text'>
							<h1 className='yh'>Change Password</h1>
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
						<div
							className='profile_box'
							style={{ backgroundImage: "url(/img/lock_bg.png)" }}>
							<h3>
								Change Password
								{user?.user_name ? ` (${user?.user_name})` : ""}
							</h3>
							<div className='edit_password_wp'>
								<img src='/img/lock.png' />
								<form onSubmit={handleSubmit}>
									<div className='row'>
										<div className='col-sm-4'>
											<label>Old Password</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='oldpwd'
												type='password'
												value={values.old_password}
												onChange={setValues("old_password")}
											/>
										</div>
									</div>
									<div className='row'>
										<div className='col-sm-4'>
											<label>New Password</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='newpwd'
												type='password'
												value={values.new_password}
												onChange={setValues("new_password")}
											/>
										</div>
									</div>
									<div className='row'>
										<div className='col-sm-4'>
											<label>Confirm Password</label>
										</div>
										<div className='col-sm-8'>
											<input
												name='confpwd'
												type='password'
												value={values.password_confirmation}
												onChange={setValues("password_confirmation")}
											/>
										</div>
									</div>
									<div className='reg-bottom'>
										<button type='submit' name='submit'>
											Save
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div> */}




			<section className="myproject">
				<div className="container">
					<div className="row">
						<div className="col-sm-4">
							<AccountSideBar />
						</div>
						<div className="col-sm-8">
							<div className="profile_box">
								<div className="prof111">
									<h4>Change Password {user?.user_name ? ` (${user?.user_name})` : ""}</h4>
								</div>
								<div className="edit_password_wp">
									<form onSubmit={handleSubmit}>
										<div className="row">
											<div className="col-sm-4">
												<label>Old Password</label>
											</div>
											<div className="col-sm-8">
												<input name="oldpwd"
													value={values.old_password}
													onChange={setValues("old_password")}
													type="password" />
											</div>
										</div>
										<div className="row">
											<div className="col-sm-4">
												<label>New Password</label>
											</div>
											<div className="col-sm-8">
												<input name="newpwd"
													value={values.new_password}
													onChange={setValues("new_password")}
													type="password" />
											</div>
										</div>
										<div className="row">
											<div className="col-sm-4">
												<label>Confirm Password</label>
											</div>
											<div className="col-sm-8">
												<input name="confpwd"
													value={values.password_confirmation}
													onChange={setValues("password_confirmation")}
													type="password" />
											</div>
										</div>
										<div className="reg-bottom">
											<button type="submit" name="submit">Save</button>
										</div>
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

export default ChangePassword;
