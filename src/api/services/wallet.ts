// // 👇️ ts-nocheck ignores all ts errors in the file
// // eslint-disable-next-line @typescript-eslint/ban-ts-comment
// // @ts-nocheck

import {
	GetParams,
	GetResponse,
	PostParams,
	UploadParams,
} from "../../@types/type";
import Client from "../Client";
import Toast from "../../helpers/Toast";
import Router from "next/router";
import { Validate } from "../../validation/utils/test";
import schema from "../../validation/schema/schema";
import common from "../../helpers/common";
import { readAtom, writeAtom } from "jotai-nexus";
import atom from "../../jotai/atom";

const api = new Client();
const toast = new Toast();

export default {
	create_order: async ({ body, params}: PostParams, cb?: GetResponse) => {
		try {
			let d = await api.post("wallet/create-order", body, params);

			if (d.status) {
				return d;
			} else {
				return toast.error(d.message);
			}
		} catch (err) {
			return err;
		}
	},
	
	paypal_transaction_complete: async ({ body, params}: PostParams, cb?: GetResponse) => {
		try {
			let d = await api.post("wallet/paypal-transaction-complete", body, params);

			if (d.status) {
				return cb(d);
			} else {
				return toast.error(d.message);
			}
		} catch (err) {
			return err;
		}
	},

	pay_machinist: ({ params, body }: PostParams, cb?: GetResponse) => {
		toast.loading();
		let data = Validate([], schema.wallet.pay_machinist, body);

		if (!data) {
			return;
		}

		api
			.post("wallet/pay-machinist", data, params)
			.then((d) => {
				if (d.status) {
					writeAtom(atom.storage.project_status,5);
					toast.success(d.message);
					return cb(d);
				} else {
					toast.error(d.message);
				}
			})
			.catch((err) => console.log(err));
	},
};
