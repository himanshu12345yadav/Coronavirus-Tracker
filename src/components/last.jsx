import React from 'react';
import symptoms from '../assets/symptoms.png';

const Last = () => {
    return (
        <>
            <div className="container-fluid my-5 pt-5" id="symptoms">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 col-sm-12 py-3 d-flex justify-content-center order-md-2 order-1">
                        <div data-aos="fade-up">
                            <h1 className="my-4 heading">
                                What are the Symptoms?
                            </h1>
                            <div className="container  about">
                                <p>
                                    COVID-19 symptoms range from mild to severe.
                                    It takes 2-14 days after exposure for
                                    symptoms to develop. Symptoms may include:
                                </p>
                            </div>
                            <div className="row d-flex align-items-center">
                                <div className="col-5">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <i className="fa fa-check-circle text-success"></i>
                                            Hard cough
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fa fa-check-circle text-success"></i>
                                            Fever
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fa fa-check-circle text-success"></i>
                                            Headache
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-7">
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item">
                                            <i className="fa fa-check-circle text-success"></i>
                                            Resoiratory Distress
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fa fa-check-circle text-success"></i>
                                            Shortness of Breath
                                        </li>
                                        <li className="list-group-item">
                                            <i className="fa fa-check-circle text-success"></i>
                                            Kidney Failure
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-8 order-2 order-md-1 d-flex align-items-center">
                        <div data-aos="fade-left">
                            <img
                                src={symptoms}
                                alt="symptoms_img"
                                className="img-fluid"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div data-aos="fade-up" id="precautions">
                <h1 className="text-center heading" id="demo">
                    How to protect yourself from the Coronavirus ?{' '}
                </h1>
            </div>
            <div className="container-fluid bg-light my-5">
                <div className="container-sm-fluid p-3">
                    <div className="row bg-light">
                        <div className="col-md-6">
                            <div className="row precautions p-3 d-sm-flex justify-content-center justify-content-sm-between">
                                <img
                                    src="https://static.vecteezy.com/system/resources/previews/000/952/526/non_2x/man-wearing-disposable-medical-face-mask-vector.jpg"
                                    alt="mask"
                                    className="img-fluid col-md-5 col-lg-3 my-sm-3 col-5"
                                />
                                <div className="col-sm-12 content col-lg-8 my-sm-3 col-12">
                                    <h5>Wear Face Mask</h5>
                                    <p>Use one time use Face Masks </p>
                                </div>
                            </div>
                            <div className="row precautions p-3 d-sm-flex justify-content-center justify-content-sm-between">
                                <img
                                    src="https://cdn1.iconfinder.com/data/icons/coronavirus-information/128/__cough_tissue_close_mouth-512.png"
                                    className="img-fluid col-md-5 col-lg-3 my-sm-3 col-5"
                                    alt="tissue_image"
                                />
                                <div className="col-sm-12 content col-lg-8 my-sm-3 col-12">
                                    <h5>
                                        Cover Face When Coughing or Sneezing
                                    </h5>
                                    <p>
                                        Cover your mouth/nose with a tissue or
                                        sleeve when coughing or sneezing
                                    </p>
                                </div>
                            </div>
                            <div className="row precautions p-3 d-sm-flex justify-content-center justify-content-sm-between">
                                <img
                                    src="https://i.pinimg.com/originals/6a/a5/4a/6aa54a0377f509d3123e4d8fd5229ce2.png"
                                    className="img-fluid col-md-5 col-lg-3 my-sm-3 col-5"
                                    alt="handwash_image"
                                />
                                <div className="col-sm-12 content col-lg-8 my-sm-3 col-12">
                                    <h5>Wash Your Hand Frequently</h5>
                                    <p>
                                        Clean your hands often. Use soap and
                                        water, or an alcohol-based hand rub.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="row precautions p-3 d-sm-flex justify-content-center justify-content-sm-between">
                                <img
                                    src="https://seeklogo.com/images/S/stay-home-logo-616E3197E7-seeklogo.com.png"
                                    alt="stay_home_image"
                                    className="img-fluid col-md-5 col-lg-3 my-sm-3 col-5"
                                />
                                <div className="col-sm-12 content col-lg-8 my-sm-3 col-12">
                                    <h5>Stay Home and ignore outdoors</h5>
                                    <p>
                                        Ignore to move outdoors, try to keep
                                        yourself self quarantine.
                                    </p>
                                </div>
                            </div>
                            <div className="row precautions p-3 d-sm-flex justify-content-center justify-content-sm-between">
                                <img
                                    src="https://images.vexels.com/media/users/3/193244/isolated/preview/d22c35ff94c1c135c9da2bea24e8a0d7-covid-19-doctor-character-icon-by-vexels.png"
                                    className="img-fluid col-md-5 col-lg-3 my-sm-3 col-5"
                                    alt="doctors_image"
                                />
                                <div className="col-sm-12 content col-lg-8 my-sm-3 col-12">
                                    <h5>Seek medical care </h5>
                                    <p>
                                        Do hesitate to take medical health and
                                        support in case you feel unwell or finds
                                        symptoms of Covid-19
                                    </p>
                                </div>
                            </div>
                            <div className="row precautions p-3 d-sm-flex justify-content-center justify-content-sm-between">
                                <img
                                    src="https://assets.website-files.com/5d9ba0eb5f6edb77992a99d0/5e786cb5e5ba0e86e89d73cc_iconfinder_keep_distance_social_1_5964546.png"
                                    alt="social_distance_image"
                                    className="img-fluid col-md-5 col-lg-3 my-sm-3 col-5"
                                />
                                <div className="col-sm-12 content col-lg-8 my-sm-3 col-12">
                                    <h5>Keep minimum 6 feet distance</h5>
                                    <p>
                                        Maintain a safe distance from anyone who
                                        is coughing or sneezing. Keep minimum 6
                                        feet distance
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid" id="needs_help">
                <div data-aos="zoom-in" data-aos-duration="300">
                    <div className="container jumbotron rounded-jumbotron my-0 pt-2">
                        <h1 className="main-heading heading text-center title p-2 display-4">
                            Needs Help!
                        </h1>
                        <h3
                            className="noto-sans text-center px-sm-5 px-1"
                            style={{ lineHeight: '3rem' }}
                        >
                            If you find symptoms of Covid -19, Don't hesitate
                            call right now
                        </h3>
                        <h3 className="text-center pt-3 noto-sans">
                            All India Covid-19 Helpline Number
                        </h3>
                        <h1 className="display-3 text-center pt-5 text-danger">
                            1075{' '}
                            <small>
                                <sup>*</sup>
                            </small>
                            <small className="text-muted noto-sans mx-3">
                                TOLL FREE
                            </small>
                        </h1>
                        <h5 className="text-secondary text-center mt-5">
                            * Refer official{' '}
                            <a
                                href="https://www.mohfw.gov.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                MoHFW
                            </a>{' '}
                            website for latest details.
                        </h5>
                    </div>
                </div>
            </div>
            <div className="footer pt-5">
                <div className="main-footer container-fluid">
                    <div className="row d-flex justify-content-around align-items-center">
                        <div className="col-7 col-sm-4 col-md-4 col-lg-3 footer-main-content order-2">
                            <h3 className="noto-sans sub-heading text-center p-2">
                                Usefull Links
                            </h3>
                            <ul className="list-group list-group-flush">
                                <a
                                    className="list-group-item justify-content-around "
                                    href="https://twitter.com/MoHFW_INDIA"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {' '}
                                    <i className="fa fa-twitter fa-2x text-primary"></i>{' '}
                                    MoHFW_INDIA
                                </a>
                                <a
                                    className="list-group-item justify-content-around"
                                    href="https://www.mygov.in/covid-19"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="https://www.mygov.in/sites/all/themes/mygov/front_assets/images/logo.png"
                                        alt="mygov"
                                        style={{ width: '80px' }}
                                    />
                                    MyGov
                                </a>
                                <a
                                    className="list-group-item justify-content-around"
                                    href="https://en.wikipedia.org/wiki/COVID-19_pandemic"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa fa-wikipedia-w fa-2x text-white"></i>
                                    About Covid-19
                                </a>
                                <a
                                    className="list-group-item justify-content-around"
                                    href="https://indianexpress.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        src="https://images.indianexpress.com/2018/10/fav-icon.png?w=32"
                                        alt="indian_express"
                                    />
                                    Latest News
                                </a>
                            </ul>
                        </div>
                        <div className="col-9 col-sm-7 col-md-6 col-lg-4 m-4 footer-main-content order-1">
                            <h1 className="display-4 text-white text-center">
                                # Stay Home Stay Safe
                            </h1>
                        </div>
                    </div>
                </div>
                <div
                    className="dropdown-divider bg-secondary"
                    style={{ border: '1px solid #f080b2' }}
                ></div>
                <div className="credits container-fluid d-flex py-4">
                    <span className="pl-5 text-white noto-sans">
                        &copy; 2020 All right Reserved
                    </span>
                    <span className="ml-auto pr-5 text-white noto-sans">
                        Made by Himanshu Yadav
                    </span>
                </div>
            </div>
        </>
    );
};

export default Last;
