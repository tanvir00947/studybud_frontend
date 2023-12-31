import React,{useContext} from 'react';
import AuthContext from '../context/AuthContext';
import { Link } from 'react-router-dom';


const LoginPage = () => {
  let {loginUser} = useContext(AuthContext)
  return (
    <div className="auth layout">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <h3>Login</h3>
            </div>
          </div>
          <div className="layout__body">
            <h2 className="auth__tagline">Find your study partner</h2>

            <form className="form" onSubmit={loginUser}>
              <div className="form__group form__group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="email"
                  type="email"
                  placeholder="e.g. dennis_ivy"
                //   value="john_doe" // Hardcoded value for demonstration
                //   onChange={() => {}}
                />
              </div>
              <div className="form__group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                //   value="password123" // Hardcoded value for demonstration
                //   onChange={() => {}}
                />
              </div>

              <button className="btn btn--main" type="submit">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  {/* Your SVG path here */}
                </svg>

                Login
              </button>
            </form>

            <div className="auth__action">
              <p>Haven't signed up yet?</p>
              <Link to="/register" className="btn btn--link">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
