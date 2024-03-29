import { useAtomValue, useAtom } from "jotai";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import { CountryReponse } from "../../src/@types/type";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import { ProgressBar } from "react-bootstrap";
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";

const EditProfile = () => {
    const user = useAtomValue(atom.storage.user);
    const countries = useAtomValue<Array<CountryReponse>>(
        atom.auth.api.countries,
    );


    const fileInputRef = useRef<HTMLInputElement>(null);

    const [profile, profileState] = useState({
        name: user?.name || "",
        surname: user?.surname || "",
        user_name: user?.user_name || "",
        zcode: user?.zcode || "",
        city: user?.city || "",
        country_code: user?.country_code || "",
        address1: user?.address1 || "",
        description: user?.description || "",
        service_desc: user?.service_desc || "",
        company_name: user?.company_name || "",
        siren: user?.siren || "",
        tva: user?.pro_vat || "",
        prof_pic: user?.logo || "",
        prot_pic: user?.prot_pic || ""
    });
    const setProfile = common.ChangeState(profileState);

    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState([]);
    const [changePic, setChangePic] = useState(false);
    const [progress, setprogress] = useState(0);
    const [fileAttach, setAttach] = useState(false);

    useEffect(() => {
        api.auth.countries({});
    }, []);

    const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;



        const file = files[0];

        const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);

        if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "jpeg" && extension.toLowerCase() !== "png" && extension.toLowerCase() !== "gif") {
            toast.error(`File extension .${extension} is not allowed`);
            return;
        }


        if (file.size / (1024 * 1024) > 10) {
            toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
            return;
        }






        if (files.length) {
            setpr(0)
            setFile(files[0]);
            setChangePic(true);
            setprogress(100)
        } else {
            setprogress(0)
        }
        setAttach(true)
    };
    const handle_file_change2: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;
        if (files?.length) {
            setpr2(0)
            setFile2((p) => [...p, ...files]);

        }

    };

    const handleSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file && changePic) return toast.error("Please select an Image");

        let form = new FormData();
        if (file && changePic) {
            form.append("file", file);
        }


        if (file2) {
            for (let i = 0; i < file2.length; i++) {
                form.append("file2", file2[i]);
            }
        }

        for (const key of Object.keys(profile)) {
            form.append(key, profile[key]);
        }

        if (profile.tva >= 0.0 && profile.tva <= 20.0) {
            api.auth.update(
                {
                    body: profile,
                    file: form,
                    params: changePic ? { change_pic: changePic } : {},
                },
                (d) => {
                    for (const key of Object.keys(profile)) {
                        setProfile(key, "");
                    }
                    setFile(null);
                },
            );
        } else {
            toast.error("TVA must contain numbers between 0.0% and 20.0%")
        }
    };


    const [tvastate, settvastate] = useState(false)

    const selfemployed = (event) => {
        if (event.target.checked) {
            settvastate(true)
            profile.tva = "0.0"
        } else {
            settvastate(false)
        }
    }

    const removeFile = () => {

        (document.getElementById('fileAttach') as HTMLInputElement).value = ''
        setAttach(false)
        setprogress(0);
    }

    const [pr, setpr] = useState(110)
    const [pr2, setpr2] = useState(110)

    useEffect(() => {
        if (pr < 102) {
            setTimeout(() => setpr(prev => prev += 2), 50)
        }

    }, [pr]);

   

    function delete_files(e) {
        //setFile(file.filter(function (s) { return s !== e }))
        setFile(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    useEffect(() => {
        setFile2(file2)
    }, [])

    useEffect(() => {
        if (pr2 < 102) {
            setTimeout(() => setpr2(prev => prev += 2), 50)
        }

    }, [pr2]);

  

    function delete_files2(e) {
        setFile2(file2.filter(function (s) { return s !== e }))
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        //setFile(null)
    }


    const delete_profile_pic = (name) => {
        setOpen(true)
    }

    const delete_portfolio_pic = (name) => {
        setdeleteprot(name);
        setOpen2(true)
    }

    const handle_delete_profile_pic = () => {
        api.project.delete_profile_picture({
            params: { id: user?.id }, body: {
                prof_pic: profile?.prof_pic
            }
        }, (d) => {
            window.location.href = '/account/profile'
        })
    }

    const handle_delete_portfolio_pic = () => {
        api.project.delete_portfolio_picture({
            params: { id: user?.id }, body: {
                prot_pic: deleteprot
            }
        }, (d) => {
            window.location.href = '/account/profile'
        })
    }

    const [open, setOpen] = useAtom(atom.modal.edit_profile_pic);
    const [open2, setOpen2] = useAtom(atom.modal.edit_portfolio_pic);

    const [deleteprot, setdeleteprot] = useState("");




    return (
        <div>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Edit My Profile</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container cjw'>
                <div className='row'>
                    <div className="col-sm-4">
                        <AccountSideBar />
                    </div>

                    <div className='col-sm-8'>
                        <div className='profile_box'>
                            <h3>
                                My Profile (
                                {user?.role_id == 1
                                    ? "Customer"
                                    : user?.role_id == 2
                                        ? "Machinist"
                                        : ""}
                                )
                            </h3>
                            <div className='project_profil'>
                                <form onSubmit={handleSubmit}>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <label>First Name</label>
                                            <input
                                                name='fname'
                                                type='text'
                                                value={profile.name}
                                                onChange={setProfile("name")}
                                            />
                                        </div>
                                        <div className='col-sm-6'>
                                            <label>Last Name</label>
                                            <input
                                                name='lname'
                                                type='text'
                                                value={profile.surname}
                                                onChange={setProfile("surname")}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <label>Username</label>
                                            <input
                                                name='username'
                                                type='text'
                                                value={profile.user_name}
                                                onChange={setProfile("user_name")}
                                                readOnly />
                                        </div>
                                        <div className='col-sm-6'>
                                            <label>Post code</label>
                                            <input
                                                name='zcode'
                                                type='text'
                                                value={profile.zcode}
                                                onChange={setProfile("zcode")}
                                            />
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <label>City</label>
                                            <input
                                                name='city'
                                                type='text'
                                                value={profile.city}
                                                onChange={setProfile("city")}
                                            />
                                        </div>
                                        <div className='col-sm-6'>
                                            <label>Country</label>

                                            <select
                                                name='country'
                                                value={profile.country_code}
                                                //onChange={setProfile("country_code")}
                                                disabled
                                            >
                                                {countries?.length ? (
                                                    countries?.map((d) => {
                                                        return (
                                                            <option value={d.id}>{d.country_name}</option>
                                                        );
                                                    })
                                                ) : (
                                                    <></>
                                                )}
                                            </select>
                                        </div>
                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <label className="qwe11">Address</label>
                                            <textarea
                                                name='address'
                                                cols={20}
                                                rows={5}
                                                value={profile.address1}
                                                onChange={setProfile("address1")}
                                            />
                                        </div>
                                        {user?.role_id == 2 ? (
                                            <>

                                                <div className='col-sm-6'>
                                                    <label className="qwe11">Introduce yourself here (eg expertise, experience, machinery, materials, status of your business ...)</label>
                                                    <textarea
                                                        name='desc'
                                                        cols={20}
                                                        rows={5}
                                                        value={profile.service_desc}
                                                        onChange={setProfile("service_desc")}
                                                    />
                                                </div>
                                            </>
                                        ) : (<></>)}

                                        {user?.role_id == 1 ? (
                                            <>
                                                <div className='col-sm-6'>
                                                    <label>Description</label>
                                                    <textarea
                                                        name='desc'
                                                        cols={20}
                                                        rows={5}
                                                        value={profile.description}
                                                        onChange={setProfile("description")}
                                                    />
                                                </div>
                                            </>
                                        ) : (<></>)}
                                        <hr />



                                        {user?.role_id == 2 && user?.pro_user == 1 ? (

                                            <>
                                                <div className='col-sm-6'>
                                                    <label>Company Name</label>
                                                    <input
                                                        name='company_name'
                                                        type='text'
                                                        readOnly

                                                        value={profile.company_name}
                                                        onChange={setProfile("company_name")} />

                                                </div><div className='col-sm-6'>
                                                    <label>SIREN NUMBER</label>
                                                    <input
                                                        name='siren'
                                                        type='text'
                                                        readOnly
                                                        value={profile.siren}
                                                        onChange={setProfile("siren")} />
                                                </div><div className='col-sm-6'>
                                                    <label><b>TVA %</b></label>
                                                    <input
                                                        name='username'
                                                        type='text'
                                                        disabled={tvastate}
                                                        value={profile.tva}
                                                        onChange={setProfile("tva")} />
                                                </div>
                                            </>

                                        ) : (<></>)}

                                    </div>
                                    <div className='row'>
                                        <div className='col-sm-6'>
                                            <label>Profile Picture (Formats jpeg, jpg, png, gif-max: 640x350)</label>
                                            <div className='upload-btn-wrapper'>
                                                <button className='btn'>
                                                    <i className='fa fa-upload' /> Add your logo, a
                                                    picture
                                                </button>
                                                <input
                                                    type='file'
                                                    name='myfile'
                                                    id='fileAttach'
                                                    onChange={handle_file_change}
                                                    ref={fileInputRef}
                                                />
                                            </div>
                                            <br />
                                            <br />
                                            <br />
                                            {pr < 101 ? (
                                                <ProgressBar now={pr} label={`${pr}%`} />
                                            ) : (<></>)}

                                            <br /><br />
                                            {file && pr > 100 ? (
                                                <div className="pro_div">
                                                    <p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{file?.name}<a className="delete_icon" onClick={() => delete_files(file)}><i className="fa fa-trash-o"></i></a></p>
                                                </div>
                                            ) : (<></>)}
                                        </div>
                                        {profile?.prof_pic && (

                                            <div className='col-sm-4'>
                                                <figure>
                                                    <img
                                                        src={
                                                            common.get_profile_picture(profile?.prof_pic) ||
                                                            "/img/no-images.png"
                                                        }

                                                    />
                                                    <a style={{ cursor: "pointer" }} onClick={() => { delete_profile_pic(profile?.prof_pic) }}><i className="fa fa-trash-o"></i></a>
                                                </figure>
                                            </div>
                                        )}
                                    </div>


                                    {user?.role_id == 2 ? (
                                        <>
                                            <div className='row'>
                                                <div className='col-sm-6'>
                                                    <label>Portfolio Picture</label>
                                                    <div className='upload-btn-wrapper'>
                                                        <button className='btn'>
                                                            <i className='fa fa-upload' /> Add Portfolio Picture
                                                        </button>
                                                        <input
                                                            type='file'
                                                            name='myfile'
                                                            id='fileAttach'
                                                            multiple
                                                            onChange={handle_file_change2}
                                                            ref={fileInputRef}
                                                        />
                                                    </div>


                                                    {pr2 < 101 ? (
                                                        <ProgressBar now={pr2} label={`${pr2}%`} />
                                                    ) : (<></>)}

                                                    {file2 && pr2 > 100 ? (
                                                        file2?.map((f) => {
                                                            return (
                                                                <div className="pro_div">
                                                                    <p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files2(f)}><i className="fa fa-trash-o"></i></a></p>
                                                                </div>
                                                            )
                                                        })
                                                    ) : (<></>)}
                                                </div>
                                                {profile?.prot_pic && profile?.prot_pic?.split(",").map((d) => {

                                                    return (

                                                        <div className='row'>
                                                            <div className="col-sm-4">
                                                                <figure>
                                                                    <img
                                                                        src={
                                                                            common.get_portfolio_pic(d) ||
                                                                            "/img/no-images.png"
                                                                        }
                                                                    />
                                                                    <a style={{ cursor: "pointer" }} onClick={() => { delete_portfolio_pic(d) }}><i className="fa fa-trash-o"></i></a>
                                                                </figure>
                                                            </div>
                                                        </div>

                                                    )
                                                })}
                                            </div>

                                        </>
                                    ) : (<></>)}


                                    {user?.pro_user == 1 && user?.role_id == 2 ? (

                                        <div className='form-check signcheck'>
                                            <label className='form-check-label'>
                                                <input type='checkbox' className='form-check-input' onClick={selfemployed} />I am self-employed
                                            </label>
                                        </div>
                                    ) : (<></>)}

                                    <div className='reg-bottom'>
                                        <button type='submit' name='submit'>
                                            Save
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


                <GlobalModal
                    title='Delete profile picture ?'
                    atom={atom.modal.edit_profile_pic}>

                    <div className='wjgf'>

                        <div className='cnfm-job-details post'>
                            <div className='cnfm-job-attchmnts'>
                                <h5>Are you sure you want to delete this picture ? </h5>

                            </div>


                        </div>
                        <div className='reg-bottom'>
                            <button type='submit' name='submit' onClick={() => setOpen(false)}>
                                Back
                            </button>
                            <button type='submit' name='submit' onClick={() => { setOpen(false); handle_delete_profile_pic() }}>
                                Yes
                            </button>
                        </div>
                    </div>
                </GlobalModal>

                <GlobalModal
                    title='Delete portfolio picture ?'
                    atom={atom.modal.edit_portfolio_pic}>

                    <div className='wjgf'>

                        <div className='cnfm-job-details post'>
                            <div className='cnfm-job-attchmnts'>
                                <h5>Are you sure you want to delete this picture ? </h5>

                            </div>


                        </div>
                        <div className='reg-bottom'>
                            <button type='submit' name='submit' onClick={() => setOpen2(false)}>
                                Back
                            </button>
                            <button type='submit' name='submit' onClick={() => { setOpen2(false); handle_delete_portfolio_pic() }}>
                                Yes
                            </button>
                        </div>
                    </div>
                </GlobalModal>
            </div>
        </div>
    );
};

export default EditProfile;
