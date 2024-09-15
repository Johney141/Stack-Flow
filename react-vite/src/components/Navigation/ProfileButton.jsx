import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineUser } from "react-icons/ai";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import './ProfileButton.css'
import { useNavigate } from "react-router-dom";

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
  const ulRef = useRef();
  const navigate = useNavigate();

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const profileCLick = (e) => {
    e.preventDefault();
    navigate(`/users/${user.id}`)
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
  };

  return (
    <div className="profile-container">
      <button onClick={toggleMenu} id="profile-button">
        <AiOutlineUser />
      </button>
      {showMenu && (
        <div className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className="nav-profile">
              <div>{user.username}</div>
              <div>{user.email}</div>
              <button className='nav-modalbutton' onClick={profileCLick}>Profile</button>
              <button className='nav-modalbutton' onClick={logout}>Log Out</button>
            </div>
          ) : (
            <div className="nav-profile">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                className='nav-modalbutton'
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                className='nav-modalbutton'
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ProfileButton;
