import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap"
import { toast } from "react-hot-toast";

import api from "../../../src/api/services/api";
import atom from "../../../src/jotai/atom";
import { useAtom, useAtomValue } from "jotai";
import Router from "next/router";

import { useRouter } from "next/router";
import { ProgressBar } from "react-bootstrap";

const Machinistshippingmessage = () => {
    const router = useRouter();
    const user = useAtomValue(atom.storage.user);
    const data = useAtom(atom.project.api.detail);


    const [value1, setValue1] = useState("");
    const [value2, setValue2] = useState("");
    const [value3, setValue3] = useState("");
    const [message, setmessage] = useState("Hello, \n\n Date Shipped: @value1@ \n Tracking number: @value2@ \n\n Just to confirm that your order was shipped via Royal Mail to your chosen delivery address @value1@ \n The tracking number of your parcel is: @value2@ .\n You can monitor the progress of your parcel via: https://www.royalmail.com/track-your-item/ (please wait 12 hours before logging on)\n Best wishes,\n" + `${user?.user_name}` + "\nPlease do not respond directly to this message.")

    const setmsgs = (e) => {
        let updtmsg = message
        let val1 = e.target.value
        setValue1(val1)
        setValue3(updtmsg.replaceAll("@value2@", value2).replaceAll("@value1@", new Date(val1).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })))

    }

    const setmsgs2 = (e) => {
        let updtmsg = message
        let val2 = e.target.value
        setValue2(val2)
        setValue3(updtmsg.replaceAll("@value2@", val2).replaceAll("@value1@", new Date(value1).toLocaleDateString('en-us', { day: "numeric", year: "numeric", month: "long" })))
    }


    const handleMessage = (e) => {
        setValue3(e.target.value)
    };


    const handlesubmit = () => {

        let msg = {
            project_id: router.query?.id,
            date: value1,
            message: value3,
            from_id: user?.id,
            to_id: data[0].creator_id,
            tracking_no: value2,
        }

        //if (!file.length) return toast.error("Please select a file");

        let form = new FormData();
        for (const key of Object.keys(file)) {
            form.append("file", file[key]);
        }

        for (const key of Object.keys(msg)) {
            form.append(key, msg[key]);
        }

        api.project.shipping_message_send({
            body: msg,
            file: form
        }, (d) => {
            if (d.status == true) {
                Router.replace(`/machining/${data[0]?.project_name.split(" ").join("-")}-${data[0].id}`)

            }
        })
        //Router.push(`/machining/${data[0]?.project_name}-${data[0].id}`) 
    }

    const handlecancel = () => {
        Router.push(`/machining/${data[0]?.project_name}-${data[0].id}`)
    }


    console.log("data", data)
    const steps_completed_supplier: any = useAtomValue(atom.project.api.steps_completed_supplier);


    useEffect(() => {
        const url = window.location.href
        const parts = url.split("/");
        const id2 = parts[parts.length - 1];
        api.project.detail({ params: { id: id2 } });

    }, []);

    useEffect(() => {
        const url = window.location.href
        const parts = url.split("/");
        const id2 = parts[parts.length - 1];

        console.log("Steps are:-", steps_completed_supplier)


    }, []);
    const [trackstate, settrackstate] = useState(false);
    const [datstate, setdatstate] = useState(false)

    const [file, setFile] = useState([]);


    const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;
        setpr(0)
        setFile((p) => [...p, ...files]);
    };

    console.log("files are:-", file)

    const [pr, setpr] = useState(110)

    useEffect(() => {
        if (pr < 102) {
            setTimeout(() => setpr(prev => prev += 2), 50)
        }
    }, [pr]);

    console.log("Files are", file)

    function delete_files(e) {
        setFile(file.filter(function (s) { return s !== e }))
    }

    useEffect(() => {
        setFile(file)
    }, [file])


    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>SEND SHIPPING MESSAGE</h1>
                        </div>
                    </div>
                </div>
            </div>


            <div className="container cjw">
                <div className="row">
                    <div className="col-sm-8 offset-md-2">
                        <div className="fund_d1">
                            <h3>Select a date and click OK. And enter the tracking number followed by OK. You can then edit the message text</h3>
                            <hr />
                            {/* <div className="tgs-3">
                                <p>Thank you for choosing to integrate Usineur PRO!</p>
                                <p>To finalize your registration, we need the information below!</p>
                            </div> */}

                            <div className="row tgs-1">

                                <div className="col-sm-3"><label>Enter estimated shipping date</label></div>
                                <div className="col-sm-6"><input type="date" name="name"
                                    autoComplete={"off"}
                                    min={new Date().toISOString().slice(0, 10)}
                                    onChange={setmsgs} value={value1} ></input></div>

                            </div>

                            <div className="row tgs-1">

                                <div className="col-sm-3"><label>Enter tracking number</label></div>
                                <div className="col-sm-6"><input type="text" name="name"
                                    autoComplete={"off"}
                                    onChange={setmsgs2} ></input></div>

                            </div>



                            <div className="row tgs-1">
                                <div className="col-sm-12"><label>Message sent to the client</label></div>
                                <div className="col-sm-12">
                                    <div className="project_profil2">
                                        <textarea
                                            name='desc'
                                            cols={20}
                                            rows={10}
                                            value={value3}
                                            onChange={handleMessage}
                                        />
                                    </div>
                                </div>

                                {/* <i className="fa fa-exclamation"></i>
                                <i className="fa fa-check"></i> */}
                            </div>

                            <br />

                            {/* {data[0]?.project_status == 4 ? (
                                <div className='upload-btn-wrapper'>
                                    <button className='btn'>
                                        <i className='fa fa-upload' /> Attach photos of machined parts
                                    </button>
                                    <input
                                        type='file'
                                        name='myfile'
                                        multiple={true}
                                        onChange={handle_file_change}
                                    />
                                </div>
                            ) : (<></>)} */}

                            {pr < 101 ? (
                                <ProgressBar now={pr} label={`${pr}%`} />
                            ) : (<></>)}


                            {file && pr > 100 ? (
                                file?.map((f) => {
                                    return (
                                        <>
                                            <div className="pro_div">
                                                <p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files(f)}><i className="fa fa-trash-o"></i></a></p>
                                            </div>
                                        </>
                                    )
                                })
                            ) : (<></>)}




                            <br />
                            <br />
                            <div className="oksign2">
                                <Button className="oksign1" variant="secondary" onClick={handlecancel}>
                                    Cancel
                                </Button>
                                <Button className="oksign" variant="primary" onClick={handlesubmit}>
                                    Send Message
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>




        </>
    )
}

export default Machinistshippingmessage;