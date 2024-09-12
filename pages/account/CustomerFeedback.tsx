import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import Link from "next/link";
import React, { useEffect } from "react";
import { ProjectDetails } from "../../src/@types/type";
import api from "../../src/api/services/api";
import atom from "../../src/jotai/atom";
import Routes from "../../src/Routes";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import { BsCheckCircleFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import Router from "next/router";

type Props = {};



const RedirectProject = () => {
        //const router = useRouter();
        //  router.push(localStorage.getItem('items'))
        // window.location.href=localStorage.getItem('items')
        Router.replace(localStorage.getItem('items'))

}
const jobs = () => {


        const UserData = JSON.parse(localStorage.getItem('UserData'));
        const ProjectData = JSON.parse(localStorage.getItem('ProjectData'));

        return (
                <>

                        <div style={{ width: '100%', background: '#365d9c', height: '80px', paddingTop: '20px', paddingLeft: '40px', paddingBottom: '20px' }}>
                                <h3 style={{ color: 'whitesmoke', marginBottom: '10px' }}>Evaluations</h3>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh', }}>

                                <div style={{ border: '2px solid #8fe7f2', padding: '40px' }}>

                                        <div style={{ fontSize: '24px' }}>Evaluation</div>

                                        <table style={{ width: '900px' }}>
                                                <tr style={{ background: '#365d9c', color: 'whitesmoke', padding: '10px', paddingBottom: '10px' }}>
                                                        <th >Nom Du Project</th>
                                                        <th></th>
                                                        <th >artist</th>
                                                        <th >Statut</th>
                                                </tr>
                                                <tr>
                                                        <td style={{ color: '#365d9c' }}>{ProjectData.project_name} </td>
                                                        <td>
                                                                <Button onClick={RedirectProject} style={{ background: '#d6c940', color: 'black', borderRadius: '12px', fontSize: '16px', fontWeight: 'bold' }} >Evaluer</Button>
                                                        </td>
                                                        <td style={{ color: 'gray' }}> {ProjectData.programmer.user_name}   </td>
                                                        <td style={{ color: 'gray' }}>En Attente</td>
                                                </tr>

                                        </table>
                                </div>


                        </div>







                </>
        );
};

export default jobs;