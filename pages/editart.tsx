import { useAtom, useAtomValue } from "jotai";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-hot-toast";
import api from "../src/api/services/api";
import common from "../src/helpers/common";
import atom from "../src/jotai/atom";
import schema from "../src/validation/schema/schema";
import { Validate } from "../src/validation/utils/test";
import GlobalModal from "../src/views/Common/Modals/GlobalModal";
import path from "path";
import { ProgressBar } from "react-bootstrap";
import { Document, Page, pdfjs } from 'react-pdf';
import Head from "next/head";
import env from "../src/config/api";
import Spinner from 'react-bootstrap/Spinner';
import Multiselect from "multiselect-react-dropdown";
import { compressImage } from "../src/helpers/compressFile";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
type Props = {};

const Post = () => {
    const router = useRouter();

    const fileInputRef = useRef<HTMLInputElement>(null);


    useEffect(() => {
        api.auth.delivery_contacts({ params: { id: router?.query?.id } })
    }, [])


    const deliveryData = useAtomValue(atom.auth.api.delivery_contacts);


    const [project, projectstate] = useState({
        id: router.query?.id,
        project_name: router.query?.project_name,
        description: router.query?.description,
        name: deliveryData?.name || "",
        address: deliveryData?.address || "",
        zip: deliveryData?.postalcode || "",
        city: deliveryData?.city || ""
    });

    const [existingfiles, setexistingFiles] = useState(router.query?.attachment_name)

    const [projectcheck, projectcheckstate] = useState({
        post_for: "4",
    })

    const setprojectcheck = common.ChangeState(projectcheckstate);

    const setproject = common.ChangeState(projectstate);

    const [file, setFile] = useState([]);
    const [otherFile, setFileOther] = useState([]);

    const [open, setOpen] = useAtom(atom.modal.confirm_project);

    const [storedProject, setStoredProject] = useAtom(atom.storage.project);
    const user = useAtomValue(atom.storage.user);
    const [progress, setprogress] = useState(0);
    const [progressOth, setprogressOth] = useState(0);
    const [fileAttach, setAttach] = useState(false);
    const [fileAttachOth, setAttachOth] = useState(false);

    const [numPages, setNumPages] = useState(null);
    const [filename, setFilename] = useState("");
    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (project.project_name.includes('/')) {
            return toast.error("The '/' character is not allowed in the art title.");
        }

        project["category"] = multiselectedCategory?.map(item => item.id)?.join(',');

        project["existingFiles"] = existingfiles
        // project["sub_category"] = selectedSubCategory?.map(item => item.id)?.join(',');


        //let data = Validate([], schema.project.add, project);


        // art details validation

        if (!existingfiles && !file) return toast.error("Please select a file")

        if (project?.name == "") return toast.error("art title is required");
        if (project?.description == "") return toast.error("art desciption is required");
        if (project?.city == "") return toast.error("city is required");
        if (project?.zip == "") return toast.error("postal code is required");
        if (project?.address == "") return toast.error("address code is required");
        if (project?.name == "") return toast.error("name code is required");


        setOpen(true);
    };


    const [isSubmitting, setIsSubmitting] = useState(false);

    const processSubmit = async () => {
        if (isSubmitting) return; // Prevent multiple clicks
        setIsSubmitting(true); // Disable the button when the process starts
        //if (!file.length) return toast.error("Please select a file");

        if (file?.length > 10) {
            toast.error("Maximum 10 files can be uploaded")
            setIsSubmitting(false); // Re-enable the button
            return;
        }


        if (!existingfiles && !file?.length) return toast.error("Please select a file")

        let form = new FormData();
        for (const key of Object.keys(file)) {
            // form.append("file", file[key]);
            const compressedFile = await compressImage(file[key]); // Compress the file
            form.append("file", compressedFile); // Append compressed file to FormData

        }






        for (const key of Object.keys(project)) {
            form.append(key, project[key]);
        }


        api.project.update_art({ body: project, file: form }, (d) => {
            for (const key of Object.keys(project)) {
                setproject(key, "");
            }
            setFile([]);
            setOpen(false);

            router.replace(`/${String(router?.query?.project_name)?.split(" ").join("-")}-${router?.query?.id}`)
        });
        setIsSubmitting(false); // Re-enable the button
    };
    const [fileData, setFileData] = useState(null);
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

            if (file.size / (1000 * 1000) > 20) {
                toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1000 * 1000)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 20.00 MB`);
                continue;
            }
            setpr(0)
            setLoading(true);
            // Simulating file loading or processing
            setTimeout(() => {
                setLoading(false);
                // Your file processing logic goes here
            }, 4000); // Simulating 2 seconds of file processing time
            setFile((p) => [...p, file]);



        }


        const file = e.currentTarget.files?.[0];
        const reader = new FileReader();
        setFilename(file.name)


        reader.onloadend = () => {
            const fileData = reader.result as string;
            setNumPages(null); // Reset the number of pages when a new file is selected
            setFileData(fileData);
        };

        reader.readAsDataURL(file as Blob);





        // if (files.length) {
        // 	setpr(0)
        // }

    };







    const [pr, setpr] = useState(110)
    const [pr2, setpr2] = useState(110)

    useEffect(() => {
        if (pr < 102) {
            setTimeout(() => setpr(prev => prev += 2), 50)
        }

    }, [pr]);



    function delete_files(fileIndex) {
        //setFile(file.filter(function (s) { return s !== e }))

        const newFiles = [...file];
        newFiles.splice(fileIndex, 1);
        setFile(newFiles);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }

    useEffect(() => {
        setFile(file)
    }, [file])



    ////////////////////////////////For second loader /////////////////////////


    useEffect(() => {
        if (pr2 < 102) {
            setTimeout(() => setpr2(prev => prev += 2), 50)
        }

    }, [pr2]);




    useEffect(() => {
        setFileOther(otherFile)
    }, [otherFile])


    const handlecancel = () => {
        router.replace(`/${String(router?.query?.project_name)?.split(" ").join("-")}-${router?.query?.id}`)
    }





    const [loading, setLoading] = useState(false);


    const Category_subcategory: any = useAtomValue(atom.project.api.get_category_subcategory)

    const categories = Category_subcategory?.categories;
    const subCategories = [];

    Category_subcategory?.subCategories?.map((sub) => {
        subCategories.push({ id: sub?.id, parent_id: sub?.parent_id, value: sub?.category_name, label: sub?.category_name })
    })


    const [selectedCategory, setSelectedCategory]: any = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState([]);
    const [multiselectedCategory, setmultiselectedCategory] = useState([]);
    const category = [];
    Category_subcategory?.categories?.map((sub) => {
        category.push({ id: sub?.id, value: sub?.category_name, label: sub?.category_name })
    })

    const handleCategoryChange = (event) => {
        const categoryId = parseInt(event.target.value, 10);
        console.log(event.target.value)
        setSelectedCategory(categoryId);
        if (!event.target.value) return // To keep the previous subcategories and update the category
        const filteredArray = subCategories?.filter(item => item?.parent_id == categoryId)
        setSelectedSubCategory(filteredArray);
    };


    //Handle subcategory state

    const handlemultiCategoryChange = (options) => {
        setmultiselectedCategory(options);
        //setSelectedSubCategory('');
    };

    const handleDisplayChange = (options) => {
        setSelectedSubCategory(options);
    };

    const onRemove = (selectedList) => {
        setmultiselectedCategory(selectedList)
    };

    const onRemovesecond = (selectedList) => {
        setSelectedSubCategory(selectedList)
    };

    useEffect(() => {
        const option = String(router.query?.category)?.split(',').map(id => parseInt(id, 10));
        const optionsArray = category?.filter(item => option.includes(item?.id))
        setmultiselectedCategory(optionsArray);
    }, [])




    const deleteexistingfiles = (f) => {
        const result = String(existingfiles)?.split(',').filter(element => element.trim() !== f);
        setexistingFiles(result)
    }



    return (
        <>



            <section className="discover_wp" >
                <div className="container">
                    <div className="row">
                        <div className="heading_title latest_request_heading">
                            <h1>Edit Your Art</h1>
                        </div>
                        <div className="describe_wp">
                            <form>



                                <div className="from_feild">
                                    <label>Title of Project: <span>*</span></label>
                                    <input type="text" name="text" placeholder="Type here..." autoComplete={"off"} value={project.project_name} onChange={setproject("project_name")} />
                                </div>
                                <div className="from_feild">
                                    <label>Description: <span>*</span></label>
                                    <textarea placeholder="Description" rows={8} cols={50} autoComplete={"off"} value={project.description} onChange={setproject("description")}></textarea>
                                </div>

                                <div className="from_feild">
                                    <label htmlFor="category">Category(s): <span>*</span>
                                    </label>

                                    <div className="select_div1">

                                        <Multiselect
                                            showCheckbox
                                            options={category}
                                            selectedValues={multiselectedCategory}
                                            onSelect={handlemultiCategoryChange}
                                            onRemove={onRemove}
                                            displayValue="label"
                                            placeholder="Select Category"
                                        />
                                    </div>


                                </div>


                                <div className="from_feild">
                                    <label>Attach Your Files Here: <span>*</span></label>
                                    <div className="upload-btn-wrapper">
                                        <button className="btn">Image files <i className="fa fa-upload"></i></button>
                                        <input type="file" name="myfile" onChange={handle_file_change} multiple={true} ref={fileInputRef} /></div>
                                </div>


                                <div className="upload_t file101">
                                    {existingfiles != '' && String(existingfiles)?.split(',').map((f) => {
                                        return (
                                            <>
                                                <p><i className="fa fa-check"></i> {f}  <i className="fa fa-trash-o" style={{ cursor: "pointer" }} onClick={() => deleteexistingfiles(f)}></i></p>
                                            </>
                                        )
                                    })}
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


                                <div className="b-li">
                                    <ul>
                                        <li> Max file size: 10 MB </li>
                                    </ul>
                                </div>



                                <hr />

                                <h5>Shipping Details</h5>



                                <div className="from_feild">
                                    <label>Name<span>*</span></label>
                                    <input type="text" name="text" placeholder="Type here..." autoComplete="name" value={project.name} onChange={setproject("name")} />
                                </div>

                                <div className="from_feild">
                                    <label>Delivery Address<span>*</span></label>
                                    <input type="text" name="text" placeholder="Type here..." autoComplete="street-address" value={project.address} onChange={setproject("address")} />
                                </div>

                                <div className="from_feild">
                                    <label>Postal Code<span>*</span></label>
                                    <input
                                        name='zcode'
                                        type='text'
                                        autoComplete="postal-code"
                                        value={project.zip}
                                        onChange={setproject("zip")}
                                        placeholder="Postal code"
                                    />
                                </div>

                                <div className="from_feild">
                                    <label>City<span>*</span></label>
                                    <input
                                        name='city'
                                        type='text'
                                        autoComplete="address-level2"
                                        value={project.city}
                                        onChange={setproject("city")}
                                        placeholder="City"
                                    />
                                </div>

                            </form>



                            <div className="submit_cancel">
                                <button className="but111" type="submit" name="submit" onClick={handleSubmit}> Check & Submit </button>
                                <button type="submit" name="submit" style={{
                                    borderRadius: "6px", fontFamily: "Poppins", padding: "6px 22px", transition: "box-shadow 1s", marginLeft: "15px", background: "none", color: "#080424", fontWeight: "500"
                                }} onClick={handlecancel}>Cancel <img src={"../img/arrow.png"} width="11px" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>

                </div >

                <GlobalModal
                    title='Confirm your Post'
                    atom={atom.modal.confirm_project}>

                    <div className="modal-body modal_design">
                        <figure>
                            {file?.length ? file[0]?.type?.includes("pdf") ? (
                                <div className="pdf-container"><Document
                                    file={file[0]}
                                    onLoadSuccess={onDocumentLoadSuccess}
                                >
                                    <Page pageNumber={1} width={200} />
                                </Document> </div>
                            ) : (
                                <img src={file?.length ? URL.createObjectURL(file[0]) : ""} />
                            ) : (<></>)}
                        </figure>
                        <label>
                            <h5>Attachments:</h5>


                            {existingfiles != '' && String(existingfiles)?.split(',').map((f) => {
                                return (
                                    <>
                                        <ul>
                                            <li>
                                                <a rel="noreferrer" href={'/'} target={"_blank"}>
                                                    {f}
                                                </a>
                                            </li>
                                        </ul>
                                    </>
                                )
                            })}


                            <p>{file?.length ? (
                                file?.map((f, i) => {

                                    return (
                                        <>
                                            <ul>
                                                <li>
                                                    <a rel="noreferrer" href={URL.createObjectURL(f)} target={"_blank"}>
                                                        {path.parse(f?.name)?.name?.slice(0, 8)}
                                                        {path.extname(f?.name)}{" "}
                                                    </a>
                                                </li>
                                            </ul>
                                        </>
                                    );

                                })
                            ) : (
                                <></>
                            )}</p>
                        </label>
                        <label>
                            <h5>Title:</h5>
                            <p>{project.project_name}</p>
                        </label>
                        <label>
                            <h5>Category:</h5>
                            {/* <p>{categories?.find(item => item.id === selectedCategory)?.category_name}</p> */}
                            <p>{multiselectedCategory?.map((sub, index) => {
                                return (
                                    <p key={sub?.id}>{sub?.value}</p>
                                )
                            })}</p>
                        </label>


                        <label>
                            <h5>Comment:</h5>
                            <p>{project?.description}</p>
                        </label>



                        <div className="button_s ">
                            <a style={{ cursor: "pointer", color: "#080424" }} onClick={() => setOpen(false)}>Back <img className="image101" src={"../img/arrow.png"} width="11px" alt="" /></a>
                            <a style={{ cursor: isSubmitting ? "not-allowed" : "pointer", color: isSubmitting ? "#ccc" : "#fff", pointerEvents: isSubmitting ? "none" : "auto" }} onClick={ processSubmit}>
                                {isSubmitting ? 'Processing...' : 'Submit Request'}
                            </a>
                        </div>

                    </div>



                </GlobalModal>




            </section >


        </>
    );

}

// Post.ignorePath = true;

export default Post;