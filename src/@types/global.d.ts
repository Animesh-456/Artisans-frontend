declare global {
	interface Console {
		r(msg: string): void;
	}
}

Object.defineProperties(console, {
	r: {
		value: function (msg: string) {
			console.log(`%c${msg}`, "color:red");
		},
	},
});

export {};
