import env from "../../src/config/api";

export const getStaticProps = async () => {
    try {
        const response = await fetch(`${env.base_url}project/page-details`);
        if (!response.ok) {
            throw new Error('Failed to fetch');
        }
        const data = await response.json();


        const params: any = {
            id: 19,  // Extracted ID from the first API response
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



const terms = () => {

    return (
        <>

            <section className="inner_banner_wp" style={{ backgroundImage: `url(../img/inner-banner.jpg)` }}>
                <div className="container">
                    <h1>Terms of Service</h1>
                </div>
            </section>


            <section className="myproject">
                <div className="container">
                    <div className="row">
                        <div className="help_wp">
                            <h5>Click On The "Register" Button</h5>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>
                            <h5>Users</h5>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
                            </p>
                            <h5>Services</h5>
                            <p>
                                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting
                            </p>
                            <h5>System Integrity</h5>
                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>

                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}
terms.ignorePath = true

export default terms