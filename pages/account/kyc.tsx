import Link from "next/link";
import { CSSProperties } from 'react';
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import atom from "../../src/jotai/atom";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import common from "../../src/helpers/common";
import { toast } from "react-hot-toast";
import { Validate } from "../../src/validation/utils/test";
import schema from "../../src/validation/schema/schema";
import api from "../../src/api/services/api";
import env from "../../src/config/api";
import Head from "next/head";


export const getStaticProps = async () => {
    try {
        const params: any = {
            id: 35,
            status: 'active',
        };

        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${env.base_url}project/page-details?${queryString}`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();

        return {
            props: {
                prp: data // Assuming the fetched data structure matches what's expected
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

const Kyc = (prp) => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const user = useAtomValue(atom.storage.user);
    const kyc_details: any = useAtomValue(atom.project.api.kyc_details)
    const [readOnly, setreadOnly] = useState(false)
    const [existingFiles, setexistingFiles]: any = useState([]);

    const [project, projectstate] = useState({
        pan: kyc_details?.pan || "",
        aadhar_number: kyc_details?.aadhar_number || "",
        gst: kyc_details?.gst || "",
        company_name: kyc_details?.company_name || "",
        company_address: kyc_details?.company_address || "",
        company_address1: kyc_details?.company_address1 || "",
        company_state: kyc_details?.company_state || "",
        city: kyc_details?.city || "",
        zip: kyc_details?.zip || "",
        bank_account: kyc_details?.bank_account || "",
        ifsc: kyc_details?.ifsc || "",
        bank_name: kyc_details?.bank_name || "",
        bank_address: kyc_details?.bank_address || "",
        bank_address1: kyc_details?.bank_address1 || "",
        bank_state: kyc_details?.bank_state || "",
        bank_zip: kyc_details?.bank_zip || "",
        bank_city: kyc_details?.bank_city || "",
    });

    const [file, setFile] = useState([]);

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

    function delete_files(fileIndex) {
        //setFile(file.filter(function (s) { return s !== e }))

        const newFiles = [...file];
        newFiles.splice(fileIndex, 1);
        setFile(newFiles);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const deleteExistingFiles = (fileIndex) => {
        const newFiles = [...existingFiles];
        newFiles.splice(fileIndex, 1);
        setexistingFiles(newFiles);
    }

    const setproject = common.ChangeState(projectstate);




    const handleSubmit = () => {

        let form = new FormData();
        for (const key of Object.keys(file)) {
            form.append("file", file[key]);
        }

        for (const key of Object.keys(project)) {
            form.append(key, project[key]);
        }

        if (Object.keys(kyc_details)?.length == 0) {
            form.append("user_id", user?.id); // Assuming `project.user_id` holds the user ID
        }

        form.append("existingFiles", existingFiles.join(',')); // Assuming `existingFiles` is the variable holding the value
        //    Api call here

        api.project.kyc({ body: project, file: form }, (d) => {
            for (const key of Object.keys(project)) {
                setproject(key, "");
            }
            setFile([]);

        });
    };

    console.log("kyc details are", Object.keys(kyc_details)?.length)

    useEffect(() => {
        api.project.get_kyc({
            params: {
                id: user?.id
            }
        }, ((d) => {
            if (d.data.admin_approve === 1) {
                setreadOnly(true)
            }
            projectstate(d.data);
            if (d.data.attachments) {
                setexistingFiles(d.data.attachments.split(','))
            }
        }))
    }, []);


    return (
        <>

            <Head>
                <title>{`${prp?.prp?.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
            </Head>

            {/* <section className="inner_banner_wp" style={{ backgroundImage: "url(../img/inner-banner.jpg)" }}>
                <div className="container">
                    <h1>KYC Document</h1>
                </div>
            </section> */}

            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <AccountSideBar />
                        </div>
                        <div className="col-sm-8">
                            <div className="profile_box">
                                <div className="manage_p">
                                    <h4>KYC Form</h4>
                                    <form>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <label>Pan#:</label>
                                                    <input type="text" disabled={readOnly} name="text" placeholder="Enter PAN Number" value={project?.pan} onChange={setproject("pan")} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <label>Aadhar number#: </label>
                                                    <input type="number" disabled={readOnly} name="text" placeholder="Enter aadhar Number" value={project?.aadhar_number} onChange={setproject("aadhar_number")} />
                                                </div>
                                            </div>

                                        </div>


                                        <div className="from_feild">
                                            <div className="from_feild">
                                                <label>GST: </label>
                                                <input type="text" disabled={readOnly} name="text" placeholder="Enter GSTIN" value={project?.gst} onChange={setproject("gst")} />
                                            </div>
                                        </div>
                                        <div className="from_feild">
                                            <label>Company Name:</label>
                                            <input type="text" name="text" disabled={readOnly} placeholder="Enter Company Name" value={project?.company_name} onChange={setproject("company_name")} />
                                        </div>
                                        <div className="from_feild">
                                            <label>Company Address:</label>
                                            <input type="text" name="text" disabled={readOnly} placeholder="Street Address" value={project?.company_address} onChange={setproject("company_address")} />
                                        </div>
                                        <div className="from_feild">
                                            <input type="text" name="text" disabled={readOnly} placeholder="Street Address Line 2" value={project?.company_address1} onChange={setproject("company_address1")} />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <select value={project?.company_state} disabled={readOnly} onChange={setproject("company_state")}>
                                                        <option>Select State</option>
                                                        <option>Andhra Pradesh</option>
                                                        <option>Arunachal Pradesh</option>
                                                        <option>Assam</option>
                                                        <option>Bihar</option>
                                                        <option >Chhattisgarh</option>
                                                        <option >Goa</option>
                                                        <option >Gujarat</option>
                                                        <option >Haryana</option>
                                                        <option >Himachal Pradesh</option>
                                                        <option >Jharkhand</option>
                                                        <option >Karnataka</option>
                                                        <option >Kerala</option>
                                                        <option >Madhya Pradesh</option>
                                                        <option >Maharashtra</option>
                                                        <option >Manipur</option>
                                                        <option >Meghalaya</option>
                                                        <option >Mizoram</option>
                                                        <option >Nagaland</option>
                                                        <option >Odisha</option>
                                                        <option >Punjab</option>
                                                        <option >Rajasthan</option>
                                                        <option >Sikkim</option>
                                                        <option >Tamil Nadu</option>
                                                        <option >Telangana</option>
                                                        <option >Tripura</option>
                                                        <option >Uttar Pradesh</option>
                                                        <option >Uttarakhand</option>
                                                        <option >West Bengal</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <input type="text" disabled={readOnly} name="text" placeholder="City" value={project?.city} onChange={setproject("city")} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="from_feild">
                                            <input type="text" name="text" disabled={readOnly} placeholder="Postal / Zip Code" value={project?.zip} onChange={setproject("zip")} />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <label>Bank Acc:</label>
                                                    <input type="text" name="text" disabled={readOnly} placeholder="Enter Bank Account Number" value={project?.bank_account} onChange={setproject("bank_account")} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <label>IFSC Code:</label>
                                                    <input type="text" name="text" disabled={readOnly} placeholder="IFSC Code" value={project?.ifsc} onChange={setproject("ifsc")} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="from_feild">
                                            <label>Bank Name:</label>
                                            <input type="text" name="text" disabled={readOnly} placeholder="Enter Bank Name" value={project?.bank_name} onChange={setproject("bank_name")} />
                                        </div>
                                        <div className="from_feild">
                                            <label>Bank Address:</label>
                                            <input type="text" name="text" disabled={readOnly} placeholder="Street Address" value={project?.bank_address} onChange={setproject("bank_address")} />
                                        </div>
                                        <div className="from_feild">
                                            <input type="text" name="text" disabled={readOnly} placeholder="Street Address Line 2" value={project?.bank_address1} onChange={setproject("bank_address1")} />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <select value={project?.bank_state} disabled={readOnly} onChange={setproject("bank_state")}>
                                                        <option>Select State</option>
                                                        <option>Andhra Pradesh</option>
                                                        <option>Arunachal Pradesh</option>
                                                        <option>Assam</option>
                                                        <option>Bihar</option>
                                                        <option >Chhattisgarh</option>
                                                        <option >Goa</option>
                                                        <option >Gujarat</option>
                                                        <option >Haryana</option>
                                                        <option >Himachal Pradesh</option>
                                                        <option >Jharkhand</option>
                                                        <option >Karnataka</option>
                                                        <option >Kerala</option>
                                                        <option >Madhya Pradesh</option>
                                                        <option >Maharashtra</option>
                                                        <option >Manipur</option>
                                                        <option >Meghalaya</option>
                                                        <option >Mizoram</option>
                                                        <option >Nagaland</option>
                                                        <option >Odisha</option>
                                                        <option >Punjab</option>
                                                        <option >Rajasthan</option>
                                                        <option >Sikkim</option>
                                                        <option >Tamil Nadu</option>
                                                        <option >Telangana</option>
                                                        <option >Tripura</option>
                                                        <option >Uttar Pradesh</option>
                                                        <option >Uttarakhand</option>
                                                        <option >West Bengal</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <input type="text" name="text" disabled={readOnly} placeholder="City" value={project?.bank_city} onChange={setproject("bank_city")} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="from_feild">
                                            <input type="text" name="text" disabled={readOnly} placeholder="Postal / Zip Code" value={project?.bank_zip} onChange={setproject("bank_zip")} />
                                        </div>
                                        <div className="from_feild">
                                            <label>Upload documents(Bank passbook, cancelled cheque, PAN Card, GST certificate):</label>
                                            <div className="upload-btn-wrapper">
                                                <button className="btn">Upload <i className="fa fa-upload"></i></button>
                                                <input type="file" disabled={readOnly} name="myfile" multiple onChange={handle_file_change} ref={fileInputRef} />
                                            </div>

                                            <div className="upload_t file101">
                                                {existingFiles ? (existingFiles?.map((f, index) => {
                                                    return (
                                                        <>
                                                            <p><i className="fa fa-check"></i> <a href={common.get_kyc_attach(f)}>{f}</a> {!readOnly ? <i className="fa fa-trash-o" style={{ cursor: "pointer" }} onClick={() => deleteExistingFiles(index)}></i> : ""}</p>
                                                        </>
                                                    )
                                                })) : (<></>)}
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



                                        </div>
                                        <div className="submit_cancel">
                                            {!readOnly ? (
                                                <>
                                                    <a style={{ cursor: "pointer", color: "#fff" }} onClick={handleSubmit} >Submit Now</a>
                                                    <a style={{ display: "none" }}></a>
                                                </>
                                            ) : (
                                                <>
                                                    <p>Admin has approved these details. If you want to change anything please contact customer support</p>
                                                </>
                                            )}
                                        </div>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>
    )
}

// Kyc.ignorePath = true

export default Kyc;