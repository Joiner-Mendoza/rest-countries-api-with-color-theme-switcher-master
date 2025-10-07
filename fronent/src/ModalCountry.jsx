import React from "react";
import "./styles/modalCountry.css";
import { useNavigate } from "react-router-dom";

function ModalCountry({
  name,
  nativeName,
  flags,
  region,
  capital,
  population,
  subregion,
  currencies,
  languages,
  borders,
  topLevelDomain,
  allCountries,
  onClose
}) {
  const navigate = useNavigate();

  // Convertir códigos de fronteras a nombres
  const borderNames = borders?.map(
    (code) => allCountries.find((c) => c.alpha3Code === code)?.name || code
  );

  // Manejar cierre del modal
  const handleClose = (e) => {
    e.preventDefault();
    if (onClose) onClose();
    navigate(-1);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="back-btn" onClick={handleClose}>← Back</button>

        <div className="modal-country">
          <img src={flags.svg} alt={name} className="country-flag" />

          <div className="country-info">
            <h2>{name}</h2>

            <div className="info-columns">
              <div>
                <p><b>Native Name:</b> {nativeName}</p>
                <p><b>Population:</b> {population.toLocaleString()}</p>
                <p><b>Region:</b> {region}</p>
                <p><b>Sub Region:</b> {subregion}</p>
                <p><b>Capital:</b> {capital || "N/A"}</p>
              </div>
              <div>
                <p><b>Top Level Domain:</b> {topLevelDomain?.join(", ")}</p>
                <p><b>Currencies:</b> {currencies?.map(c => c.name).join(", ")}</p>
                <p><b>Languages:</b> {languages?.map(l => l.name).join(", ")}</p>
              </div>
            </div>

            <div className="border-section">
              <b>Border Countries:</b>{" "}
              {borderNames?.length > 0 ? (
                borderNames.map((b, i) => (
                  <button key={i} className="border-btn">{b}</button>
                ))
              ) : (
                <span>None</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ModalCountry };
