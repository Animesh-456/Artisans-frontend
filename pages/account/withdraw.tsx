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
            setOpen(true)
        }

    }

    const handleClick = () => {


        if (val == 0) {
            toast.error("Please provide a valid amount!")
            return
        }

        if (paypal == null || paypal == "") {
            toast.error("Please provide a valid paypal email")
            return
        }
        //setBalance(remain);

        var e = (document.getElementById("payOptions")) as HTMLSelectElement;


        var sel = e?.selectedIndex;
        var opt = e?.options[sel];
        var payMethod = opt.value;
        api.auth.update_balance({ body: { "balance": remain, "method": payMethod, "val": val, "paypal_email": paypal } }, (d) => {
            if (d.status == true) {
                (document.getElementById('amounttered') as HTMLInputElement).value = ""
                setRemain(0);
                toast.success("Withdrawl successful!");
                setpaypal(null);
                setval(0);

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
                                <div className="heading_title">
                                    <h2>Withdraw Funds</h2>
                                </div>
                                <div className="fund_wp">
                                    <div className="row">
                                        <div className="col-sm-4">
                                            <label>Withdrawal Method:</label>
                                        </div>
                                        <div className="col-sm-8">
                                            <select className="Gr-Border" name="paymentMethod">
                                                <option value="paypal">Paypal</option>
                                                <option value="bank">Bank Transfer</option>
                                            </select>
                                            <p>for your first bank transfer payment, please email your bank details to us admin@machining-4u.co.uk</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="table-responsive">
                                        <table className="table table-bordered table-sm">
                                            <thead>
                                                <tr className="table-primary">
                                                    <th>Available Balance</th>
                                                    <th>Amount to Withdraw</th>
                                                    <th>New Balance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>GBP £ {currBalance || balanceData?.amount_gbp}</td>
                                                    <td>GBP £ <input onChange={onChange}
                                                        name='total'
                                                        size={15}
                                                        type='text' id="amounttered" className="in-s" />
                                                    </td>
                                                    <td>GBP £ {remain}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="reg-bottom">
                                        <button type="submit" onClick={openwithdraw} name="submit">Withdraw Now</button>
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

                    <div className='cnfm-job-details post-email'>
                        <label>Paypal Email</label>
                        <input
                            name='paypal_email'
                            type='email'
                            value={paypal}
                            onChange={handleInputChange}
                        />


                    </div>
                    <div className='reg-bottom'>
                        <button type='submit' name='submit' onClick={() => setOpen(false)}>
                            Back
                        </button>
                        <button type='submit' name='submit' onClick={() => { setOpen(false); handleClick(); }}>
                            Submit
                        </button>
                    </div>
                </div>
            </GlobalModal>
        </>


    );
};

export default Withdraw;
