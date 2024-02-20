// // 👇️ ts-nocheck ignores all ts errors in the file
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-nocheck

import { GetParams, GetResponse } from "../../@types/type";
import Client from "../Client";

const api = new Client();

export default {
	test: ({ params }: GetParams, cb?: GetResponse) => {
		api
			.get("todos/1", params)
			.then((d) => {
				console.log("🚀 ~ file: test.ts ~ line 10 ~ .then ~ d", d);

				return cb(d);
			})
			.catch((err) => console.log(err));
	},
};
