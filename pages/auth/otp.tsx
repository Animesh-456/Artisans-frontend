import { useAtom, useAtomValue } from "jotai";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import api from "../../src/api/services/api";
import common from "../../src/helpers/common";
import atom from "../../src/jotai/atom";
import { Pick } from "../../src/validation/utils/test";
import IndexHeader from "../../src/views/index/IndexHeader";
import { writeAtom } from "jotai-nexus";
import { useRouter } from "next/router";
import Link from "next/link";
import env from "../../src/config/api";
import Head from "next/head";
import Script from 'next/script';
import { log } from "console";

const Otp = () => {


    const [visiblity, setvisibility] = useState(false);
    const [mobile, setmobile] = useState("");
    const [otp, setotp] = useState("");

    const [optsendbutton, setoptsendbutton] = useState(true)
    const [verifybutton, setverifybutton] = useState(true)


    const [timeLeft, setTimeLeft] = useState(60); // Countdown starting from 60 seconds
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    // useEffect to handle the countdown logic
    useEffect(() => {
        let timerId: NodeJS.Timeout | null = null;

        if (isTimerRunning && timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsTimerRunning(false); // Stop the timer when it reaches 0
        }

        // Cleanup function
        return () => {
            if (timerId) {
                clearInterval(timerId);
            }
        };
    }, [isTimerRunning, timeLeft]);

    const sendOtp = (e) => {
        e.preventDefault()
        

        if (mobile?.length == 0 || mobile?.length != 10) return toast.error("Mobile number should be 10 digits")
        //  Call api to send otp to mobile number
        setoptsendbutton(false)
        api.auth.send_mobileOtp(
            { params: {}, body: { phoneNumber: mobile } },
            (d) => {
                if (d?.status === true) {
                    setvisibility(true);
                    setIsTimerRunning(true);
                    setTimeLeft(60);
                }
            }
        );


    }


    const verifyOtp = async (e) => {
        e.preventDefault()
        setverifybutton(false)
        if (!mobile || !otp) return toast.error("Please provide mobile and OTP");
        await api.auth.verify_mobileOtp({ params: {}, body: { phoneNumber: mobile, code: otp } })
    }

    const resendOtp = () => {
        setotp("")

        if (mobile?.length == 0 || mobile?.length != 10) return toast.error("Mobile number should be 10 digits")
        //  Call api to send otp to mobile number
        api.auth.send_mobileOtp(
            { params: {}, body: { phoneNumber: mobile } },
            (d) => {
                if (d?.status === true) {
                    setvisibility(true);
                    setIsTimerRunning(true);
                    setTimeLeft(60);
                }
            }
        );
    }




    return (
        <>
            <section className="sign_wp">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                        </div>
                        <div className="col-sm-4">
                            <div className="login_wp">
                                <h3>Authorization Required</h3>
                                {visiblity && (
                                    <h5>We've sent a One Time Password (OTP) to the <br />register mobile number. Please enter it to complete<br />verification</h5>
                                )}
                                <form>
                                    {!visiblity ? (

                                        <div className="from_feild">
                                            <label>Mobile Number: <span>*</span></label>
                                            <input value={mobile} onChange={(e) => setmobile(e.target.value)} type="number" name="tel" placeholder="Mobile Number" />
                                        </div>
                                    ) : (
                                        <div className="from_feild">
                                            <label>Enter OTP: <span>*</span></label>
                                            <input value={otp} onChange={(e) => setotp(e.target.value)} type="text" name="text" placeholder="OTP" />
                                        </div>
                                    )}

                                    {!visiblity ? (
                                        <div className="signin_btn">
                                            <a href="#" onClick={sendOtp} style={{ display: optsendbutton ? "" : "none" }}>Get OTP</a>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="signin_btn">
                                                <a href="#" onClick={verifyOtp}>Verify</a>
                                            </div>
                                            <div className="resend_otp">
                                                {isTimerRunning ? (<a href="#">Resend OTP in {timeLeft}s</a>) : (<a href="#" onClick={resendOtp}>Resend OTP</a>)}
                                            </div>
                                        </>
                                    )}

                                    <div className="or">
                                        <p>OR</p>
                                    </div>
                                    <div className="login_otp">
                                        <a href={"/auth/sign-in"}>Sign in with email & password</a>
                                    </div>
                                    {/* <div className="signin_btn">
                                        <small>Or Create new account</small>
                                    </div> */}
                                </form>
                            </div>
                        </div>
                        <div className="col-sm-4">
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

Otp.ignorePath = true;

export default Otp
