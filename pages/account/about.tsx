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
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                <br /><br />
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="missionwp"  style={{ backgroundImage: `url(../img/about-bg.jpg)` }} >
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="heading_title">
                                <h1>About Art Studio</h1>
                            </div>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                <br /><br />
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
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
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                                <br /><br />
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section className="customer_wp" style={{ backgroundImage: `url(../img/bg4.jpg)` }}>
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