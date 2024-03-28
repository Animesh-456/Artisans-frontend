const headers = [
	{
		title: "Home",
		path: "/",
		role: [1, 2],
	},

	{
		title: "About Us",
		path: "/account/about",
		role: [1, 2],
	},

	{
		title: "ART REQUEST",
		path: "/job/post",
		role: [1],
	},

	{
		title: "ARTS AND ARTISANS",
		path: "/job/listing",
		role: [1, 2],
	},

	{
		title: "MY ACCOUNT",
		path: "/account/profile",
		role: [1, 2],
	},
	{
		title: "INBOX",
		path: "/account/inbox",
		role: [1, 2],
	},

];

const EditProfileSideBar = [
	{
		title: "Jobs",
		path: "/account/jobs",
		role: [1, 2],
	},


	{
		title: "My Profile - Public View",
		path: "/account/public-profile/[id]",
		role: [1, 2],
	},



	{
		title: "My Profile",
		path: "/account/profile",
		role: [1, 2],
	},

	{
		title: "Edit My Profile",
		path: "/account/edit-profile",
		role: [1, 2],
	},

	{
		title: "Inbox",
		path: "/account/inbox",
		role: [1, 2],
	},

	{
		title: "Withdraw Funds",
		path: "/account/withdraw",
		role: [2],
	},
	{
		title: "Review Artists",
		path: "/account/reviews",
		role: [1],
	},
	{
		title: "Invoices",
		path: "/account/invoices",
		role: [2],
	},
	{
		title: "Customer Review",
		path: "/account/Customer-Review",
		role: [2],
	},
	{
		title: "Change Password",
		path: "/account/change-password",
		role: [1, 2],
	},

];
const jobsTab = [
	{
		title: "All",
		id: 1,
	},

	{
		title: "My Bids",
		id: 2,
	},
	{ title: "My Order in Progress", id: 3 },
	{ title: "My Finalized Order", id: 4 },
];

export default { headers, EditProfileSideBar, jobsTab };
