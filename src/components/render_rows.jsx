import React from 'react';

const RenderRows = (props) => {
    const handler = (event) => {
        props.country.current.value = event.target.innerText;
        props.method([]);
        props.parent.style.height = "0px";
    };
    let memizer = [];
    const request_item_count = (country_name , status) => {
        let return_value = "";
        var filtered_country = props.selectedCountry.filter(
            (item) => item.status === 'country-active'
        );
        props.parent.style.height = `${filtered_country.length * 52}px`;
        filtered_country.forEach((item, indexs) => {
            if (item.name === country_name) {
                return_value = `translateY(${
                    50.64 * (indexs)
                }px)`;
            }
        });
        if(status === "country-inactive"){
            if(memizer.includes(country_name.name)){
                return memizer.find(item => item.country === country_name.name);
            }
        }
        else{
            memizer.push({"country": country_name , "transform" : return_value});
            return return_value;
        }
    };
    return (
        <>
            {props.selectedCountry.map((country_name) => (
                <li
                    key={country_name.index}
                    className={
                        'list-group-item list-group-item-action country_list_items ' +
                        country_name.status
                    }
                    onClick={handler}
                    style={{
                        backgroundColor: `${props.listGroupColor}`,
                        transform: `${request_item_count(country_name.name, country_name.status)}`
                    }}
                >
                    <img
                        className="px-2"
                        src={`https://www.countryflags.io/${country_name.CountryCode}/shiny/24.png`}
                        alt={`${country_name.CountryCode}`}
                    />
                    {country_name.name}
                </li>
            ))}
        </>
    );
};

export default RenderRows;
