import Link from "next/link";
import { CSSProperties } from 'react';
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import toast from 'react-hot-toast';
import React, { useState } from 'react';
const Artwork = () => {
    const [formFields, setFormFields] = useState([[]]);

    // Function to handle adding new sets of input boxes
    const handleAddForm = () => {
        setFormFields([...formFields, []]);
    };

    // Function to handle change in input values
    const handleChange = (index, subIndex, event) => {
        const values = [...formFields];
        values[index][subIndex] = event.target.value;
        setFormFields(values);
    };


    const handleFilechange = (index, files) => {
        const values: any = [...formFields];
        values[index].files = files;
        setFormFields(values);
    }

    // Function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Flatten the formFields array
        toast.success("Called")
    };

    console.log("Form feilds are", formFields)

    const handleDeleteForm = (index) => {
        const values = [...formFields];
        values.splice(index, 1);
        setFormFields(values);
    }



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
                                    <p>Add Art workto your portfolio! Uploading artwork to Artstudio as a portfolio involves showcasing your work in an organized and visually appealing manner.</p>
                                    <a href="#" className="tgs">Go to your portfolio <img src="../img/arrow.png" alt="" /></a>
                                    <a className="tgs1" style={{ cursor: "pointer", color: "#fff" }} onClick={handleAddForm}>Add Artwork</a>



                                    <form onSubmit={handleSubmit}>
                                        {formFields.map((set, index) => (
                                            <div key={index}>
                                                <div className="from_feild">
                                                    <label>Title: <span>*</span></label>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={formFields[index]['field1'] || ''}
                                                        onChange={(e) => handleChange(index, 'field1', e)}
                                                    />
                                                </div>

                                                <div className="from_feild">
                                                    <label>Description: <span>*</span></label>
                                                    <input
                                                        required
                                                        type="text"
                                                        value={formFields[index]['field2'] || ''}
                                                        onChange={(e) => handleChange(index, 'field2', e)}
                                                    />
                                                </div>

                                                <div className="from_feild">

                                                    <select required value={formFields[index]['field3'] || ''}
                                                        onChange={(e) => handleChange(index, 'field3', e)}>
                                                        <option >Select Category</option>
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
                                                        <option>JGraffiti and Street Art</option>
                                                        <option>Installation Art</option>
                                                    </select>
                                                </div>
                                                {/* <label>
                                                    Field 4:
                                                    <input
                                                        type="text"
                                                        value={formFields[index]['field4'] || ''}
                                                        onChange={(e) => handleChange(index, 'field4', e)}
                                                    />
                                                </label> */}
                                                <div className="from_feild">
                                                    <label>Upload image/video: <span>*</span></label>
                                                    <div className="upload-btn-wrapper">
                                                        <button className="btn">Upload <i className="fa fa-upload"></i></button>
                                                        <input required type="file" name="myfile" multiple
                                                            onChange={(e) => handleFilechange(index, e.target.files)}
                                                        />
                                                    </div>
                                                    <small>Video size limit 50MB</small>
                                                </div>

                                                {/* <button type="button" onClick={() => handleDeleteForm(index)}>Delete</button> */}

                                                <div className="submit_cancel">
                                                    <a style={{ cursor: "pointer" }} onClick={() => handleDeleteForm(index)}>Delete</a>
                                                </div>
                                            </div>
                                        ))}

                                    </form>
                                    {formFields?.length ? (
                                        <button type="submit" className="tgs1" style={{ cursor: "pointer", color: "#fff" }} onClick={() => handleSubmit}>Submit</button>
                                    ) : (<></>)}
                                    <hr />
                                    <div className="manage_p1">
                                        <div className="manage_p2">
                                            <p>Wall Pinting</p>
                                            <img src="../img/pic15.jpg" alt="" />
                                            <i className="fa fa-times-circle"></i>
                                        </div>
                                        <div className="manage_p2">
                                            <p>Wall Pinting</p>
                                            <img src="../img/pic16.jpg" alt="" />
                                            <i className="fa fa-times-circle"></i>
                                        </div>
                                        <div className="manage_p2">
                                            <p>Wall Pinting</p>
                                            <img src="../img/pic17.jpg" alt="" />
                                            <i className="fa fa-times-circle"></i>
                                        </div>
                                        <div className="manage_p2">
                                            <p>Wall Pinting</p>
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
    )
}

Artwork.ignorePath = true

export default Artwork;