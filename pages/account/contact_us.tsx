import Link from "next/link";
import { CSSProperties, useState, useRef } from 'react';
import { toast } from "react-hot-toast";
import common from "../../src/helpers/common";
import api from "../../src/api/services/api";
import env from "../../src/config/api";
import Head from "next/head";

export const getStaticProps = async () => {
    try {



        const params1: any = {
            id: 23,
            status: 'active',
        };

        const queryString1 = new URLSearchParams(params1).toString();
        const response = await fetch(`${env.base_url}project/page-details?${queryString1}`);


        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();


        const params: any = {
            id: 23,  // Extracted ID from the first API response
            status: 'active', // Any other parameters you want to pass
        };

        // Convert params object to query string
        const queryString = new URLSearchParams(params).toString();
        const response2 = await fetch(`${env.base_url}project/page-content-details?${queryString}`);
        if (!response2.ok) {
            throw new Error('Failed to fetch data from the second API');
        }
        const data2 = await response2.json();

        return {
            props: {
                prp: data,
                prp2: data2 // Assuming the fetched data structure matches what's expected
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                prp: null // Or any default value indicating an error occurred
            }
        };
    }
};

const Contact = (prp) => {


    const fileInputRef = useRef<HTMLInputElement>(null);


    const [data, setdata] = useState({
        role: "1",
        name: "",
        email: "",
        mobile_number: "",
        subject: "",
        comment: "",
    });

    const [file, setFile] = useState([]);

    const setproject = common.ChangeState(setdata);

    const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);



            if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "jpeg" && extension.toLowerCase() !== "png" && extension.toLowerCase() !== "pdf") {
                toast.error(`File extension .${extension} is not allowed`);
                continue;
            }

            if (file.size / (1024 * 1024) > 10) {
                toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
                continue;
            }

            setFile((p) => [...p, file]);

        }

    };


    // Deleting attachments

    function delete_files(fileIndex) {
        //setFile(file.filter(function (s) { return s !== e }))

        const newFiles = [...file];
        newFiles.splice(fileIndex, 1);
        setFile(newFiles);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handleSubmit = () => {
        let form = new FormData();
        for (const key of Object.keys(file)) {
            form.append("file", file[key]);
        }


        for (const key of Object.keys(data)) {
            form.append(key, data[key]);
        }


        api.project.contact_us({ body: data, file: form }, (d) => {
            for (const key of Object.keys(data)) {
                setproject(key, "");
            }
            setFile([]);
        });

    }

    console.log("prp2 is", prp?.prp)


    return (
        <>



            <Head>
                <title>{`${prp?.prp.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp.data[0].page_desc}`} />
            </Head>



            {/* <section className="inner_banner_wp" style={{ backgroundImage: "url(../img/inner-banner.jpg)" }}>
                <div className="container">
                    <h1>Contact Us</h1>
                </div>
            </section> */}

            <section className="breadcrumb_sec">
                <div className="container">
                    <div className="row">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Contact Us</li>

                        </ul>
                    </div>
                </div>
            </section>


            <section className="our_story_wp">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="contact_content">
                                <div className="heading_title">
                                    <h1>Need a hand? Or a high five? Here's how to reach us.</h1>
                                </div>
                                <p>
                                    <img src="../img/call-icon.png" alt="" /> <a href="tel:(+91) 89 815 15 666">+91 8981515666</a>
                                </p>
                                <p>
                                    <img src="../img/email-icon.png" alt="" /> <a href="mailto:Info@aartstudio.in">Info@aartstudio.in</a>
                                </p>
                                {/* <p>
                                    <img src="../img/location-icon.png" alt="" /> Kapten Japa West ST. 1190 DPS, Bali
                                </p> */}
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <img src="../img/contact-img.jpg" alt="contact-img" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="discover_wp dya">
                <div className="container">
                    <div className="row">
                        <div className="heading_title latest_request_heading">
                            <h1>Submit a Help Request</h1>
                        </div>
                        <div className="describe_wp">
                            <form>
                                <div className="from_feild">
                                    <label>Are you a customer or a artist: <span>*</span></label>
                                    <div className="select_div">

                                        <select
                                            name='role'
                                            onChange={setproject("role")}
                                            value={data.role}>
                                            <option value='1'>Customer</option>
                                            <option value='2'>Artist</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="from_feild">
                                    <label>Your Name: <span>*</span></label>
                                    <input value={data?.name} onChange={setproject("name")} type="text" name="text" placeholder="Type here..." />
                                </div>
                                <div className="from_feild">
                                    <label>Your Email Address: <span>*</span></label>
                                    <input type="email" value={data?.email} onChange={setproject("email")} name="text" placeholder="Type here..." />
                                </div>
                                <div className="from_feild">
                                    <label>Phone Number: <span>*</span></label>
                                    <input type="tel" value={data?.mobile_number} onChange={setproject("mobile_number")} name="text" placeholder="Type here..." />
                                </div>
                                <div className="from_feild">
                                    <label>Subject: <span>*</span></label>
                                    <input type="text" value={data?.subject} onChange={setproject("subject")} name="text" placeholder="Type here..." />
                                </div>
                                <div className="from_feild">
                                    <label>Comment: <span>*</span></label>
                                    <textarea value={data?.comment} onChange={setproject("comment")} placeholder="Please enter the details of your request" rows={6} cols={50}></textarea>
                                </div>
                                <div className="from_feild">
                                    <label>Attachments: <span>*</span></label>
                                    <div className="upload-btn-wrapper">
                                        <button className="btn">Add file or drop file here <i className="fa fa-upload"></i></button>
                                        <input onChange={handle_file_change} multiple={true} ref={fileInputRef} type="file" name="myfile" />
                                    </div>
                                </div>

                                <div className="upload_t file101">
                                    {file ? (file?.map((f, index) => {
                                        return (
                                            <>
                                                <p><i className="fa fa-check"></i> {f?.name}  <i className="fa fa-trash-o" style={{ cursor: "pointer" }} onClick={() => delete_files(index)}></i></p>
                                            </>
                                        )
                                    })) : (<></>)}
                                </div>
                                <div className="submit_cancel1">
                                    <a onClick={handleSubmit} style={{ cursor: "pointer", color: "#fff" }}>Submit Now</a>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

Contact.ignorePath = true

export default Contact;