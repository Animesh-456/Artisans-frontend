import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { number } from 'joi';
import api from "../../src/api/services/api";

const AdditionalInfo = () => {
    var router = useRouter();
    const [formData, setFormData] = useState({
        // address: '',
        password: '',
        account: '',
        //number: '',
    });
    const [decodedData, setDecodedData] = useState(null);
    const [token, setToken] = useState('');

    useEffect(() => {
        const tokenQuery = router.query.token;


        if (typeof tokenQuery === 'string') {
            setToken(tokenQuery);
        } else if (Array.isArray(tokenQuery)) {
            setToken(tokenQuery[0]); // Take the first value if it's an array
        }
    }, [router.query.token]);

    //console.log("formdata account", formData.account);


    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!formData?.password || !formData?.account) return toast.error("Please fill required feilds");

        // if (formData?.number?.length != 10) return toast.error("Mobile number should be 10 digits");


        if (!token) {
            toast.error("Token is missing.");
            return;
        }

        // Combine decoded data with form data
        const dataToSend = {
            token,
            ...formData
        };

        try {

            api.auth.google_register({ body: dataToSend })
        }

        catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <section className="myproject">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="offset-sm-2"></div>
                    <div className="col-sm-8 profile_box">
                        <div className="register_c">
                            <form onSubmit={handleSubmit}>
                                <h4>Please Provide Your Information Below:</h4>
                                <div className="row from_feild">
                                    <div className="col-sm-4">
                                        <label>Type of Account <span>*</span></label>
                                    </div>
                                    <div className="col-sm-8">
                                        <select
                                            name="account"
                                            onChange={handleChange}
                                            value={formData.account}
                                        >
                                            <option value="">Select Account Type</option>
                                            <option value="Customer">Customer</option>
                                            <option value="Artist">Artist</option>
                                        </select>
                                    </div>
                                </div>
                                {/* <div className="row from_feild">
                                    <div className="col-sm-4">
                                        <label>Address <span>*</span></label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            placeholder="Enter your address"
                                        />
                                    </div>
                                </div> */}
                                <div className="row from_feild cont11">
                                    <div className="col-sm-4">
                                        <label>Password <span>*</span></label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Enter your password"
                                        />
                                    </div>


                                </div>
                                {/* <div className="row from_feild cont11">
                                    <div className="col-sm-4">
                                        <label>Contact Number <span>*</span></label>
                                    </div>
                                    <div className="col-sm-8">
                                        <input
                                            type="number"
                                            name="number"
                                            value={formData.number}
                                            onChange={handleChange}
                                            placeholder="Enter your Number"
                                        />
                                    </div>


                                </div> */}


                                <div className="reg-bottom">
                                    <button type="submit" name="submit">Register</button>
                                    <button className="canl" onClick={() => window.location.href = '/auth/sign-in'}>
                                        Cancel <img src={"../img/arrow.png"} width="11px" alt="" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
AdditionalInfo.ignorePath = true

export default AdditionalInfo;
