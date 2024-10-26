declare global {
	interface Console {
		r(msg: string): void;
	}

	interface Window {
		google: any;
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
