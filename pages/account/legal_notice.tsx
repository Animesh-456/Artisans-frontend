import { useState } from "react"

const legal_notice = () => {
    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>LEGAL NOTICE</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container cjw">
                <div className="row">
                    <div className="col-sm-3">
                        <div className="legal1 legal2">
                            <i className="fa fa-envelope"></i><br />
                            admin@usineur.fr
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="legal1 legal2">
                            <i className="fa fa-phone"></i><br />
                            0970 448 431
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="legal1 legal2">
                            <i className="fa fa-fax"></i><br />
                            0811 486 495
                        </div>
                    </div>
                    <div className="col-sm-3">
                        <div className="legal1">
                            <i className="fa fa-map-marker"></i><br />
                            8 avenue du Bel-Air<br />
                            91190 Gif sur Yvette <br />
                            SAS FaberVille - SIRET: 821 296 092
                        </div>
                    </div>
                </div>
            </div>

        </>
    )

}
legal_notice.ignorePath = true
export default legal_notice

