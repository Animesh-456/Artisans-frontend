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
import atom from "../../jotai/atom";
import { readAtom, writeAtom } from "jotai-nexus";
import env from "../../config/env";
import { json } from "stream/consumers";
import { notification } from "../../helpers/notif";
const api = new Client();
const toast = new Toast();

export default {
  check: ({ params, body }: PostParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.auth.check, body);

    if (!data) {
      return;
    }

    api
      .post("auth/register", { ...body, check: true }, params)
      .then((d) => {
        if (d.status) {
          toast.clear();
          if (body.role == 1) {
            Router.push(
              {
                pathname: "/auth/customer-sign-in",
                query: { email: data?.email },
              },
              "/auth/customer-sign-in"
            );
          } else if (body.role == 2) {
            Router.push(
              {
                pathname: "/auth/supplier-sign-in",
                query: { email: data?.email },
              },
              "/auth/supplier-sign-in"
            );
          }
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  customer_register: ({ params, body }: PostParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.auth.customer_register, body);

    if (!data) {
      return;
    }

    delete data.confirm_password;

    api
      .post("auth/register", body, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          let { head, body } = notification("Customer register", "Successfully registered as customer");
          let final_obj: any = {
            head: head,
            body: body
          };
          // let finaldata = [];
          // finaldata = useAtom(atom.notif.all_notif);
          // finaldata.push(final_obj)

          let notifs = readAtom(atom.storage.all_notif);
          let upNotif = [...notifs, final_obj];
          writeAtom(atom.storage.all_notif, upNotif)

          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  supplier_register: ({ params, body }: PostParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.auth.supplier_register, body);

    if (!data) {
      return;
    }

    delete data.confirm_password;

    api
      .post("auth/register", body, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          let { head, body } = notification("Supplier register", "Successfully registered as machinist");
          let final_obj: any = {
            head: head,
            body: body
          };
          // let finaldata = [];
          // finaldata = useAtom(atom.notif.all_notif);
          // finaldata.push(final_obj)

          let notifs = readAtom(atom.storage.all_notif);
          let upNotif = [...notifs, final_obj];
          writeAtom(atom.storage.all_notif, upNotif)

          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  login: ({ params, body }: PostParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.auth.login, body);

    if (!data) {
      return;
    }

    delete data.agreed;

    // const BaseURL = "http://localhost:4000/";
    const BaseURL = `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}`;

    // api
    // 	.post("user/auth/logink", data, paramsparams)
    // 	.then((d) => {
    // console.log("goo3",d)

    // 		if (d.status) {
    // console.log("goo4")

    // 			toast.success(d.message);
    // 			writeAtom(atom.storage.user, d.data);
    // 			Router.push("/account/jobs");
    // 			return cb(d);
    // 		} else {
    // 			toast.error(d.message);
    // 		}
    // 	})
    // 	.catch((err) => console.log(err));
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    fetch(`${BaseURL}user/auth/login`, requestOptions)
      .then((response) => response.json())
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          writeAtom(atom.storage.user, d.data);
          localStorage.setItem("UserData", JSON.stringify(d.data));
          writeAtom(atom.storage.loginmodal, true)

          Router.push("/account/jobs");
          return cb(d);

          // const redirect = localStorage.getItem('beforeloginUrl')

          // if (redirect != '') {
          //   Router.push(`${redirect}`);
          //   return cb(d);
          // } else {
          //   Router.push("/account/jobs");
          //   return cb(d);
          // }

        } else {
          toast.error(d.message);
        }
      });
  },

  change_password: ({ params, body }: PostParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.auth.change_password, body);

    if (!data) {
      return;
    }

    delete data.password_confirmation;

    api
      .post("auth/change-password", data, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          let { head, body } = notification("Password changed", "Your password has been changed");
          let final_obj: any = {
            head: head,
            body: body
          };
          // let finaldata = [];
          // finaldata = useAtom(atom.notif.all_notif);
          // finaldata.push(final_obj)

          let notifs = readAtom(atom.storage.all_notif);
          let upNotif = [...notifs, final_obj];
          writeAtom(atom.storage.all_notif, upNotif)
          Router.push("/account/profile");
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  me: ({ params }: GetParams, cb?: GetResponse) => {
    api
      .get("auth/me", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.auth.api.me, d.data);
          let user = JSON.parse(localStorage.getItem("user"));

          writeAtom(atom.storage.user, { ...d.data, token: user?.token });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  delivery_contacts: ({ params }: GetParams, cb?: GetResponse) => {
    api
      .get("auth/delivery_contacts", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.auth.api.delivery_contacts, d.data);


          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  countries: ({ params }: GetParams, cb?: GetResponse) => {
    api
      .get("auth/countries", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.auth.api.countries, d.data);

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  update: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.auth.update, body);

    if (!data) {
      return;
    }

    api
      .uploadFile("auth/update-profile", file, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          let { head, body } = notification("Profile Updated", "Your profile has been updated");
          let final_obj: any = {
            head: head,
            body: body
          };
          // let finaldata = [];
          // finaldata = useAtom(atom.notif.all_notif);
          // finaldata.push(final_obj)

          let notifs = readAtom(atom.storage.all_notif);
          let upNotif = [...notifs, final_obj];
          writeAtom(atom.storage.all_notif, upNotif)
          Router.push("/account/profile");
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  update_pro: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    api.post("auth/update_pro", body, params).then((d) => {
      if (d.status) {
        toast.success(d.message)
        Router.push("/account/term");
      } else {
        return toast.error(d.message)
      }
    })
  },

  update_address: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.auth.editAddress, body);

    if (!data) {
      return;
    }

    api
      .uploadFile("auth/update-address", file, params)
      .then((d) => {
        if (d.status) {
          toast.success("Address updated");

          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  save_address: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();

    api
      .uploadFile("auth/save-address", file, params)
      .then((d) => {
        if (d.status) {
          toast.success("Address added");

          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },


  machanic_details: ({ params }, cb?: GetResponse) => {
    api
      .get("auth/machanic_details", params)
      .then((d) => {
        if (d.status) {
          writeAtom(atom.auth.api.machanic_details, d.data);

          return cb(d);

        }
        else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  user_balance: ({ params }: GetParams, cb?: GetResponse) => {

    api
      .get("auth/user-balance", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.auth.api.user_balance, d.data);

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  update_balance: ({ params, body }: PostParams, cb?: GetResponse) => {
    let data = Validate([], schema.auth.updateBalance, body);

    if (!data) {
      return;
    }

    // console.log("----->", data);
    // console.log("========>", params);



    api.post("auth/update-balance", data, params)
      .then((d) => {
        if (d.status) {
          writeAtom(atom.auth.api.update_balance, d.data);
          let { head, body } = notification("Withdrawl successful", "Amount withdrawl");
          let final_obj: any = {
            head: head,
            body: body
          };
          // let finaldata = [];
          // finaldata = useAtom(atom.notif.all_notif);
          // finaldata.push(final_obj)

          let notifs = readAtom(atom.storage.all_notif);
          let upNotif = [...notifs, final_obj];
          writeAtom(atom.storage.all_notif, upNotif)

          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  projects_count: ({ params }: GetParams, cb?: GetResponse) => {

    api
      .get("auth/user_projects", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.auth.api.user_projects, d.data);

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  user_spent: ({ params }: GetParams, cb?: GetResponse) => {

    api
      .get("auth/user-spent", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.auth.api.user_spent, d.data);

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  update_modal: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    api.post("auth/update_modal", body, params).then((d) => {
      if (d.status) {
        toast.success(d.message)
        Router.push("/account/jobs");
      } else {
        return toast.error(d.message)
      }
    })
  },


  generate_new_password: ({ params, body }: PostParams, cb?: GetResponse) => {
    api.post("auth/generate-new-password", body, params)
      .then((d) => {
        if (d.status) {
          return cb(d);
        }
      })
      .catch((err) => console.log(err));

  },

  forgot_username: ({ params, body }: PostParams, cb?: GetResponse) => {
    api.post("auth/forgot-username", body, params)
      .then((d) => {
        if (d.status) {
          return cb(d);
        }
      })
      .catch((err) => console.log(err));

  },

};
