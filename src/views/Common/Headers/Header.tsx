import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import atom from "../../../jotai/atom";
import Routes from "../../../Routes";
import api from "../../../api/services/api";
import $ from 'jquery';
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
//import 'owl.carousel';

import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';


type Props = {};

export default function Header({ }: Props) {
	const router = useRouter();

	const path = router.pathname;

	console.log("The path is ", path)


	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);



	// useEffect(() => {

	// 		// Owl Carousel Initialization
	// 		$(document).ready(function () {
	// 			var owl1 = $("#owl-demo1");
	// 			owl1.owlCarousel({
	// 				items: 3,
	// 				itemsDesktop: [1000, 3],
	// 				itemsDesktopSmall: [900, 3],
	// 				itemsTablet: [600, 2],
	// 				itemsMobile: false
	// 			});

	// 			var owl2 = $("#owl-demo2");
	// 			owl2.owlCarousel({
	// 				items: 5,
	// 				itemsDesktop: [1000, 5],
	// 				itemsDesktopSmall: [900, 3],
	// 				itemsTablet: [600, 1],
	// 				itemsMobile: false
	// 			});
	// 		});

	// }, []); // Empty dependency array ensures this effect runs once after initial render

	// // Search Toggle Function
	// const searchToggle = (obj: any, evt: any) => {
	// 	var container = $(obj).closest('.search-wrapper');
	// 	if (!container.hasClass('active')) {
	// 		container.addClass('active');
	// 		evt.preventDefault();
	// 	} else if (container.hasClass('active') && $(obj).closest('.input-holder').length == 0) {
	// 		container.removeClass('active');
	// 		// clear input
	// 		container.find('.search-input').val('');
	// 	}
	// };

	// // Function to handle onClick event
	// const handleSearchToggleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
	// 	// Call the searchToggle function
	// 	searchToggle(event.currentTarget, event);
	// };

	const [user, setUser] = useAtom(atom.storage.user);

	const handleLogout = () => {
		setUser(null);
		router.push("/auth/sign-in")
	};
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



			<Offcanvas show={show} onHide={handleClose}>
				<Offcanvas.Header closeButton>
					<Offcanvas.Title></Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ul className="navbar-nav align-items-lg-center flex-grow-1 pe-3"><li className="nav-item"><button data-bs-dismiss="offcanvas" className="nav-link active"><Link href={"/"} onClick={handleClose}>Home</Link></button></li><li className="nav-item"><button data-bs-dismiss="offcanvas" className="nav-link "><a href={"/machining"}>POST A JOB</a></button></li><li className="nav-item"><button data-bs-dismiss="offcanvas" className="nav-link " ><a href={"/machining/listing"}>VIEW JOBS</a></button></li><li className="nav-item"><button data-bs-dismiss="offcanvas" className="nav-link "><a href={"/account/profile"}>MY ACCOUNT</a></button></li><li className="nav-item"><button data-bs-dismiss="offcanvas" className="nav-link "><a href={"/account/inbox"}>INBOX</a></button></li><li className="nav-item"><button data-bs-dismiss="offcanvas" className="nav-link "><a>HOW IT WORK</a></button></li></ul>
					<br />
					<div className="d-flex"><Button variant="info" data-bs-dismiss="offcanvas" className="btn login-btn">login / sign up</Button></div>
				</Offcanvas.Body>
			</Offcanvas>

			<div className="logo_bar">
				<div className="container">
					<div className="row">
						<div className="col-sm-4">
							<div className="search-wrapper">
								<div className="input-holder">
									<input type="text" className="search-input" placeholder="Type to search" />
									<button className="search-icon" ><i className="fa fa-search"></i></button>
									{/*  onclick="searchToggle(this, event);" */}
								</div>
								<span className="close"></span>
								{/* onclick="searchToggle(this, event); */}
							</div>
						</div>
						<div className="col-sm-4">
							<div className="logo">
								<Link href="/">
									<img style={{ cursor: 'pointer' }} src={"/img/logo.png"} alt="" />
								</Link>
							</div>
						</div>
						<div className="col-sm-4">
							<div className="right_account">
								<ul>
									<li>
										<Link href={"/auth/sign-in"}>
											<img src={"/img/user.png"} alt="" /></Link></li>
									<li><img src={"/img/heart.png"} alt="" /></li>
									<li><img src={"/img/market.png"} alt="" /></li>

								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="menu_bar">
					<nav className="navbar navbar-expand-md navbar-light p-0">
						<button className="navbar-toggler mr-3" onClick={handleShow} type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
							<i className="fa fa-bars"></i>
						</button>
						<div className="collapse navbar-collapse" id="navbarNav">
							<ul className="navbar-nav">
								<li className="nav-item">
									<a href={'/'} className={`nav-link ${path == '/' ? "active" : ""}`}>Home</a>
									{/* <Link className="nav-link" href="/">Home</Link> */}
								</li>
								<li className="nav-item">
									<a href={"/account/about"} className={`nav-link ${path == '/account/about' ? "active" : ""}`}>About Us</a>
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

								{user ? (
									<li className="nav-item">
										<a href="#" className="nav-link" onClick={() => handleLogout()}>Logout</a>
									</li>
								) : (<></>)}
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}
