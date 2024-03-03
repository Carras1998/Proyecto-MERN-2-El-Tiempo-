import { NavLink } from "react-router-dom";
import "./Navbar.css";

const closeMenu = () => {
  const menuCheckbox = document.getElementById('menu');
  if (menuCheckbox.checked) {
    menuCheckbox.checked = false;
  }
}
function Navbar() {
  return (
    <header>
      <div className="logo">
        <NavLink className="logo" to=''><img src="/src/public/meteorologia.png" alt="logo" /></NavLink>
      </div>
      <nav>
        <input className="hamburguer" type="checkbox" id="menu" />
        <label htmlFor="menu">⭐</label>
        <ul>
          <li> <NavLink to="" className="navItems" onClick={closeMenu}>Hoy</NavLink></li>
          <li> <NavLink to="FiveDaysMainView" className="navItems" onClick={closeMenu}>Próximos 5 días</NavLink></li>
          <li> <NavLink to="FiveDaysInCities" className="navItems" onClick={closeMenu}>Ciudades de España</NavLink></li>
        </ul>
      </nav>

    </header>
  )
}

export default Navbar