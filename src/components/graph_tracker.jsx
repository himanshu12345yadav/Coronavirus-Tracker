import React, { useRef, useEffect, useState, memo } from 'react';
import RenderRows from './render_rows';
import Chart from 'chart.js';
const GraphTracker = (props) => {
    const country_names = props.countries_names;
    var [countries, setCountries] = useState([]);
    const country = useRef('');
    const wrapperRefGraph = useRef('');
    var [renderFlag, setRenderFlag] = useState(false);
    window.content_data = useRef([]);
    useEffect(() => {
        country.current.onkeyup = () => {
            if (country.current.value === '') {
                wrapperRefGraph.current.style.height = "0px";
                setCountries([]);
            } else {
                var entered_name = country.current.value;
                const pattern = new RegExp(`^(${entered_name})`, 'i');
                var filtered_country = country_names.map((item) =>
                    pattern.test(item.name) ? {...item, status : "country-active"} : {...item , status : "country-inactive"}
                );
                setCountries(filtered_country);
            }
        };
        window.weeks_shown = 8;
        window.content_type = 'dailyNewCases';
        window.slice_count = 0;
        window.ctx = document.getElementById('trackerChart').getContext('2d');
        if (!renderFlag) {
            renderGraph();
            add_country_btn.current.disabled = true;
            weeks_count.current.disabled = true;
            contentType.current.disabled = true;
            country.current.classList.add('is-invalid');
            document.querySelector(
                '.graph-feedback.invalid-feedback'
            ).innerText =
                'Server is Experiencing high load, Please wait or Try again later 😕';
        } else {
            country.current.classList.remove('is-invalid');
            add_country_btn.current.disabled = false;
            weeks_count.current.disabled = false;
            contentType.current.disabled = false;
        }
        // eslint-disable-next-line
    }, [renderFlag, country_names]);

    const add_country_btn = useRef('');
    const weeks_count = useRef('');
    const contentType = useRef('');
    const MAX_SUPPORTED_WEEKS = 8;

    const add_country_handler = (event) => {
        event.preventDefault();
        try {
            let cty_name = country.current.value;
            country.current.value = '';
            if (cty_name.length === 0) {
                let error = new Error(
                    'Something went Wrong 😕 , Country Name can not be empty :('
                );
                error.name = 'Bad Request';
                throw error;
            } else if (
                window.lineChart.data.datasets.some(
                    (obj) => obj.label === cty_name
                )
            ) {
                let error = new Error(
                    'Requested Country is already presented in the graph'
                );
                error.name = 'Duplicate Request';
                throw error;
            } else if (
                !country_names.some((country) => cty_name === country.name)
            ) {
                let error = new Error('No country with that name');
                error.name = 'Invalid Country Name';
                throw error;
            }
            if (country.current.classList.contains('is-invalid')) {
                country.current.classList.remove('is-invalid');
                country.current.classList.add('is-valid');
            }
            add_country_btn.current.disabled = true;
            weeks_count.current.disabled = true;
            contentType.current.disabled = true;
            addGraphs(cty_name, MAX_SUPPORTED_WEEKS);
        } catch (error) {
            if (error.name === 'Bad Request') {
                country.current.classList.add('is-invalid');
                document.querySelector(
                    '.graph-feedback.invalid-feedback'
                ).innerText =
                    'Something went wrong 😕 , Country Name cannot be empty! ';
            } else if (error.name === 'Duplicate Request') {
                country.current.classList.add('is-invalid');
                document.querySelector(
                    '.graph-feedback.invalid-feedback'
                ).innerText =
                    'Something went wrong 😕 , The requested country is already in the graph, Check again! ';
            } else if (error.name === 'Invalid Country Name') {
                country.current.classList.add('is-invalid');
                document.querySelector(
                    '.graph-feedback.invalid-feedback'
                ).innerText =
                    'Something went wrong 😕 , There is no Country with that name. Start typing to choose a country from the list :)';
            }
        }
    };

    const weeks_change_handler = (event) => {
        window.selected_weeks = parseInt(event.target.value);
        window.slice_count = (MAX_SUPPORTED_WEEKS - window.selected_weeks) * 7;
        let content_deep_clone = Object.assign({}, window.content_data.current);

        window.lineChart.data.labels = window.complete_requested_labels.slice(
            window.slice_count
        );

        window.lineChart.data.datasets.forEach((dataset, index) => {
            dataset.data = content_deep_clone[index].datas[
                window.content_type
            ].slice(window.slice_count);
            window.lineChart.update();
        });
    };

    const content_type_handler = (event) => {
        window.content_type = event.target.value;
        if (window.content_type === 'dailyNewCases') {
            window.lineChart.options.scales.yAxes[0].scaleLabel.labelString =
                'New Confirmed';
        } else if (window.content_type === 'dailyDeathCases') {
            window.lineChart.options.scales.yAxes[0].scaleLabel.labelString =
                'New Deaths';
        } else {
            window.lineChart.options.scales.yAxes[0].scaleLabel.labelString =
                'Active Cases';
        }
        let deepClone = Object.assign({}, window.content_data.current);
        window.lineChart.data.datasets.forEach((dataset, index) => {
            dataset.data = deepClone[index].datas[window.content_type].slice(
                window.slice_count
            );
        });
        window.lineChart.update();
    };
    const fetchData = async (country, chosen_weeks) => {
        let from_date = new Date();
        let to_date = new Date();
        to_date.setDate(to_date.getDate() - 2);
        if (chosen_weeks === 1) {
            from_date.setDate(from_date.getDate() - 9);
        } else if (chosen_weeks === 2) {
            from_date.setDate(from_date.getDate() - 16);
        } else {
            from_date.setDate(from_date.getDate() - 58);
        }
        from_date = from_date.toISOString().split('T')[0];
        to_date = to_date.toISOString().split('T')[0];
        let url = `https://api.covid19api.com/total/country/${country}?from=${from_date}T00:00:00Z&to=${to_date}T00:00:00Z`;
        const req = await fetch(url);
        if (req.status === 504) {
            let error = new Error(
                'Server is unable to respond, Please try after some time...'
            );
            error.name = 'Reqest Timeout';
            throw error;
        } else {
            add_country_btn.current.disabled = false;
            weeks_count.current.disabled = false;
            contentType.current.disabled = false;
            setRenderFlag(true);
            return await req.json();
        }
    };
    const parseData = (country, weeks) =>
        new Promise(async (resolve, reject) => {
            try {
                let rawDailyData = await fetchData(country, weeks);
                let dailyNewCases = [];
                let dailyActiveCases = [];
                let dailyDeathCases = [];
                let dateData = [];
                let prevNewCases = rawDailyData[0].Confirmed;
                let prevDeathsCases = rawDailyData[0].Deaths;
                rawDailyData.forEach((item) => {
                    dailyNewCases.push(item.Confirmed - prevNewCases);
                    dailyDeathCases.push(item.Deaths - prevDeathsCases);
                    dailyActiveCases.push(item.Active);
                    prevNewCases = item.Confirmed;
                    prevDeathsCases = item.Deaths;
                    dateData.push(
                        formatDate(item.Date.split('T')[0].split('-'))
                    );
                });
                dailyNewCases.shift();
                dailyActiveCases.shift();
                dailyDeathCases.shift();
                dateData.shift();
                window.content_data.current.push({
                    country_name: country,
                    datas: {
                        dailyNewCases: dailyNewCases,
                        dailyActiveCases: dailyActiveCases,
                        dailyDeathCases: dailyDeathCases,
                    },
                });
                resolve([
                    window.content_data.current[window.content_data.current.length - 1].datas,
                    dateData,
                ]);
            } catch (error) {
                reject(error);
            }
        });

    const formatDate = (date) => {
        const event = new Date(Date.UTC(date[0], date[1] - 1, date[2]));
        event.setDate(event.getDate() + 1);
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return event.toLocaleDateString(undefined, options);
    };
    function truncate(value) {
        return Math.abs(Number(value)) >= 1.0e9
            ? (Math.abs(Number(value)) / 1.0e9).toFixed(2) + 'B'
            : Math.abs(Number(value)) >= 1.0e6
            ? (Math.abs(Number(value)) / 1.0e6).toFixed(2) + 'M'
            : Math.abs(Number(value)) >= 1.0e3
            ? (Math.abs(Number(value)) / 1.0e3).toFixed(2) + 'K'
            : Math.abs(Number(value)).toFixed(2);
    }

    const renderGraph = async (
        country_name = 'India',
        weeks_count = window.selected_weeks
    ) => {
        let [dailyNewCases, dateData] = await parseData(
            country_name,
            weeks_count
        );
        try {
            window.lineChart = new Chart(window.ctx, {
                type: 'line',
                data: {
                    labels: dateData,
                    datasets: [
                        {
                            label: 'India',
                            fill: false,
                            backgroundColor: '#628a9d',
                            borderColor: '#628a9d',
                            data: dailyNewCases[window.content_type],
                        },
                    ],
                },

                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        yAxes: [
                            {
                                ticks: {
                                    callback: function (value) {
                                        return truncate(value);
                                    },
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'New Confirmed',
                                },
                            },
                        ],
                        xAxes: [
                            {
                                ticks: {
                                    autoSkip: true,
                                    maxTicksLimit: 18,
                                },
                                scaleLabel: {
                                    display: true,
                                    labelString: 'Date',
                                },
                            },
                        ],
                    },
                    tooltips: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function (tooltipItem, data) {
                                var label =
                                    data.datasets[tooltipItem.datasetIndex]
                                        .label || '';

                                if (label) {
                                    label += ': ';
                                }
                                label += truncate(tooltipItem.yLabel);
                                return label;
                            },
                        },
                    },
                },
            });
        } catch (error) {
            if ((error.name = 'Request Timeout')) {
                country.current.classList.add('is-invalid');
                document.querySelector(
                    '.graph-feedback.invalid-feedback'
                ).innerText =
                    'Server is taking too much time to Repond, Please try after some time! ';
            }
        }

        Chart.plugins.register({
            afterDatasetsDraw: function (chart) {
                if (chart.tooltip._active && chart.tooltip._active.length) {
                    var activePoint = chart.tooltip._active[0],
                        ctx = chart.ctx,
                        y_axis = chart.scales['y-axis-0'],
                        x = activePoint.tooltipPosition().x,
                        topY = y_axis.top,
                        bottomY = y_axis.bottom;
                    ctx.save();
                    ctx.beginPath();
                    ctx.moveTo(x, topY);
                    ctx.lineTo(x, bottomY);
                    ctx.lineWidth = 2;
                    ctx.setLineDash([5, 3]);
                    ctx.strokeStyle = '#595959';
                    ctx.stroke();
                    ctx.restore();
                }
            },
        });

        window.complete_requested_labels = Array.from(
            window.lineChart.data.labels
        );
    };

    const addGraphs = async (country_name, weeks) => {
        window.chartColors = {
            red: '#bc438b',
            orange: '#d1762e',
            pink: '#b64979',
            green: '#4bc0c0',
            blue: '#36a2eb',
            purple: '#4b49b6',
            grey: '#c9cbcf',
        };
        try {
            var colorNames = Object.keys(window.chartColors);
            var colorName =
                colorNames[
                    window.lineChart.data.datasets.length % colorNames.length
                ];
            var newColor = window.chartColors[colorName];
            let [required_data] = await parseData(country_name, weeks);
            let dailyData = required_data[window.content_type];
            var newsliceDataset = {
                label: country_name,
                backgroundColor: newColor,
                borderColor: newColor,
                fill: false,
                data: dailyData.slice(
                    typeof window.slice_count === undefined
                        ? 0
                        : window.slice_count
                ),
            };
            window.lineChart.data.datasets.push(newsliceDataset);
            window.lineChart.update();
        } catch (error) {
            country.current.classList.add('is-invalid');
            document.querySelector(
                '.graph-feedback.invalid-feedback'
            ).innerText =
                'Something went wrong 😕, Hang On! so that graphs loads properly...';
        }
    };
    return (
        <>
            <div className="chart-wrapper container my-5">
                <canvas id="trackerChart"></canvas>
            </div>
            <div className="container">
                <form className="form-group needs-validation pb-5">
                    <div className="form-row d-flex justify-content-center align-items-center">
                        <div className="col-sm-10 col-md-10 col-lg-5 my-3 my-lg-0">
                            <input
                                type="text"
                                name="country"
                                className="form-control"
                                placeholder="Add from over 186 countries ?"
                                required
                                autoComplete="off"
                                pattern="[A-Za-z]+"
                                ref={country}
                            />
                            <ul
                                className="list-group list-group-flush mt-1"
                                id="country_list"
                                ref={wrapperRefGraph}
                            >
                                <RenderRows
                                    selectedCountry={countries}
                                    method={setCountries}
                                    country={country}
                                    listGroupColor={'white'}
                                    parent={wrapperRefGraph.current}
                                />
                            </ul>
                            <div className="graph-feedback invalid-feedback"></div>
                        </div>
                        <button
                            type="submit"
                            value="Add"
                            className="btn btn-info align-self-start btn col-2 mx-2 col-md-2 col-lg-1"
                            ref={add_country_btn}
                            onClick={(event) => add_country_handler(event)}
                        >
                            Add
                        </button>
                        <select
                            name="no_of_weeks"
                            ref={weeks_count}
                            className="weeks_select form-control text-nowrap align-self-start col-2 mx-2 col-md-3 col-lg-1"
                            onChange={(event) => weeks_change_handler(event)}
                            defaultValue="8"
                        >
                            <option value="1">1 Week</option>
                            <option value="2">2 Weeks</option>
                            <option value="8">2 Months</option>
                        </select>
                        <select
                            name="contentType"
                            ref={contentType}
                            className="weeks_select form-control text-nowrap align-self-start col-2 mx-2 col-md-3 col-lg-1"
                            onChange={(event) => content_type_handler(event)}
                            defaultValue="8"
                        >
                            <option value="dailyNewCases">New Cases</option>
                            <option value="dailyDeathCases">Deaths</option>
                            <option value="dailyActiveCases">Active</option>
                        </select>
                    </div>
                </form>
            </div>
        </>
    );
};

export default memo(GraphTracker);
