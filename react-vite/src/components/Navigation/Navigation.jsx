import { useNavigate } from "react-router-dom";
import { FaStackOverflow } from "react-icons/fa6";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/')
  }


  return (
    <nav className="navbar">
      <div>
        <button
          id="home-button"
          onClick={handleHomeClick}
        >
          <FaStackOverflow />
          Stack <b>Flow</b>
        </button>
      </div>
      <div>
        <ProfileButton id="profile-button"/>
      </div>

    </nav>
    // <ul>
    //   <li>
    //     <NavLink to="/">Home</NavLink>
    //   </li>

    //   <li>
    //     <ProfileButton />
    //   </li>
    // </ul>
  );
}

export default Navigation;
