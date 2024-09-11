import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { FaStackOverflow } from "react-icons/fa6";
import "./LoginForm.css";

function LoginFormModal() {
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
    } else {
      closeModal();
    }
  };

  const handleDemoSubmit = () => {
    return dispatch(thunkLogin({ email: "demo@aa.io", password: "password" }))
      .then(closeModal);
  }

  return (
    <div class='modal'>
      <div class='md-element'>
        <a href="/">
          <FaStackOverflow class='md-icon'/>
        </a>
      </div>

      <div class='md-element'>
        <button
          class='md-demo-button'
          onClick={handleDemoSubmit}>
            Log in as Demo User
        </button>
      </div>

      <form class='md-element-form' onSubmit={handleSubmit}>

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
            <div class='error'>{errors.email}</div>
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
            <div class='error'>{errors.password}</div>
          )}
        </div>



        <button type="submit" class='md-button'
          disabled={!email || !password || email.length < 8 || password.length < 6}>
            Log In
        </button>

        <div>
          Don’t have an account? <a href="/signup">Sign up</a>
        </div>
      </form>



    </div>
  );

  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button type="submit">Log In</button>
      </form>
    </>
  );
}

export default LoginFormModal;
