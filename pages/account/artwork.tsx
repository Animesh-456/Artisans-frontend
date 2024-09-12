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
// import Select from 'react-select';
import Multiselect from 'multiselect-react-dropdown';
import env from "../../src/config/api";
import Head from "next/head";





export const getStaticProps = async () => {
    try {
        const params: any = {
            id: 34,
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


const Artwork = (prp) => {
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null);
    const videofileInputRef = useRef<HTMLInputElement>(null);
    const videofileInputRef2 = useRef<HTMLInputElement>(null);

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
    const [videoFile, setvideoFile] = useState([]);
    const [modalfile, setmodalFile]: any = useState([]); // images from db for modal for edit art work
    const [modalvideofile, setmodalvideoFile]: any = useState([]);
    const [extraModalFile, setExtraModalFile] = useState([]); //images from local machine for edit art work

    const [extraModalVideoFile, setExtraModalvideoFile] = useState([]); //videos from local machine for edit art work

    const setproject = common.ChangeState(projectstate);
    const [open_machinist, setOpen_machinist] = useAtom(atom.modal.art_delete);
    const [selected_machinist, setselected_machinist] = useState(null);
    const [selectedArtId, setSelectedArtId] = useState(null); // New state to keep track of selected art ID
    const [categories, setcategories] = useState([]); // To set multiple categories
    const [displayOptions, setDisplayOptions] = useState([]);


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

            if (file.size / (1024 * 1024) > 5) {
                toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 5 MB`);
                continue;
            }

            setFile((p) => [...p, file]);

        }

    };


    const handle_file_change_other: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);

            if (extension.toLowerCase() !== "mp4") {
                toast.error(`File extension .${extension} is not allowed`);
                continue;
            }

            if (file.size / (1024 * 1024) > 5) {
                toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 5 MB`);
                continue;
            }

            setvideoFile((p) => [...p, file]);
        }

    };


    const handle_file_change_modal: any = (e: React.MouseEvent<HTMLInputElement>) => {
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

            setExtraModalFile((p) => [...p, file]);

        }

    };



    const handle_video_file_change_modal: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);

            if (extension.toLowerCase() !== "mp4") {
                toast.error(`File extension .${extension} is not allowed`);
                continue;
            }

            if (file.size / (1024 * 1024) > 5) {
                toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
                continue;
            }

            setExtraModalvideoFile((p) => [...p, file]);

        }

    };



    useEffect(() => {
        const id = user?.id

        api.project.get_art({ params: { id: id } })
        api.project.get_category_subcategory({})

    }, [router.isReady]);


    const handleSubmit = async () => {

        const form = new FormData();

        for (const key of Object.keys(file)) {
            form.append("file", file[key]);
        }


        if (videoFile?.length > 0) {

            for (const key of Object.keys(videoFile)) {
                form.append("videofile", videoFile[key]);
            }
        }

        const obj = {
            title: project?.title,
            description: project?.description,
            category: categories?.map(item => item.id)?.join(','),
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

    function delete_video_files(fileIndex) {
        const newFiles = [...videoFile];
        newFiles.splice(fileIndex, 1);
        setvideoFile(newFiles);
        if (videofileInputRef.current) {
            videofileInputRef.current.value = '';
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





    function delete_video_modal_files(fileIndex) {
        const newFiles = [...modalvideofile];
        newFiles.splice(fileIndex, 1);
        setmodalvideoFile(newFiles);
        if (videofileInputRef.current) {
            videofileInputRef.current.value = '';
        }
    }

    function delete_video_modal_files_extra(fileIndex) {
        const newFiles = [...extraModalVideoFile];
        newFiles.splice(fileIndex, 1);
        setExtraModalvideoFile(newFiles);
        if (videofileInputRef2.current) {
            videofileInputRef2.current.value = '';
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
        const option = art?.categories?.split(',').map(id => parseInt(id, 10));
        const optionsArray = category?.filter(item => option.includes(item?.id))
        setDisplayOptions(optionsArray);
        setFormData({
            title: art.title,
            description: art.description,
            category: '',
            id: art.id,
        });
        setmodalFile(art?.attachment1.split(','))

        if (art?.attachment2) {
            setmodalvideoFile(art?.attachment2.split(','))
        }
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


        if (extraModalVideoFile?.length > 0) {

            for (const key of Object.keys(extraModalVideoFile)) {
                form.append("videofile", extraModalVideoFile[key]);
            }
        }




        const obj = {
            id: formData?.id,
            title: formData?.title,
            category: displayOptions.map(option => option.id).join(','),
            description: formData?.description,
            existingFiles: modalfile?.join(','),
            existingvideoFiles: modalvideofile?.join(','),
        }



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



        } catch (error) {
            toast.error(error.message);
            return;
        }
    };

    const handleCategorychange = (event) => {
        setcategories(event)
    };

    const onRemove = (selectedList) => {
        setcategories(selectedList)
    };



    const Category_subcategory: any = useAtomValue(atom.project.api.get_category_subcategory)

    const category = [];

    Category_subcategory?.categories?.map((sub) => {
        category.push({ id: sub?.id, value: sub?.category_name, label: sub?.category_name })
    })


    const handleDisplayChange = (options) => {
        setDisplayOptions(options);
    };


    const onRemovesecond = (selectedList) => {
        setDisplayOptions(selectedList)
    };









    return (
        <>
            <Head>
                <title>{`${prp?.prp?.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
            </Head>

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
                                                        <textarea
                                                            required
                                                            rows={6}
                                                            cols={50}
                                                            typeof="text"
                                                            placeholder="description"
                                                            value={project?.description}
                                                            onChange={setproject("description")}
                                                        />
                                                    </div>

                                                    <div className="from_feild">
                                                        {/* <Select isMulti required value={categories} options={options}
                                                            onChange={handleCategorychange}>

                                                        </Select> */}
                                                        <label>Category: <span>*</span></label>

                                                        <Multiselect
                                                            options={category}
                                                            selectedValues={categories}
                                                            onSelect={handleCategorychange}
                                                            onRemove={onRemove}
                                                            displayValue="label"
                                                            placeholder="Select Category"
                                                        />
                                                    </div>

                                                    <div className="from_feild">
                                                        <label>Upload image: <span>*</span></label>
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



                                                    <div className="from_feild">
                                                        <label>Upload video: <span></span></label>
                                                        <div className="upload-btn-wrapper">
                                                            <button className="btn">Upload <i className="fa fa-upload"></i></button>
                                                            <input required type="file" name="myfile" multiple
                                                                onChange={handle_file_change_other}
                                                                ref={videofileInputRef}
                                                            />
                                                        </div>
                                                        <small>Video size limit 5MB</small>
                                                    </div>



                                                    {videoFile?.length ? videoFile?.map((f, index) => {
                                                        return (
                                                            <>
                                                                <div className="upload_t">

                                                                    <p><i className="fa fa-check"></i>{f?.name}<i className="fa fa-trash-o" style={{ cursor: "pointer" }} onClick={() => delete_video_files(index)}></i></p>
                                                                </div>
                                                            </>
                                                        )
                                                    }) : (<></>)}


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
                                                        <textarea rows={6}
                                                            cols={50} typeof="text" name="description" value={formData?.description} onChange={(e) => handleChange(e)} placeholder="Type here" />
                                                    </div>
                                                    <div className="from_feild">
                                                        {/* <Select isMulti required value={displayOptions} options={options} onChange={handleDisplayChange}
                                                        >

                                                        </Select> */}

                                                        <label>Categories: <span>*</span></label>

                                                        <Multiselect

                                                            options={category}
                                                            selectedValues={displayOptions}
                                                            onSelect={handleDisplayChange}
                                                            onRemove={onRemovesecond}
                                                            displayValue="label"
                                                            placeholder="Select Category"
                                                        />

                                                    </div>
                                                    <div className="from_feild">
                                                        <label>Upload image: <span>*</span></label>
                                                        <div className="upload-btn-wrapper">
                                                            <button className="btn">Upload <i className="fa fa-upload"></i></button>
                                                            <input type="file" name="myfile" onChange={handle_file_change_modal} multiple />
                                                        </div>
                                                        {/* <div className="manage_p">
                                                            <small>Video size limit 50MB</small>
                                                        </div> */}
                                                    </div>

                                                    <div className="gallery_p1">


                                                        {modalfile?.length ? modalfile?.map((f, index) => { //images from db edit art
                                                            return (
                                                                <>
                                                                    <div className="manage_p2">

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

                                                                        <img src={URL.createObjectURL(f)} />
                                                                        <i className="fa fa-times-circle" style={{ cursor: "pointer" }} onClick={() => delete_extra_modal_files(index)}></i>
                                                                    </div>
                                                                </>
                                                            )
                                                        }) : (<></>)}



                                                    </div>

                                                    <div className="from_feild">
                                                        <label>Upload image/video: </label>
                                                        <div className="upload-btn-wrapper">
                                                            <button className="btn">Upload <i className="fa fa-upload"></i></button>
                                                            <input type="file" ref={videofileInputRef2} name="myfile" onChange={handle_video_file_change_modal} multiple />
                                                        </div>
                                                        <div className="manage_p">
                                                            <small>Video size limit 5MB</small>
                                                        </div>
                                                    </div>

                                                    <div className="gallery_p1">


                                                        {modalvideofile?.length > 0 ? modalvideofile?.map((f, index) => { //videos from db edit art
                                                            return (
                                                                <>
                                                                    <div className="upload_t">
                                                                        <p><i className="fa fa-check"></i>  <a rel="noreferrer" target={"_blank"} href={common.get_portfolio_pic(f)}>{f}</a> <i className="fa fa-trash-o" style={{ cursor: "pointer" }} onClick={() => delete_video_modal_files(index)}></i></p>
                                                                    </div>
                                                                </>
                                                            )
                                                        }) : (<></>)}


                                                        {extraModalVideoFile?.length ? extraModalVideoFile?.map((f, index) => { //videos from local edit art
                                                            return (
                                                                <>
                                                                    <div className="upload_t">
                                                                        <p><i className="fa fa-check"></i>  {f?.name} <i className="fa fa-trash-o" style={{ cursor: "pointer" }} onClick={() => delete_video_modal_files_extra(index)}></i></p>
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
