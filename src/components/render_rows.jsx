import React from 'react';

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
                    className="list-group-item list-group-item-action country_list_items"
                    onClick={handler}
                    style={{ backgroundColor: `${props.listGroupColor}` }}
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
