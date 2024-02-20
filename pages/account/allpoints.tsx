import Link from "next/link";
import { CSSProperties } from 'react';

const allpoints = () => {
   

  
    return (
        <>
            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>They're Talking About Us</h1>
                        </div>
                    </div>
                </div>
            </div>

          <div className='container container-point'>
                    <div className='row'>
                        <div className='col-sm-4'>
				<div className="all-point"> 
					<span> The Parisian: </span>
                            	<figure>
				<a href="https://www.leparisien.fr/hauts-de-seine-92/rueil-malmaison-92500/rueil-il-a-cree-un-site-qui-change-la-vie-aux-grands-bricoleurs-21-08-2015-5025473.php">
				<img src="/img/press_7.png" alt="Machining" />
				</a>
                            </figure>
				 </div>
                        </div>
                        <div className='col-sm-4'>
				<div className="all-point"> 
				<span> L'Usine Nouvelle: </span>
                            <figure>
				<a href="https://www.usinenouvelle.com/article/vous-avez-besoin-d-une-piece-un-site-internet-met-en-relation-usineurs-et-clients.N373031">
                                <img src="/img/press_2.png" alt="Machining" />
				</a>
                            </figure>
				 </div>		
                        </div>
                        <div className='col-sm-4'>
				<div className="all-point"> 
				<span> Magazine Système D :  </span>
                            <figure>
				<a href="https://www.usineur.fr/page/Systeme_D">
                                <img src='/img/press_3.png' />
				</a>
                            </figure>
                        </div>
				 </div>
                        <div className='col-sm-4'>
				
				<div className="all-point">
					 <span> L'Argus :  </span>
                            <figure>
				<a href="https://www.largus.fr/pros/actualite-automobile/un-site-pour-lusinage-de-pieces-en-petites-series-7977385.html">
                                <img src='/img/press_4.png' />
				</a>
                            </figure>
                        </div>
					 </div>
                        <div className='col-sm-4'>
					<div className="all-point"> 
				 <span> Magazine Enduro Mag:  </span>
                            <figure>
				<a href="https://www.usineur.fr/page/enduro-mag">
                                <img src='/img/press_7.png' />
				</a>
                            </figure>
                        </div>
				 </div>
                        <div className='col-sm-4'>
				<div className="all-point"> 
					 <span> Magazine Echappement :  </span>
                            <figure>
				<a href="https://moto-station.com/moto-revue/actu/usineur-fr-un-site-pour-faire-usiner-vos-pieces/34714">
                                <img src='/img/press1.jpg' />
				</a>
                            </figure>
				 </div>
                        </div>
                       
                    </div>
                    </div>
          

        </>
    )
}

allpoints.ignorePath = true

export default allpoints;