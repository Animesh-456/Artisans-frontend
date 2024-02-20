import { useState } from "react";
import { Button } from "react-bootstrap"
import { toast } from "react-hot-toast";
import common from "../../src/helpers/common";
import api from "../../src/api/services/api";
import atom from "../../src/jotai/atom";
import { useAtomValue } from "jotai";
import Router from "next/router";

const pro_cust = () => {
    const user = useAtomValue(atom.storage.user);
    const [signIn, signstate] = useState({
        company_name: "",
        SIREN: "",
        pro_user: 1,
        id: user?.id
    });
    const setSign = common.ChangeState(signstate);

    const handlesubmit = () => {
        if ((signIn.SIREN.length ==9|| signIn.SIREN.length == 14)  && signIn.company_name.length > 0) {
            api.auth.update_pro({ body: signIn })
        } else {
            toast.error("Company Company Name/SIREN not valid")
        }
    }

const handlecancel = () => {
        Router.push("/account/jobs")
    }



    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>PRO CUSTOMER</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container cjw">
                <div className="row">
                    <div className="col-sm-8 offset-md-2">
                        <div className="fund_d1">
                            <h3>Additional information page for PRO customer</h3>
                            <hr />
                            <div className="tgs-3">
                                <p>Thank you for choosing to integrate Usineur PRO!</p>
                                <p>To finalize your registration, we need the information below!</p>
                            </div>
                            <div className="row tgs-1">

                                <div className="col-sm-3"><label>Company Name</label></div>
                                <div className="col-sm-9"><input type="text" name="name" value={signIn.company_name}
                                    autoComplete={"off"}
                                    onChange={setSign("company_name")} ></input></div>
                            </div>
                            <div className="row tgs-1">
                                <div className="col-sm-3"><label>SIREN</label></div>
                                <div className="col-sm-9"><input type="text" name="pass" value={signIn.SIREN}
                                    autoComplete={"off"}
                                    onChange={setSign("SIREN")} /></div>
                                {/* <i className="fa fa-exclamation"></i>
                                <i className="fa fa-check"></i> */}
                            </div>
                            <br />
                            <div className="oksign2">
                                <Button className="oksign1" variant="secondary" onClick={handlecancel}>
                                    Cancel
                                </Button>
                                <Button className="oksign" variant="primary" onClick={handlesubmit}>
                                    Ok
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default pro_cust