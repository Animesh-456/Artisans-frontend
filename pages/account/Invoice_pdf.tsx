import React, { useEffect } from "react";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import api from "../../src/api/services/api";
//import jsPDF from "jspdf";

let Invoice_data = []

var year = new Date().getFullYear();

function GeneratorPdf() {
    // var doc = new jsPDF("p","pt","a4");
    // doc.setFont('Inter-Regular', 'normal');

    // doc.html(document.querySelector("#Content"),{
    //     callback:function(doc){
    //         doc.save("Invoice.Pdf")
    //     }
    // })
    //  window.jsPDF = window.jspdf.jsPDF;

    // var doc = new jsPDF();

    // // Source HTMLElement or a string containing HTML.
    // var elementHTML = document.querySelector("#contnet");

    // doc.html(elementHTML, {
    //     callback: function(doc) {
    //         // Save the PDF
    //         doc.save('sample-document.pdf');
    //     },
    //     x: 15,
    //     y: 15,
    //     width: 170, //target width in the PDF document
    //     windowWidth: 650 //window width in CSS pixels
    // });
    let printContents = document.getElementById('Content').innerHTML;
    let originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}

const invoice_pdf = () => {

    setTimeout(() => {
        GeneratorPdf()

    }, 2000)



    let currUserData = JSON.parse(localStorage.getItem('UserData'))
    //    console.log(currUserData)
    const customer = localStorage.getItem('customer_name')
    const pname = localStorage.getItem('project_name')
    const amount = localStorage.getItem('amount')

    var date = (new Date(localStorage.getItem('Date'))).toLocaleDateString("en-GB");


    const customer_address = localStorage.getItem('customer_address')
    const customer_city = localStorage.getItem('customer_city')
    const customer_zcode = localStorage.getItem('customer_zcode')
    const transaction_id = localStorage.getItem('transaction_id')


    const invoice_id = transaction_id
    let commision = (parseFloat(amount) * 0.149).toFixed(2)
    //commision = parseFloat(amount) - commision





    return (
        <div id="Content" style={{ padding: '40px', marginTop: '60px', marginBottom: '140px' }}>


            <table style={{ width: '100%', fontFamily: 'sans-serif', color: '#1e4066' }}  >
                <tr>
                    <td>
                        <img width="150px" src="http://jhunsinfobay.net/usineur/img/logo.png" alt="" />
                    </td>
                    <td align="right" style={{ color: '#1e4066' }}>
                        <b>Date: {date}</b>
                    </td>
                </tr>
                <tr>
                    <td style={{ color: '#1e4066' }}><b>Aartstudio</b></td>
                    <td align="right" style={{ color: '#1e4066' }}><b>Invoice No: {year}{transaction_id}</b></td>
                </tr>
                <tr>
                    <td style={{ lineHeight: '20px' }}>
                        <address>
                            15 rue Racine<br />
                            91400 Orsay<br />
                            No SIRET: 821 296 092
                        </address>
                    </td>
                    <td align="right" style={{ lineHeight: '20px' }}>
                        <b>{customer}</b><br /><br />
                        <address>
                            {customer_address}<br />
                            {customer_city}<br />
                            {customer_zcode}
                        </address>
                    </td>
                </tr>
                <tr><td style={{ height: '30px' }}></td></tr>
                <tr>
                    <td align="center" ><b style={{ marginLeft: '425px' }}>Invoice</b></td>
                </tr>
                <tr><td style={{ height: '20px' }}></td></tr>
                <tr>
                    <td >
                        <table style={{ width: '133%', backgroundColor: '#eee' }} >
                            <tr style={{ background: '#6384ac', color: '#fff' }}>
                                <td align="center">Name of the project</td>
                                <td align="center">Project amount</td>
                                <td align="center">Commission(%)</td>
                                <td align="center">Commission Paid</td>
                            </tr>
                            <tr>
                                <td align="center" style={{ padding: '20px' }}>{pname}</td>
                                <td align="center">{amount}</td>
                                <td align="center">14.9</td>
                                <td align="center">GBP {commision}</td>
                            </tr>
                            <tr style={{ background: '#dfdfdf' }}>
                                <td ></td>
                                <td ></td>
                                <td align="center">Commission Paid</td>
                                <td align="center">GBP  {commision}</td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </div>
    );
};

export default invoice_pdf;