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
import env from "../../src/config/api";
import Head from "next/head";
import Multiselect from 'multiselect-react-dropdown';
import { compressImage } from "../../src/helpers/compressFile";

export const getStaticProps = async () => {
    try {
        const params: any = {
            id: 29,
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

const EditProfile = (prp) => {
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
        prot_pic: user?.prot_pic || "",
        country_symbol: user?.country_symbol || "IN",
    });
    const setProfile = common.ChangeState(profileState);

    const [file, setFile] = useState(null);
    const [file2, setFile2] = useState([]);
    const [changePic, setChangePic] = useState(false);
    const [progress, setprogress] = useState(0);
    const [fileAttach, setAttach] = useState(false);

    useEffect(() => {
        api.auth.countries({});
        api.project.get_category_subcategory({})
    }, []);

    const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;



        const file = files[0];

        const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);

        if (extension.toLowerCase() !== "jpg" && extension.toLowerCase() !== "jpeg" && extension.toLowerCase() !== "png") {
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






    const handleSubmit = async (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!file && changePic) return toast.error("Please select an Image");

        if (file?.length > 10) {
            return toast.error("Maximum 10 files can be uploaded")
        }
        let form = new FormData();
        if (file && changePic) {
            // form.append("file", file);
            const compressedFile = await compressImage(file); // Compress the file
            form.append("file", compressedFile); // Append c
        }


        if (file2) {
            for (let i = 0; i < file2.length; i++) {
                // form.append("file2", file2[i]);
                const compressedFile = await compressImage(file2[i]); // Compress the file
                form.append("file", compressedFile); // Append c
            }
        }

        for (const key of Object.keys(profile)) {
            form.append(key, profile[key]);
        }

        const selectcat = selectedcategory.map(option => option.id).join(',')
        profile["category"] = selectcat;
        form.append('category', selectcat)



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



    const [imagePreview, setImagePreview] = useState(null);
    const [selectedcategory, setselectedcategory] = useState([])



    const Category_subcategory: any = useAtomValue(atom.project.api.get_category_subcategory)

    const category = [];

    Category_subcategory?.categories?.map((sub) => {
        category.push({ id: sub?.id, value: sub?.category_name, label: sub?.category_name })
    })


    useEffect(() => {
        const option = user?.category?.split(',').map(id => parseInt(id, 10));
        const optionsArray = category?.filter(item => option?.includes(item?.id))
        setselectedcategory(optionsArray)
    }, [])


    const handleCategorychange = (options) => {
        setselectedcategory(options);
    };


    const onRemove = (selectedList) => {
        setselectedcategory(selectedList)
    };


    //console.log("country symbol is", profile?.country_symbol)


    return (
        // <div>
        //     <div
        //         className='banner_wp sign_banner'
        //         style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
        //         <div className='container'>
        //             <div className='row'>
        //                 <div className='banner_text inner_banner_text'>
        //                     <h1 className='yh'>Edit My Profile</h1>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className='container cjw'>
        //         <div className='row'>
        //             <div className="col-sm-4">
        //                 <AccountSideBar />
        //             </div>

        //             <div className='col-sm-8'>
        //                 <div className='profile_box'>
        //                     <h3>
        //                         My Profile (
        //                         {user?.role_id == 1
        //                             ? "Customer"
        //                             : user?.role_id == 2
        //                                 ? "Machinist"
        //                                 : ""}
        //                         )
        //                     </h3>
        //                     <div className='project_profil'>
        //                         <form onSubmit={handleSubmit}>
        //                             <div className='row'>
        //                                 <div className='col-sm-6'>
        //                                     <label>First Name</label>
        //                                     <input
        //                                         name='fname'
        //                                         type='text'
        //                                         value={profile.name}
        //                                         onChange={setProfile("name")}
        //                                     />
        //                                 </div>
        //                                 <div className='col-sm-6'>
        //                                     <label>Last Name</label>
        //                                     <input
        //                                         name='lname'
        //                                         type='text'
        //                                         value={profile.surname}
        //                                         onChange={setProfile("surname")}
        //                                     />
        //                                 </div>
        //                             </div>
        //                             <div className='row'>
        //                                 <div className='col-sm-6'>
        //                                     <label>Username</label>
        //                                     <input
        //                                         name='username'
        //                                         type='text'
        //                                         value={profile.user_name}
        //                                         onChange={setProfile("user_name")}
        //                                         readOnly />
        //                                 </div>
        //                                 <div className='col-sm-6'>
        //                                     <label>Post code</label>
        //                                     <input
        //                                         name='zcode'
        //                                         type='text'
        //                                         value={profile.zcode}
        //                                         onChange={setProfile("zcode")}
        //                                     />
        //                                 </div>
        //                             </div>
        //                             <div className='row'>
        //                                 <div className='col-sm-6'>
        //                                     <label>City</label>
        //                                     <input
        //                                         name='city'
        //                                         type='text'
        //                                         value={profile.city}
        //                                         onChange={setProfile("city")}
        //                                     />
        //                                 </div>
        //                                 <div className='col-sm-6'>
        //                                     <label>Country</label>

        //                                     <select
        //                                         name='country'
        //                                         value={profile.country_code}
        //                                         //onChange={setProfile("country_code")}
        //                                         disabled
        //                                     >
        //                                         {countries?.length ? (
        //                                             countries?.map((d) => {
        //                                                 return (
        //                                                     <option value={d.id}>{d.country_name}</option>
        //                                                 );
        //                                             })
        //                                         ) : (
        //                                             <></>
        //                                         )}
        //                                     </select>
        //                                 </div>
        //                             </div>
        //                             <div className='row'>
        //                                 <div className='col-sm-6'>
        //                                     <label className="qwe11">Address</label>
        //                                     <textarea
        //                                         name='address'
        //                                         cols={20}
        //                                         rows={5}
        //                                         value={profile.address1}
        //                                         onChange={setProfile("address1")}
        //                                     />
        //                                 </div>
        //                                 {user?.role_id == 2 ? (
        //                                     <>

        //                                         <div className='col-sm-6'>
        //                                             <label className="qwe11">Introduce yourself here (eg expertise, experience, machinery, materials, status of your business ...)</label>
        //                                             <textarea
        //                                                 name='desc'
        //                                                 cols={20}
        //                                                 rows={5}
        //                                                 value={profile.service_desc}
        //                                                 onChange={setProfile("service_desc")}
        //                                             />
        //                                         </div>
        //                                     </>
        //                                 ) : (<></>)}

        //                                 {user?.role_id == 1 ? (
        //                                     <>
        //                                         <div className='col-sm-6'>
        //                                             <label>Description</label>
        //                                             <textarea
        //                                                 name='desc'
        //                                                 cols={20}
        //                                                 rows={5}
        //                                                 value={profile.description}
        //                                                 onChange={setProfile("description")}
        //                                             />
        //                                         </div>
        //                                     </>
        //                                 ) : (<></>)}
        //                                 <hr />



        //                                 {user?.role_id == 2 && user?.pro_user == 1 ? (

        //                                     <>
        //                                         <div className='col-sm-6'>
        //                                             <label>Company Name</label>
        //                                             <input
        //                                                 name='company_name'
        //                                                 type='text'
        //                                                 readOnly

        //                                                 value={profile.company_name}
        //                                                 onChange={setProfile("company_name")} />

        //                                         </div><div className='col-sm-6'>
        //                                             <label>SIREN NUMBER</label>
        //                                             <input
        //                                                 name='siren'
        //                                                 type='text'
        //                                                 readOnly
        //                                                 value={profile.siren}
        //                                                 onChange={setProfile("siren")} />
        //                                         </div><div className='col-sm-6'>
        //                                             <label><b>TVA %</b></label>
        //                                             <input
        //                                                 name='username'
        //                                                 type='text'
        //                                                 disabled={tvastate}
        //                                                 value={profile.tva}
        //                                                 onChange={setProfile("tva")} />
        //                                         </div>
        //                                     </>

        //                                 ) : (<></>)}

        //                             </div>
        //                             <div className='row'>
        //                                 <div className='col-sm-6'>
        //                                     <label>Profile Picture (Formats jpeg, jpg, png, gif-max: 640x350)</label>
        //                                     <div className='upload-btn-wrapper'>
        //                                         <button className='btn'>
        //                                             <i className='fa fa-upload' /> Add your logo, a
        //                                             picture
        //                                         </button>
        //                                         <input
        //                                             type='file'
        //                                             name='myfile'
        //                                             id='fileAttach'
        //                                             onChange={handle_file_change}
        //                                             ref={fileInputRef}
        //                                         />
        //                                     </div>
        //                                     <br />
        //                                     <br />
        //                                     <br />
        //                                     {pr < 101 ? (
        //                                         <ProgressBar now={pr} label={`${pr}%`} />
        //                                     ) : (<></>)}

        //                                     <br /><br />
        //                                     {file && pr > 100 ? (
        //                                         <div className="pro_div">
        //                                             <p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{file?.name}<a className="delete_icon" onClick={() => delete_files(file)}><i className="fa fa-trash-o"></i></a></p>
        //                                         </div>
        //                                     ) : (<></>)}
        //                                 </div>
        //                                 {profile?.prof_pic && (

        //                                     <div className='col-sm-4'>
        //                                         <figure>
        //                                             <img
        //                                                 src={
        //                                                     common.get_profile_picture(profile?.prof_pic) ||
        //                                                     "/img/no-images.png"
        //                                                 }

        //                                             />
        //                                             <a style={{ cursor: "pointer" }} onClick={() => { delete_profile_pic(profile?.prof_pic) }}><i className="fa fa-trash-o"></i></a>
        //                                         </figure>
        //                                     </div>
        //                                 )}
        //                             </div>


        //                             {user?.role_id == 2 ? (
        //                                 <>
        //                                     <div className='row'>
        //                                         <div className='col-sm-6'>
        //                                             <label>Portfolio Picture</label>
        //                                             <div className='upload-btn-wrapper'>
        //                                                 <button className='btn'>
        //                                                     <i className='fa fa-upload' /> Add Portfolio Picture
        //                                                 </button>
        //                                                 <input
        //                                                     type='file'
        //                                                     name='myfile'
        //                                                     id='fileAttach'
        //                                                     multiple
        //                                                     onChange={handle_file_change2}
        //                                                     ref={fileInputRef}
        //                                                 />
        //                                             </div>


        //                                             {pr2 < 101 ? (
        //                                                 <ProgressBar now={pr2} label={`${pr2}%`} />
        //                                             ) : (<></>)}

        //                                             {file2 && pr2 > 100 ? (
        //                                                 file2?.map((f) => {
        //                                                     return (
        //                                                         <div className="pro_div">
        //                                                             <p><i className="fa fa-check"></i><span className="none"><i className="fa fa-warning"></i></span>{f?.name}<a className="delete_icon" onClick={() => delete_files2(f)}><i className="fa fa-trash-o"></i></a></p>
        //                                                         </div>
        //                                                     )
        //                                                 })
        //                                             ) : (<></>)}
        //                                         </div>
        //                                         {profile?.prot_pic && profile?.prot_pic?.split(",").map((d) => {

        //                                             return (

        //                                                 <div className='row'>
        //                                                     <div className="col-sm-4">
        //                                                         <figure>
        //                                                             <img
        //                                                                 src={
        //                                                                     common.get_portfolio_pic(d) ||
        //                                                                     "/img/no-images.png"
        //                                                                 }
        //                                                             />
        //                                                             <a style={{ cursor: "pointer" }} onClick={() => { delete_portfolio_pic(d) }}><i className="fa fa-trash-o"></i></a>
        //                                                         </figure>
        //                                                     </div>
        //                                                 </div>

        //                                             )
        //                                         })}
        //                                     </div>

        //                                 </>
        //                             ) : (<></>)}


        //                             {user?.pro_user == 1 && user?.role_id == 2 ? (

        //                                 <div className='form-check signcheck'>
        //                                     <label className='form-check-label'>
        //                                         <input type='checkbox' className='form-check-input' onClick={selfemployed} />I am self-employed
        //                                     </label>
        //                                 </div>
        //                             ) : (<></>)}

        //                             <div className='reg-bottom'>
        //                                 <button type='submit' name='submit'>
        //                                     Save
        //                                 </button>
        //                             </div>
        //                         </form>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>


        //         <GlobalModal
        //             title='Delete profile picture ?'
        //             atom={atom.modal.edit_profile_pic}>

        //             <div className='wjgf'>

        //                 <div className='cnfm-job-details post'>
        //                     <div className='cnfm-job-attchmnts'>
        //                         <h5>Are you sure you want to delete this picture ? </h5>

        //                     </div>


        //                 </div>
        //                 <div className='reg-bottom'>
        //                     <button type='submit' name='submit' onClick={() => setOpen(false)}>
        //                         Back
        //                     </button>
        //                     <button type='submit' name='submit' onClick={() => { setOpen(false); handle_delete_profile_pic() }}>
        //                         Yes
        //                     </button>
        //                 </div>
        //             </div>
        //         </GlobalModal>

        //         <GlobalModal
        //             title='Delete portfolio picture ?'
        //             atom={atom.modal.edit_portfolio_pic}>

        //             <div className='wjgf'>

        //                 <div className='cnfm-job-details post'>
        //                     <div className='cnfm-job-attchmnts'>
        //                         <h5>Are you sure you want to delete this picture ? </h5>

        //                     </div>


        //                 </div>
        //                 <div className='reg-bottom'>
        //                     <button type='submit' name='submit' onClick={() => setOpen2(false)}>
        //                         Back
        //                     </button>
        //                     <button type='submit' name='submit' onClick={() => { setOpen2(false); handle_delete_portfolio_pic() }}>
        //                         Yes
        //                     </button>
        //                 </div>
        //             </div>
        //         </GlobalModal>
        //     </div>
        // </div>
        <>

            <Head>
                <title>{`${prp?.prp?.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
            </Head>
            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">

                            <AccountSideBar />
                        </div>
                        <div className="col-sm-8">
                            <div className="profile_box">
                                <div className="prof111">
                                    <h4>My Profile ({user?.role_id == 1
                                        ? "Customer"
                                        : user?.role_id == 2
                                            ? "Artist"
                                            : ""})</h4>
                                </div>
                                <div className="project_profil">
                                    <form onSubmit={handleSubmit}>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>First Name</label>
                                                <input name="fname"
                                                    value={profile.name}
                                                    autoComplete="given-name"
                                                    onChange={setProfile("name")} type="text" />
                                            </div>
                                            <div className="col-sm-6">
                                                <label>Last Name</label>
                                                <input name="lname"
                                                    value={profile.surname}
                                                    autoComplete="family-name"
                                                    onChange={setProfile("surname")}
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>Username</label>
                                                <input name="username" type="text" readOnly value={profile.user_name}
                                                    autoComplete="username"
                                                    onChange={setProfile("user_name")} />
                                            </div>
                                            <div className="col-sm-6">
                                                <label>Post code</label>
                                                <input name="zcode"
                                                    value={profile.zcode}
                                                    onChange={setProfile("zcode")}
                                                    autoComplete="postal-code"
                                                    type="text" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>City</label>
                                                <input name="city" type="text" value={profile.city}
                                                    autoComplete="address-level2"
                                                    onChange={setProfile("city")} />
                                            </div>
                                            <div className="col-sm-6">
                                                <label>Country</label>
                                                <div className="select_div">
                                                    {/* <select
                                                        name='country'
                                                        value={"India"}

                                                        disabled
                                                    >
                                                        <option>India</option>
                                                    </select> */}
                                                    <select onChange={setProfile("country_symbol")} value={profile?.country_symbol ? profile?.country_symbol : "IN"}>
                                                        <option value="AF">Afghanistan</option>
                                                        <option value="AX">Åland Islands</option>
                                                        <option value="AL">Albania</option>
                                                        <option value="DZ">Algeria</option>
                                                        <option value="AS">American Samoa</option>
                                                        <option value="AD">Andorra</option>
                                                        <option value="AO">Angola</option>
                                                        <option value="AI">Anguilla</option>
                                                        <option value="AQ">Antarctica</option>
                                                        <option value="AG">Antigua and Barbuda</option>
                                                        <option value="AR">Argentina</option>
                                                        <option value="AM">Armenia</option>
                                                        <option value="AW">Aruba</option>
                                                        <option value="AU">Australia</option>
                                                        <option value="AT">Austria</option>
                                                        <option value="AZ">Azerbaijan</option>
                                                        <option value="BS">Bahamas</option>
                                                        <option value="BH">Bahrain</option>
                                                        <option value="BD">Bangladesh</option>
                                                        <option value="BB">Barbados</option>
                                                        <option value="BY">Belarus</option>
                                                        <option value="BE">Belgium</option>
                                                        <option value="BZ">Belize</option>
                                                        <option value="BJ">Benin</option>
                                                        <option value="BM">Bermuda</option>
                                                        <option value="BT">Bhutan</option>
                                                        <option value="BO">Bolivia, Plurinational State of</option>
                                                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                        <option value="BA">Bosnia and Herzegovina</option>
                                                        <option value="BW">Botswana</option>
                                                        <option value="BV">Bouvet Island</option>
                                                        <option value="BR">Brazil</option>
                                                        <option value="IO">British Indian Ocean Territory</option>
                                                        <option value="BN">Brunei Darussalam</option>
                                                        <option value="BG">Bulgaria</option>
                                                        <option value="BF">Burkina Faso</option>
                                                        <option value="BI">Burundi</option>
                                                        <option value="KH">Cambodia</option>
                                                        <option value="CM">Cameroon</option>
                                                        <option value="CA">Canada</option>
                                                        <option value="CV">Cape Verde</option>
                                                        <option value="KY">Cayman Islands</option>
                                                        <option value="CF">Central African Republic</option>
                                                        <option value="TD">Chad</option>
                                                        <option value="CL">Chile</option>
                                                        <option value="CN">China</option>
                                                        <option value="CX">Christmas Island</option>
                                                        <option value="CC">Cocos (Keeling) Islands</option>
                                                        <option value="CO">Colombia</option>
                                                        <option value="KM">Comoros</option>
                                                        <option value="CG">Congo</option>
                                                        <option value="CD">Congo, the Democratic Republic of the</option>
                                                        <option value="CK">Cook Islands</option>
                                                        <option value="CR">Costa Rica</option>
                                                        <option value="CI">Côte d'Ivoire</option>
                                                        <option value="HR">Croatia</option>
                                                        <option value="CU">Cuba</option>
                                                        <option value="CW">Curaçao</option>
                                                        <option value="CY">Cyprus</option>
                                                        <option value="CZ">Czech Republic</option>
                                                        <option value="DK">Denmark</option>
                                                        <option value="DJ">Djibouti</option>
                                                        <option value="DM">Dominica</option>
                                                        <option value="DO">Dominican Republic</option>
                                                        <option value="EC">Ecuador</option>
                                                        <option value="EG">Egypt</option>
                                                        <option value="SV">El Salvador</option>
                                                        <option value="GQ">Equatorial Guinea</option>
                                                        <option value="ER">Eritrea</option>
                                                        <option value="EE">Estonia</option>
                                                        <option value="ET">Ethiopia</option>
                                                        <option value="FK">Falkland Islands (Malvinas)</option>
                                                        <option value="FO">Faroe Islands</option>
                                                        <option value="FJ">Fiji</option>
                                                        <option value="FI">Finland</option>
                                                        <option value="FR">France</option>
                                                        <option value="GF">French Guiana</option>
                                                        <option value="PF">French Polynesia</option>
                                                        <option value="TF">French Southern Territories</option>
                                                        <option value="GA">Gabon</option>
                                                        <option value="GM">Gambia</option>
                                                        <option value="GE">Georgia</option>
                                                        <option value="DE">Germany</option>
                                                        <option value="GH">Ghana</option>
                                                        <option value="GI">Gibraltar</option>
                                                        <option value="GR">Greece</option>
                                                        <option value="GL">Greenland</option>
                                                        <option value="GD">Grenada</option>
                                                        <option value="GP">Guadeloupe</option>
                                                        <option value="GU">Guam</option>
                                                        <option value="GT">Guatemala</option>
                                                        <option value="GG">Guernsey</option>
                                                        <option value="GN">Guinea</option>
                                                        <option value="GW">Guinea-Bissau</option>
                                                        <option value="GY">Guyana</option>
                                                        <option value="HT">Haiti</option>
                                                        <option value="HM">Heard Island and McDonald Islands</option>
                                                        <option value="VA">Holy See (Vatican City State)</option>
                                                        <option value="HN">Honduras</option>
                                                        <option value="HK">Hong Kong</option>
                                                        <option value="HU">Hungary</option>
                                                        <option value="IS">Iceland</option>
                                                        <option value="IN">India</option>
                                                        <option value="ID">Indonesia</option>
                                                        <option value="IR">Iran, Islamic Republic of</option>
                                                        <option value="IQ">Iraq</option>
                                                        <option value="IE">Ireland</option>
                                                        <option value="IM">Isle of Man</option>
                                                        <option value="IL">Israel</option>
                                                        <option value="IT">Italy</option>
                                                        <option value="JM">Jamaica</option>
                                                        <option value="JP">Japan</option>
                                                        <option value="JE">Jersey</option>
                                                        <option value="JO">Jordan</option>
                                                        <option value="KZ">Kazakhstan</option>
                                                        <option value="KE">Kenya</option>
                                                        <option value="KI">Kiribati</option>
                                                        <option value="KP">Korea, Democratic People's Republic of</option>
                                                        <option value="KR">Korea, Republic of</option>
                                                        <option value="KW">Kuwait</option>
                                                        <option value="KG">Kyrgyzstan</option>
                                                        <option value="LA">Lao People's Democratic Republic</option>
                                                        <option value="LV">Latvia</option>
                                                        <option value="LB">Lebanon</option>
                                                        <option value="LS">Lesotho</option>
                                                        <option value="LR">Liberia</option>
                                                        <option value="LY">Libya</option>
                                                        <option value="LI">Liechtenstein</option>
                                                        <option value="LT">Lithuania</option>
                                                        <option value="LU">Luxembourg</option>
                                                        <option value="MO">Macao</option>
                                                        <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                                        <option value="MG">Madagascar</option>
                                                        <option value="MW">Malawi</option>
                                                        <option value="MY">Malaysia</option>
                                                        <option value="MV">Maldives</option>
                                                        <option value="ML">Mali</option>
                                                        <option value="MT">Malta</option>
                                                        <option value="MH">Marshall Islands</option>
                                                        <option value="MQ">Martinique</option>
                                                        <option value="MR">Mauritania</option>
                                                        <option value="MU">Mauritius</option>
                                                        <option value="YT">Mayotte</option>
                                                        <option value="MX">Mexico</option>
                                                        <option value="FM">Micronesia, Federated States of</option>
                                                        <option value="MD">Moldova, Republic of</option>
                                                        <option value="MC">Monaco</option>
                                                        <option value="MN">Mongolia</option>
                                                        <option value="ME">Montenegro</option>
                                                        <option value="MS">Montserrat</option>
                                                        <option value="MA">Morocco</option>
                                                        <option value="MZ">Mozambique</option>
                                                        <option value="MM">Myanmar</option>
                                                        <option value="NA">Namibia</option>
                                                        <option value="NR">Nauru</option>
                                                        <option value="NP">Nepal</option>
                                                        <option value="NL">Netherlands</option>
                                                        <option value="NC">New Caledonia</option>
                                                        <option value="NZ">New Zealand</option>
                                                        <option value="NI">Nicaragua</option>
                                                        <option value="NE">Niger</option>
                                                        <option value="NG">Nigeria</option>
                                                        <option value="NU">Niue</option>
                                                        <option value="NF">Norfolk Island</option>
                                                        <option value="MP">Northern Mariana Islands</option>
                                                        <option value="NO">Norway</option>
                                                        <option value="OM">Oman</option>
                                                        <option value="PK">Pakistan</option>
                                                        <option value="PW">Palau</option>
                                                        <option value="PS">Palestinian Territory, Occupied</option>
                                                        <option value="PA">Panama</option>
                                                        <option value="PG">Papua New Guinea</option>
                                                        <option value="PY">Paraguay</option>
                                                        <option value="PE">Peru</option>
                                                        <option value="PH">Philippines</option>
                                                        <option value="PN">Pitcairn</option>
                                                        <option value="PL">Poland</option>
                                                        <option value="PT">Portugal</option>
                                                        <option value="PR">Puerto Rico</option>
                                                        <option value="QA">Qatar</option>
                                                        <option value="RE">Réunion</option>
                                                        <option value="RO">Romania</option>
                                                        <option value="RU">Russian Federation</option>
                                                        <option value="RW">Rwanda</option>
                                                        <option value="BL">Saint Barthélemy</option>
                                                        <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                                        <option value="KN">Saint Kitts and Nevis</option>
                                                        <option value="LC">Saint Lucia</option>
                                                        <option value="MF">Saint Martin (French part)</option>
                                                        <option value="PM">Saint Pierre and Miquelon</option>
                                                        <option value="VC">Saint Vincent and the Grenadines</option>
                                                        <option value="WS">Samoa</option>
                                                        <option value="SM">San Marino</option>
                                                        <option value="ST">Sao Tome and Principe</option>
                                                        <option value="SA">Saudi Arabia</option>
                                                        <option value="SN">Senegal</option>
                                                        <option value="RS">Serbia</option>
                                                        <option value="SC">Seychelles</option>
                                                        <option value="SL">Sierra Leone</option>
                                                        <option value="SG">Singapore</option>
                                                        <option value="SX">Sint Maarten (Dutch part)</option>
                                                        <option value="SK">Slovakia</option>
                                                        <option value="SI">Slovenia</option>
                                                        <option value="SB">Solomon Islands</option>
                                                        <option value="SO">Somalia</option>
                                                        <option value="ZA">South Africa</option>
                                                        <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                        <option value="SS">South Sudan</option>
                                                        <option value="ES">Spain</option>
                                                        <option value="LK">Sri Lanka</option>
                                                        <option value="SD">Sudan</option>
                                                        <option value="SR">Suriname</option>
                                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                                        <option value="SZ">Swaziland</option>
                                                        <option value="SE">Sweden</option>
                                                        <option value="CH">Switzerland</option>
                                                        <option value="SY">Syrian Arab Republic</option>
                                                        <option value="TW">Taiwan, Province of China</option>
                                                        <option value="TJ">Tajikistan</option>
                                                        <option value="TZ">Tanzania, United Republic of</option>
                                                        <option value="TH">Thailand</option>
                                                        <option value="TL">Timor-Leste</option>
                                                        <option value="TG">Togo</option>
                                                        <option value="TK">Tokelau</option>
                                                        <option value="TO">Tonga</option>
                                                        <option value="TT">Trinidad and Tobago</option>
                                                        <option value="TN">Tunisia</option>
                                                        <option value="TR">Turkey</option>
                                                        <option value="TM">Turkmenistan</option>
                                                        <option value="TC">Turks and Caicos Islands</option>
                                                        <option value="TV">Tuvalu</option>
                                                        <option value="UG">Uganda</option>
                                                        <option value="UA">Ukraine</option>
                                                        <option value="AE">United Arab Emirates</option>
                                                        <option value="GB">United Kingdom</option>
                                                        <option value="US">United States</option>
                                                        <option value="UM">United States Minor Outlying Islands</option>
                                                        <option value="UY">Uruguay</option>
                                                        <option value="UZ">Uzbekistan</option>
                                                        <option value="VU">Vanuatu</option>
                                                        <option value="VE">Venezuela, Bolivarian Republic of</option>
                                                        <option value="VN">Viet Nam</option>
                                                        <option value="VG">Virgin Islands, British</option>
                                                        <option value="VI">Virgin Islands, U.S.</option>
                                                        <option value="WF">Wallis and Futuna</option>
                                                        <option value="EH">Western Sahara</option>
                                                        <option value="YE">Yemen</option>
                                                        <option value="ZM">Zambia</option>
                                                        <option value="ZW">Zimbabwe</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label className="qwe11">Address</label>
                                                {/* <textarea name="address"
                                                    value={profile.address1}
                                                    onChange={setProfile("address1")}
                                                    cols={20} rows={5}></textarea> */}
                                                <input name="city" type="text" value={profile.address1}
                                                    autoComplete="street-address"
                                                    onChange={setProfile("address1")} />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>Description</label>

                                                {user?.role_id == 1 ? (
                                                    <textarea name="desc"
                                                        value={profile.description}
                                                        onChange={setProfile("description")}
                                                        autoComplete="description"
                                                        cols={20} rows={5}></textarea>
                                                ) : (
                                                    <textarea name="desc"
                                                        value={profile.service_desc}
                                                        onChange={setProfile("service_desc")}
                                                        autoComplete="description"
                                                        cols={20} rows={5}></textarea>
                                                )}

                                            </div>

                                        </div>





                                        <div className="row">
                                            <div className="col-sm-6">
                                                <label>Mobile Number</label>
                                                <input disabled name="mobile_number" autoComplete="tel" type="text" value={user?.mobile_number}
                                                />
                                            </div>


                                            {user?.role_id == 2 ? (

                                                <div className="col-sm-6">



                                                    <div className="from_feild cont11">
                                                        <label>Categories</label>
                                                        <div className="select_div">
                                                            <Multiselect
                                                                options={category}
                                                                selectedValues={selectedcategory}
                                                                onSelect={handleCategorychange}
                                                                onRemove={onRemove}
                                                                displayValue="label"
                                                                placeholder="Select Category"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (<></>)}

                                        </div>


                                        {/* <div className="row">
                                            

                                        </div> */}



                                        <div className="row">
                                            <div className="col-sm-12">
                                                <label>Profile Picture (Formats jpeg, jpg, png)</label>
                                                <div className="upload-btn-wrapper">
                                                    <button className="btn">
                                                        <i className="fa fa-upload"></i> Add your logo, a picture </button>

                                                    <input
                                                        type='file'
                                                        name='myfile'
                                                        id='fileAttach'
                                                        onChange={handle_file_change}
                                                        ref={fileInputRef}
                                                    />


                                                </div>

                                                {pr < 101 ? (
                                                    <ProgressBar now={pr} label={`${pr}%`} />
                                                ) : (<></>)}



                                                {file && pr > 100 ? (

                                                    <div className="upload_t">
                                                        <p><i className="fa fa-check"></i><span className="none"></span>{file?.name}<a className="delete_icon" onClick={() => delete_files(file[0])}><i className="fa fa-trash-o"></i></a></p>
                                                    </div>

                                                ) : (<></>)}

                                                <br />
                                            </div>




                                        </div>

                                        <div className="row">

                                            <div className="col-sm-6">



                                                {profile?.prof_pic && (

                                                    <figure className="ygs">
                                                        <img src={
                                                            common.get_profile_picture(profile?.prof_pic) ||
                                                            "/img/no-images.png"
                                                        } />
                                                        <a style={{ cursor: "pointer" }} onClick={() => { delete_profile_pic(profile?.prof_pic) }}>
                                                            <i className="fa fa-trash-o"></i>
                                                        </a>
                                                    </figure>
                                                )}




                                            </div>
                                        </div>
                                        <div className="reg-bottom">
                                            <button type='submit' name='submit'>
                                                Save
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div >
            </section >


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
                        <button type='submit' name='submit' onClick={() => { setOpen(false); handle_delete_profile_pic() }}>
                            Yes
                        </button>

                        <button type='submit' name='submit' onClick={() => setOpen(false)}>
                            Back <img src="../../img/arrow.png" width="11px" alt="" />
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
        </>
    );
};

export default EditProfile;
