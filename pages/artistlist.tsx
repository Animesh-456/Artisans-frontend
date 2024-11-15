import React, { useEffect, useState } from "react";
import api from "../src/api/services/api";
import atom from "../src/jotai/atom";
import { useAtom, useAtomValue } from "jotai";
import common from "../src/helpers/common";
import { CSSProperties } from 'react';
import { useRouter } from "next/router";
import Link from "next/link";
import Offcanvas from 'react-bootstrap/Offcanvas';

const Artistlist = () => {
    const router = useRouter();


    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [ratingOrder, setratingOrder] = useState("high-to-low");
    const [opt, setOpt] = useAtom(atom.project.api.list_opt);
    const [category, setCategory] = useState("");
    const Category_subcategory: any = useAtomValue(atom.project.api.get_category_subcategory)

    const handleSortChange = async (e) => {
        const newRatingOrder = e.target.value;
        setratingOrder(newRatingOrder);

        // Ensure category is the correct state that holds the selected categories
        await router.replace({
            pathname: router.pathname,
            query: {
                page: 1,
                ratingOrder: newRatingOrder,
                categories: category,
                searchQuery: searchQuery
            },
        });

        // Add a 2-second delay if needed
        // setTimeout(() => {
        //     api.project.artist_list({
        //         params: {
        //             page: 0, // Matching the page from router.replace
        //             ratingOrder: newRatingOrder,
        //             categories: category,
        //         },
        //     });
        // }, 2000);  // Delays the API call by 2 seconds
    };


    const visiblePages = 10;
    const getPageNumbers = () => {
        const startPage = Math.max(0, opt.page - Math.floor(visiblePages / 2));
        const endPage = Math.min(opt.total_pages, startPage + visiblePages - 1);

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
    };


    useEffect(() => {
        const pageQueryParam = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;

        api.project.artist_list({ params: { page: 0, ratingOrder: ratingOrder, categories: category, searchQuery: searchQuery } })

        api.project.get_category_subcategory({})

    }, [])

    const [list, setlist] = useAtom(atom.project.api.artist_list);


    const handlePageClick = (i) => {

        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: i + 1,
                    ratingOrder: ratingOrder,
                    category: category,
                    searchQuery: searchQuery
                },
            })
            .then(() => {
                api.project.artist_list({ params: { page: i, ratingOrder: ratingOrder, categories: category, searchQuery: searchQuery } })
            });
    };


    useEffect(() => {
        const pageQueryParam = new URLSearchParams(location.search).get('ratingOrder');
        const pageQueryParam2 = new URLSearchParams(location.search).get('category');

        const pageQueryParam3 = new URLSearchParams(location.search).get('searchQuery');
        const urlsearchQuery = pageQueryParam3 || "";



        if (!pageQueryParam) return
        if (pageQueryParam != ratingOrder) {
            setratingOrder(pageQueryParam)
        }

        if (pageQueryParam2 != category) {
            setCategory(pageQueryParam2)
        }

        if (searchQuery != urlsearchQuery) {
            setSearchQuery(urlsearchQuery)
        }


        // setTimeout(() => {
        //     api.project.artist_list({ params: { ...opt, page: pageNumber - 1, ratingOrder: pageQueryParam, categories: pageQueryParam2 } })
        // }, 1000);


        return
    }, [location.search])

    const handleCategoryChange = async (e) => {
        const newCategory = e.target.value;
        setCategory(newCategory);

        await router.replace({
            pathname: router.pathname,
            query: {
                page: 1,
                ratingOrder: ratingOrder,
                category: newCategory,
                searchQuery: searchQuery
            },
        });

        // Add 2-second delay before the API call
        // setTimeout(() => {
        //     api.project.artist_list({
        //         params: {
        //             page: 0,
        //             ratingOrder: ratingOrder,
        //             categories: newCategory,
        //         },
        //     });
        // }, 2000); // Delay the API call by 2 seconds
    };



    const handleCategoryCheck = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const { checked } = e.target;

        let updatedCategories = category ? category.split(',').map(Number) : [];

        if (checked) {
            // Add category ID if checked
            updatedCategories.push(id);
        } else {
            // Remove category ID if unchecked
            updatedCategories = updatedCategories.filter((catId) => catId !== id);
        }

        // Convert array back to comma-separated string
        setCategory(updatedCategories.join(','));
    }

    const handleApplyFilter = () => {
        router
            .replace({
                pathname: router.pathname,
                query: {
                    page: 1,
                    ratingOrder: ratingOrder,
                    category: category,
                    searchQuery: searchQuery
                },
            }).then(() => {
                api.project.artist_list({ params: { page: 0, ratingOrder: ratingOrder, categories: category, searchQuery: searchQuery } })
                setShow(false)
            });
    }

    const isCategorySelected = (id: number) => {
        return category?.split(',').map(Number).includes(id);
    };


    //console.log("categories are", category)

    return (
        <div>

            <section className="breadcrumb_sec">
                <div className="container">
                    <div className="row">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item active">Artist and Artisans</li>
                        </ul>
                    </div>
                </div>
            </section>





            <section className="gallery_section1">
                <div className="container">
                    <div className="row desktop_filter">
                        {/* <div className="filter_section">
                            <div className="search_bar">
                                <input type="text" name="text" placeholder="Search.." value="" />
                                <i className="fa fa-search"></i>
                            </div>

                            <div className="no_dropdown all_categori">
                                <select value={ratingOrder} onChange={handleSortChange}>
                                    <option value="high-to-low">Rating High to Low</option>
                                    <option value="low-to-high">Rating Low to Hign</option>
                                    <option value="a-z">A to Z</option>
                                    <option value="z-a">Z to A</option>
                                    <option value="newest-oldest">Newest to Oldest</option>
                                    <option value="oldest-newest">Oldest to Newest</option>
                                </select>
                            </div>


                            <div className="all_categori">
                                <select value={category} onChange={handleCategoryChange}>
                                    <option value="">ALL Categories</option>
                                    {Category_subcategory?.categories?.map((cat) => (
                                        <option key={cat?.id} value={cat?.id}>{cat?.category_name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="post_request_button filter-btn">
                                <a style={{ color: "rgb(255, 255, 255)", cursor: "pointer" }}>Apply</a>
                            </div>

                        </div> */}

                        <div className="filter_section">

                            <div className="search_bar">
                                <input type="text" value={searchQuery} name="text" placeholder="Search by username" onChange={(e) => setSearchQuery(e.target.value)} />
                                <i className="fa fa-search"></i>
                            </div>

                            <div className="sort_dropdown all_categori">
                                <select value={ratingOrder} onChange={handleSortChange}>
                                    <option value="high-to-low">Rating High to Low</option>
                                    <option value="low-to-high">Rating Low to High</option>
                                    <option value="a-z">A to Z</option>
                                    <option value="z-a">Z to A</option>
                                    <option value="newest-oldest">Newest to Oldest</option>
                                    <option value="oldest-newest">Oldest to Newest</option>
                                </select>

                            </div>

                            <div className="all_categori">
                                <select value={category} onChange={handleCategoryChange}>
                                    <option value="">ALL Categories</option>
                                    {Category_subcategory?.categories?.map((cat) => (
                                        <option key={cat?.id} value={cat?.id}>{cat?.category_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="post_request_button filter-btn"><a style={{ cursor: 'pointer', color: "#fff" }} onClick={handleApplyFilter}>Apply</a></div>

                            <div className="sr">
                               
                                <p>Showing Results {opt.page * 50 + 1}-{Math.min((opt.page + 1) * 50, opt.total_count)}</p>

                            </div>
                        </div>
                    </div>
                    <div className="row mobile_filter">
                        <div className="bwp-top-bar">
                            <div className="button-filter-toggle">
                                <i className="fa fa-sliders" onClick={() => setShow(true)}></i>
                            </div>
                            {/* <div className="pwb-dropdown all_categori">
                                <select value={ratingOrder} onChange={handleSortChange}>
                                    <option value="high-to-low">Rating High to Low</option>
                                    <option value="low-to-high">Rating Low to Hign</option>
                                    <option value="a-z">A to Z</option>
                                    <option value="z-a">Z to A</option>
                                    <option value="newest-oldest">Newest to Oldest</option>
                                    <option value="oldest-newest">Oldest to Newest</option>
                                </select>
                            </div> */}

                            <div className="listingsearchmobile">
                                <div className="search_bar">
                                    <input type="text" value={searchQuery} name="text" placeholder="Search by username" onChange={(e) => setSearchQuery(e.target.value)} />
                                    <span>
                                        <i onClick={handleApplyFilter} className="fa fa-search"></i>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">

                                {list?.length ? list?.map((project) => {
                                    return (
                                        <>
                                            {/* <div className="col-sm-3 col-6">
                                                <div className="art_gallery art_profile_sec">
                                                    <a href={`/account/artist-profile/${l?.id}`} data-fancybox="gallery">
                                                        <img className="art-img1" src={common.get_profile_picture(
                                                            l?.logo) || "../img/no-images.png"} alt="artist-image" />
                                                    </a>
                                                    <h2>{l?.user_name}</h2>
                                                    <h3>{l?.totalJobs} Jobs</h3>

                                                    <div className="offr_star">
                                                        <span
                                                            className="stars"
                                                            style={{ '--rating': l?.avgRating?.toFixed(1) } as CSSProperties}
                                                        ></span>
                                                        <span>{l?.avgRating ? l?.avgRating?.toFixed(1) : "0.0"}</span>
                                                    </div>
                                                </div>
                                            </div> */}
                                            <div className="col-sm-3">
                                                <div className="top_artist_wp">
                                                    <div className="top_artist_sec">
                                                        <div className="top_artist_pic">
                                                        <a href={`/artist/${project?.user_name}/${project?.id}`}>
                                                            <img className="art-img1" src={common.get_profile_picture(
                                                                project?.logo) || "../img/no-images.png"} alt="art-image" />
                                                        </a>
                                                        </div>
                                                        <div className="top_artist_review">
                                                        <a href={`/artist/${project?.user_name}/${project?.id}`}>
                                                            <h4>{project?.user_name}</h4>
                                                        </a>
                                                            <h5><label>{project?.totalJobs} Jobs</label>
                                                                {/* <span><svg xmlns="http://www.w3.org/2000/svg" width="66" height="11" viewBox="0 0 66 11" fill="none">
                                                        <path d="M11.1141 4.15628C11.0407 3.92385 10.8406 3.75929 10.6048 3.73731L7.38803 3.43649L6.11676 0.370622C6.0229 0.145376 5.80934 0 5.57163 0C5.33392 0 5.12027 0.145376 5.02701 0.370622L3.75574 3.43649L0.538508 3.73731C0.302669 3.75973 0.102963 3.92429 0.0291678 4.15628C-0.0442024 4.3887 0.0235566 4.64364 0.201923 4.80478L2.63351 7.0011L1.91656 10.2539C1.8641 10.493 1.95422 10.7403 2.14687 10.8838C2.25042 10.9613 2.37208 11 2.49417 11C2.59908 11 2.70407 10.9713 2.79785 10.9135L5.57163 9.20504L8.3449 10.9135C8.54835 11.0387 8.80417 11.0272 8.99639 10.8838C9.18904 10.7403 9.27916 10.493 9.22671 10.2539L8.50975 7.0011L10.9413 4.80478C11.1196 4.64364 11.1875 4.38923 11.1141 4.15628Z" fill="#ef6100"></path><path d="M24.8282 4.15628C24.7548 3.92385 24.5547 3.75929 24.3189 3.73731L21.1021 3.43649L19.8309 0.370622C19.737 0.145376 19.5235 0 19.2857 0C19.048 0 18.8344 0.145376 18.7411 0.370622L17.4699 3.43649L14.2526 3.73731C14.0168 3.75973 13.8171 3.92429 13.7433 4.15628C13.6699 4.3887 13.7377 4.64364 13.916 4.80478L16.3476 7.0011L15.6307 10.2539C15.5782 10.493 15.6683 10.7403 15.861 10.8838C15.9645 10.9613 16.0862 11 16.2083 11C16.3132 11 16.4182 10.9713 16.512 10.9135L19.2857 9.20504L22.059 10.9135C22.2625 11.0387 22.5183 11.0272 22.7105 10.8838C22.9032 10.7403 22.9933 10.493 22.9408 10.2539L22.2239 7.0011L24.6555 4.80478C24.8337 4.64364 24.9016 4.38923 24.8282 4.15628Z" fill="#ef6100"></path><path d="M38.5428 4.15628C38.4694 3.92385 38.2693 3.75929 38.0335 3.73731L34.8167 3.43649L33.5455 0.370622C33.4516 0.145376 33.2381 0 33.0003 0C32.7626 0 32.549 0.145376 32.4557 0.370622L31.1845 3.43649L27.9672 3.73731C27.7314 3.75973 27.5317 3.92429 27.4579 4.15628C27.3845 4.3887 27.4523 4.64364 27.6306 4.80478L30.0622 7.0011L29.3453 10.2539C29.2928 10.493 29.3829 10.7403 29.5756 10.8838C29.6791 10.9613 29.8008 11 29.9229 11C30.0278 11 30.1328 10.9713 30.2266 10.9135L33.0003 9.20504L35.7736 10.9135C35.9771 11.0387 36.2329 11.0272 36.4251 10.8838C36.6178 10.7403 36.7079 10.493 36.6554 10.2539L35.9385 7.0011L38.3701 4.80478C38.5483 4.64364 38.6162 4.38923 38.5428 4.15628Z" fill="#ef6100"></path><path d="M52.2567 4.15628C52.1833 3.92385 51.9832 3.75929 51.7473 3.73731L48.5306 3.43649L47.2593 0.370622C47.1655 0.145376 46.9519 0 46.7142 0C46.4765 0 46.2629 0.145376 46.1696 0.370622L44.8983 3.43649L41.6811 3.73731C41.4452 3.75973 41.2455 3.92429 41.1717 4.15628C41.0984 4.3887 41.1661 4.64364 41.3445 4.80478L43.7761 7.0011L43.0591 10.2539C43.0067 10.493 43.0968 10.7403 43.2894 10.8838C43.393 10.9613 43.5147 11 43.6367 11C43.7417 11 43.8467 10.9713 43.9404 10.9135L46.7142 9.20504L49.4875 10.9135C49.6909 11.0387 49.9467 11.0272 50.139 10.8838C50.3316 10.7403 50.4217 10.493 50.3693 10.2539L49.6523 7.0011L52.0839 4.80478C52.2622 4.64364 52.33 4.38923 52.2567 4.15628Z" fill="#ef6100"></path><path opacity="0.3" d="M65.9708 4.15628C65.8974 3.92385 65.6973 3.75929 65.4614 3.73731L62.2447 3.43649L60.9735 0.370622C60.8796 0.145376 60.666 0 60.4283 0C60.1906 0 59.977 0.145376 59.8837 0.370622L58.6124 3.43649L55.3952 3.73731C55.1594 3.75973 54.9597 3.92429 54.8859 4.15628C54.8125 4.3887 54.8802 4.64364 55.0586 4.80478L57.4902 7.0011L56.7732 10.2539C56.7208 10.493 56.8109 10.7403 57.0036 10.8838C57.1071 10.9613 57.2288 11 57.3509 11C57.4558 11 57.5608 10.9713 57.6545 10.9135L60.4283 9.20504L63.2016 10.9135C63.405 11.0387 63.6609 11.0272 63.8531 10.8838C64.0457 10.7403 64.1359 10.493 64.0834 10.2539L63.3664 7.0011L65.798 4.80478C65.9763 4.64364 66.0442 4.38923 65.9708 4.15628Z" fill="#ef6100"></path>
                                                    </svg>
                                                    
                                                    </span> */}
                                                                <span
                                                                    className="stars"
                                                                    style={{ '--rating': project?.avgRating?.toFixed(1) } as CSSProperties}
                                                                ></span>
                                                            </h5>
                                                        </div>
                                                    </div>
                                                    <div className="top_artist_portfolio">
                                                        <a href={`/artist/${project?.user_name}/${project?.id}`}>

                                                            <img className="art-img1" src={common.get_portfolio_pic(
                                                                project?.programmer_portfolio[0]?.main_img) || "../img/noportfolioimage.jpg"} alt="art-image" />
                                                        </a>

                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                }) : (<>No results Found</>)}





                                {/* <nav className="pagination_wp">
                                    <ul className="pagination justify-content-center">
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Previous">
                                                <span aria-hidden="true">«</span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                        </li>
                                        <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                                        <li className="page-item">
                                            <a className="page-link" href="#" aria-label="Next">
                                                <span aria-hidden="true">»</span>
                                                <span className="sr-only">Next</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav> */}

                                <nav className="pagination_wp">
                                    <ul className="pagination justify-content-center">
                                        {(opt.page > 0) && (
                                            <li className='page-item'>
                                                <a className="page-link" onClick={() => handlePageClick(0)} aria-label="Previous">
                                                    <span aria-hidden="true">&laquo;</span>
                                                </a>
                                            </li>
                                        )}

                                        {opt.total_count > 10 && getPageNumbers().map((page) => (
                                            <li
                                                key={page}
                                                className={`page-item ${parseFloat((router?.query?.page || 0).toString()) - 1 == page ? "active" : ""}`}>
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

                                        {opt.page != opt.total_pages && (
                                            <li className='page-item'>
                                                <a className="page-link" onClick={() => handlePageClick(opt.total_pages)} aria-label="Next">
                                                    <span aria-hidden="true">&raquo;</span>
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                </nav>
                                <br /><br /><br />
                            </div>
                        </div>
                    </div>
                </div>
            </section>



            <Offcanvas show={show} onHide={handleClose} placement="start" style={{ "backgroundColor": "rgb(71, 18, 15)", "fontFamily": "Poppins, sans-serif" }}>
                <Offcanvas.Header closeButton closeVariant="white" style={{ "backgroundColor": "rgba(0, 0, 0, 0.18)" }} >
                    <Offcanvas.Title>
                        <div className="logo">
                            {/* <Link href="/"><img style={{ "cursor": "pointer" }} src={"/img/logo.png"} alt="logo" /></Link> */}
                            Filters
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>

                    <div className="widget_product_categories">

                        <h3>Sort by</h3>

                        <div className="no_dropdown all_categori">
                            <select value={ratingOrder} onChange={handleSortChange}>
                                <option value="high-to-low">Rating High to Low</option>
                                <option value="low-to-high">Rating Low to High</option>
                                <option value="a-z">A to Z</option>
                                <option value="z-a">Z to A</option>
                                <option value="newest-oldest">Newest to Oldest</option>
                                <option value="oldest-newest">Oldest to Newest</option>
                            </select>

                        </div>
                        <br />


                        <h3>All categories</h3>
                        {/* <ul>
                                <li><a href="#">Painting</a></li>
                                <li><a href="#">Sculpture</a></li>
                                <li><a href="#">Printmaking</a></li>
                                <li><a href="#">Photography</a></li>
                                <li><a href="#">Textile Art</a></li>
                                <li><a href="#">Ceramics</a></li>
                                <li><a href="#">Glass Art</a></li>
                                <li><a href="#">Digital Art</a></li>
                                <li><a href="#">Calligraphy</a></li>
                                <li><a href="#">Jewelry Design</a></li>
                                <li><a href="#">Graffiti Art</a></li>
                                <li><a href="#">Installation Art</a></li>
                            </ul> */}



                        <form>

                            {Category_subcategory?.categories?.map((cat) => (
                                <>
                                    <input type="checkbox" id={cat?.id} name={cat?.id}
                                        checked={isCategorySelected(cat?.id)}
                                        onChange={(e) => handleCategoryCheck(e, cat?.id)}
                                    />
                                    <label>{cat?.category_name}</label><br />
                                </>
                            ))}
                        </form>

                        <br />

                        <li className="mobile_contact">
                            <ul>
                                <li>
                                    <button onClick={() => setCategory("")} >Clear all Filters</button>
                                </li>
                                <li><button onClick={handleApplyFilter} >Apply</button></li>
                            </ul>
                        </li>


                    </div>
                    {/* </div> */}


                </Offcanvas.Body>
            </Offcanvas>

        </div>
    )
}

Artistlist.ignorePath = true

export default Artistlist;
