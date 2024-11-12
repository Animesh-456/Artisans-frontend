import { useAtom, useAtomValue } from "jotai";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import api from "../../src/api/services/api";
import atom from "../../src/jotai/atom";

const UpdateMobile = () => {
    const [visiblity, setvisibility] = useState(false);
    const [mobile, setmobile] = useState("");
    const [otp, setotp] = useState("");

    const [optsendbutton, setoptsendbutton] = useState(true)
    const [verifybutton, setverifybutton] = useState(true)


    const [timeLeft, setTimeLeft] = useState(60); // Countdown starting from 60 seconds
    const [isTimerRunning, setIsTimerRunning] = useState(false);

    const user = useAtomValue(atom.storage.user);

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
        api.auth.update_mobile_send_mobileOtp(
            { params: {}, body: { phoneNumber: mobile, userId: user?.id } },
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
        await api.auth.update_mobile_verify_mobileOtp({ params: {}, body: { phoneNumber: mobile, code: otp, userId: user?.id } })
    }

    const resendOtp = () => {
        setotp("")

        if (mobile?.length == 0 || mobile?.length != 10) return toast.error("Mobile number should be 10 digits")
        //  Call api to send otp to mobile number
        api.auth.update_mobile_send_mobileOtp(
            { params: {}, body: { phoneNumber: mobile, userId: user?.id } },
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
                                <h3>Update Mobile</h3>
                                {visiblity && (
                                    <h5>We've sent a One Time Password (OTP) to the <br />register mobile number. Please enter it to complete<br />verification</h5>
                                )}
                                <form>
                                    {!visiblity ? (

                                        <div className="from_feild">
                                            <label>Mobile Number: <span>*</span></label>
                                            <input value={mobile} onChange={(e) => setmobile(e.target.value)} type="number" name="tel" placeholder="Enter new Mobile Number" />
                                        </div>
                                    ) : (
                                        <div className="from_feild">
                                            <label>Enter OTP: <span>*</span></label>
                                            <input value={otp} onChange={(e) => setotp(e.target.value)} type="text" name="text" placeholder="Enter OTP" />
                                        </div>
                                    )}

                                    {!visiblity ? (
                                        <div className="signin_btn">
                                            <a href="#" onClick={sendOtp}>Get OTP</a>
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

export default UpdateMobile
