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
  add: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.add, body);
    console.log("data sent", data);

    if (!data) {
      return;
    }

    api
      .uploadFile("project/add", file, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          Router.push("/account/jobs");
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  send_msg: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.send_msg, body);

    if (!data) {
      return;
    }

    api
      .uploadFile("project/send-msg", file, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  Invoice_list: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    //	toast.loading();
    //	let data = Validate([], schema.project.invoice_list, body);

    // console.log("data+",data)
    // if (!data) {
    // 	return;
    // }

    api
      .get("project/invoice-list", params)
      .then((d) => {

        localStorage.setItem('Invoice_List', JSON.stringify(d.data))
        writeAtom(atom.project.api.invoices, d.data);

        let opt = readAtom(atom.project.api.list_opt);
        writeAtom(atom.project.api.list_opt, {
          ...opt,
          page: d.meta.current_page,
          total_pages: d.meta.total_pages,
          total_count: d.meta.total_count,
        });
        //if (d.status) {
        //	toast.success(d.message);
        //	Router.push("/account/jobs");
        return cb(d);
        // } else {
        // 	toast.error(d.message);
        // }
      })
      .catch((err) => console.log(err));
  },





  send_bid_msg: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.send_bid_msg, body);

    if (!data) {
      return;
    }

    api
      .uploadFile("project/send-bid-msg", file, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  add_temp: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.add, body);

    if (!data) {
      return;
    }

    api
      .uploadFile("project/add-temp", file, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          Router.push("/auth/sign-in");
          return cb(d);
        } else {
          // toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  add_bid: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.add_bid, body);

    if (!data) {
      return;
    }

    api
      .uploadFile("project/add-bid", file, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  update_bid: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.update_bid, body);

    if (!data) {
      return;
    }

    api
      .uploadFile("project/update-bid", file, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  get_temp: ({ params, body }: PostParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.get_temp, body);

    if (!data) {
      return;
    }

    api
      .post("project/get-temp", data, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  list: ({ params }, cb?: GetResponse) => {
    api
      .get("project/list", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.list, d.data);

          // api pagination opt
          let opt = readAtom(atom.project.api.list_opt);
          writeAtom(atom.project.api.list_opt, {
            ...opt,
            page: d.meta.current_page,
            total_pages: d.meta.total_pages,
            total_count: d.meta.total_count,
          });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  list_msgs: ({ params }, cb?: GetResponse) => {
    api
      .get("project/list-msgs", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.list_msgs, d.data);

          writeAtom(atom.project.api.list_msg_meta, d?.meta);

          // // api pagination opt
          // let opt = readAtom(atom.project.api.list_opt);
          // writeAtom(atom.project.api.list_opt, {
          // 	...opt,
          // 	page: d.meta.current_page,
          // 	total_pages: d.meta.total_pages,
          // 	total_count: d.meta.total_count,
          // });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  my_msgs: ({ params }: GetParams, cb?: GetResponse) => {
    api
      .get("project/my-inbox-msgs", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.my_msgs, d.data);



          let opt = readAtom(atom.project.api.list_opt);
          writeAtom(atom.project.api.list_opt, {
            ...opt,
            page: d.meta.current_page,
            total_pages: d.meta.total_pages,
            total_count: d.meta.total_count,
          });





          // // api pagination opt
          // let opt = readAtom(atom.project.api.list_opt);
          // writeAtom(atom.project.api.list_opt, {
          // 	...opt,
          // 	page: d.meta.current_page,
          // 	total_pages: d.meta.total_pages,
          // 	total_count: d.meta.total_count,
          // });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  list_bid_msgs: ({ params }, cb?: GetResponse) => {
    api
      .get("project/list-bid-msgs", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.list_bid_msgs, d.data?.reverse());

          // // api pagination opt
          // let opt = readAtom(atom.project.api.list_opt);
          // writeAtom(atom.project.api.list_opt, {
          // 	...opt,
          // 	page: d.meta.current_page,
          // 	total_pages: d.meta.total_pages,
          // 	total_count: d.meta.total_count,
          // });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  latest: ({ params }, cb?: GetResponse) => {
    api
      .get("project/list", params)
      .then((d) => {
        if (d.status) {

          for (let i = 0; i < d.data.length; i++) {
            if (d.data[i].visibility == "Public" || d.data[i].visibility == "Private") {
              let last = readAtom(atom.project.api.latest);
              let curr = [...last, d.data[i]];
              writeAtom(atom.project.api.latest, curr);
              //console.log("public")
            }
          }
          // api data
          console.log("Latest data:-", d.data)

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  my_temp: ({ params }, cb?: GetResponse) => {
    api
      .get("project/get-my-temp", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.my_temp, d.data);

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  my: ({ params }, cb?: GetResponse) => {
    api
      .get("project/my", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.my, d.data);

          // api pagination opt
          let opt = readAtom(atom.project.api.my_opt);
          writeAtom(atom.project.api.my_opt, {
            ...opt,
            page: d.meta.current_page,
            total_pages: d.meta.total_pages,
            total_count: d.meta.total_count,
          });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  my_jobs: ({ params }, cb?: GetResponse) => {
    api
      .get("project/my", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.my, d.data);

          // api pagination opt
          let opt = readAtom(atom.project.api.my_proj_opt);
          writeAtom(atom.project.api.my_proj_opt, {
            ...opt,
            page: d.meta.current_page,
            total_pages: d.meta.total_pages,
            total_count: d.meta.total_count,
          });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  detail: ({ params }, cb?: GetResponse) => {
    api
      .get("project/detail", params)
      .then((d) => {
        if (d.status) {
          // api data

          let prebid_messages = d?.data?.prebid_messages;

          if (prebid_messages?.length) {
            let questions = prebid_messages?.filter((f) => f?.msg_type == "Q");
            let answers = prebid_messages?.filter((f) => f?.msg_type == "A");

            d.data.prebid_messages = questions?.map((c) => {
              return {
                ...c,
                reply: answers.filter(
                  (f) => f?.reply_for == c?.id && f?.msg_type == "A"
                ),
              };
            });
          }

          writeAtom(atom.project.api.detail, d.data);
          writeAtom(atom.storage.project_id, d.data.id);
          writeAtom(atom.storage.project_data, d.data);
          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  select_machinist: ({ params }, cb?: GetResponse) => {
    api
      .get("project/select-machinist", params)
      .then((d) => {
        if (d.status) {
          // api data
          toast.success(d.message);

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  askQuestion: ({ params, body }: PostParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.question, body);

    if (!data) {
      return;
    }

    api
      .post("project/ask-question", data, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  review_machinist: ({ params, body }: PostParams, cb?: GetResponse) => {
    toast.loading();

    let data = Validate([], schema.project.review_machinist, body);

    if (!data) {
      return;
    }

    api
      .post("project/review-machinist", data, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  addAnswer: ({ params, body }: PostParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.answer, body);

    if (!data) {
      return;
    }

    api
      .post("project/add-answer", data, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },
  addpayment: ({ params, body }: PostParams, cb?: GetResponse) => {
    api
      .post("project/add-answer", body, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  reviews_list: ({ params }, cb?: GetResponse) => {
    api
      .get("project/reviews", params)
      .then((d) => {
        if (d.status) {
          // api data
          localStorage.setItem('Reviews_List', JSON.stringify(d.data))
          writeAtom(atom.project.api.reviews, d.data);

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  Customer_Review: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    //	toast.loading();
    //	let data = Validate([], schema.project.invoice_list, body);

    // console.log("data+",data)
    // if (!data) {
    // 	return;
    // }

    api
      .get("project/customer_review", params)
      .then((d) => {

        localStorage.setItem('Customer_Review_List', JSON.stringify(d.data))

        //if (d.status) {
        //	toast.success(d.message);
        //	Router.push("/account/jobs");
        return cb(d);
        // } else {
        // 	toast.error(d.message);
        // }
      })
      .catch((err) => console.log(err));
  },

  my_projects: ({ params }, cb?: GetResponse) => {
    api
      .get("project/my-projects", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.my_project, d.data);

          // api pagination opt
          let opt = readAtom(atom.project.api.my_proj_opt);
          writeAtom(atom.project.api.my_proj_opt, {
            ...opt,
            page: d.meta.current_page,
            total_pages: d.meta.total_pages,
            total_count: d.meta.total_count,
          });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  review_projects: ({ params }, cb?: GetResponse) => {

    api
      .get("project/review-proj", params)
      .then((d) => {

        console.log("recevied data ---->", d.data);

        if (d.status) {
          // api data
          writeAtom(atom.project.api.reviewed_projects, d.data);

          // api pagination opt
          let opt = readAtom(atom.project.api.rev_proj_opt);
          writeAtom(atom.project.api.rev_proj_opt, {
            ...opt,
            page: d.meta.current_page,
            total_pages: d.meta.total_pages,
            total_count: d.meta.total_count,
          });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  image_list: ({ params }, cb?: GetResponse) => {
    api
      .get("project/image-list", params)
      .then((d) => {
        if (d.status) {
          // // api data
          // writeAtom(atom.project.api.list, d.data);

          // // api pagination opt
          // let opt = readAtom(atom.project.api.list_opt);
          // writeAtom(atom.project.api.list_opt, {
          //   ...opt,
          //   page: d.meta.current_page,
          //   total_pages: d.meta.total_pages,
          //   total_count: d.meta.total_count,
          // });

          writeAtom(atom.project.api.all_list, d.data)

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  allreviews: ({ params }, cb?: GetResponse) => {

    console.log("Before get reviews:- ")
    api.get("project/all-reviews", params).then((d) => {
      if (d.status) {
        console.log("Reviews :-", d.data)
        writeAtom(atom.project.api.allreviews, d.data)
        let opt = readAtom(atom.project.api.list_opt);
        writeAtom(atom.project.api.list_opt, {
          ...opt,
          page: d.meta.current_page,
          total_pages: d.meta.total_pages,
          total_count: d.meta.total_count,
        });

        // callback
        return cb(d);
      } else {
        return toast.error(d.message);
      }
    })
      .catch((err) => console.log(err));
  },

  all_lists: ({ params }, cb?: GetResponse) => {
    api
      .get("project/all-lists", params)
      .then((d) => {
        if (d.status) {
          // // api data
          // writeAtom(atom.project.api.list, d.data);

          // // api pagination opt
          // let opt = readAtom(atom.project.api.list_opt);
          // writeAtom(atom.project.api.list_opt, {
          //   ...opt,
          //   page: d.meta.current_page,
          //   total_pages: d.meta.total_pages,
          //   total_count: d.meta.total_count,
          // });

          writeAtom(atom.project.api.all_list, d.data)

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },


  project_gallery: ({ params }, cb?: GetResponse) => {
    api
      .get("project/project-gallery", params)
      .then((d) => {
        if (d.status) {
          // // api data
          // writeAtom(atom.project.api.list, d.data);

          // // api pagination opt
          // let opt = readAtom(atom.project.api.list_opt);
          // writeAtom(atom.project.api.list_opt, {
          //   ...opt,
          //   page: d.meta.current_page,
          //   total_pages: d.meta.total_pages,
          //   total_count: d.meta.total_count,
          // });

          writeAtom(atom.project.api.project_gallery, d.data)


          let opt = readAtom(atom.project.api.gallery_opt);
          writeAtom(atom.project.api.gallery_opt, {
            ...opt,
            page: d.meta.current_page,
            total_pages: d.meta.total_pages,
            total_count: d.meta.total_count,
          });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },




  update_release_payment: ({ body, params }: UploadParams, cb?: GetResponse) => {
    api.post("project/update_release_payment", body, params).then((d) => {
      if (d.status) {
        console.log("Response for:-", d.data)
        //return cb(d);
      } else {
        return toast.error(d.message)
      }
    })
  },

  notifs: ({ params }: GetParams, cb?: GetResponse) => {
    api.get("project/notifs", params).then((d) => {
      if (d.status) {
        console.log("Notifs:-", d.data)
        writeAtom(atom.project.api.notifs, d.data)
        let opt = readAtom(atom.project.api.my_proj_opt);
        writeAtom(atom.project.api.my_proj_opt, {
          ...opt,
          page: d.meta.current_page,
          total_pages: d.meta.total_pages,
          total_count: d.meta.total_count,
        });
        // callback
        return cb(d);
      } else {
        return toast.error(d.message);
      }
    })
      .catch((err) => console.log(err));

  },

  machinist_confirmation_message: ({ body, params }: UploadParams, cb?: GetResponse) => {
    api.post("project/machinist_confirmation_message", body, params).then((d) => {
      if (d.status) {
        console.log("Response for:-", d.data)
        toast.success("Confirmation message sent");
        return cb(d);
      } else {
        return toast.error(d.message)
      }
    })
  },

  shipping_message_send: ({ body, file, params }: UploadParams, cb?: GetResponse) => {

    toast.loading();

    console.log("before api")
    api
      .uploadFile("project/shipping_message_send", file, params)
      .then((d) => {
        console.log("after shipping api posts", d);
        if (d.status) {
          toast.success(d.message);
          //Router.push("/account/jobs");
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  steps_completed_supplier: ({ params }, cb?: GetResponse) => {
    api
      .get("project/steps_completed_supplier", params)
      .then((d) => {
        if (d.status) {
          writeAtom(atom.project.api.steps_completed_supplier, d.data)
          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  request_release_funds: ({ body, params }, cb?: GetResponse) => {
    api
      .post("project/request_release_funds", body, params)
      .then((d) => {
        if (d.status) {
          toast.success("Request sent to client")
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  project_review: ({ params }, cb?: GetResponse) => {
    api.get("project/project-review", params).then((d) => {
      if (d.status) {
        writeAtom(atom.project.api.project_review, d.data)
        // callback
        return cb(d);
      } else {
        return toast.error(d.message);
      }
    })
      .catch((err) => console.log(err));

  },

  update_read_my_msgs: ({ body, params }: UploadParams, cb?: GetResponse) => {
    api.post("project/update_read_my_msg", body, params).then((d) => {
      if (d.status) {
        console.log("Response for:-", d.data)
        //return cb(d);
      } else {
        return toast.error(d.message)
      }
    })
  },



  inbox_count: ({ params }: GetParams, cb?: GetResponse) => {
    api
      .get("project/inbox-count", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.inbox_count, d.data);
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },




  update_unread_my_msgs: ({ body, params }: UploadParams, cb?: GetResponse) => {
    api.post("project/update_unread_my_msg", body, params).then((d) => {
      if (d.status) {
        console.log("Response for:-", d.data)
        //return cb(d);
      } else {
        return toast.error(d.message)
      }
    })
  },

  update_remove_my_msgs: ({ body, params }: UploadParams, cb?: GetResponse) => {
    api.post("project/update_remove_my_msg", body, params).then((d) => {
      if (d.status) {
        console.log("Response for:-", d.data)
        //return cb(d);
      } else {
        return toast.error(d.message)
      }
    })
  },

  customer_releasepayment_checkbox: ({ params }, cb?: GetResponse) => {
    api
      .get("project/customer_releasepayment_checkbox", params)
      .then((d) => {
        if (d.status) {
          writeAtom(atom.project.api.customer_releasepayment_checkbox, d.data)
          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },








  public_me: ({ params }: GetParams, cb?: GetResponse) => {
    api
      .get("project/public-me", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.public_me, d.data);
          //let user = JSON.parse(localStorage.getItem("user"));

          //writeAtom(atom.storage.user, { ...d.data, token: user?.token });

          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },


  public_profile_api: ({ params }: GetParams, cb?: GetResponse) => {
    api.get("project/public-profile-api", params).then((d) => {
      if (d.status) {
        writeAtom(atom.project.api.public_profile_project, d.data)
        return cb(d)
      } else {
        return toast.error(d.message);
      }
    }).catch((err) => console.log(err))
  },

  public_profile_total_jobs: ({ params }: GetParams, cb?: GetResponse) => {
    api.get("project/public-profile-total-jobs", params).then((d) => {
      if (d.status) {
        writeAtom(atom.project.api.total_jobs, d.data)
        return cb(d)
      } else {
        return toast.error(d.message);
      }
    }).catch((err) => console.log(err))
  },


  public_user_reviews: ({ params }, cb?: GetResponse) => {
    api
      .get("project/public-user-reviews", params)
      .then((d) => {
        if (d.status) {
          // api data
          localStorage.setItem('Reviews_List', JSON.stringify(d.data))
          writeAtom(atom.project.api.public_user_reviews, d.data);
          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },



  offer_reviews_feedback: ({ params }, cb?: GetResponse) => {
    api
      .get("project/offer-reviews-feedback", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.offer_reviews_feedback, d.data);
          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  project_finalise_image: ({ params }, cb?: GetResponse) => {
    api
      .get("project/project_finalise_image", params)
      .then((d) => {
        if (d.status) {

          writeAtom(atom.project.api.project_finalise_image, d.data);

          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  save_pdf: ({ params, body }: PostParams, cb?: GetResponse) => {


    api
      .post("project/save-invoice", body, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },





  get_additional_comment: ({ params }, cb?: GetResponse) => {
    api
      .get("project/get-additional-comment", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.get_additional_comment, d.data);
          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },


  add_desccomment: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.add_desccomment, body);

    if (!data) {
      return;
    }

    api
      .uploadFile("project/add-desccomment", file, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },





  delete_additional_file: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    //let data = Validate([], schema.project.add_desccomment, body);

    // if (!data) {
    //   return;
    // }

    api
      .post("project/delete-additional-file", body, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },






  delete_profile_picture: ({ params, body }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    //let data = Validate([], schema.project.add_desccomment, body);

    // if (!data) {
    //   return;
    // }

    api
      .post("project/delete-profile-picture", body, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },


  delete_portfolio_picture: ({ params, body }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    //let data = Validate([], schema.project.add_desccomment, body);

    // if (!data) {
    //   return;
    // }

    api
      .post("project/delete-portfolio-picture", body, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

  page_details: ({ params }, cb?: GetResponse) => {
    api
      .get("project/page-details", params)
      .then((d) => {
        if (d.status) {
          // api data
          //writeAtom(atom.project.api.page_details, d.data);
          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  project_detail_seo: ({ params }, cb?: GetResponse) => {
    api
      .get("project/project-detail-seo", params)
      .then((d) => {
        if (d.status) {
          // api data
          //writeAtom(atom.project.api.page_details, d.data);
          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },

  public_profile_finalised_image: ({ params }, cb?: GetResponse) => {
    api
      .get("project/public-profile-finalised-image", params)
      .then((d) => {
        if (d.status) {
          // api data
          writeAtom(atom.project.api.public_profile_finalised_image, d.data);
          // callback
          return cb(d);
        } else {
          return toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },
























  afterCashfree: ({ params, body }: PostParams, cb?: GetResponse) => {
    api
      .post("project/after-payment", body, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));

  },



  add_art_work: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.add_art, body);

    if (!data) {
      return;
    }

    api
      .uploadFile("project/add-art-work", file, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          window.location.reload();
          return cb(d);

        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },


  get_art: ({ params }: GetParams, cb?: GetResponse) => {
    api.get("project/get-art", params).then((d) => {
      if (d.status) {
        writeAtom(atom.project.api.get_art, d.data)
        return cb(d)
      } else {
        return toast.error(d.message);
      }
    }).catch((err) => console.log(err))
  },



  delete_art_image: ({ params, body }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    api
      .post("project/delete-art-image", body, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },


  edit_art_portfolio: ({ params, body, file }: UploadParams, cb?: GetResponse) => {
    toast.loading();
    let data = Validate([], schema.project.edit_art, body);

    if (!data) {

      return;
    }

    api
      .uploadFile("project/edit-art-portfolio", file, params)
      .then((d) => {
        if (d.status) {
          toast.success(d.message);
          window.location.reload()
          return cb(d);
        } else {
          toast.error(d.message);
        }
      })
      .catch((err) => console.log(err));
  },

};
