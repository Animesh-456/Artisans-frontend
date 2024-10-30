declare global {
	interface Console {
		r(msg: string): void;
	}

	interface Window {
		google: any;
	  }

	  interface Window {
		fbAsyncInit: () => void;
		FB: any; // You can further specify the type if needed
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
