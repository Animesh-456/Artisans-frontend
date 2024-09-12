import Link from "next/link";
import { CSSProperties } from 'react';
import env from "../../src/config/api";



export const getStaticProps = async () => {
    try {
        const response = await fetch(`${env.base_url}project/page-details`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();


        const params: any = {
            id: 21,  // Extracted ID from the first API response
            status: 'active', // Any other parameters you want to pass
        };

        // Convert params object to query string
        const queryString = new URLSearchParams(params).toString();
        const response2 = await fetch(`${env.base_url}project/page-content-details?${queryString}`);
        if (!response2.ok) {
            throw new Error('Failed to fetch data from the second API');
        }
        const data2 = await response2.json();

        return {
            props: {
                prp: data,
                prp2: data2 // Assuming the fetched data structure matches what's expected
            }
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        return {
            props: {
                prp: null // Or any default value indicating an error occurred
            }
        };
    }
};

const privacy = (prp) => {


    console.log("prp2 is", prp?.prp2)


    return (
        <>


            <div
                className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Privacy Policy</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className='container container-point'>
                <div className="qwe91" id="qwe92">
                    <h3>For users of the Aartstudio website</h3>
                    <p>Respect for the privacy of visitors is a fundamental value of Aartstudio. The following paragraphs are intended to inform you about our privacy policy vis-à-vis visitors to our site.</p>
                    <h3>A. Right of access to personal information</h3>
                    <p>If you have chosen to contact us by e-mail or via a form on the site, your name and contact details will be saved in order to process your request. This information is kept on an isolated and secure medium. Under no circumstances Aartstudio does not share, sell or rent personal information or contacts to third parties (except at your express request or if you have explicitly consented to be contacted by a partner of Aartstudio).
                        Any change likely to occur in the protection of your personal data online will be communicated on the Aartstudio website.
                        The Clients-Prospects file constituted as registrations are made on the Aartstudio e-commerce website has been declared to the CNIL (Commission Nationale Informatique et Libertés) under the number ...... In addition, in accordance with to the law of January 6, 1978 known as "Informatique et Libertés", you have the right to access, rectify, modify and delete information concerning you. You can exercise this right by writing to .
                        <a href="#"> admin@Aartstudio </a>
                    </p>
                    <h3>B. Confidentiality and traffic measurement on our site
                    </h3>
                    <p>Like most websites, the Aartstudio site monitors the traffic of its own site in order to improve its content and your browsing comfort. This solution does not collect any personal information about visitors to Aartstudio sites. This solution only collects anonymous data that cannot be linked to personal information. The data thus constituted is compiled into statistics without the creation of individual profiles.
                    </p>

                    <h3>1. Data collection: what data and why?
                    </h3>
                    <p>
                        The Aartstudio e-commerce site collects IP (internet protocol) addresses only temporarily in order to identify a visit in progress, and to determine the visitor's path (the order of the pages visited). After saving this anonymous data, the IP address is deleted. At no time is the IP address linked to anonymous data to create an individual profile. The Aartstudio site records the pages viewed on the site, the average time of consultation per page and the duration of the visit to generate general statistics on the traffic of its site. The entry and exit pages of the site, as well as the respective referral links and the keywords used in search engines are also stored in the database. The site of info@aartstudion.com.
                    </p>
                    <h3>2. Limited use of cookies
                    </h3>
                    <p>
                        A cookie is a small sequence of text stored by the browser on your computer's hard drive. For more information on cookies, you can consult the CNIL website (Commission Nationale Informatique et Libertés), or the CookieCentral website (in English).
                        The Aartstudio site uses cookies to recognize returning visitors to our site and to speed up the resolution of IP addresses (which helps to visualize the groups of visitors sent by the same reference link). Our cookies do not include any personal information about the visitor. They are used for the site to recognize you and facilitate a new order.
                        You can disable the cookies function by changing the setting of the internet browser on your computer. This may have the effect of making certain functionalities of the Aartstudio site inaccessible.
                    </p>
                    <h3>
                        3. Who can access this data?
                    </h3>
                    <p>
                        Only authorized Aartstudio site personnel can view the consolidated statistics generated by our solution. Consultation of these anonymous reports is protected by a password. Our employees are contractually bound to respect the confidentiality of this data.
                    </p>

                    <h3>
                        4. Where is the data stored?

                    </h3>
                    <p>
                        The Aartstudio site stores data relating to visitors to its site in a black box secured by a network equipment system dedicated to data protection.
                    </p>
                    <h3>
                        5. User Agreement

                    </h3>
                    <p>
                        By visiting this site, you agree to the collection of data as set out in this privacy policy.


                    </p>
                    <h3>
                        6. Link to other sites
                    </h3>
                    <p>
                        This site contains links to other sites which may not fall within the scope of this privacy statement. Aartstudio is not responsible for the privacy policies or content of other sites.

                        C. No spam on the Aartstudio e-commerce site

                        The Aartstudio site does not sell or rent its customer databases under any conditions.

                        See also <a href="#">Aartstudio</a>
                    </p>

                </div>
            </div>


        </>
    )
}

privacy.ignorePath = true

export default privacy;