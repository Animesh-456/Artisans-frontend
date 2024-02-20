import React from "react";

type Props = {};

export default function Footer({ }: Props) {
	return (
		<footer>
			<div className="container">
				<div className="row footer_l">
					<div className="col-sm-3">
						<h4>Artoz</h4>
						<ul>
							<li><a href="#">Home</a></li>
							<li><a href="#">About Us</a></li>
							<li><a href="#">art request </a></li>
							<li><a href="#">artist & artisans </a></li>
							<li><a href="#">Contact us</a></li>
						</ul>
					</div>
					<div className="col-sm-3">
						<h4>Help Center</h4>
						<ul>
							<li><a href="#">Track Your Order</a></li>
							<li><a href="#">The Nook Book</a></li>
							<li><a href="#">Buying Guide</a></li>
							<li><a href="#">Caring For Your Art</a></li>
							<li><a href="#">FAQ Corner</a></li>
						</ul>
					</div>
					<div className="col-sm-3">
						<h4>Chat With us</h4>
						<ul>
							<li>We are always here for you. Chat with us using the Chat bubble on your screen. </li>
							<li>Talk to us on whatsapp : <a href="#">+91-7358792364</a></li>
							<li>Email us - <a href="#">support@nookatyou.com</a></li>
							<li><a href="#">Contact Form</a></li>
						</ul>
					</div>
					<div className="col-sm-3">
						<h4>SUBSCRIBE</h4>
						<p>Be the first to see our latest products, hottest sales and member exclusive discount codes.&nbsp;<strong>Sign up below to get your 10% off coupon</strong></p>
						<form>
							<input type="email" name="email" placeholder="Enter your email" />
								<button><i className="fa fa-envelope-o"></i></button>
						</form>
					</div>
				</div>
				<div className="footer_b">
					<img src="img/logo.png" alt="" />
					<p>&#169;2023 AMOZZA. All Rights Reserved</p>
				</div>
			</div>
		</footer>
	);
}
