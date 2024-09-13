import env from "../../src/config/api";
import Head from "next/head";


export const getStaticProps = async () => {
    try {
        const params: any = {
            id: 32,
            status: 'active',
        };

        const queryString = new URLSearchParams(params).toString();
        const response = await fetch(`${env.base_url}project/page-details?${queryString}`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();

        return {
            props: {
                prp: data // Assuming the fetched data structure matches what's expected
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
const deliveryshipping = (prp) => {

    return (
        <>

            <Head>
                <title>{`${prp?.prp?.data[0].page_title}`}</title>
                <meta name="description" content={`${prp?.prp?.data[0].page_desc}`} />
            </Head>

            {/* <section className="inner_banner_wp" style={{ backgroundImage: `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>Delivery & Shipping</h1>
                </div>
            </section> */}

            <section className="breadcrumb_sec">
                <div className="container">
                    <div className="row">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Delivery & Shipping</li>

                        </ul>
                    </div>
                </div>
            </section>

            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="shipping_d">
                                <h5>
                                    What are the delivery charges?
                                </h5>
                                <p>Delivery charge varies with each Seller.</p>
                                <p>Sellers incur relatively higher shipping costs on low value items. In such cases, charging a nominal delivery charge helps them offset logistics costs. Please check your order summary to understand the delivery charges for individual products.</p>
                                <p> For Products listed as Artist Plus, a Rs 40 charge for delivery per item may be applied if the order value is less than Rs 500. While, orders of Rs 500 or above are delivered free.</p>
                                <p>
                                    Why does the delivery date not correspond to the delivery timeline of X-Y business days?
                                </p>
                                <p>It is possible that the Seller or our courier partners have a holiday between the day your placed your order and the date of delivery, which is based on the timelines shown on the product page. In this case, we add a day to the estimated date. Some courier partners and Sellers do not work on Sundays and this is factored in to the delivery dates.</p>
                                <h5>
                                    What is the estimated delivery time?
                                </h5>
                                <p>Sellers generally procure and ship the items within the time specified on the product page. Business days exclude public holidays and Sundays.</p>
                                <p>Estimated delivery time depends on the following factors:</p>
                                <ul>
                                    <li>The Seller offering the product</li>
                                    <li>Product's availability with the Seller </li>
                                    <li>The destination to which you want the order shipped to and location of the Seller.</li>
                                </ul>
                                <h5>
                                    Are there any hidden costs (sales tax, octroi etc) on items sold by Sellers on Artist?
                                </h5>
                                <p>There are NO hidden charges when you make a purchase on Artist. List prices are final and all-inclusive. The price you see on the product page is exactly what you would pay.</p>
                                <p>Delivery charges are not hidden charges and are charged (if at all) extra depending on the Seller's shipping policy.</p>
                                <h5>
                                    Why does the estimated delivery time vary for each seller?
                                </h5>
                                <p>You have probably noticed varying estimated delivery times for sellers of the product you are interested in. Delivery times are influenced by product availability, geographic location of the Seller, your shipping destination and the courier partner's time-to-deliver in your location.</p>
                                <p>Please enter your default pin code on the product page (you don't have to enter it every single time) to know more accurate delivery times on the product page itself.</p>
                                <h5>
                                    Seller does not/cannot ship to my area. Why?
                                </h5>
                                <p>Please enter your pincode on the product page (you don't have to enter it every single time) to know whether the product can be delivered to your location.</p>
                                <p>If you haven't provided your pincode until the checkout stage, the pincode in your shipping address will be used to check for serviceability.</p>
                                <p>Whether your location can be serviced or not depends on</p>
                                <ul>
                                    <li>Whether the Seller ships to your location</li>
                                    <li>Legal restrictions, if any, in shipping particular products to your location</li>
                                    <li>The availability of reliable courier partners in your location</li>
                                </ul>
                                <p>At times Sellers prefer not to ship to certain locations. This is entirely at their discretion.</p>
                                <h5>
                                    Why is the CoD option not offered in my location?
                                </h5>
                                <p>Availability of CoD depends on the ability of our courier partner servicing your location to accept cash as payment at the time of delivery.</p>
                                <p>Our courier partners have limits on the cash amount payable on delivery depending on the destination and your order value might have exceeded this limit. Please enter your pin code on the product page to check if CoD is available in your location.</p>
                                <h5>
                                    I need to return an item, how do I arrange for a pick-up?
                                </h5>
                                <p>Returns are easy. Contact Us to initiate a return. You will receive a call explaining the process, once you have initiated a return.</p>
                                <p>Wherever possible Ekart Logistics will facilitate the pick-up of the item. In case, the pick-up cannot be arranged through Ekart, you can return the item through a third-party courier service. Return fees are borne by the Seller.</p>
                                <p>
                                    I did not receive my order but got a delivery confirmation SMS/Email.
                                </p>
                                <p>In case the product was not delivered and you received a delivery confirmation email/SMS, report the issue within 7 days from the date of delivery confirmation for the seller to investigate.</p>
                                <h5>
                                    What do the different tags like "In Stock", "Available" mean?
                                </h5>
                                <p>
                                    'In Stock'
                                </p>
                                <p>For items listed as "In Stock", Sellers will mention the delivery time based on your location pincode (usually 2-3 business days, 4-5 business days or 4-6 business days in areas where standard courier service is available). For other areas, orders will be sent by Registered Post through the Indian Postal Service which may take 1-2 weeks depending on the location.</p>
                                <p>
                                    'Available'
                                </p>
                                <p>The Seller might not have the item in stock but can procure it when an order is placed for the item. The delivery time will depend on the estimated procurement time and the estimated shipping time to your location.</p>
                                <p>
                                    'Preorder' or 'Forthcoming'
                                </p>
                                <p>Such items are expected to be released soon and can be pre-booked for you. The item will be shipped to you on the day of it's official release launch and will reach you in 2 to 6 business days. The Preorder duration varies from item to item. Once known, release time and date is mentioned. (Eg. 5th May, August 3rd week)</p>
                                <p>
                                    'Out of Stock'
                                </p>
                                <p>Currently, the item is not available for sale. Use the 'Notify Me' feature to know once it is available for purchase.</p>
                                <p>
                                    'Imported'
                                </p>
                                <p>Sometimes, items have to be sourced by Sellers from outside India. These items are mentioned as 'Imported' on the product page and can take at least 10 days or more to be delivered to you.</p>

                                <p>The item is popular and is sold out. You can however 'book' an order for the product and it will be shipped according to the timelines mentioned by the Seller.</p>

                                <p>The product is currently out of stock and is not available for purchase. The product could to be in stock soon. Use the 'Notify Me' feature to know when it is available for purchase.</p>

                                <p>This product is no longer available because it is obsolete and/or its production has been discontinued.</p>

                                <p>This product is not available because it is no longer being published and has been permanently discontinued.</p>
                                <h5>
                                    Does Artist deliver internationally?
                                </h5>
                                <p>As of now, Artist doesn't deliver items internationally.</p>
                                <p>You will be able to make your purchases on our site from anywhere in the world with credit/debit cards issued in India and 21 other countries, but please ensure the delivery address is in India.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


        </>

    )
}
deliveryshipping.ignorePath = true

export default deliveryshipping