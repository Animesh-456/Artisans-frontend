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
		localStorage.setItem('beforeloginUrl', '');
		setShow(false)
		setUser(null);
		router.push("/auth/sign-in")
	};


	useEffect(() => {
		if (user) {
			api.project.inbox_count({ params: { id: user?.id, role_id: user?.role_id } })
		}
	}, [])

	const inbox_count = useAtomValue(atom.project.api.inbox_count)
	return (
		<>


			{/* <div className="top_bar">
				<div className="container">
					<ul>
						<li><a href="#"><i className="fa fa-facebook-f"></i></a></li>
						<li><a href="#"><i className="fa fa-instagram"></i></a></li>
					</ul>
				</div>
			</div> */}


			<section className="top_bg">
				<div className="container">
					<div className="row">
						<div className="col-sm-6">
							<ul className="top_socialmedia">
								<li><a href={process.env.NEXT_PUBLIC_YOUTUBE}><i className="fa fa-youtube-play"></i></a></li>

								<li><a href={process.env.NEXT_PUBLIC_FACEBOOK}><i className="fa fa-facebook"></i></a></li>
								<li>
									<a href={process.env.NEXT_PUBLIC_INSTAGRAM}>
										<i className="fa fa-instagram"></i>
									</a>
								</li>
								<li>
									<a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP}`} target="_blank" rel="noopener noreferrer">
										<i className="fa fa-whatsapp"></i>
									</a>
								</li>
							</ul>
						</div>
						<div className="col-sm-6">
							<ul className="top_socialmedia right_icon">
								<li><a href="mailto: info@aartstudion.com"><i className="fa fa-envelope"></i> info@aartstudion.com</a></li>
								<li><a href="tel:(+91) 89815151666"><i className="fa fa-phone"></i> +91 89815151666
								</a></li>
							</ul>
						</div>
					</div>
				</div>
			</section>



			<Offcanvas show={show} onHide={handleClose} placement="end" style={{ "backgroundColor": "rgb(71, 18, 15)", "fontFamily": "Poppins, sans-serif" }}>
				<Offcanvas.Header closeButton closeVariant="white" style={{ "backgroundColor": "rgba(0, 0, 0, 0.18)" }} >
					<Offcanvas.Title>
						<div className="logo">
							<Link href="/"><img style={{ "cursor": "pointer" }} src={"/img/logo.png"} alt="logo" /></Link>
						</div>
					</Offcanvas.Title>
				</Offcanvas.Header>
				<Offcanvas.Body>
					<ul className="navbar-nav align-items-lg-center flex-grow-1 pe-3" style={{
						color: "#fff",
						fontSize: "14px",
						fontWeight: "bold"

					}}>
						<li className="nav-item">
							<Link href={"/"}>
								<button onClick={handleClose} data-bs-dismiss="offcanvas" className={`nav-link ${path == "/" ? "active" : ""}`} style={{ border: 'none', backgroundColor: 'transparent' }}>
									Home
								</button>
							</Link>
						</li>
						<li className="nav-item">
							<Link href={'/aboutus'}>
								<button onClick={handleClose} data-bs-dismiss="offcanvas" className="nav-link" style={{ border: 'none', backgroundColor: 'transparent' }}>
									About Us
								</button>
							</Link>
						</li>
						<li className="nav-item">
							<Link href={'/post-your-artwork-requirement'}>
								<button onClick={handleClose} data-bs-dismiss="offcanvas" className="nav-link" style={{ border: 'none', backgroundColor: 'transparent' }}>
									Post Your Artwork Requirement
								</button>
							</Link>
						</li>
						<li className="nav-item">
							<Link href={'/artwork-jobs'}>
								<button onClick={handleClose} data-bs-dismiss="offcanvas" className="nav-link" style={{ border: 'none', backgroundColor: 'transparent' }}>
									Artwork Jobs
								</button>
							</Link>
						</li>

						<li className="nav-item">
							<Link href={'/artistlist'}>
								<button onClick={handleClose} data-bs-dismiss="offcanvas" className="nav-link" style={{ border: 'none', backgroundColor: 'transparent' }}>
									Artist and Artisans
								</button>
							</Link>
						</li>
						<li className="nav-item">
							<li className="nav-item">
								<Link href={'/how-it-works'}>
									<button onClick={handleClose} data-bs-dismiss="offcanvas" className="nav-link" style={{ border: 'none', backgroundColor: 'transparent' }}>
										How it works
									</button>
								</Link>
							</li>
						</li>
						<li className="nav-item">
							<Link href={'/account/profile'}>
								<button onClick={handleClose} data-bs-dismiss="offcanvas" className="nav-link" style={{ border: 'none', backgroundColor: 'transparent' }}>
									Account
								</button>
							</Link>
						</li>

						<li className="nav-item">
							<Link href={'/account/inbox'}>
								<button onClick={handleClose} data-bs-dismiss="offcanvas" className="nav-link" style={{ border: 'none', backgroundColor: 'transparent' }}>
									Inbox
								</button>
							</Link>
						</li>


						{!user && (

							<li className="mobile_contact">
								<ul>
									<li>
										<button onClick={() => window.location.href = '/auth/sign-in'}>Log In</button>
									</li>
									<li><button onClick={() => window.location.href = 'auth/sign-in'}>Sign Up</button></li>
								</ul>
							</li>
						)}


					</ul>
				</Offcanvas.Body>
			</Offcanvas>

			{/* <div className="logo_bar">
				<div className="container">
					<div className="row">
						<div className="col-sm-4">
							<div className="search-wrapper">
								<div className="input-holder">
									<input type="text" className="search-input" placeholder="Type to search" />
									<button className="search-icon" ><i className="fa fa-search"></i></button>
									
								</div>
								<span className="close"></span>
								
							</div>
						</div>
						<div className="col-sm-4">
							<div className="logo">
								<Link href="/">
									<img style={{ cursor: 'pointer' }} src={"/img/logo.png"} alt="" />
								</Link>
							</div>
						</div> */}
			{/* <div className="col-sm-4"> */}
			{/* <div className="right_account">
								<ul>
									<li>
										<Link href={"/auth/sign-in"}>
											<img src={"/img/user.png"} alt="" /></Link></li>
									<li><img src={"/img/heart.png"} alt="" /></li>
									<li><img src={"/img/market.png"} alt="" /></li>

								</ul>
							</div> */}
			{/* </div>
					</div>
				</div>
			</div> */}


			{/* <section className="menubar">
				<div className="container">
					<div className="row">
						<div className="col-6 col-sm-3">
							<div className="logo">
								<Link href="/"><img style={{ "cursor": "pointer" }} src={"/img/logo.png"} alt="" /></Link>
							</div>
						</div>
						<div className="col-6 col-sm-9">
							<div className="navigation">
								<nav>
									<button onClick={handleShow} style={{ "border": "none", "background": "transparent" }} className="smobitrigger ion-navicon-round"><i className="fa fa-bars"></i></button>
									<ul className="mobimenu">
										<li><Link href="/">Home</Link></li>
										<li><Link href="/account/about">About Us</Link></li>
										<li><Link href="/account/jobs">My account</Link></li>
										<li><Link href="/job/post">Art Request</Link></li>
										<li><Link href="/machining/listing">Browse Project</Link></li>
										
										
										{user ? (
											<li className="signup"><a onClick={() => handleLogout()} href={"/auth/sign-in"}>Logout</a></li>
										) : (
											<>
												<li className="login"><a href={"/auth/sign-in"}><i className="fa fa-user-o"></i> Login</a></li>
												<li className="signup"><a href={"/auth/sign-in"}>Sign Up</a></li>
											</>
										)}
									</ul>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</section> */}


			<section className="menubar sticky-top">
				<div className="container">
					<div className="row">
						<div className="col-4 col-sm-2">
							<div className="logo">
								<Link href="/"><img style={{ "cursor": "pointer" }} src={"/img/logo.png"} alt="logo" /></Link>
							</div>
						</div>
						<div className="col-8 col-sm-10 right_menu_mobile_wp">
							<div className="menu_login">
								{!user ? (
									<>
										<a href={"/auth/sign-in"}>Log In</a>
										<a href={"/auth/sign-in"}>Sign Up</a>
									</>
								) : (
									<a onClick={() => handleLogout()}>Log Out</a>
								)}
							</div>
							<div className="navigation">
								<nav>
									<div className="navwrp">
										<button style={{ "border": "none", "background": "transparent" }} onClick={handleShow} className="smobitrigger ion-navicon-round"><i className="fa fa-bars"></i></button>
										<ul className="mobimenu">
											<li><Link href="/">Home</Link></li>
											<li><Link href="/aboutus">About Us</Link></li>
											<li><Link href="/account/jobs">My account</Link></li>
											<li><Link href="/post-your-artwork-requirement">Post Your Art Requirement</Link></li>
											<li><Link href="/artwork-jobs">Artwork Jobs</Link></li>
											<li><Link href="/artistlist">Artist and Artisans</Link></li>
											<li><Link href="/how-it-works">How it works</Link></li>

											{user ? (
												<li className="signup"><a style={{ cursor: 'pointer' }} onClick={() => handleLogout()}>Logout</a></li>
											) : (
												<>
													<li className="login"><a href={"/auth/sign-in"}><i className="fa fa-user-o"></i> Login</a></li>
													<li className="signup"><a href={"/auth/sign-in"}>Sign Up</a></li>
												</>
											)}
										</ul>
									</div>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</section>

		</>
	);
}
