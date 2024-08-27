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


            {/* <section className="inner_banner_wp" style={{ "backgroundImage": `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1 className='yh'>You are a {user?.pro_user == 1 ? "Pro" : ""} customer: Welcome to Artisans!</h1>
                </div>
            </section>

           

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
            </section> */}

            <section className="inner_banner_wp" style={{ "backgroundImage": `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1 className='yh'>You are a  Customer</h1>
                </div>
            </section>

            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="success1">

                                <h2> Welcome to Artisans!</h2>


                                <p>Thank you for joining Aartstudio. You will </p>

                                <p> receive email message shortly
                                </p>
                                <img src="../img/tick.png" />
                                <br />
                                <br />
                                <div>
                                    <button type='submit' name='submit' className="button123" onClick={redirect_job}>
                                        Post an art request
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

export default success