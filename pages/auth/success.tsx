import { useRouter } from "next/router";
import atom from "../../src/jotai/atom";
import { useAtom, useAtomValue } from "jotai";

const success = () => {
    const router = useRouter();
    const redirect_job = () => {
        router.push("/artrequest")
    }
    const user = useAtomValue(atom.storage.user);
    return (
        <>
            {/* <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>You are a {user?.pro_user == 1 ? "Pro": ""} customer: Welcome to Machining-4U!</h1>
                        </div>
                    </div>
                </div>
            </div> */}

            <section className="inner_banner_wp" style={{ "backgroundImage": `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1 className='yh'>You are a {user?.pro_user == 1 ? "Pro" : ""} customer: Welcome to Artisans!</h1>
                </div>
            </section>

            {/* <div className="container cjw">
                <div className="row">
                    <div className="col-sm-8 offset-md-2">
                        <div className="fund_d1">
                            <h3>Thank you, Now you are a {user?.pro_user == 1 ? "Pro": ""} customer : Welcome to Machining-4U!
                                </h3>
                            <hr />
			    <br />
                            <div className='reg-bottom'>
                                <button type='submit' name='submit' onClick={redirect_job}>
                                    Post a job
                                </button>
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div> */}

            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="help_wp">
                            <h3>Thank you, Now you are a {user?.pro_user == 1 ? "Pro" : ""} customer : Welcome to Artisans !
                            </h3>
                            <hr />
                            <br />
                            <div>
                                <button style={{
                                    background: "#ef6100",
                                    color: "#fff",
                                    borderRadius: "6px",
                                    boxShadow: "0px 1px 2px 2px rgb(71, 18, 15)",
                                    fontFamily: "Poppins",
                                    padding: "6px 22px",
                                    transition: "box-shadow 1s"
                                }} type='submit' name='submit' onClick={redirect_job}>
                                    Post a job
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default success