import React, { useEffect, useState } from "react";
import { useAtomValue, useAtom } from "jotai";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import atom from "../../src/jotai/atom";
import api from "../../src/api/services/api";
import { BalanceResponse } from "../../src/@types/type";
import { toast } from "react-hot-toast";
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";


const forgetpassword = () => {
    const [email1, setemail1] = useState(null);
    const [email2, setemail2] = useState(null);


    const handleprocess1 = (event) => {
        setemail1(event.target.value);
    }

    const handleprocess2 = (event) => {
        setemail2(event.target.value);
    }

    const handlesubmit1 = () => {
        console.log("Called!")
        if (email1 != null || email1 != "") {
            api.auth.generate_new_password({ params: {}, body: { "email": email1 } }, (d) => {
                if (d.status == true) {
                    toast.success("New password has been set and sent to your email!");
                    setemail1(null);
                }
            })
        } else {
            toast.error("Please provide a valid email!");
        }

    }

    const handlesubmit2 = () => {
        
        if (email2 != null || email2 != "") {
            api.auth.forgot_username({ params: {}, body: { "email": email2 } }, (d) => {
            if (d.status == true) {
                toast.success("Username has been sent to your email!");
                 setemail2(null);
            }
        })
            
        }else {
            toast.error("Please provide a valid email!");
        }
        
    }


    return (
        // <div>
        //     <div
        //         className='banner_wp sign_banner'
        //         style={{ backgroundImage: "url(/img/login_bg.jpg)" }}>
        //         <div className='container'>
        //             <div className='row'>
        //                 <div className='banner_text inner_banner_text'>
        //                     <h1 className='yh'>Forgot Login Details?</h1>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>





        //     <div className='container sign_wrapper'>
        //         <div className='row'>
        //             <div className='col-sm-2'></div>
        //             <div className='col-sm-8'>
        //                 <div className='register_c'>

        //                     {/* <form onSubmit={handlesubmit1}> */}
        //                     <h4>Forgotten password?</h4>
        //                     <div className='row'>
        //                         <div className='col-sm-4'>
        //                             <label>
        //                                 Enter your email address
        //                             </label>
        //                         </div>
        //                         <div className='col-sm-8'>
        //                             <input
        //                                 className='text'
        //                                 name='email'
        //                                 type='email'
        //                                 value={email1}
        //                                 //autoComplete={"off"}
        //                                 onChange={handleprocess1}
        //                             />
        //                         </div>

        //                         <div className="col-sm-8">


        //                             <button
        //                                 type='submit'
        //                                 name='submit'
        //                                 onClick={() => { handlesubmit1(); }}
        //                                 style={

        //                                     { width: "200px",  height: "45px",  border: "none", fontWeight: "600", boxShadow: "0 2px 5px rgba(0,0,0,.48)", background: "#dbbb40", color: "#fff",   letterSpacing: "1px"}

        //                                 }>
        //                                 Get a new password
        //                             </button>

        //                         </div>



        //                     </div>
        //                     {/* </form> */}
        //                     <hr />
        //                     {/* <form onSubmit={handlesubmit2}> */}
        //                     <h4>Forgot your username? </h4>
        //                     <div className='row'>
        //                         <div className='col-sm-4'>
        //                             <label>
        //                                 Enter your email address
        //                             </label>
        //                         </div>
        //                         <div className='col-sm-8'>
        //                             <input
        //                                 className='text'
        //                                 name='email'
        //                                 type='email'
        //                                 value={email2}
        //                                 //autoComplete={"off"}
        //                                 onChange={handleprocess2}
        //                             />
        //                         </div>

        //                         <div className="col-sm-8">


        //                             <button
        //                                 type='submit'
        //                                 name='submit'
        //                                 onClick={() => { handlesubmit2(); }}
        //                                 style={

        //                                    { width: "200px",  height: "45px",  border: "none", fontWeight: "600", boxShadow: "0 2px 5px rgba(0,0,0,.48)", background: "#dbbb40", color: "#fff",   letterSpacing: "1px"}

        //                                 }>
        //                                 Get your username
        //                             </button>

        //                         </div>
        //                     </div>


        //                     {/* </form> */}
        //                 </div>
        //             </div>
        //             <div className='col-sm-2'></div>
        //         </div>
        //     </div>


        // </div>
        <>
            <section className="inner_banner_wp"  style={{ backgroundImage: `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>Forgot Password</h1>
                </div>
            </section>


            <section className="myproject">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="offset-sm-2"></div>
                        <div className="col-sm-8 profile_box">
                            <div className="register_c">
                                <form>
                                    <h4>Forgotten Password?</h4>
                                    <div className="row from_feild">
                                        <div className="col-sm-4">
                                            <label>Enter your email address <span>*</span>
                                            </label>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="text m_b_none" name="email"  placeholder="Email Address" 
                                                                       type='email'
                                                                           value={email1}
                                                                         
                                       onChange={handleprocess1} />
                                        </div>
                                    </div>
                                    <div className="reg-bottom">
                                        <button type="submit" name="submit" onClick={() => { handlesubmit1(); }} 


                                       >Get a new password</button>
                                    </div>
                                    <br /><br />
                                    <h4>Forgot Your Username?</h4>
                                    <div className="row from_feild">
                                        <div className="col-sm-4">
                                            <label>Enter your email address <span>*</span>
                                            </label>
                                        </div>
                                        <div className="col-sm-8">
                                            <input className="text m_b_none" name="email" type="text" value={email2} placeholder="Email Address" onChange={handleprocess2} />
                                        </div>
                                    </div>
                                    <div className="reg-bottom">
                                        <button type="submit" name="submit" onClick={() => { handlesubmit2(); }} 
                                            
                                          


                                                                >
                                            Get your username</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}


forgetpassword.ignorePath = true;

export default forgetpassword
