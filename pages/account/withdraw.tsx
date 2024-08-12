import React, { useEffect, useState } from "react";
import { useAtomValue, useAtom } from "jotai";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import atom from "../../src/jotai/atom";
import api from "../../src/api/services/api";
import { BalanceResponse } from "../../src/@types/type";
import { toast } from "react-hot-toast";
import GlobalModal from "../../src/views/Common/Modals/GlobalModal";
type Props = {};

const Withdraw = (props: Props) => {

    const balanceData = useAtomValue<BalanceResponse>(atom.auth.api.user_balance);
    const updatedBalance = useAtomValue<BalanceResponse>(atom.auth.api.update_balance);

    const [currBalance, setCurrBalance] = useState(balanceData?.amount_gbp);
    const [remain, setRemain] = useState(0);
    const [val, setval] = useState(0);
    const [paypal, setpaypal] = useState(null);
    const [btndisable, setbtndisable] = useState(false)

    const onChange = (e) => {

        const { name, value } = e.target;
        setval(value)

        if (currBalance) {
            if (value <= currBalance) {
                const remainValue = currBalance - value;
                setRemain(remainValue);
            }
            else {
                setRemain(0);
            }

        }
        else {
            if (value <= balanceData?.amount_gbp) {
                const remainValue = balanceData?.amount_gbp - value;
                setRemain(remainValue);
            }
            else {
                setRemain(0);
            }

        }

    }


    const openwithdraw = () => {
        if (val == 0) {
            toast.error("Please provide a valid amount!")
            return
        } else {
            handleClick()
        }

    }

    const handleClick = () => {

        if (!val) return toast.error("Please provide an amount")

        setbtndisable(true)

        var e = (document.getElementById("payOptions")) as HTMLSelectElement;


        var sel = e?.selectedIndex;
        var opt = e?.options[sel];
        var payMethod = opt?.value || "bank";
        api.auth.update_balance({ body: { "balance": remain, "method": payMethod, "val": val } }, (d) => {
            if (d.status == true) {
                (document.getElementById('amounttered') as HTMLInputElement).value = ""
                console.log("balance after submit", d.data)
                const originalBalance = balanceData?.amount_gbp
                setRemain(originalBalance);
                toast.success("Withdrawl successful!");
                setpaypal(null);
                setval(0);
                setbtndisable(false)
            }
        });

    }

    useEffect(() => {
        setCurrBalance(updatedBalance?.amount_gbp)
    }, [updatedBalance])

    useEffect(() => {
        api.auth.user_balance({});
    }, [])


    const [open, setOpen] = useAtom(atom.modal.paypal_email);
    const handleInputChange = (event) => {
        setpaypal(event.target.value);
    };

    return (
        // <div>
        //     <div
        //         className='banner_wp sign_banner'
        //         style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
        //         <div className='container'>
        //             <div className='row'>
        //                 <div className='banner_text inner_banner_text'>
        //                     <h1 className='yh'>Withdraw Funds</h1>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className='container cjw'>
        //         <div className='row'>
        //             <div className="col-sm-4">
        //                 <AccountSideBar />
        //             </div>

        //             <div className='col-sm-8'>
        //                 <div className='profile_box'>
        //                     <h3>Remove Fund</h3>
        //                     <div className='fund_wp'>
        //                         <div className='row'>
        //                             <div className='col-sm-4'>
        //                                 <label>Withdrawal Method:</label>
        //                             </div>
        //                             <div className='col-sm-8'>
        //                                 <select className='Gr-Border' name='paymentMethod' id="payOptions">
        //                                     <option value='paypal'>Paypal</option>
        //                                     <option value='bank'>Bank Transfer</option>
        //                                 </select>
        //                                 <p>
        //                                     for your first bank transfer payment, please email your
        //                                     bank details to us admin@machining-4u.co.uk
        //                                 </p>
        //                             </div>
        //                         </div>
        //                         <hr />
        //                         <div className='table-responsive'>
        //                             <table className='table table-bordered table-sm'>
        //                                 <thead>
        //                                     <tr className='table-primary'>
        //                                         <td>Available Balance</td>
        //                                         <td>Amount to Withdraw</td>
        //                                         <td>New Balance</td>
        //                                     </tr>
        //                                 </thead>
        //                                 <tbody>
        //                                     <tr>
        //                                         <td>GBP ₹ {currBalance || balanceData?.amount_gbp}</td>
        //                                         <td>
        //                                             GBP ₹{" "}
        //                                             <input onChange={onChange}
        //                                                 name='total'
        //                                                 size={15}
        //                                                 type='text'
        //                                                 id='amounttered'
        //                                                 className='in-s'
        //                                             />
        //                                         </td>
        //                                         <td>GBP ₹ {remain}</td>
        //                                     </tr>
        //                                 </tbody>
        //                             </table>
        //                         </div>
        //                         <div className='reg-bottom'>
        //                             <button onClick={openwithdraw} type='submit' name='submit'>
        //                                 Withdraw Now
        //                             </button>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     <GlobalModal
        //         title='Enter Paypal address'
        //         atom={atom.modal.paypal_email}>

        //         <div className='wjgf'>

        //             <div className='cnfm-job-details post-email'>
        //                 <label>Paypal Email</label>
        //                 <input
        //                     name='paypal_email'
        //                     type='email'
        //                     value={paypal}
        //                     onChange={handleInputChange}
        //                 />


        //             </div>
        //             <div className='reg-bottom'>
        //                 <button type='submit' name='submit' onClick={() => setOpen(false)}>
        //                     Back
        //                 </button>
        //                 <button type='submit' name='submit' onClick={() => { setOpen(false); handleClick(); }}>
        //                     Submit
        //                 </button>
        //             </div>
        //         </div>
        //     </GlobalModal>
        // </div>
        <>
            <section className="inner_banner_wp" style={{ backgroundImage: `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>Withdraw Funds</h1>
                </div>
            </section>

            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-4">
                            <AccountSideBar />
                        </div>
                        <div className="col-sm-8">
                            <div className="profile_box">
                                <div className="prof111">
                                    <h4>Withdraw Funds</h4>
                                </div>
                                <div className="fund_wp">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label>Withdrawal Method:</label>
                                        </div>
                                        <div className="col-sm-8">
                                            <select className="Gr-Border" name="paymentMethod">
                                                {/* <option value="paypal">Paypal</option> */}
                                                <option value="bank">Bank Transfer</option>
                                            </select>
                                            <p>for your first bank transfer payment, please email your bank details to us admin@machining-4u.co.uk</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead>
                                                <tr className="table-primary">
                                                    <th>Available Balance</th>
                                                    <th>Amount to Withdraw</th>
                                                    <th>New Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Rs. ₹ {balanceData?.amount_gbp}</td>
                                                    <td>Rs. ₹ <input onChange={onChange}
                                                        name='total'
                                                        size={15}
                                                        type='text' id="amounttered" className="in-s" />
                                                    </td>
                                                    <td>Rs. ₹ {remain === 0 ? balanceData?.amount_gbp : remain}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="reg-bottom">
                                        <button disabled={btndisable ? true : false} type="submit" onClick={handleClick} name="submit">Withdraw Now</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <GlobalModal
                title='Enter Paypal address'
                atom={atom.modal.paypal_email}>

                <div className='wjgf'>

                    <div className='cnfm-job-details post-email from_feild'>
                        <label>Paypal Email</label>
                        <input
                            name='paypal_email'
                            type='email'
                            value={paypal}
                            onChange={handleInputChange}
                        />


                    </div>
                    <div className='reg-bottom withdraw'>
                        <button type='submit' name='submit' onClick={() => { setOpen(false); handleClick(); }}>
                            Submit
                        </button>
                        <button className="back_button" type='submit' name='submit' onClick={() => setOpen(false)}>
                            Back
                        </button>
                    </div>
                </div>
            </GlobalModal>
        </>


    );
};

export default Withdraw;
