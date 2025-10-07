import React, { useState, useEffect } from "react";
import "./styles/menu.css";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";

function Menu() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);

  const handleLocationClick = (e) => {
    e.preventDefault();
    navigate("/");
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <main className="Main">
      <nav className="Container_nav-main">
        <ul className="Container_nav-main-ul">
          <li onClick={handleLocationClick}>Where in the world?</li>
        </ul>

        <div className="dark-toggle" onClick={toggleDarkMode}>
          <i className="fa-solid fa-moon"></i>
          {darkMode ? "Light Mode" : "Dark Mode"}
        </div>
      </nav>
    </main>
  );
}

export { Menu };
