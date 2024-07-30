import CustomerSays from "../CustomerSays"

const about = () => {
    return (
        <>


            <section className="inner_banner_wp" style={{ backgroundImage: `url(../img/inner-banner.jpg)` }} >
                <div className="container">
                    <h1>Who Are You</h1>
                </div>
            </section>

            <section className="about_wp">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <img src="../img/about-img1.jpg" alt="" />
                        </div>
                        <div className="col-sm-6">
                            <div className="heading_title">
                                <h1>About Art Studio</h1>
                            </div>
                            <p>
                                <b>AARTSTUDIO</b>  is an innovative online platform that connects individuals looking for custom art with a diverse community of skilled artisans. <br />
                                Here's how it works:


                                <br /><br />
                                <b>Posting a Requirement:</b>  Users can post their custom art requirements on the platform, detailing their specific needs, preferences, and any other relevant information.

                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="missionwp"  >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="heading_title">
                                <h1>About Art Studio</h1>
                            </div>
                            <p>
                                <b>Receiving Quotations:</b> Once a requirement is posted, artisans enlisted on the platform will review the request and send their quotations. These quotations include their proposed price, timeframe, and any other pertinent details.
                                <br /><br />
                                <b>Reviewing Artisans:</b> Users can view profiles of the artisans who send quotations. These profiles include previous work samples, customer reviews, ratings, and other relevant information to help the user make an informed decision.
                            </p>
                        </div>
                        <div className="col-sm-6">
                            <img src="../img/about-img2.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <section className="about_wp">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <img src="../img/about-img3.jpg" alt="" />
                        </div>
                        <div className="col-sm-6">
                            <div className="heading_title">
                                <h1>Our Story</h1>
                            </div>
                            <p>
                                <b>Selecting an Artisan:</b> After reviewing the quotations and artisan profiles, the user can select the artisan that best fits their requirements, budget, and artistic style.
                                <br /><br />
                                <b>Completion and Delivery:</b> The selected artisan completes the custom art piece according to the agreed terms, and upon completion, the user receives their unique artwork.

                                <br /><br />
                                <b>AARTSTUDIO</b> aims to streamline the process of commissioning custom art, ensuring a seamless and satisfying experience for both the client and the artist.

                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="customer_wp" >
                <div className="container">
                    <div className="heading_title testimonial_heading">
                        <h1>What Our Customers Are Saying</h1>
                    </div>
                    <div className="owl-carousel owl-carousel1 owl-theme">
                        <CustomerSays />
                    </div>
                    <div className="testimonial_animation">
                        <img src="../img/icon1.png" alt="" />
                    </div>
                </div>
            </section>


        </>
    )
}
about.ignorePath = true

export default about