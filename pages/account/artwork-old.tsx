import Link from "next/link";
import { CSSProperties } from 'react';
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import toast from 'react-hot-toast';
import React, { useState, useEffect, useRef } from 'react';
import api from "../../src/api/services/api";
import atom from "../../src/jotai/atom";
import { useAtomValue, useAtom } from "jotai";
import axios from "axios";
import common from "../../src/helpers/common";
import { useRouter } from "next/router";
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";
import Select from 'react-select';

const Artwork = () => {
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null);

    const [project, projectstate] = useState({
        title: "",
        description: "",
        category: "",
    });
    const [show, setshow] = useState(false)
    const user = useAtomValue(atom.storage.user);
    const get_art = useAtomValue(atom.project.api.get_art)
    const [deleteprot, setdeleteprot] = useState("");
    const [file, setFile] = useState([]);
    const [modalfile, setmodalFile]: any = useState([]); // images from db for modal for edit art work
    const [extraModalFile, setExtraModalFile] = useState([]); //images from local machine for edit art work

    const setproject = common.ChangeState(projectstate);
    const [open_machinist, setOpen_machinist] = useAtom(atom.modal.art_delete);
    const [selected_machinist, setselected_machinist] = useState(null);
    const [selectedArtId, setSelectedArtId] = useState(null); // New state to keep track of selected art ID
    const [categories, setcategories] = useState([]); // To set multiple categories



    const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);

            if (file.size / (1024 * 1024) > 10) {
                toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
                continue;
            }

            setFile((p) => [...p, file]);

        }

    };


    const handle_file_change_modal: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);

            if (file.size / (1024 * 1024) > 10) {
                toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
                continue;
            }

            setExtraModalFile((p) => [...p, file]);

        }

    };

    useEffect(() => {
        const id = user?.id

        api.project.get_art({ params: { id: id } })

    }, [router.isReady]);


    const handleSubmit = async () => {

        const form = new FormData();

        for (const key of Object.keys(file)) {
            form.append("file", file[key]);
        }

        const obj = {
            title: project?.title,
            description: project?.description,
            category: categories.map(option => option.value).join(','),
        }


        for (const key of Object.keys(obj)) {
            form.append(key, obj[key]);
        }


        // Log FormData content for debugging


        try {
            const result = await api.project.add_art_work({
                params: {
                    user_id: user?.id
                },
                body: obj,
                file: form
            });

            window.location.reload()

        } catch (error) {
            toast.error(error.message);
            return;
        }
    };



    function delete_files(fileIndex) {
        const newFiles = [...file];
        newFiles.splice(fileIndex, 1);
        setFile(newFiles);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    function delete_modal_files(fileIndex) {
        const newFiles = [...modalfile];
        newFiles.splice(fileIndex, 1);
        setmodalFile(newFiles);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    function delete_extra_modal_files(fileIndex) {
        const newFiles = [...extraModalFile];
        newFiles.splice(fileIndex, 1);
        setExtraModalFile(newFiles);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    const handle_delete_art_image = () => {

        api.project.delete_art_image({
            params: { id: selectedArtId }
        }, (d) => {
            window.location.href = '/account/artwork'
        })

    }


    // Edit modal states and logic 

    const [isModalOpen, setIsModalOpen] = useAtom(atom.modal.edit_art_modal);
    const [selectedArt, setSelectedArt] = useState(null);
    const [formData, setFormData]: any = useState({
        id: '',
        title: '',
        description: '',
        category: '',
    });


    const openModal = (art) => {
        setSelectedArt(art);
        setFormData({
            title: art.title,
            description: art.description,
            category: art.categories,
            id: art.id,
        });
        setmodalFile(art?.attachment1.split(','))
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedArt(null);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleUpdate = async () => {


        if (modalfile == '' && extraModalFile?.length == 0) {
            return toast.error("Please upload files to continue!")
        }


        const form = new FormData();

        for (const key of Object.keys(extraModalFile)) {
            form.append("file", extraModalFile[key]);
        }

        const obj = {
            id: formData?.id,
            title: formData?.title,
            category: formData?.category,
            description: formData?.description,
            existingFiles: modalfile?.join(',')
        }

        console.log("form is", obj)

        for (const key of Object.keys(obj)) {
            form.append(key, obj[key]);
        }






        // Log FormData content for debugging


        try {
            const result = await api.project.edit_art_portfolio({
                params: {
                    id: formData?.id
                },
                body: obj,
                file: form
            });

            window.location.reload()

        } catch (error) {
            toast.error(error.message);
            return;
        }
    };

    const handleCategorychange = (event) => {
        setcategories(event)
    };

    const options = [
        { value: 'Painting', label: 'Painting' },
        { value: 'Sculpture', label: 'Sculpture' },
        { value: 'Printmaking', label: 'Printmaking' },
        { value: 'Photography', label: 'Photography' },
        { value: 'Textile Art', label: 'Textile Art' },
        { value: 'Ceramics', label: 'Ceramics' },
        { value: 'Glass Art', label: 'Glass Art' },
        { value: 'Digital Ar', label: 'Digital Art' },
        { value: 'Mixed Media', label: 'Mixed Media' },
        { value: 'Calligraphy', label: 'Calligraphy' },
        { value: 'Jewelry Design', label: 'Jewelry Design' },
        { value: 'Graffiti and Street Art', label: 'Graffiti and Street Art' },
        { value: 'Installation Art', label: 'Installation Art' },
    ];


    console.log("selectedValues", categories)


    return (
        <>
            <section className="inner_banner_wp" style={{ backgroundImage: "url(../img/inner-banner.jpg)" }}>
                <div className="container">
                    <h1>My Art work</h1>
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
                                    <h4>Manage portfolio design</h4>
                                    <p>Add Artwork to your portfolio! Uploading artwork to Artstudio as a portfolio involves showcasing your work in an organized and visually appealing manner.</p>
                                    <a href={`/account/artist-profile/${user?.id}`} style={{ color: "#262525" }} rel="noreferrer" target={"_blank"} className="tgs">Go to your portfolio <img src="../img/arrow.png" alt="" /></a>


                                    {!show && <a className="tgs1" style={{ cursor: "pointer", color: "#fff" }} onClick={() => setshow(!show)}>Add Artwork</a>}


                                    {show && (

                                        <>
                                            <br />
                                            <br />
                                            <form onSubmit={handleSubmit}>

                                                <div>
                                                    <div className="from_feild">
                                                        <label>Title: <span>*</span></label>
                                                        <input
                                                            required
                                                            type="text"
                                                            value={project?.title}
                                                            placeholder="title"
                                                            onChange={setproject("title")}
                                                        />
                                                    </div>

                                                    <div className="from_feild">
                                                        <label>Description: <span>*</span></label>
                                                        <input
                                                            required
                                                            type="text"
                                                            placeholder="description"
                                                            value={project?.description}
                                                            onChange={setproject("description")}
                                                        />
                                                    </div>

                                                    <div className="from_feild">
                                                        <Select isMulti required value={categories} options={options}
                                                            onChange={handleCategorychange}>
                                                            {/* <option value="">Select Category</option>
                                                            <option>Painting</option>
                                                            <option>Sculpture</option>
                                                            <option>Printmaking</option>
                                                            <option>Photography</option>
                                                            <option>Textile Art</option>
                                                            <option>Ceramics</option>
                                                            <option>Glass Art</option>
                                                            <option>Digital Art</option>
                                                            <option>Mixed Media</option>
                                                            <option>Calligraphy</option>
                                                            <option>Jewelry Design</option>
                                                            <option>Graffiti and Street Art</option>
                                                            <option>Installation Art</option> */}
                                                        </Select>
                                                    </div>

                                                    <div className="from_feild">
                                                        <label>Upload image/video: <span>*</span></label>
                                                        <div className="upload-btn-wrapper">
                                                            <button className="btn">Upload <i className="fa fa-upload"></i></button>
                                                            <input required type="file" name="myfile" multiple
                                                                onChange={handle_file_change}
                                                                ref={fileInputRef}
                                                            />
                                                        </div>
                                                        {/* <small>Video size limit 50MB</small> */}
                                                    </div>


                                                    <div className="manage_p1">

                                                        {file?.length ? file?.map((f, index) => {
                                                            return (
                                                                <>
                                                                    <div className="manage_p2">
                                                                        {/* <p>{f?.name}</p> */}
                                                                        <img src={URL.createObjectURL(f)} />
                                                                        <i className="fa fa-times-circle" style={{ cursor: "pointer" }} onClick={() => delete_files(index)}></i>
                                                                    </div>
                                                                </>
                                                            )
                                                        }) : (<></>)}
                                                    </div>

                                                </div>

                                            </form>
                                            <div className="submit_cancel">
                                                <a style={{ cursor: "pointer", color: "#fff" }} onClick={handleSubmit} >Submit</a>
                                                <a style={{ cursor: "pointer" }} onClick={() => setshow(!show)}>Cancel <img src="../../img/arrow.png" width="11px" alt="" /></a>
                                            </div>
                                        </>
                                    )}

                                    <hr />
                                    <div className="manage_p1">

                                        {get_art?.length
                                            ? (get_art?.map((l) => {


                                                return (
                                                    <>
                                                        <div className='manage_p2'>
                                                            <p>{l?.title}</p>
                                                            <img
                                                                src={common.get_portfolio_pic(l?.main_img)}

                                                                alt={`${l?.title}`}
                                                            />
                                                            <i className="fa fa-times" data-toggle="modal" data-target="#deleteart" style={{ cursor: "pointer" }} onClick={() => {
                                                                setSelectedArtId(l.id);
                                                                setOpen_machinist(true); // Open the modal
                                                            }}></i>


                                                            <i className="fa fa-pencil" data-toggle="modal" data-target="#myedit" style={{ cursor: "pointer" }} onClick={() => openModal(l)}></i>
                                                            {/* <a onClick={select_machinist(bid)} style={{ cursor: "pointer" }} data-toggle="modal" data-target="#selectoffer">Select  <img src={"../img/arrow.png"} width="11px" alt="" /></a> */}

                                                        </div>


                                                    </>
                                                );
                                            }))
                                            : ""}



                                    </div>
                                    <GlobalModal title='Delete art' atom={atom.modal.art_delete}>
                                        <div className='slct-machinist-modal'>

                                            <>

                                                <div className="modal-body">
                                                    <div className="css-ung">
                                                        <form>
                                                            <p>
                                                                Are you sure, you want to delete this art?
                                                            </p>

                                                            <div className="submit_cancel">

                                                                <a onClick={handle_delete_art_image} style={{ cursor: 'pointer', color: "#fff" }}>Confirm</a>
                                                                <a onClick={() => {
                                                                    setOpen_machinist(false)
                                                                    setselected_machinist(null)
                                                                }} style={{ cursor: "pointer" }}> Cancel <img src={"../img/arrow.png"} width="11px" alt="" /> </a>
                                                            </div>
                                                        </form>
                                                    </div>
                                                </div>
                                            </>

                                        </div>
                                    </GlobalModal>


                                    <GlobalModal title="Edit Artwork" atom={atom.modal.edit_art_modal}>
                                        <>

                                            <div className="modal-body">
                                                <form onSubmit={handleUpdate}>
                                                    <div className="from_feild">
                                                        <label>Title: <span>*</span></label>
                                                        <input type="text" name="title" value={formData?.title} onChange={(e) => handleChange(e)} placeholder="Email or Username" />
                                                    </div>
                                                    <div className="from_feild">
                                                        <label>Description: <span>*</span></label>
                                                        <input type="text" name="description" value={formData?.description} onChange={(e) => handleChange(e)} placeholder="Type here" />
                                                    </div>
                                                    <div className="from_feild">
                                                        <select
                                                            required
                                                            value={formData?.category || ''}
                                                            onChange={(e) => handleChange(e)}
                                                            name="category"

                                                        >
                                                            <option value="">Select Category</option>
                                                            <option value="Painting">Painting</option>
                                                            <option value="Sculpture">Sculpture</option>
                                                            <option value="Printmaking">Printmaking</option>
                                                            <option value="Photography">Photography</option>
                                                            <option value="Textile Art">Textile Art</option>
                                                            <option value="Ceramics">Ceramics</option>
                                                            <option value="Glass Art">Glass Art</option>
                                                            <option value="Digital Art">Digital Art</option>
                                                            <option value="Mixed Media">Mixed Media</option>
                                                            <option value="Calligraphy">Calligraphy</option>
                                                            <option value="Jewelry Design">Jewelry Design</option>
                                                            <option value="Graffiti and Street Art">Graffiti and Street Art</option>
                                                            <option value="Installation Art">Installation Art</option>
                                                        </select>

                                                    </div>
                                                    <div className="from_feild">
                                                        <label>Upload image/video: <span>*</span></label>
                                                        <div className="upload-btn-wrapper">
                                                            <button className="btn">Upload <i className="fa fa-upload"></i></button>
                                                            <input type="file" name="myfile" onChange={handle_file_change_modal} multiple />
                                                        </div>
                                                        <div className="manage_p">
                                                            <small>Video size limit 50MB</small>
                                                        </div>
                                                    </div>
                                                    <div className="gallery_p1">


                                                        {modalfile?.length ? modalfile?.map((f, index) => { //images from db edit art
                                                            return (
                                                                <>
                                                                    <div className="manage_p2">
                                                                        {/* <p>{f?.name}</p> */}
                                                                        <img src={common.get_portfolio_pic(f)} />
                                                                        <i className="fa fa-times-circle" style={{ cursor: "pointer" }} onClick={() => delete_modal_files(index)}></i>
                                                                    </div>
                                                                </>
                                                            )
                                                        }) : (<></>)}

                                                        {extraModalFile?.length ? extraModalFile?.map((f, index) => { //images from local edit art
                                                            return (
                                                                <>
                                                                    <div className="manage_p2">
                                                                        {/* <p>{f?.name}</p> */}
                                                                        <img src={URL.createObjectURL(f)} />
                                                                        <i className="fa fa-times-circle" style={{ cursor: "pointer" }} onClick={() => delete_extra_modal_files(index)}></i>
                                                                    </div>
                                                                </>
                                                            )
                                                        }) : (<></>)}



                                                    </div>
                                                    <br />
                                                    <br />
                                                    <div className="submit_cancel">
                                                        <a style={{ cursor: "pointer", color: "#fff" }} onClick={handleUpdate}>Update</a>
                                                        <a style={{ cursor: "pointer" }} onClick={closeModal}>Cancel <img src="img/arrow.png" width="11px" alt="" /></a>
                                                    </div>
                                                </form>

                                            </div>

                                        </>
                                    </GlobalModal>


                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

Artwork.ignorePath = true;

export default Artwork;