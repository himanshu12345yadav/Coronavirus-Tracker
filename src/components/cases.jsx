import React, { useEffect, useRef, useState } from 'react';
import coronavirus_white from '../assets/coronavirus_white.png';
import coronavirus from '../assets/coronavirus.png';
import coronavirus_icon from '../assets/coronavirus_icon.png';
import $ from 'jquery';

const Cases = () => {
    const submit_btn = useRef('');
    var [newConfirmed, setNewConfirmed] = useState(0);
    var [totalConfirmed, setTotalConfirmed] = useState(0);
    var [totalRecovered, setTotalRecovered] = useState(0);
    var [deaths, setDeaths] = useState(0);
    var [newCountryConfirmed, setNewCountryConfirmed] = useState(0);
    var [totalCountryConfirmed, setTotalCountryConfirmed] = useState(0);
    var [totalCountryRecovered, setTotalCountryRecovered] = useState(0);
    var [countryDeaths, setCountryDeaths] = useState(0);
    const printCountryData = (target, speed = 1.3) => {
        var counter = 1;
        // for newConfirmed
        const count = (callback, index) => {
            if (counter < target[index]) {
                counter *= speed;
                callback(Math.ceil(counter));
                setTimeout(() => count(callback, index), 10);
            } else {
                callback(target[index]);
            }
        };
        for (var index = 0; index < 4; index++) {
            switch (index) {
                case 0:
                    count(setNewCountryConfirmed, index);
                    break;
                case 1:
                    count(setTotalCountryConfirmed, index);
                    break;
                case 2:
                    count(setTotalCountryRecovered, index);
                    break;
                default:
                    count(setCountryDeaths, index);
                    break;
            }
        }
    };
    useEffect(() => {
        // const count_global.current = document.querySelectorAll('.count_global');
        const country = document.querySelector('#country_name');
        var country_names = [];
        var apiData = [];
        var error_name;
        const fetchData = () => {
            //  https://api.covid19api.com/summary
            fetch('https://api.covid19api.com/summary')
                .then((res) => {
                    if (res.status === 429) {
                        const error = new Error(
                            "Too many request's sent to the server Please try after some time."
                        );
                        error.name = 'Bad Response';
                        throw error;
                    } else if (res.status === 502) {
                        const error = new Error(
                            'Server is facing some issues, Please try after some time...'
                        );
                        error.name = 'Bad Gateway';
                        throw error;
                    } else {
                        return res.json();
                    }
                })
                .then((data) => {
                    apiData = data;
                    globalData();
                    countries_data();
                })
                .catch((error) => {
                    error_name = error.name;
                    console.log(error);
                });
        };

        const globalData = () => {
            var global_data = [
                apiData.Global.NewConfirmed,
                apiData.Global.TotalConfirmed,
                apiData.Global.TotalDeaths,
                apiData.Global.TotalRecovered,
            ];
            print(global_data);
        };
        // printing the data
        const print = (target, speed = 1.1) => {
            var counter = 1;
            // for newConfirmed
            const count = (callback, index) => {
                if (counter < target[index]) {
                    counter *= speed;
                    callback(Math.ceil(counter));
                    setTimeout(() => count(callback, index), 10);
                } else {
                    callback(target[index]);
                }
            };
            for (var index = 0; index < 4; index++) {
                switch (index) {
                    case 0:
                        count(setNewConfirmed, index);
                        break;
                    case 1:
                        count(setTotalConfirmed, index);
                        break;
                    case 2:
                        count(setTotalRecovered, index);
                        break;
                    default:
                        count(setDeaths, index);
                        break;
                }
            }
        };
        // counting on scroll
        var status = true;
        window.addEventListener('scroll', () => {
            const world_data = document.querySelector('#world_data');
            if (
                window.scrollY + window.screen.height >
                    world_data.offsetTop + world_data.clientHeight &&
                status
            ) {
                status = false;
                fetchData();
            }
        });

        // country wise data
        submit_btn.current.addEventListener('click', (obj) => {
            var check = 1;
            obj.preventDefault();

            try {
                if (error_name === 'Bad Response') {
                    let error = new Error(
                        "Too many request's sent to the server, Please refresh the page or check again after some time."
                    );
                    error.name = 'Bad Response';
                    throw error;
                }
                var selectedCountry = apiData.Countries.filter(
                    (name) => name.Country === `${country.value}`
                );
                if (selectedCountry.length === 0) {
                    let error = new Error('Entry Not Found');
                    error.name = 'Bad Request';
                    throw error;
                }
                var country_data = [
                    selectedCountry[0].NewConfirmed,
                    selectedCountry[0].TotalConfirmed,
                    selectedCountry[0].TotalRecovered,
                    selectedCountry[0].TotalDeaths,
                ];
                printCountryData(country_data, 1.1);
            } catch (error) {
                if (error.name === 'Bad Response') {
                    check = 0;
                    country.classList.add('is-invalid');
                    $('.collapse').collapse('hide');
                    document.querySelector(
                        '.invalid-feedback'
                    ).innerText = error;
                } else if (error.name === 'Bad Request') {
                    check = 0;
                    country.classList.add('is-invalid');
                    $('.collapse').collapse('hide');
                    document.querySelector('.invalid-feedback').innerText =
                        'Something went wrong, please try again with a valid country name...';
                }
            }

            // general case validity
            if (country.classList.contains('is-invalid')) {
                $('.collapse').collapse('hide');
            }
            if (check) {
                // first case validity
                country.classList.remove('is-invalid');
                country.classList.add('is-valid');
                $('.collapse').collapse('show');
            }
        });

        // filling the country data in the countries_data array
        const countries_data = () => {
            try {
                apiData.Countries.forEach((item) => {
                    country_names.push(item.Country);
                });
            } catch (error) {
                console.log('Error caused due to : ' + error.message);
            }
        };
        var country_list = document.querySelector('#country_list');
        var country_list_items = document.querySelectorAll('#country_list li');
        country.onkeyup = () => {
            $('.collapse').collapse('hide');
            if (country.value === '') {
                country_list_items.forEach((item) =>
                    country_list.removeChild(item)
                );
            } else {
                // removing all the child elements
                country_list_items.forEach((item) =>
                    country_list.removeChild(item)
                );
                // filtering the list
                var entered_name = country.value;
                const pattern = new RegExp(entered_name, 'i');
                var filtered_country = country_names.filter((item) =>
                    pattern.test(item)
                );
                // filling the child elements
                filtered_country.forEach((item) => {
                    var name = document.createElement('li');
                    name.setAttribute(
                        'class',
                        'list-group-item list-group-item-action list-group-item-dark'
                    );
                    name.onclick = () => {
                        country.value = name.innerText;
                        var country_list_items = document.querySelectorAll(
                            '#country_list li'
                        );
                        country_list_items.forEach((item) =>
                            country_list.removeChild(item)
                        );
                    };
                    name.textContent = item;
                    country_list.appendChild(name);
                });
            }
        };
    }, []);
    return (
        <>
            <div
                className="container d-flex flex-column align-items-between mb-5"
                id="world_data"
            >
                <div data-aos="fade-up">
                    <h2 className="text-center p-3 heading">
                        Destruction Spread by Covid-19 Worldwide
                    </h2>
                </div>
                <div className="container" id="floating_img_1">
                    <img
                        src={coronavirus_white}
                        alt="white_image"
                        className="img-fluid"
                    />
                </div>
                <div className="container" id="floating_img_2">
                    <img
                        src={coronavirus_white}
                        alt="white_image"
                        className="img-fluid"
                    />
                </div>
                <div className="row shadow-lg bg-light d-flex justify-content-center align-items-start">
                    <div className=" col-6 mx-auto col-md-3 m-0 p-0 col-sm-5">
                        <div
                            className="jumbotron m-0 d-flex flex-column align-items-center bg-light justify-content-center"
                            style={{ height: '200px' }}
                        >
                            <span>
                                <img
                                    src={coronavirus}
                                    alt="red_corona_icon"
                                    className="img-fluid my-3"
                                    style={{ width: '50px' }}
                                />
                            </span>
                            <h3
                                className="count_global"
                                style={{ color: '#eb4559' }}
                            >
                                {newConfirmed}
                            </h3>
                            <h5
                                className="title text-center"
                                style={{ color: 'var(--russian-violet)' }}
                            >
                                New Confirmed
                            </h5>
                        </div>
                    </div>
                    <div className=" col-6 mx-auto col-md-3 m-0 p-0 col-sm-5">
                        <div
                            className="jumbotron m-0 d-flex bg-light flex-column align-items-center justify-content-center"
                            style={{ height: '200px' }}
                        >
                            <span className="justify-self-start hoverable">
                                <img
                                    src={coronavirus}
                                    alt="red_corona_icon"
                                    className="img-fluid my-3"
                                    style={{ width: '50px' }}
                                />
                            </span>
                            <h3
                                className="count_global"
                                style={{ color: '#eb4559' }}
                            >
                                {totalConfirmed}
                            </h3>
                            <h5
                                className="title text-center"
                                style={{ color: 'var(--russian-violet)' }}
                            >
                                Total Confirmed
                            </h5>
                        </div>
                    </div>
                    <div className=" col-6 mx-auto col-md-3 m-0 p-0 col-sm-5">
                        <div
                            className="jumbotron m-0 d-flex bg-light flex-column align-items-center justify-content-center"
                            style={{ height: '200px' }}
                        >
                            <span>
                                <img
                                    src={coronavirus}
                                    alt="red_corona_icon"
                                    className="img-fluid my-3"
                                    style={{ width: '50px' }}
                                />
                            </span>
                            <h3
                                className="count_global"
                                style={{ color: '#55c882' }}
                            >
                                {totalRecovered}
                            </h3>
                            <h5
                                className="title text-center"
                                style={{ color: 'var(--russian-violet)' }}
                            >
                                Total Recovered
                            </h5>
                        </div>
                    </div>
                    <div className=" col-6 mx-auto col-md-3 m-0 p-0 col-sm-5">
                        <div
                            className="jumbotron m-0 d-flex bg-light flex-column align-items-center justify-content-center"
                            style={{ height: '200px' }}
                        >
                            <span>
                                <img
                                    src={coronavirus}
                                    alt="red_corona_icon"
                                    className="img-fluid my-3"
                                    style={{ width: '50px' }}
                                />
                            </span>
                            <h3
                                className="count_global"
                                style={{ color: '#eb4559' }}
                            >
                                {deaths}
                            </h3>
                            <h5
                                className="title text-center"
                                style={{ color: 'var(--russian-violet)' }}
                            >
                                Deaths
                            </h5>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="container bg-light my-4 shadow-lg"
                id="country_wise_cases"
            >
                <div data-aos="fade-up">
                    <h2 className="text-center p-5 heading">
                        Check the destruction caused by covid-19 in your region
                    </h2>
                </div>
                <div className="container" id="floating_img_3">
                    <img src={coronavirus_white} alt="" className="img-fluid" />
                </div>
                <div className="container" id="floating_img_4">
                    <img src={coronavirus_white} alt="" className="img-fluid" />
                </div>
                <form className="form-group needs-validation pb-5">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-sm-8 col-md-7 col-lg-5">
                            <input
                                type="text"
                                name="country"
                                className="form-control"
                                id="country_name"
                                placeholder="Search among 186 countries ?"
                                required
                                autoComplete="off"
                                pattern="[A-Za-z]+"
                            />
                            <ul
                                className="list-group list-group-flush mt-1"
                                id="country_list"
                            ></ul>
                            <div className="invalid-feedback"></div>
                        </div>
                        <button
                            type="submit"
                            value="Check"
                            className="align-self-start btn col-2 mt-3 mt-sm-0 my-md-0 col-md-2 col-lg-1"
                            ref={submit_btn}
                            id="submit_btn"
                        >
                            Check
                            <span></span>
                        </button>
                    </div>
                </form>

                <div className="collapse" id="country_cases">
                    <div className="row d-flex justify-content-center align-items-center">
                        <div className="col-sm-5 mx-auto col-lg-3 col-md-3">
                            <div
                                className="jumbotron d-flex flex-column align-items-center justify-content-center shadow-lg rounded-jumbotron"
                                style={{
                                    height: '200px',
                                }}
                            >
                                <span>
                                    <img
                                        src={coronavirus_icon}
                                        alt="corona_logo"
                                        className="img-fluid my-3"
                                    />
                                </span>
                                <h3 className="country_count text-white">
                                    {newCountryConfirmed}
                                </h3>
                                <h5
                                    className="title text-center"
                                    style={{ color: '#830826' }}
                                >
                                    New Confirmed
                                </h5>
                            </div>
                        </div>
                        <div className="col-sm-5 mx-auto col-lg-3 col-md-3">
                            <div
                                className="jumbotron d-flex flex-column align-items-center justify-content-center shadow-lg rounded-jumbotron"
                                style={{
                                    height: '200px',
                                }}
                            >
                                <span>
                                    <img
                                        src={coronavirus_icon}
                                        alt="corona_logo"
                                        className="img-fluid my-3"
                                    />
                                </span>
                                <h3 className="country_count text-white">
                                    {totalCountryConfirmed}
                                </h3>
                                <h5
                                    className="title text-center"
                                    style={{ color: '#06235e' }}
                                >
                                    Total Confirmed
                                </h5>
                            </div>
                        </div>

                        <div className="col-sm-5 mx-auto col-lg-3 col-md-3">
                            <div
                                className="jumbotron d-flex flex-column align-items-center justify-content-center shadow-lg rounded-jumbotron"
                                style={{
                                    height: '200px',
                                }}
                            >
                                <span>
                                    <img
                                        src={coronavirus_icon}
                                        alt="corona_logo"
                                        className="img-fluid my-3"
                                    />
                                </span>
                                <h3 className="country_count text-white">
                                    {totalCountryRecovered}
                                </h3>
                                <h5
                                    className="title text-center"
                                    style={{ color: '#35124d' }}
                                >
                                    Total Recovered
                                </h5>
                            </div>
                        </div>
                        <div className="col-sm-5 mx-auto col-lg-3 col-md-3">
                            <div
                                className="jumbotron d-flex flex-column align-items-center justify-content-around shadow-lg rounded-jumbotron"
                                style={{
                                    height: '200px',
                                }}
                            >
                                <span>
                                    <img
                                        src={coronavirus_icon}
                                        alt="corona_logo"
                                        className="img-fluid my-3"
                                    />
                                </span>
                                <h3 className="country_count text-white">
                                    {countryDeaths}
                                </h3>
                                <h5
                                    className="title text-center"
                                    style={{ color: '#383737' }}
                                >
                                    Deaths
                                </h5>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cases;
