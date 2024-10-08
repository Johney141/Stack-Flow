import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaStackOverflow } from "react-icons/fa6";
import { fetchFollowings } from "../../redux/following";
import "./LoginForm.css";

function LoginFormModal() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
      dispatch(fetchFollowings())
    } else {
      closeModal();
      navigate("/");
    }
  };

  const handleDemoSubmit = () => {
    return dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }))
    .then(() => dispatch(fetchFollowings()))
      .then(closeModal)
      .then(() => navigate('/'));
  }

  return (
  <div className="middle">
    <div className='modal'>
      <div className='md-element'>
        <a href="/">
          <FaStackOverflow className='md-icon'/>
        </a>
      </div>

      <div className='md-element'>
        <button
          className='md-demo-button'
          onClick={handleDemoSubmit}>
            Log in as Demo User
        </button>
      </div>

      <form className='md-element-form' onSubmit={handleSubmit}>

        <label>
          <b>Email</b>
        </label>
        <div>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Example: example@gmail.com'
            required
          />
          {errors.email && (
            <div className='error'>{errors.email}</div>
          )}
        </div>

        <label>
          <b>Password</b>
        </label>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
            required
          />
          {!errors.email && errors.password && (
            <div className='error'>{errors.password}</div>
          )}
        </div>



        <button type="submit" className='md-button'
          disabled={!email || !password || email.length < 8 || password.length < 6}>
            Log In
        </button>

        <div>
          Don’t have an account? <a href="/signup">Sign up</a>
        </div>
      </form>
    </div>
  </div>
  );
}

export default LoginFormModal;
