import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import { FaStackOverflow } from "react-icons/fa6";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password must be same as the Password",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
  <div className="middle">
    <div className='modal'>
      <div className='md-element'>
        <a href="/">
          <FaStackOverflow className='md-icon'/>
        </a>
      </div>

      <div className='md-element'>
        <div className='md-demo-div middle bold'>
          Sign Up For Stack Flow
        </div>
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
          <b>Username</b>
        </label>
        <div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username needs to be 6 characters or longer'
            required
          />
          {errors.username && (
            <div className='error'>{errors.username}</div>
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
            placeholder='Password needs to be 6 characters or longer'
            required
          />
          {errors.password && (
            <div className='error'>{errors.password}</div>
          )}
        </div>

        <label>
          <b>Confirm Password</b>
        </label>
        <div>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder=''
            required
          />
          {errors.confirmPassword && (
            <div className='error'>{errors.confirmPassword}</div>
          )}
        </div>



        <button type="submit" className='md-button'
          disabled={!email || !password || email.length < 8 || username.length < 6 || password.length < 6}>
            Sign Up
        </button>
      </form>
    </div>
  </div>
  );
}

export default SignupFormModal;
