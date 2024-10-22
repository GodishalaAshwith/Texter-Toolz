import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="nav-bar">
        <div className="logo">
          <Link to="/">SeTuna</Link>
        </div>
        <div className="pages">
          <div className="home">
            <Link to="/">Home</Link>
          </div>
          <div className="about">
            <Link to="/about">About</Link>
          </div>
          <div className="textor">Textor</div>
          <div className="contact">Contact Us</div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;