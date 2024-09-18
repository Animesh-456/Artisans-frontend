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

        api.project.artist_list({ params: { page: 0, ratingOrder: ratingOrder, categories: category } })

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
                    category: category
                },
            })
            .then(() => {
                api.project.artist_list({ params: { page: i, ratingOrder: ratingOrder, categories: category } })
            });
    };


    useEffect(() => {
        const pageQueryParam = new URLSearchParams(location.search).get('ratingOrder');
        const pageQueryParam2 = new URLSearchParams(location.search).get('category');

        const pageQueryParam3 = new URLSearchParams(location.search).get('page');
        const pageNumber = parseInt(pageQueryParam) || 1;

        if (!pageQueryParam) return
        if (pageQueryParam != ratingOrder) {
            setratingOrder(pageQueryParam)
        }

        if (pageQueryParam2 != category) {
            setCategory(pageQueryParam2)
        }


        setTimeout(() => {
            api.project.artist_list({ params: { ...opt, page: pageNumber - 1, ratingOrder: pageQueryParam, categories: pageQueryParam2 } })
        }, 1000);


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
                    category: category
                },
            }).then(() => {
                api.project.artist_list({ params: { page: 0, ratingOrder: ratingOrder, categories: category } })
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
                        <div className="filter_section">
                            {/* <div className="search_bar">
                                <input type="text" name="text" placeholder="Search.." value="" />
                                <i className="fa fa-search"></i>
                            </div> */}
                           
                            <div className="sort_dropdown all_categori">
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

                                {/* <a style={{ color: "rgb(255, 255, 255)", cursor: "pointer" }}>Apply</a> */}
                            </div>
                            
                        </div>
                    </div>
                    <div className="row mobile_filter">
                        <div className="bwp-top-bar">
                            <div className="button-filter-toggle">
                                <i className="fa fa-sliders" onClick={() => setShow(true)}></i>
                            </div>
                            <div className="pwb-dropdown">
                                <select value={ratingOrder} onChange={handleSortChange}>
                                    <option value="high-to-low">Rating High to Low</option>
                                    <option value="low-to-high">Rating Low to Hign</option>
                                    <option value="a-z">A to Z</option>
                                    <option value="z-a">Z to A</option>
                                    <option value="newest-oldest">Newest to Oldest</option>
                                    <option value="oldest-newest">Oldest to Newest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="row">

                                {list?.length ? list?.map((l) => {
                                    return (
                                        <>
                                            <div className="col-sm-3 col-6">
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
