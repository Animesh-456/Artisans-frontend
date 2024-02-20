import env from "../config/env";

const ChangeState = (state: any) => (key: any, value?: any) => (e) => {
	state((p) => {
		return {
			...p,
			[key]: value != null ? value : e?.target?.value,
		};
	});

	return true;
};

const JSONstringify = (json) => {
	if (typeof json != "string") {
		json = JSON.stringify(json, undefined, "\t");
	}
	var arr = [],
		_string = "color:green",
		_number = "color:darkorange",
		_boolean = "color:blue",
		_null = "color:magenta",
		_key = "color:red";
	json = json.replace(
		/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
		function (match) {
			var style = _number;
			if (/^"/.test(match)) {
				if (/:$/.test(match)) {
					style = _key;
				} else {
					style = _string;
				}
			} else if (/true|false/.test(match)) {
				style = _boolean;
			} else if (/null/.test(match)) {
				style = _null;
			}
			arr.push(style);
			arr.push("");
			return "%c" + match + "%c";
		},
	);
	arr.unshift(json);
	console.log.apply(console, arr);
};
const log = JSONstringify;

const color: any = [
	["r", 1],
	["g", 2],
	["b", 4],
	["w", 7],
	["c", 6],
	["m", 5],
	["y", 3],
	["k", 0],
].reduce(
	(cols, col) => ({
		...cols,
		[col[0]]: (f) => `\x1b[3${col[1]}m${f}\x1b[0m`,
	}),
	{},
);

const r: any = (msg) => {
	console.log(color.r(msg));
};

const get_image = (path: string) => {

	if(path)
	return `${env.file_path}projects/${path}`;

};



const get_message = (path: String) => {
	if (path)
		return `${env.file_path}message_attach/${path}`;
}

const get_profile_picture = (path: String) => {
	if (path)
		return `${env.file_path}logos/${path}`;
}

const get_portfolio_pic = (path: String) => {
	if (path)
		return `${env.file_path}portfolios/${path}`;
}



const get_attachment = (path: string, createdat : string) => {
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
	if(path){
		let dt=new Date(createdat)	
		let yr= dt.getFullYear()
		let mth= month[dt.getMonth()]	
	return `${env.file_path}projects/${yr}/${mth}/${path}`;
}
};
const get_attachment_latest_ach = (pth: string) => {
	if (pth) {
		return `${env.file_path}projects/${pth}`;
	}
};

const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});

function getFile(string) {
	var base64 = string;
	var base64Parts = base64.split(",");

	var fileFormat = base64Parts[0].split(";")[1];

	let format = base64Parts[0].split(";")[0].split(":")[1];

	var fileContent = base64Parts[1];

	const type = base64.split(";")[0].split("/")[1];
	console.log(type);

	var file = new File([fileContent], "myFile." + type, {
		type: format,
	});

	return file;
}

const reviews_meta = [
	{
		name: "Quality",
		key: "provider_rate1",
	},
	{
		name: "Politeness",
		key: "provider_rate2",
	},
	{
		name: "Productivity",
		key: "provider_rate3",
	},
	{
		name: "Communication",
		key: "provider_rate4",
	},
];

export default {
	ChangeState,
	JSONstringify,
	r,
	log,
	get_image,
	toBase64,
	getFile,
	reviews_meta,
	get_attachment,
	get_attachment_latest_ach,
    	get_message,
	get_profile_picture,
	get_portfolio_pic,
};