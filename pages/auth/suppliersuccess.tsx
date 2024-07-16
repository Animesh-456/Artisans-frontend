import { useRouter } from "next/router";
import atom from "../../src/jotai/atom";
import { useAtom, useAtomValue } from "jotai";

const suppliersuccess = () => {
    const router = useRouter();
    const redirect_job = () => {
        router.push("/account/edit-profile")
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
                            <h1 className='yh'>You are a  supplier</h1>
                        </div>
                    </div>
                </div>
            </div> */}

            <section className="inner_banner_wp" style={{ "backgroundImage": `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1 className='yh'>You are a  Artist</h1>
                </div>
            </section>

            {/* <div className="container cjw">
                <div className="row">
                    <div className="col-sm-8 offset-md-2">
                        <div className="fund_d1">
                            <h3>Thank you for your registration. Welcome to Machining-4u.co.uk!</h3>
                            <hr />
				<p>4 points to remember:</p>
				<p>1. Send an invoice systematically to your professional customers.</p>
				<p>2. Do not communicate your email or phone number until you have won the order. And do not respond to requests to do so.</p>
				<p>3. Exclusively use the Usineur.fr payment system with your customers met on Usineur.fr</p>
				<p>4. Complete your profile: a presentation text and a few photos are essential to take your first order.</p>
			    <br />
                            <div className='reg-bottom'>
                                <button type='submit' name='submit' onClick={redirect_job}>
                                    Complete Your Profile
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
                            <h3>Thank you for your registration. Welcome to Artisans!</h3>

                            <hr />

                            <hr />
                            <p>4 points to remember:</p>
                            <p>1. Send an invoice systematically to your professional customers.</p>
                            <p>2. Do not communicate your email or phone number until you have won the order. And do not respond to requests to do so.</p>
                            <p>3. Exclusively use the Usineur.fr payment system with your customers met on Usineur.fr</p>
                            <p>4. Complete your profile: a presentation text and a few photos are essential to take your first order.</p>
                            <br />
                            <br />
                            <div>
                                <button type='submit' name='submit' style={{
                                    background: "#ef6100",
                                    color: "#fff",
                                    borderRadius: "6px",
                                    boxShadow: "0px 1px 2px 2px rgb(71, 18, 15)",
                                    fontFamily: "Poppins",
                                    padding: "6px 22px",
                                    transition: "box-shadow 1s"
                                }} onClick={redirect_job}>
                                    Complete Your Profile
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

        </>
    )
}

export default suppliersuccess