import { useAtom, useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import api from "../../src/api/services/api";
import atom from "../../src/jotai/atom";
import { useRouter } from "next/router";
import Link from "next/link";

const allNotification = () => {
    const router = useRouter();

    const list = useAtomValue(atom.project.api.notifs);
    const notifopt = useAtomValue(atom.project.api.my_proj_opt);
    const [index, setIndex] = useAtom(atom.storage.job_tab);
    
    useEffect(() => {
        // api.project.notifs({});
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;
        console.log("Page number is ", pageNumber)
        api.project.notifs({ params: { ...notifopt, page: pageNumber - 1, status: index } });
    }, [])
    console.log("notifs list --->", list);

    console.log("notifs opt list --->", notifopt);
    const handlePageClick = (i) => {
        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                },
            })
            .then(() => {
                api.project.notifs({ params: { ...notifopt, page: i, status: index } });
            });
    };

    console.log("notifs data", list)

    const formatDate = (val) => {
        const monthList = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date: string = val;
        const datenew = date?.slice(0, 10)
        const day = datenew?.slice(8, 10)
        const month = monthList[Number(datenew?.slice(5, 7)) - 1]
        const year = datenew?.slice(0, 4)

        const finaldate = day + "-" + month + "," + year
        return finaldate;

    }

    const replaceText = (v) => {
        let textString = v.replace(/<[^>]+>/g, "");
        let NotifMessage = textString.replace(/\&nbsp;/g, ' ');
        let NotifMessage2 = NotifMessage.replace(/\&quot;/g, '');
        let NotifMessage3 = NotifMessage2.replace(/\&pound;/g, '₹');
        let NotifMessage4 = NotifMessage3.replace(/\&#39;/g, '');
        let NotifMessage5 = NotifMessage4.replace(/\&eacute/g, 'é');

        return NotifMessage5;


    }
	


    const visiblePages = 10; // Number of visible page buttons
    const getPageNumbers = () => {
        const startPage = Math.max(0, notifopt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(notifopt.total_pages, startPage + visiblePages - 1);
	
        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };


    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Messaging</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container'>
                <br />
                <div className='profile_box'>
                    <div className='table-responsive inbox-table mt-4'>
                        <table className='table'>
                            <thead>
                                <tr className="allnotif-tr">
                                    <th>Sender</th>
                                    <th>Message</th>
                                    <th className='text-end date-class'>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list?.length ? (
                                    list?.map((l) => {
                                        return (

                                            <tr>
                                                <td className='dummy-anchor darkblue-text cursor-pointer'>
                                                    Admin
                                                </td>
                                                <td>{replaceText(l?.email_body)}</td>
                                                <td className='text-end'>{formatDate(l?.notif_date)}</td>
                                            </tr>

                                        );
                                    })
                                ) : (
                                    <></>
                                )}

                            </tbody>
                        </table>

                        <ul className='pagination justify-content-end'>

                            {(notifopt.page > 0) ? <li className='page-item'>
                                <a className='page-link' onClick={() => handlePageClick(0)}>
                                    First
                                </a>
                            </li> : ""}
                            {(notifopt.page > 0) ? <li className='page-item'>
                                <a className='page-link' onClick={() => handlePageClick(notifopt.page - 1)}>
                                    Previous
                                </a>
                            </li> : ""}
                            {notifopt.total_count >10 && getPageNumbers().map((page) => (

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

                            ))}

                            {notifopt.page != notifopt.total_pages ?
                                <li className='page-item'>
                                    <a className='page-link' onClick={() => handlePageClick(notifopt.page + 1)}>
                                        Next
                                    </a>
                                </li> : ""}

                            {notifopt.page != notifopt.total_pages ? <li className='page-item'>
                                <a className='page-link' onClick={() => handlePageClick(notifopt.total_pages)}>
                                    Last
                                </a>
                            </li> : ""}
                        </ul>
                    </div>
                </div>
            </div>

        </>
    );


}

export default allNotification
