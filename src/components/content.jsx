const global_data_elements = document.querySelectorAll('.count_global');
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
        });
};

const globalData = () => {
    var global_data = [
        apiData.Global.NewConfirmed,
        apiData.Global.TotalConfirmed,
        apiData.Global.TotalDeaths,
        apiData.Global.TotalRecovered,
    ];
    print(global_data_elements, global_data);
};
// printing the data
const print = (object_list, target, speed = 1.04) => {
    var counter = 1;
    object_list.forEach((element, index) => {
        const count = () => {
            if (counter < target[index]) {
                counter *= speed;
                element.innerHTML = Math.ceil(counter);
                setTimeout(count, 10);
            } else {
                element.innerHTML = target[index];
            }
        };
        count();
    });
};
// counting on scroll
var status = true;
window.addEventListener('scroll', () => {
    const world_data = document.querySelector('#world_data');
    if (
        window.scrollY + window.screen.height >
            world_data.offsetTop + world_data.clientHeight &&
        status === 'true'
    ) {
        status = false;
        fetchData();
    }
});
// country wise data
document.querySelector('#submit_btn').addEventListener('click', (obj) => {
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
        const country_elements = document.querySelectorAll('.country_count');
        var country_data = [
            selectedCountry[0].NewConfirmed,
            selectedCountry[0].TotalConfirmed,
            selectedCountry[0].TotalDeaths,
            selectedCountry[0].TotalRecovered,
        ];
        print(country_elements, country_data, 1.1);
    } catch (error) {
        if (error.name === 'Bad Response') {
            check = 0;
            country.classList.add('is-invalid');
            $('.collapse').collapse('hide');
            document.querySelector('.invalid-feedback').innerText = error;
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
countries_data = function () {
    try {
        apiData.Countries.forEach((item) => {
            country_names.push(item.Country);
        });
    } catch (error) {
        console.log('Error caused due to : ' + error.message);
    }
};

var country_list = document.querySelector('#country_list');
country.onkeyup = () => {
    $('.collapse').collapse('hide');
    if (country.value === '') {
        var country_list_items = document.querySelectorAll('#country_list li');
        country_list_items.forEach((item) => country_list.removeChild(item));
    } else {
        // removing all the child elements
        var country_list_items = document.querySelectorAll('#country_list li');
        country_list_items.forEach((item) => country_list.removeChild(item));
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
