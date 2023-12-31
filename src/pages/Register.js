import React, { useState} from 'react';
import { Navigate, useNavigate , Link} from "react-router-dom";

const Register = () => {
  const history =useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();

    try {
        console.log('formData ',formData)
      const response = await fetch('http://127.0.0.1:8000/api/register-userAPI/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.status === 201) {
        console.log('Registration successful:', data);
        alert('Registration successful, Login to continue');
        history('/login')
      } else {
        console.error('Registration failed:', data);
        // Handle registration error, display error message, etc.
      }
    } catch (error) {
      console.error('Registration error:', error.message);
      // Handle network or unexpected errors
    }
  };


  

  return (
    <main className="auth layout">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <h3>Sign up</h3>
            </div>
          </div>
          <div className="layout__body">
            <h2 className="auth__tagline">Find your study partner</h2>

            <form className="form" onSubmit={registerUser}>
              <div className="form__group">
                <label htmlFor="name">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="e.g. Dennis Ivy"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="e.g. dennis_ivy"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="e.g. email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="form__group">
                <label htmlFor="confirm_password">Confirm Password</label>
                <input
                  id="confirm_password"
                  name="confirm_password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
              </div>

              <button className="btn btn--main" type="submit">
                Sign Up
              </button>
            </form>

            <div className="auth__action">
              <p>Already have an account?</p>
              <Link to="/login" className="btn btn--link">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
