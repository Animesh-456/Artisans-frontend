

import env from "../../src/config/api";


export const getStaticProps = async () => {
    try {
        const response = await fetch(`${env.base_url}project/page-details`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();


        const params: any = {
            id: 39,  // Extracted ID from the first API response
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


const help = (prp) => {

    console.log("prp2 is", prp?.prp2)

    return (
        <>

            <div className='banner_wp sign_banner'
                style={{ backgroundImage: "url(/img/banner1.jpg)" }}>
                <div className='container'>
                    <div className='row'>
                        <div className='banner_text inner_banner_text'>
                            <h1 className='yh'>Help - Project Page</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container cjw">
                <div className="col-sm-12 howit5">


                    <h5>What will happen after I've selected a Artist offer?</h5>

                    <p>Once you've selected an offer, you can order by paying the amount required on Artist's secured account. The price indicated in the offer is the total price. There will be no additional fees or charges. Shipping fees are included in the price.</p>
                    <p>The funds you have paid will be transferred to the Artist once you've received and inspected the machined parts.</p>

                    <p>

                        Once an offer is selected, you will not be able to change the price of the offer. If you need to change the content of your offer, such as the quantity or the material desired, ask the Artist to update his bid price before you select his offer.</p>

                    <h5>How much will my machined parts cost?</h5>

                    <p>The total cost will be the price of the offer you selected. There are no additional fees or charges. Shipping fees are included in the price.</p>

                    <p>How do I add a file or a comment to my request?</p>

                    <p>1. Log on to the site with your password.</p>
                    <p>2. Click on "Add a Comment" and then add text and/or files. The Artists who made an offer will be notified by email that your request has been updated.</p>



                    <h5>How do I pay and where do I buy the parts?</h5>
                    <p>On Aartstudio, buyers buy the custom parts from their Artist. Aartstudio is used as a matchmaking service and does not sell machine parts itself.</p>

                    <p>To order, the buyer pays the amount of the offer on the Aartstudio secure account. After obtaining the receipt and inspecting the parts, the buyer releases the funds with a simple click and the Artist gets paid. This allows:</p>

                    <p>By ticking the box "I have read and accept the general conditions of use of artist" in the registration form, you designate yourself as a "Client" or as a "artist". “Clients” are entities seeking companies that can provide parts artist services. The term “Artist” is used in this Agreement to represent parts artist service providers who seek assignments and complete projects posted by Customers.</p>


                    <ul>
                        <li>The buyer not to take any risk in paying for unfit machine parts.</li>
                        <li>The Artist is sure to be paid for quality work.</li>
                    </ul>

                    <h5>Who sends me the invoice, the Artist, or Aartstudio?</h5>

                    <p>The Artist needs to send you the invoice. You buy the parts from your Artist. Aartstudio is a matchmaking service and does not provide any parts itself.</p>



                    <h5>What are the means of payment?</h5>

                    <p>Payments are made by classic means: credit card, Visa, Paypal and MasterCard. Customized solutions are available for companies (contact us on admin@Aartstudio.co.uk).</p>

                    <h5>What criteria should I consider to select an offer?</h5>

                    <p>To select an offer, consider the price, delivery time and the information available to you about the Artist.The information comes in the feedback received, the number of completed orders, and their profile page.</p>

                    <h5>I selected an offer, but now I want to change my request. How can I update the price?</h5>

                    <p>Once you've selected an offer, your Artist will not be able to change the price of this offer. Post a new request and notify your Artist with a message to invite him to post a new offer.</p>



                    <h5>I want to cancel my request. How can I do it?</h5>
                    <p>Add a comment to your request by clicking on "Add a Comment" to say that you cancel it.</p>

                    <p>The Artists who have made an offer will be notified by email.</p>

                    <p>Thank you !</p>

                    <h5>What happens if I'm not satisfied with a part?</h5>

                    <p>We invite you to first contact your Artist and explain what is wrong. The Artists are very attentive to their customers' satisfaction and your Artist will certainly try to propose you a solution that will satisfy you.</p>
                    <br />
                    <p>If the part does not comply with the blueprint and the description you provided in your request, you are not required to pay the Artist. The funds you've deposited with the order will be returned to you at your request. (Contact us at admin@Aartstudio.co.uk.)</p>

                    <h5>What's happens if there is any dispute?</h5>
                    <p>A dispute may occur if you don't agree with the Artist on the quality of the service provided, or if the order isn't shipped on time.</p>

                    <p>In case of a breach by the Artist to the quality of the service or product received, or if the Artist has missed any deadlines, the money paid when you ordered will be returned without any fee.
                        In case of a dispute, Aartstudio will provide arbitration based on all written content available, such as the job description, the blueprints provided, and messages on the site mailbox. </p>

                    <p>Aartstudio may need to ask to examine the machined parts.</p>

                    <p>Aartstudio will always encourage the two sides to find a compromise, and in the absence of an agreement, Aartstudio will be entitled to make the decision on the amount to be transferred to one or both sides.</p>

                    <p>If one of the two sides don't answer to any request, 15 days after being requested by Aartstudio, the funds will be transferred to the other side.</p>

                    <p>Since the launch of Aartstudio, only a few disputes were recorded. We invite you to review the evaluations received by the Artists, which reach an average of 4.8 out of 5.</p>

                    <br />
                    <p>For any questions, do not hesitate to contact us on admin@Aartstudio.co.uk. We'll be happy to help.</p>
                </div>
            </div>

        </>

    )
}
help.ignorePath = true
export default help