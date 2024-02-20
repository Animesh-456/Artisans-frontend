import { useAtom, useAtomValue } from "jotai";
import moment from "moment";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { UserDetails, ProjectDetails } from "../../src/@types/type";
import api from "../../src/api/services/api";
import atom from "../../src/jotai/atom";
import Routes from "../../src/Routes";
import AccountSideBar from "../../src/views/account/edit-profile/SideBar";
import { BsCheckCircleFill, BsFillCaretRightFill } from "react-icons/bs";
import { Button } from "react-bootstrap";
import { toast } from "react-hot-toast";
import Router from "next/router";



type Props = {};



const jobs = () => {

  let currprojectData = JSON.parse(localStorage.getItem('ProjectData'))
  //let currUserData = JSON.parse(localStorage.getItem('UserData'))
  const projectdata = useAtomValue<ProjectDetails>(atom.project.api.detail);
  const machData = useAtomValue<UserDetails>(atom.auth.api.machanic_details);
  //const customerData = useAtomValue<UserDetails>(atom.auth.api.me);
  const project_id = useAtomValue(atom.storage.project_id);
const project_data = useAtomValue(atom.storage.project_data);
	console.log("project id--->",project_data);

const deliveryData = useAtomValue(atom.auth.api.delivery_contacts);

  //const [userData, setuserData] = useState(currUserData);
  const [projectData, setprojectData] = useState(currprojectData);
  const [check,setCheck] = useState(false);
const [chk, setchk] = useState(true)

	console.log("proj data-->>>>><<<",currprojectData);

const customer_releasepayment_checkbox = useAtomValue(atom.project.api.customer_releasepayment_checkbox)





  useEffect(() => {
    api.project.detail({ params: { id: project_data.id } })
    api.auth.delivery_contacts({ params: { id: project_id } })

    api.auth.machanic_details({ params: { mach_id: project_data?.programmer_id } })
    api.auth.me({});
    api.project.customer_releasepayment_checkbox({
      params: {
        id: project_id
      }
    })

  }, []);

  const confirmFund = () => {

    api.wallet.pay_machinist(
			{
				body: {
					project_id: projectdata?.id?.toString(),
					
				},
				params:{
				chkstate:chk
					},
			},
			() => {
				setprojectData((p) => {
					return { ...p, project_status: "5" };
				});
       // window.location.href = 'http://35.179.7.135/account/FundSuccess'
			Router.replace(`/account/FundSuccess`)
				
			},
		);
   

  }

  const returnClick = ()=>{

    //window.location.href = `http://35.179.7.135/machining/${projectdata?.project_name?.split(" ").join("-")}-${projectdata?.id}`
	Router.replace(`/machining/${projectdata?.project_name?.split(" ").join("-")}-${projectdata?.id}`)
  }

  let bidData: any = {}

  bidData = projectdata?.bids?.find(c => c.bid_amount_gbp)

const checkstate = ()=>{
    if(chk == true){
      setchk(false)
    }else{
      setchk(true)
    }
  }






  return (
    <>

      <div
        className='banner_wp sign_banner'
        style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
        <div className='container'>
          <div className='row'>
            <div className='banner_text inner_banner_text'>
              <h1 className='yh'>RELEASE PAYMENT</h1>

            </div>
          </div>
        </div>
      </div>

      {/* <div style={{ width: '100%', background: '#365d9c', height: '80px', paddingTop: '20px', paddingLeft: '40px', paddingBottom: '20px' }}>
        <h3 style={{ color: 'whitesmoke', marginBottom: '10px' }}>Free up Funds for your Machinist</h3>
      </div> */}

      <div className="container">
        <div className="col-sm-12">
          <div className="tydh3">
          <p>You have received your parts and are satisfied with the result. You can now pay your Usineur by releasing the funds you deposited during your order.</p>
            <div className="table-responsive">             
              <table className="table table-bordered">
                <tr className="table-primary">
                  <th >Project title</th>
                  <th >{projectData?.project_name}</th>
                  <th  >Price:</th>
                  <th >{bidData?.bid_amount_gbp}</th>
                </tr>


                <tr>
                  <td ><BsFillCaretRightFill color='#365d9c' /> Machinist: </td>
                  <td> {project_data?.programmer.user_name}     </td>
                  <td ><BsFillCaretRightFill color='#365d9c' /> Client:</td>
                  <td >{project_data?.creator.user_name}</td>
                </tr>


                <tr>
                  <td><BsFillCaretRightFill color='#365d9c' /> Numero d'Identification(SIREN): </td>
                  <td> {project_data?.id}   </td>
                  <td><BsFillCaretRightFill color='#365d9c' /> Customer address:</td>
 		<td>{deliveryData?.address + ", " + deliveryData?.city + ", " + deliveryData?.postalcode}</td>                </tr>
                <tr>
                  <td><BsFillCaretRightFill color='#365d9c' /> Machinist's Address: </td>
                  <td> {machData?.address1 + ", " + machData?.city + ", " + machData?.country_code_country?.country_name + ", "
                    + machData?.zcode} </td>
                  <td></td>
                  <td></td>

                </tr>
                

              </table>
            </div>
            <div className="tydh1">
                <Button onClick={returnClick}> Return</Button>
                <Button onClick={confirmFund} > Release Funds </Button>
              </div>
          </div>
        </div>
      </div>

{projectdata?.visibility?.toLowerCase() == "public" && Object.keys(customer_releasepayment_checkbox).length ? (
        <div className='form-check signcheck'>
          <label className='form-check-label'>
            <input type='checkbox' checked={chk} onChange={checkstate} className='form-check-input' />I authorize Usineur.fr to publish on the site any photos of my part(s) that my machinist has sent me.
          </label>
        </div>
      ) : (<></>)}

     





    </>
  );
};

export default jobs;
