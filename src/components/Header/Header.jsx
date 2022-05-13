import "./Header.scss"
import Logo from "../../assets/logo/InStock-Logo.svg"
import { NavLink } from "react-router-dom"

function Header() {
  return (
    <div className="header">
      <NavLink className="header__link" to="/warehouse">
        <img src={Logo} alt="Instock Logo" className="header__image" />
      </NavLink>
      <div className="header__nav">
        <NavLink
          className="header__nav--pageDefault"
          activeClassName="header__nav--pageState"
          to="/warehouse"
        >
          Warehouses       
        </NavLink>
        <NavLink
          className="header__nav--pageDefault"
          activeClassName="header__nav--pageState"
          to="/inventory"
        > 
          Inventory
        </NavLink>       
      </div>
    </div>
  )
}

export default Header;
