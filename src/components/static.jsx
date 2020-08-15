import React, { useEffect, useRef } from 'react';
import guard from '../assets/corona_guard.png';
import white_coronavirus from '../assets/coronavirus_white.png';
import about_coronavirus from '../assets/about_coronavirus.png';

const Static = () => {
    const progress_bar = useRef(null);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            const progress =
                window.scrollY /
                (document.body.scrollHeight - window.screen.height);
            progress_bar.current.style.width = `${Math.ceil(100 * progress)}%`;
        });
    }, []);

    return (
        <>
            <div className="progress">
                <div
                    ref={progress_bar}
                    className="progress-bar progress-bar-striped progress-bar-animated"
                ></div>
            </div>
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div
                    className="navbar-brand justify-content-md-center p-0"
                    style={{ transform: 'rotate(-5deg)' }}
                >
                    <a href="/Coronavirus-Tracker" className="nav-link p-0">
                        <span
                            className="nav-text"
                            style={{
                                fontFamily: "'Lobster',cursive",
                                fontSize: '2rem',
                                color: 'var(--theme-color)',
                            }}
                        >
                            Covid Tracker
                        </span>
                    </a>
                </div>
                <div
                    className="navbar-toggler"
                    data-toggle="collapse"
                    data-target="#nav"
                >
                    <span className="navbar-toggler-icon"></span>
                </div>
                <div className="collapse navbar-collapse" id="nav">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item px-3">
                            <a
                                href="/Coronavirus-Tracker"
                                className="nav-link active"
                            >
                                Home
                            </a>
                        </li>
                        <li className="nav-item px-3 ml-2 m-sm-0" id="live-cases">
                            <a
                                href="#world_data"
                                className="nav-link"
                                style={{ color: '#dd3030' }}
                            >
                                Live Cases
                            </a>
                        </li>
                        <li className="nav-item px-3">
                            <a href="#precautions" className="nav-link">
                                Precautions
                            </a>
                        </li>
                        <li className="nav-item px-3">
                            <a href="#needs_help" className="nav-link">
                                Needs Help
                            </a>
                        </li>
                    </ul>
                </div>
            </nav>
            <div className="container-fluid my-5" id="landing-page">
                <div className="row">
                    <div className="col-8 mx-auto col-lg-5 py-5  mx-lg-0 ml-lg-auto">
                        <span
                            className="badge-pill badge-secondary text-danger px-2 p-1 align-self-start"
                            style={{
                                backgroundColor: '#ffd4d4',
                                fontSize: '0.9rem',
                            }}
                        >
                            <i className="fa fa-exclamation-circle p-1"></i>
                            Covid-19 Alert
                        </span>
                        <div data-aos="fade-up" data-aos-offset="100">
                            <h1 className="display-4 font-weight-bold heading py-5">
                                Let's Defeat
                                <br />
                                Covid-19 Togethor.
                            </h1>
                        </div>
                        <a href="#symptoms" className="btn-link">
                            <button
                                className="btn p-3 px-5 p-sm-3 p-md-3 px-md-5"
                                id="check_symptoms"
                            >
                                Check Symptoms
                            </button>
                        </a>
                    </div>
                    <div className="col-sm-12 col-md-12 col-lg-6 d-flex align-items-center">
                        <img
                            src={guard}
                            alt="guard"
                            className="responsive-img"
                            style={{ width: 'inherit' }}
                        />
                    </div>
                </div>
            </div>
            <div className="container" id="floating_img_5">
                <img
                    src={white_coronavirus}
                    alt="white_coronavirus"
                    className="img-fluid"
                />
            </div>
            <div className="container" id="white_img">
                <img
                    src={white_coronavirus}
                    alt="white_coronavirus"
                    className="img-fluid"
                />
            </div>
            <div className="container-fluid my-5">
                <div className="row">
                    <div className="col-sm-12 p-0 col-lg-6 d-flex align-items-center justify-content-center order-2 order-lg-1">
                        <div data-aos="fade-right">
                            <img
                                src={about_coronavirus}
                                alt="about_coronavirus"
                                className="img-fluid m-0 p-0"
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 order-1 order-lg-2">
                        <span
                            className="badge-pill badge-secondary text-danger px-2 p-1"
                            style={{
                                backgroundColor: '#ffd4d4',
                                fontSize: '1rem',
                            }}
                        >
                            <i className="fa fa-exclamation-circle p-1"></i>
                            Covid-19 Alert
                        </span>
                        <div data-aos="fade-up">
                            <h1 className="my-4 heading text-sm-center ">
                                What is novel Coronavirus ?
                            </h1>
                        </div>
                        <div data-aos="fade-right">
                            <div
                                className="container about"
                                style={{ color: 'var(--russian-violet)' }}
                            >
                                <p>
                                    Coronavirus disease (COVID-19) is an
                                    infectious disease caused by a new virus.
                                    The disease causes respiratory illness (like
                                    the flu) with symptoms such as a cough,
                                    fever, and in more severe cases, difficulty
                                    breathing.
                                </p>
                                <p>
                                    You can protect yourself by washing your
                                    hands frequently, avoiding touching your
                                    face, and avoiding close contact (1 meter or
                                    3 feet) distances with who are unwell.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Static;
