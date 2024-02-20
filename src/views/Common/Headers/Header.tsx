import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";
import atom from "../../../jotai/atom";
import Routes from "../../../Routes";
import api from "../../../api/services/api";

type Props = {};

export default function Header({ }: Props) {
	const router = useRouter();
	const [user, setUser] = useAtom(atom.storage.user);

	useEffect(() => { }, []);

	const handleLogout = () => {
		//e.preventDefault();
		console.log("hello");
		console.log("user before logout ----->", user);
		setUser(null);
		//router.push("/auth/sign-ing");
		router.push("/auth/sign-in")
	};


	useEffect(() => {
		if (user) {
			api.project.inbox_count({ params: { id: user?.id, role_id: user?.role_id } })
		}
	}, [])






	function searchToggle(obj, evt) {
		var container = obj.closest('.search-wrapper');
		if (!container.classList.contains('active')) {
			container.classList.add('active');
			evt.preventDefault();
		} else if (container.classList.contains('active') && !obj.closest('.input-holder')) {
			container.classList.remove('active');
			// clear input
			container.querySelector('.search-input').value = '';
		}
	}

	// Define the initialization of owl carousel



	const inbox_count = useAtomValue(atom.project.api.inbox_count)
	return (
		<>


			<div className="top_bar">
				<div className="container">
					<ul>
						<li><a href="#"><i className="fa fa-facebook-f"></i></a></li>
						<li><a href="#"><i className="fa fa-instagram"></i></a></li>
					</ul>
				</div>
			</div>

			<div className="logo_bar">
				<div className="container">
					<div className="row">
						<div className="col-sm-4">
							<div className="search-wrapper">
								<div className="input-holder">
									<input type="text" className="search-input" placeholder="Type to search" />
									<button className="search-icon" onClick={() => searchToggle}><i className="fa fa-search"></i></button>
									{/*  onclick="searchToggle(this, event);" */}
								</div>
								<span className="close" onClick={() => searchToggle}></span>
								{/* onclick="searchToggle(this, event); */}
							</div>
						</div>
						<div className="col-sm-4">
							<div className="logo">
								<img src={"/img/logo.png"} alt="" />
							</div>
						</div>
						<div className="col-sm-4">
							<div className="right_account">
								<ul>
									<li><img src="img/user.png" alt="" /></li>
									<li><img src="img/heart.png" alt="" /></li>
									<li><img src="img/market.png" alt="" /></li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="menu_bar">
					<nav className="navbar navbar-expand-md navbar-light p-0">
						<button className="navbar-toggler mr-3" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							<i className="fa fa-bars"></i>
						</button>
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item">
									<a href={'/'} className="nav-link active">Home</a>
									{/* <Link className="nav-link" href="/">Home</Link> */}
								</li>
								<li className="nav-item">
									<a href="/account/about" className="nav-link">About Us</a>
									{/* <Link className="nav-link" href='/account/about'>About Us</Link> */}
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">art request <span className="fa fa-angle-down"></span>
									</a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown2">
										<div className="container1">
											<div className="row">
												<div className="col-md-3">
													<div className="qwe1">
														<h6>Traditional Art</h6>
														<ul className="jsx-undefined">
															<li className="jsx-undefined">
																<a href="#">Pichwai</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Kinnala Art</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Tanjore Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Miniature Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Gond</a>
															</li>
														</ul>
													</div>
												</div>
												<div className="col-md-3">
													<div className="qwe1">
														<h6>Traditional Art1</h6>
														<ul className="jsx-undefined">
															<li className="jsx-undefined">
																<a href="#">Pichwai</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Kinnala Art</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Tanjore Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Miniature Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Gond</a>
															</li>
														</ul>
													</div>
												</div>
												<div className="col-md-3">
													<div className="qwe1">
														<h6>Traditional Art1</h6>
														<ul className="jsx-undefined">
															<li className="jsx-undefined">
																<a href="#">Pichwai</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Kinnala Art</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Tanjore Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Miniature Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Gond</a>
															</li>
														</ul>
													</div>
												</div>
												<div className="col-md-3">
													<div className="qwe1">
														<h6>Traditional Art1</h6>
														<ul className="jsx-undefined">
															<li className="jsx-undefined">
																<a href="#">Pichwai</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Kinnala Art</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Tanjore Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Miniature Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Gond</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</li>
								<li className="nav-item">
									<a className="nav-link" href="#" id="navbarDropdown3" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">artist & artisans <span className="fa fa-angle-down"></span>
									</a>
									<div className="dropdown-menu" aria-labelledby="navbarDropdown3">
										<div className="container1">
											<div className="row">
												<div className="col-md-3">
													<div className="qwe1">
														<h6>Traditional Art</h6>
														<ul className="jsx-undefined">
															<li className="jsx-undefined">
																<a href="#">Pichwai</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Kinnala Art</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Tanjore Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Miniature Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Gond</a>
															</li>
														</ul>
													</div>
												</div>
												<div className="col-md-3">
													<div className="qwe1">
														<h6>Traditional Art1</h6>
														<ul className="jsx-undefined">
															<li className="jsx-undefined">
																<a href="#">Pichwai</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Kinnala Art</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Tanjore Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Miniature Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Gond</a>
															</li>
														</ul>
													</div>
												</div>
												<div className="col-md-3">
													<div className="qwe1">
														<h6>Traditional Art1</h6>
														<ul className="jsx-undefined">
															<li className="jsx-undefined">
																<a href="#">Pichwai</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Kinnala Art</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Tanjore Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Miniature Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Gond</a>
															</li>
														</ul>
													</div>
												</div>
												<div className="col-md-3">
													<div className="qwe1">
														<h6>Traditional Art1</h6>
														<ul className="jsx-undefined">
															<li className="jsx-undefined">
																<a href="#">Pichwai</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Kinnala Art</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Tanjore Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Miniature Paintings</a>
															</li>
															<li className="jsx-undefined">
																<a href="#">Gond</a>
															</li>
														</ul>
													</div>
												</div>
											</div>
										</div>
									</div>
								</li>
								<li className="nav-item">
									<a href="#" className="nav-link">Contact us</a>
								</li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}
