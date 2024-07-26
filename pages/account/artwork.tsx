import Link from "next/link";
import { CSSProperties } from 'react';
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import toast from 'react-hot-toast';
import React, { useState } from 'react';
import api from "../../src/api/services/api";
import atom from "../../src/jotai/atom";
import { useAtomValue } from "jotai";
import axios from "axios";
import common from "../../src/helpers/common";

const Artwork = () => {

    const [project, projectstate] = useState({
        title: "",
        description: "",
        category: "",
    });
    const user = useAtomValue(atom.storage.user);

    const [file, setFile] = useState([]);

    const setproject = common.ChangeState(projectstate);



    const handle_file_change: any = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault();
        const { files } = e.currentTarget;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const extension = file.name.lastIndexOf(".") === -1 ? "" : file.name.substr(file.name.lastIndexOf(".") + 1);

            if (file.size / (1024 * 1024) > 50) {
                toast.error(`${file.name} cannot be uploaded! \n File size (${(file.size / (1024 * 1024)).toFixed(2)} MB) is too large!. The maximum file size allowed is set to : 10.00 MB`);
                continue;
            }

            setFile((p) => [...p, file]);

        }

    };


    const handleSubmit = async () => {





        const form = new FormData();

        for (const key of Object.keys(file)) {
            form.append("file", file[key]);
        }


        for (const key of Object.keys(project)) {
            form.append(key, project[key]);
        }


        // Log FormData content for debugging


        try {
            const result = await api.project.add_art_work({
                params: {
                    user_id: user?.id
                },
                body: project,
                file: form
            });

           
            
            

        } catch (error) {
            toast.error(error.message);
            return;
        }
    };





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
                                    <a href="#" className="tgs">Go to your portfolio <img src="../img/arrow.png" alt="" /></a>
                                    <a className="tgs1" style={{ cursor: "pointer", color: "#fff" }} >Add Artwork</a>

                                    <form onSubmit={handleSubmit}>

                                        <div>
                                            <div className="from_feild">
                                                <label>Title: <span>*</span></label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={project?.title}
                                                    onChange={setproject("title")}
                                                />
                                            </div>

                                            <div className="from_feild">
                                                <label>Description: <span>*</span></label>
                                                <input
                                                    required
                                                    type="text"
                                                    value={project?.description}
                                                    onChange={setproject("description")}
                                                />
                                            </div>

                                            <div className="from_feild">
                                                <select required value={project?.category}
                                                    onChange={setproject("category")}>
                                                    <option>Select Category</option>
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
                                                    <option>Installation Art</option>
                                                </select>
                                            </div>

                                            <div className="from_feild">
                                                <label>Upload image/video: <span>*</span></label>
                                                <div className="upload-btn-wrapper">
                                                    <button className="btn">Upload <i className="fa fa-upload"></i></button>
                                                    <input required type="file" name="myfile" multiple
                                                        onChange={handle_file_change}
                                                    />
                                                </div>
                                                <small>Video size limit 50MB</small>
                                            </div>

                                            {/* <div className="submit_cancel">
                                            <a style={{ cursor: "pointer" }} onClick={() => handleDeleteForm(index)}>Delete</a>
                                        </div> */}
                                        </div>

                                    </form>

                                    <button type="submit" className="tgs1" style={{ cursor: "pointer", color: "#fff" }} onClick={handleSubmit}>Submit</button>

                                    <hr />
                                    <div className="manage_p1">
                                        {/* <div className="manage_p2">
                                            <p>Wall Painting</p>
                                            <video controls poster="images/thumbnail.webp">
                                                <source src={"http://localhost:4000/public/portfolios/art9CWED2ZL172621.mp4"} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                            </video>
                                        </div> */}
                                        <div className="manage_p2">
                                            <p>Wall Painting</p>
                                            <img src="../img/pic16.jpg" alt="" />
                                            <i className="fa fa-times-circle"></i>
                                        </div>
                                        <div className="manage_p2">
                                            <p>Wall Painting</p>
                                            <img src="../img/pic17.jpg" alt="" />
                                            <i className="fa fa-times-circle"></i>
                                        </div>
                                        <div className="manage_p2">
                                            <p>Wall Painting</p>
                                            <img src="../img/pic18.jpg" alt="" />
                                            <i className="fa fa-times-circle"></i>
                                        </div>
                                    </div>
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
