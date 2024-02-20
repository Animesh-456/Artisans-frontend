import React from "react";
import Footer from "../Common/Footers/Footer";
import Header from "../Common/Headers/Header";

type Props = {
	children?: any;
};

const Layout = (props: Props) => {
	return (
		<>
			<Header />
			{props.children}
			<Footer />
		</>
	);
};

export default Layout;
