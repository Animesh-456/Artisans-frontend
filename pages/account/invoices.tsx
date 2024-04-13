import React, { useEffect, useState } from "react";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import api from "../../src/api/services/api";
import { Button } from "react-bootstrap";
import { BsCheckCircleFill, BsFillSdCardFill } from "react-icons/bs";
import atom from "../../src/jotai/atom";
import { useAtom, useAtomValue } from "jotai";
import { useRouter } from "next/router";
import Link from "next/link";
import { jsPDF } from "jspdf";

type Props = {};

//let Invoice_data = []

function DownloadPDF(inv_no, customer, p_name, fund_release_date, amount, cus_address, cus_city, cus_zcode, transaction_id) {

    localStorage.setItem('customer_name', customer)
    localStorage.setItem('project_name', p_name)
    localStorage.setItem('amount', amount)
    localStorage.setItem('PDate', fund_release_date)
    localStorage.setItem('customer_address', cus_address)
    localStorage.setItem('customer_city', cus_city)
    localStorage.setItem('customer_zcode', cus_zcode)
    localStorage.setItem('transaction_id', transaction_id)






    const doc = new jsPDF({
        orientation: "landscape",
        unit: "px"
    });

    let yr = new Date().getFullYear();
    let fund_release_date1 = new Date(fund_release_date);
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var day = fund_release_date1.getDate();
    var month = months[fund_release_date1.getMonth()];
    var year = fund_release_date1.getFullYear();
    var formatfund_release_date = day + " " + month + " " + year;

    
    var pdfjs = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <style type="text/css">
        table{
            font-family: Arial;
        }
    </style>
    </head>
    <body>    
    <table width="600px" border="0" cellpadding="0" cellspacing="0" style="margin: 0 auto; display: table;">
        <tr>
          
            <td align="right" style="color:#1e4066">
                <b style="font-size: 14px;">Date: ${formatfund_release_date}</b>
            </td>
        </tr>
        <tr><td height="10px"></td></tr>
        <tr>
            <td style= "color: '#1e4066';font-size: 14px;"><b>Machining-4U -SAS Faberville</b></td>
            <td align="right" style=" color: #1e4066; font-size: 14px;"><b>Invoice No: ${yr}${inv_no}</b></td>
        </tr>
        <tr>

            <td><address style="font-size: 14px;" align="left">
            15 rue Racine <br />
            91400 Orsay France <br />
            SIRET : 821 296 092
            </address></td>


            <td>
                <address style="font-size: 14px;" align="right">
                    ${customer}<br />
                    ${cus_address || ""}<br />
                    ${cus_city || ""}<br />
                    ${cus_zcode || ""}<br />
                    United Kingdom
                </address>
            </td>


        </tr>
        
        <tr><td height="10px"></td></tr>
        <tr>
            <td height="10px"></td>
        </tr>
        <tr>
            <td align="center" colspan="2"><b style="font-size: 14px;">Invoice</b></td>
        </tr>
        <tr>
            <td height="10px"></td>
        </tr>
        <tr align="center">
            <td colspan="2">
                <table width="100%" cellpadding="5" cellspacing="0" style="border: 1px solid #ccc;">
                    <tr style="font-size: 14px" bgcolor="#dfdfdf" align="center">
                        <td><b>Name of the project</b></td>
                        <td align="left"><b>Project amount</b></td>
                        <td><b>Commission(%)</b></td>
                        <td><b>Commission Paid</b></td> 
                    </tr>
                    <tr style="font-size: 14px" align="center">
                        <td style="border-bottom: 1px solid #ccc; border-right: 1px solid #ccc;"><b>${p_name}</b></td>
                        <td align="left" style="border-bottom: 1px solid #ccc; border-right: 1px solid #ccc;"><b>${amount.toFixed(2)}</b></td>
                        <td style="border-bottom: 1px solid #ccc; border-right: 1px solid #ccc;">14.9%</td>
                        <td style="border-bottom: 1px solid #ccc;">GBP ${((amount - ((100 - 14.9) / 100) * amount)).toFixed(2)}</td> 
                    </tr>
                    <tr align="center">
                        <td style="border-right: 1px solid #ccc;"></td>
                        <td style="border-right: 1px solid #ccc;"></td>
                        <td align="center" style="border-right: 1px solid #ccc;">14.9%</td>
                        <td align="center">GBP ${(0.149 * amount).toFixed(2)}</td>
                    </tr>
                </table>
            </td>        
        </tr>
        
    </table>
    </body>
    </html>`;
    doc.setFontSize(2)
    doc.html(pdfjs, {
        callback: function (doc) {
            doc.save(`${transaction_id}.pdf`);
            var pdfBase64 = doc.output('blob');
            const formData = new FormData();
            formData.append('pdfFile', pdfBase64, `${transaction_id}.pdf`);
            api.project.save_pdf({ body: formData, params: { tid: transaction_id } });
        }

    });



    // let printContents = document.getElementById('Content').innerHTML;
    // let originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents; 
}
const Invoices = (props: Props) => {

    const router = useRouter();
    const opt = useAtomValue(atom.project.api.list_opt);
    const invoices = useAtomValue(atom.project.api.invoices);
    var year = new Date().getFullYear();

    const UserData = JSON.parse(localStorage.getItem('UserData'));
    

    useEffect(() => {

        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
    
        api.project.Invoice_list({ params: { ...opt, machinist_id: UserData.id, page: pageNumber - 1 } })

    }, [])




    const handlePageClick = (i) => {
        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.Invoice_list({ params: { ...opt, page: i, machinist_id: UserData.id } });
            });
    };


    // Invoice_data = d.data;

    //setLoaded(true);

    // console.log("inv_data",Invoice_data)
    // <td style={{textAlign:'center'}}>{(parseFloat(item.amount)*0.149).toFixed(2)}</td>

    // setTimeout(()=>{
    // 	let Tbody = document.getElementById('Tbody') 
    // 	let InvoiceList = JSON.parse(localStorage.getItem('Invoice_List'));
    // 	console.log("List_inv--",InvoiceList)

    // 	// InvoiceList.map((item)=>(
    // 	// 	Tbody.innerHTML = 	Tbody.innerHTML + `<tr> <td>${item.status}</td> <td>${item.creator.name}</td> 	<td>${item.project.project_name}</td>  <td>$${item.amount}</td> </tr>`
    // 	// ))

    // 	console.log(Invoice_data)
    // },1000)


    

    

    const visiblePages = 10; // Number of visible page buttons
    const getPageNumbers = () => {
        const startPage = Math.max(0, opt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(opt.total_pages, startPage + visiblePages - 1);
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };

    return (
        <div>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(./img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Invoices</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container cjw'>
                <div className='row'>
                    <div className="col-sm-4">
                        <AccountSideBar />
                    </div>

                    <div className='col-sm-8'>
                        <div className='profile_box'>
                            <h3>Invoices</h3>
                            <div className='fund_wp'>
                                <div className='table-responsive'>
                                    {/* <Button style={{background:'#d6c940',color:'black',borderRadius:'12px'}} onClick={()=>{DownloadPDF()}} >Download </Button> */}
                                    <table className='table table-bordered table-sm'>
                                        <thead>
                                            <tr className='table-primary'>
                                                <td>Invoice Number</td>
                                                <td>Date</td>
                                                <td>Client</td>
                                                <td>Name of the project</td>
                                                <td>Amount</td>
                                                <td>Commision(GBP)</td>
                                                <td>Action</td>
                                            </tr>
                                        </thead>
                                        <tbody id="Tbody">

                                            {invoices?.length
                                                ? (

                                                    invoices.map((item) => {

                                                        return (
                                                            <>
                                                                <tr>
                                                                    <td>{year}{item?.id}</td>
                                                                    <td>{item?.project?.fund_release_date}</td>
                                                                    <td>{item?.creator?.user_name}</td>
                                                                    <td style={{ textAlign: 'center' }}>{item?.project?.project_name}</td>
                                                                    <td style={{ textAlign: 'center' }}>₹{item?.amount_gbp?.toFixed(2)}</td>
                                                                    <td style={{ textAlign: 'center' }}>{(item?.amount_gbp - (item?.amount_gbp * ((100 - 14.9) / 100))).toFixed(2)}</td>
                                                                    <td>  <Button style={{ background: 'whitesmoke', color: 'black', borderRadius: '12px' }} onClick={() => { DownloadPDF(item?.id, item?.reciever?.user_name, item?.project?.project_name, item?.project?.fund_release_date, item?.amount_gbp, item?.reciever?.address1, item?.reciever?.city, item?.reciever?.zcode, item?.id) }} ><BsFillSdCardFill /> </Button></td>
                                                                </tr>
                                                            </>
                                                        )
                                                    })) : (
                                                    <></>
                                                )}


                                        </tbody>
                                    </table>
                                    <ul className='pagination'>
                                        {(opt.page > 0) ? <li className='page-item'>
                                            <a className='page-link' onClick={() => handlePageClick(0)}>
                                                First
                                            </a>
                                        </li> : ""}
                                        {(opt.page > 0) ? <li className='page-item'>
                                            <a className='page-link' onClick={() => handlePageClick(opt.page - 1)}>
                                                Previous
                                            </a>
                                        </li> : ""}
                                        {/* {(opt.total_pages < 10 ? (Array.from({ length: opt.page + 1 })) : (Array.from({ length: 10 }))).map(
										(d, i: any) => {
											return (
												<li
													className={`page-item ${parseFloat((router?.query?.page || 0).toString()) -
														1 ==
														i
														? "active"
														: ""
														}`}>
													<Link href={`${router.pathname}?page=${i}`}>
														<a
															className='page-link'
															onClick={(e) => {
																e.preventDefault();
																handlePageClick(i);
															}}>
															{i + 1}
														</a>
													</Link>
												</li>
											);
										},
									)} */}

                                        {opt.total_count > 10 && getPageNumbers().map((page) => (
                                            <>

                                                <li
                                                    className={`page-item ${parseFloat((router?.query?.page || 0).toString()) - 1 ==
                                                        page
                                                        ? "active"
                                                        : ""
                                                        }`}>
                                                    <Link href={`${router.pathname}?page=${page}`}>
                                                        <a
                                                            className='page-link'
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                handlePageClick(page);
                                                            }}>
                                                            {page + 1}
                                                        </a>
                                                    </Link>
                                                </li>
                                            </>

                                        ))}




                                        {opt.page != opt.total_pages ?
                                            <li className='page-item'>
                                                <a className='page-link' onClick={() => handlePageClick(opt.page + 1)}>
                                                    Next
                                                </a>
                                            </li> : ""}
                                        {opt.page != opt.total_pages ? <li className='page-item'>
                                            <a className='page-link' onClick={() => handlePageClick(opt.total_pages)}>
                                                Last
                                            </a>
                                        </li> : ""}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="Content" style={{ display: 'none' }}>


                <table style={{ width: '100%', fontFamily: 'sans-serif', color: '#1e4066' }} >
                    <tr>
                        <td>
                            <img width="150px" src="http://jhunsinfobay.net/usineur/img/logo.png" alt="" />
                        </td>
                        <td align="right" style={{ color: '#1e4066' }}>
                            <b>Date: 16jan.2022</b>
                        </td>
                    </tr>
                    <tr>
                        <td style={{ color: '#1e4066' }}><b>Machining-4U - SAS Faberville</b></td>
                        <td align="right" style={{ color: '#1e4066' }}><b>Invoice No: 2019000041</b></td>
                    </tr>
                    <tr>
                        <td style={{ lineHeight: '20px' }}>
                            <address>
                                15 rue Racine<br />
                                91400 Orsay<br />
                                No SIRET: 96854756
                            </address>
                        </td>
                        <td align="right" style={{ lineHeight: '20px' }}>
                            <b>Johnson</b><br /><br />
                            <address>
                                6412<br />
                                United Kingdom<br />
                                6412
                            </address>
                        </td>
                    </tr>
                    <tr><td style={{ height: '30px' }}></td></tr>
                    <tr>
                        <td align="center"><b>Invoice</b></td>
                    </tr>
                    <tr><td style={{ height: '20px' }}></td></tr>
                    <tr>
                        <td >
                            <table style={{ width: '100%', backgroundColor: '#eee' }} >
                                <tr style={{ background: '#6384ac', color: '#fff' }}>
                                    <td align="center">Name of the project</td>
                                    <td align="center">Project amount</td>
                                    <td align="center">Commission(%)</td>
                                    <td align="center">Commission Paid</td>
                                </tr>
                                <tr>
                                    <td align="center">Throttle Body Adaptor</td>
                                    <td align="center">161.00</td>
                                    <td align="center">14.90</td>
                                    <td align="center">GBP 23.99</td>
                                </tr>
                                <tr style={{ background: '#dfdfdf' }}>
                                    <td ></td>
                                    <td align="center">Commission Paid</td>
                                    <td align="center">GBP 23.99</td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>
            </div>


        </div>

    );
};

export default Invoices;
