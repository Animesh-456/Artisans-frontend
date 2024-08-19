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

const Kyc = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const user = useAtomValue(atom.storage.user);

    const [project, projectstate] = useState({
        user_id: user?.id,
        pan: "",
        gst: "",
        company_name: "",
        company_address: "",
        company_address1: "",
        company_state: "",
        city: "",
        zip: "",
        bank_account: "",
        ifsc: "",
        bank_name: "",
        bank_address: "",
        bank_address1: "",
        bank_state: "",
        bank_zip: "",
        bank_city: "",
    });

    const [file, setFile] = useState([]);

    const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();

        const { files } = e.currentTarget;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);

            if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "jpeg" && extension.toLowerCase() !== "png") {
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

    const setproject = common.ChangeState(projectstate);




    const handleSubmit = () => {

        let data = Validate([], schema.project.kyc, project);
        if (!file.length) return toast.error("Please select a file");
        let form = new FormData();
        for (const key of Object.keys(file)) {
            form.append("file", file[key]);
        }


        for (const key of Object.keys(project)) {
            form.append(key, project[key]);
        }


        //    Api call here

        api.project.kyc({ body: project, file: form }, (d) => {
            for (const key of Object.keys(project)) {
                setproject(key, "");
            }
            setFile([]);

        });
    };

    console.log("kyc details are", project)
    console.log("Files are", file)


    return (
        <>



            <section className="inner_banner_wp" style={{ backgroundImage: "url(../img/inner-banner.jpg)" }}>
                <div className="container">
                    <h1>KYC Document</h1>
                </div>
            </section>

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
                                                    <label>Pan#: <span>*</span></label>
                                                    <input type="text" name="text" placeholder="Enter PAN Number" value={project?.pan} onChange={setproject("pan")} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <label>GST: <span>*</span></label>
                                                    <input type="text" name="text" placeholder="Enter GSTIN" value={project?.gst} onChange={setproject("gst")} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="from_feild">
                                            <label>Company Name: <span>*</span></label>
                                            <input type="text" name="text" placeholder="Enter Company Name" value={project?.company_name} onChange={setproject("company_name")} />
                                        </div>
                                        <div className="from_feild">
                                            <label>Company Address: <span>*</span></label>
                                            <input type="text" name="text" placeholder="Street Address" value={project?.company_address} onChange={setproject("company_address")} />
                                        </div>
                                        <div className="from_feild">
                                            <input type="text" name="text" placeholder="Street Address Line 2" value={project?.company_address1} onChange={setproject("company_address1")} />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <select value={project?.company_state} onChange={setproject("company_state")}>
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
                                                    <input type="text" name="text" placeholder="City" value={project?.city} onChange={setproject("city")} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="from_feild">
                                            <input type="text" name="text" placeholder="Postal / Zip Code" value={project?.zip} onChange={setproject("zip")} />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <label>Bank Acc: <span>*</span></label>
                                                    <input type="text" name="text" placeholder="Enter Bank Account Number" value={project?.bank_account} onChange={setproject("bank_account")} />
                                                </div>
                                            </div>
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <label>IFSC Code: <span>*</span></label>
                                                    <input type="text" name="text" placeholder="IFSC Code" value={project?.ifsc} onChange={setproject("ifsc")} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="from_feild">
                                            <label>Bank Name: <span>*</span></label>
                                            <input type="text" name="text" placeholder="Enter Bank Name" value={project?.bank_name} onChange={setproject("bank_name")} />
                                        </div>
                                        <div className="from_feild">
                                            <label>Bank Address: <span>*</span></label>
                                            <input type="text" name="text" placeholder="Street Address" value={project?.bank_address} onChange={setproject("bank_address")} />
                                        </div>
                                        <div className="from_feild">
                                            <input type="text" name="text" placeholder="Street Address Line 2" value={project?.bank_address1} onChange={setproject("bank_address1")} />
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <div className="from_feild">
                                                    <select value={project?.bank_state} onChange={setproject("bank_state")}>
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
                                                    <input type="text" name="text" placeholder="City" value={project?.bank_city} onChange={setproject("bank_city")} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="from_feild">
                                            <input type="text" name="text" placeholder="Postal / Zip Code" value={project?.bank_zip} onChange={setproject("bank_zip")} />
                                        </div>
                                        <div className="from_feild">
                                            <label>Upload documents(Bank passbook, cancelled cheque, PAN Card, GST certificate): <span>*</span></label>
                                            <div className="upload-btn-wrapper">
                                                <button className="btn">Upload <i className="fa fa-upload"></i></button>
                                                <input type="file" name="myfile" multiple onChange={handle_file_change} ref={fileInputRef} />
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
                                            <a style={{ cursor: "pointer", color: "#fff" }} onClick={handleSubmit}>Submit Now</a>
                                            <a style={{ display: "none" }}></a>
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