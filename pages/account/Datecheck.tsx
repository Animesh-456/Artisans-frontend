// import React, { useEffect, useState } from "react";
// import { Button } from "react-bootstrap"
// import { toast } from "react-hot-toast";
// import api from "../../src/api/services/api";
// import atom from "../../src/jotai/atom";
// import { useAtom, useAtomValue } from "jotai";
// import Router from "next/router";
// import { useRouter } from "next/router";

// const Datecheck = () => {
//     const router = useRouter();
//     const user = useAtomValue(atom.storage.user);
//     const data = useAtom(atom.project.api.detail);
//     const [msg, setmsg] = useState({
//         project_id: router.query?.id,
//         date: "",
//         message: "",
//         from_id: user?.id,
//         to_id: data[0].creator_id,
//     });

//     const [message, setmessage] = useState("Hello\nThank you for selecting me to meet your requirements, I will start work on your order immediately and estimate that it will be shipped by the @date@.\nThank you for your confidence, \n\n Regards\n" + `${user?.user_name}` + "\n \nPlease do not respond directly to this message.")



//     const setmsgs = (e) => {
//         let updtmsg = message
//         let dt = e.target.value
//         setmsg(previousState => {
//             return { ...previousState, date: dt }
//         });

//         setmsg(previousState => {
//             return { ...previousState, message: updtmsg.replace("@date@", new Date(e.target.value).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })) }
//         });


//     }

//     const updatemessage = (e) => {
//         setmsg(previousState => {
//             return { ...previousState, message: e.target.value.replace("@date@", new Date(e.target.value).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })) }
//         });
//     }

//     //const setmsgs2 = common.ChangeState(setfinal);

//     const handlesubmit = () => {


//         api.project.machinist_confirmation_message({
//             body: msg
//         }, (d) => {
//             console.log("The status is ==>", d.status)
//             if (d.status == true) {
//                 Router.replace(`/machining/${data[0]?.project_name.split(" ").join("-")}-${data[0].id}`)
//             }
//         })
//     }

//     const handlecancel = () => {
//         Router.push(`/machining/${data[0]?.project_name}-${data[0].id}`)
//     }

//     console.log("message datas are:- ", msg)

//     console.log("data", data)
//     const [datstate, setdatstate] = useState(false)

//     const datestate = () => {
//         if (msg.date != "") {
//             setdatstate(true)
//         } else {
//             toast.error("Please select a date and click OK")
//         }
//     }

//     //console.log("String message:- ", string.message)
//     const steps_completed_supplier: any = useAtomValue(atom.project.api.steps_completed_supplier);
//     useEffect(() => {

//         let id = router.query?.id;
//         const url = window.location.href
//         const parts = url.split("/");
//         const id2 = parts[parts.length - 1];
//         api.project.detail({ params: { id: id2 } });

//     }, []);


//     return (
//         <>
//             <div
//                 className='banner_wp sign_banner'
//                 style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
//                 <div className='container'>
//                     <div className='row'>
//                         <div className='banner_text inner_banner_text'>
//                             <h1 className='yh'>SEND CONFIRMATION MESSAGE</h1>
//                         </div>
//                     </div>
//                 </div>
//             </div>


//             <div className="container cjw">
//                 <div className="row">
//                     <div className="col-sm-8 offset-md-2">
//                         <div className="fund_d1">
//                             <h3>Select a date and click OK. You can then edit the message text</h3>
//                             <hr />
//                             {/* <div className="tgs-3">
//                                 <p>Thank you for choosing to integrate Usineur PRO!</p>
//                                 <p>To finalize your registration, we need the information below!</p>
//                             </div> */}

//                             <div className="row tgs-1">

//                                 <div className="col-sm-3"><label>Enter estimated shipping date</label></div>
//                                 <div className="col-sm-6"><input type="date" name="name"
//                                     autoComplete={"off"}
//                                     min={new Date().toISOString().slice(0, 10)}
//                                     onChange={setmsgs} value={msg.date} ></input></div>
//                                 {/* <button className="col-sm-2" onClick={datestate}>OK </button> */}

//                             </div>

//                             <div className="row tgs-1">
//                                 <div className="col-sm-12"><label>Message sent to the client</label></div>
//                                 <div className="col-sm-12">
//                                     <div className="project_profil2">
//                                         <textarea
//                                             name='desc'
//                                             cols={20}
//                                             rows={10}
//                                             value={msg.message}
//                                             onChange={updatemessage}
//                                         />
//                                     </div>
//                                 </div>


//                                 {/* <i className="fa fa-exclamation"></i>
//                                 <i className="fa fa-check"></i> */}
//                             </div>

//                             <br />
//                             <div className="oksign2">
//                                 <Button className="oksign1" variant="secondary" onClick={handlecancel}>
//                                     Cancel
//                                 </Button>
//                                 <Button className="oksign" variant="primary" onClick={handlesubmit}>
//                                     Send Message
//                                 </Button>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>




//         </>
//     )
// }

// Datecheck.ignorepath = true;

// export default Datecheck;