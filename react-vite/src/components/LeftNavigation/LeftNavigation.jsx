import { useNavigate, useLocation } from "react-router-dom";
import { AiOutlineHome, AiOutlineQuestion, AiOutlineTag, AiTwotoneHeart } from "react-icons/ai";


function LeftNavigation () {
  const navigate = useNavigate();
  const location = useLocation();

  const handleHome = () => {
    navigate('/')
  }

  const handleQuestion = () => {
    navigate('/questions')
  }

  const handleTag = () => {
    navigate('/tags')
  }

  const handleSave = () => {
    navigate('/questions/saved/current')
  }

  return (
    <nav className="leftnav">
      <div>

        <button
          className="nav-button"
          onClick={handleHome}
          disabled={(location.pathname=="/")}>
          <AiOutlineHome />Home
        </button>
        <button
          className="nav-button"
          onClick={handleQuestion}
          disabled={(location.pathname.includes("/questions"))}>
          <AiOutlineQuestion />Questions
        </button>
        <button
          className="nav-button"
          onClick={handleTag}
          disabled={(location.pathname.includes("/tags"))}>
          <AiOutlineTag />Tags
        </button>
        <button
          className="nav-button"
          onClick={handleSave}
          disabled={(location.pathname=="/questions/saved/current")}>
          <AiTwotoneHeart />Saves
        </button>

      </div>

    </nav>
  );
}
export default LeftNavigation;
