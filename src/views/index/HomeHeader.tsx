import React from "react";

type Props = {
	title?: string;
};

const HomeHeader = (props: Props) => {
	return (
		<div
			className='banner_wp home_banner'
			style={{ backgroundImage: `url('/img/banner100.jpg')` }}>
			<div className='container'>
				<div className='row'>
					<div className='banner_text home_banner_text'>
						<h1>{props.title || "Arts for Everyone"}</h1>
						<p>Send your blueprint and get free arts quotes</p>
						<a href='/post-your-artwork-requirement'>get free quotes now</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HomeHeader;
