import React, { useState, useRef, useEffect, memo } from 'react';
import coronavirus_white from '../assets/coronavirus_white.png';
import coronavirus_icon from '../assets/coronavirus_icon.png';
import $ from 'jquery';
const RenderRows = (props) => {
    const handler = (event) => {
        props.country.current.value = event.target.innerText;
        props.method([]);
    };
    return (
        <>
            {props.selectedCountry.map((country_name) => (
                <li
                    key={country_name.index}
                    className="list-group-item list-group-item-action list-group-item-dark country_list_items"
                    onClick={handler}
                >
                    {country_name.name}
                </li>
            ))}
        </>
    );
};

const Country_Cases = memo((props) => {
    const submit_btn = useRef('');
    const country = useRef('');
    var [countries, setCountries] = useState([]);
    var [newCountryConfirmed, setNewCountryConfirmed] = useState(0);
    var [totalCountryConfirmed, setTotalCountryConfirmed] = useState(0);
    var [totalCountryRecovered, setTotalCountryRecovered] = useState(0);
    var [countryDeaths, setCountryDeaths] = useState(0);
    var apiData = props.apiData;
    const country_names = props.countries;
    const printCountryData = (target, speed = 1.3) => {
        var counter = 1;
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
        submit_btn.current.addEventListener('click', (obj) => {
            obj.preventDefault();
            try {
                if (props.error === 'Bad Response') {
                    let error = new Error(
                        "Too many request's sent to the server, Please refresh the page or check again after some time."
                    );
                    error.name = 'Bad Response';
                    throw error;
                }
                var selectedCountry = apiData.Countries.filter(
                    (name) => name.Country === `${country.current.value}`
                );
                if (selectedCountry.length === 0) {
                    let error = new Error('Entry Not Found');
                    error.name = 'Bad Request';
                    throw error;
                } else {
                    var country_data = [
                        selectedCountry[0].NewConfirmed,
                        selectedCountry[0].TotalConfirmed,
                        selectedCountry[0].TotalRecovered,
                        selectedCountry[0].TotalDeaths,
                    ];
                    country.current.classList.remove('is-invalid');
                    country.current.classList.add('is-valid');
                    $('.collapse').collapse('show');
                    printCountryData(country_data, 1.1);
                    setCountries([]);
                }
            } catch (error) {
                if (error.name === 'Bad Response') {
                    country.current.classList.add('is-invalid');
                    $('.collapse').collapse('hide');
                    document.querySelector(
                        '.invalid-feedback'
                    ).innerText = error;
                } else if (error.name === 'Bad Request') {
                    country.current.classList.add('is-invalid');
                    $('.collapse').collapse('hide');
                    document.querySelector('.invalid-feedback').innerText =
                        'Something went wrong :) , please try again with a valid country name...';
                }
            }
        });
        country.current.onkeyup = () => {
            $('.collapse').collapse('hide');
            if (country.current.value === '') {
                setCountries([]);
            } else {
                // filtering the list
                var entered_name = country.current.value;
                const pattern = new RegExp(`^(${entered_name})`, 'i');
                var filtered_country = country_names.filter((item) =>
                    pattern.test(item.name)
                );
                setCountries(filtered_country);
            }
        };
    }, [country.current.value, apiData, country_names, props.error]);
    return (
        <>
            <div
                className="container bg-light my-4 shadow-lg"
                id="country_wise_cases"
            >
                <div data-aos="fade-up">
                    <h2 className="text-center p-5 heading">
                        Checkout Covid-19 Outbreak in your region
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
                                ref={country}
                            />
                            <ul
                                className="list-group list-group-flush mt-1"
                                id="country_list"
                            >
                                <RenderRows
                                    selectedCountry={countries}
                                    method={setCountries}
                                    country={country}
                                />
                            </ul>
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
                                <h3
                                    className="country_count text-white"
                                    style={{ fontWeight: 'bold' }}
                                >
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
                                <h3
                                    className="country_count text-white"
                                    style={{ fontWeight: 'bold' }}
                                >
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
                                <h3
                                    className="country_count text-white"
                                    style={{ fontWeight: 'bold' }}
                                >
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
                                <h3
                                    className="country_count text-white"
                                    style={{ fontWeight: 'bold' }}
                                >
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
});

export default Country_Cases;
