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

            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-3"></div>
                        <div className="col-sm-6">
                            <div className="success1">

                                <h2> Welcome to Aartstudio!</h2>


                                <p>Thank you for joining Aartstudio.</p>
                                <img src="../img/tick.png" />
                                <br />
                                <br />
                                <div>
                                    <button type='submit' name='submit' className="button123" onClick={redirect_job}>
                                        Complete Your Profile
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

export default suppliersuccess