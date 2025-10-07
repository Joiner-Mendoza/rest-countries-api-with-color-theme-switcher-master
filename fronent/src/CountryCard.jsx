import React from "react";
import './styles/countryCard.css'
function CountryCard({image,name,population,region,capital}){
    return(
        <div className="card">
            <img
                src={image}
                className="card-img-top"
                alt={name}
               
            />
            <div className="card-body">
                <h3>{name}</h3>
                <p>Population: <strong>{population}</strong></p>
                <p>Region: <strong>{region}</strong></p>
                <p>Capital: <strong>{capital}</strong></p>

            </div>
        </div>
    );
};

export { CountryCard }
