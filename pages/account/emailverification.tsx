import { useRouter } from "next/router";
import atom from "../../src/jotai/atom";
import { useAtom, useAtomValue } from "jotai";
import toast from "react-hot-toast";
import api from "../../src/api/services/api";

const Emailverify = () => {
    const router = useRouter();
    const { email } = router.query;
    const redirect_job = async () => {
        //toast.success(`Verification link Email sent to ${email}`)
        //router.push("/account/edit-profile")
        api.auth.resend_verify_email({
            params: {},
            body: {
                email: email
            }
        })
    }
    //const user = useAtomValue(atom.storage.user);
    return (
        <>

            <section className="inner_banner_wp" style={{ "backgroundImage": `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1 className='yh'>Verify your email</h1>
                </div>
            </section>


            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="success1">

                                <h2> Welcome to Artisans!</h2>


                                <p>Thank you for joining Aartstudio. Please verify your email by the link we have sent.
                                </p>
                                <img src="../img/tick.png" />
                                <br />
                                <br />
                                <div>
                                    <button type='submit' name='submit' className="button123" onClick={redirect_job}>
                                        Resend Verification link
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3"></div>
                    </div>
                </div>
            </section>

        </>
    )
}

Emailverify.ignorePath = true;

export default Emailverify;