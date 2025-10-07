import React, { useEffect, useState } from "react";
import { CountryCard } from "./CountryCard"; 
import "./styles/home.css";
import { ModalCountry } from "./ModalCountry";
function Home() {
  //  Estado para guardar todos los países cargados desde la API
  const [countries, setCountries] = useState([]);

  //  Estado para manejar la carga (mientras esperamos la respuesta del fetch)
  const [loading, setLoading] = useState(true);

  //  Estado para guardar el texto que escribe el usuario en la barra de búsqueda
  const [searchQuery, setSearchQuery] = useState("");

  // Estado para almacenar las regiones seleccionadas
  const [selectedRegion,setSelectedRegion] = useState('All')
  // estado para abrir el modal
  const [selectedCountry, setSelectedCountry] = useState(null);
  // ##### Fetch de países al montar el componente #####
  useEffect(() => {
    // Hacemos una petición a la API de países
    fetch("https://restcountries.com/v2/all?fields=name,flags,region,capital,population,subregion,currencies,languages,borders,topLevelDomain")
      .then((res) => res.json()) // Convertimos la respuesta a formato JSON
      .then((data) => {
        // Validamos que la respuesta sea un arreglo 
        if (!Array.isArray(data)) throw new Error("Respuesta inválida del servidor");
        const sorted = data.sort((a, b) => a.name.localeCompare(b.name));//ordeno los paices alfabeticamente
        setCountries(sorted);//guardo el estado del pais
        setLoading(false);//termino de cargar
      })
      .catch((error) => {
        console.error("Error al cargar países:", error);
        setLoading(false);
      });
  }, []); 
  //  Este useEffect solo se ejecuta una vez (cuando el componente se monta)

  //  Filtrar países según la búsqueda del usuario
  // Tomamos el texto del input (searchQuery)
  // y mostramos solo los países cuyo nombre incluya esa palabra
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.toLowerCase().includes(searchQuery.toLowerCase());//Verifica si el nombre del país coincide con lo que el usuario escribió
    const matchesRegion = selectedRegion === "All" || country.region === selectedRegion;//si el pais coincide con la region lo selecicona si no muestratodos si la seleccion es "All"
    return matchesSearch && matchesRegion;//muestra todo lo que cunpla
  });

  //  Render del componente
  return (
    <div className="container mt-4 home">
      {/*  Formulario de búsqueda */}
      <form className="search-form" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          placeholder="Buscar país..."
          value={searchQuery} 
          onChange={(e) => setSearchQuery(e.target.value)} // Cada cambio actualiza el estado
          className="search-input"
        />
               {/*  Select de regiones */}
        <div className="filter-container">
          <select
            className="region-select"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="All">Filter by Region</option>
              <option value="Africa">Africa</option>
                <option value="Americas">America</option>
                  <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
          </select>
        </div>
      </form>

     



      {loading ? (
        <p className="lo">Cargando países...</p>
      ) : (
        <div className="country-grid">
          {filteredCountries.length > 0 ? (
          filteredCountries.map((country, index) => (
            <div 
              key={index}
              onClick={() => setSelectedCountry(country)} 
              style={{ cursor: "pointer" }}
            >
              <CountryCard
                image={country.flags.svg}
                name={country.name}
                population={country.population.toLocaleString()}
                region={country.region}
                capital={country.capital || "N/A"}
              />
            </div>
          ))
        ) : (
          <p className="fallide">Busqueda fallida.</p>
        )}

        </div>
    
    )}
    {/* Modal del pais */}
{selectedCountry && ( 
  <div className="modal-overlay" onClick={() => setSelectedCountry(null)}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <ModalCountry
        {...selectedCountry}
        allCountries={countries}
        onClose={() => setSelectedCountry(null)} 
      />
    </div>
  </div>
)}


    </div>
    
  );
}

export { Home };
