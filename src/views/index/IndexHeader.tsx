import React from "react";

type Props = {
	title?: string;
	banner?: string;
	class?: string;
};

const IndexHeader = (props: Props) => {
	return (
		<div
			className={`banner_wp ${props.class || "home_banner"}`}
			style={{
				backgroundImage: `url('${props.banner || "/img/banner.jpg"}')`,
			}}>
			<div className='container'>
				<div className='row'>
					<div className='banner_text home_banner_text'>
						<h1>{props.title}</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default IndexHeader;
