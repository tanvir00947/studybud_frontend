import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const UpdateUserProfile = () => {
  const { user, authTokens } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    // Fetch user details when the component mounts
    fetchUserDetails();
  }, []); // Empty dependency array means this effect runs once after the initial render

  const fetchUserDetails = async () => {
    try {
      // Fetch user details using the user ID
      const response = await fetch('https://tanvirpythonanywhere.pythonanywhere.com/api/update-user-profileAPI/', {
        method: 'GET',
        headers: {
          // Include your authentication token here if needed
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`,
        },
      });

      if (response.ok) {
        const userDetails = await response.json();
        // Update the state with user details
        setFormData({
          name: userDetails.name,
          username: userDetails.username,
          email: userDetails.email,
          bio: userDetails.bio,
        });
      } else {
        console.error('Error fetching user details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user details:', error.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a PUT request to update the user profile
      const response = await fetch('https://tanvirpythonanywhere.pythonanywhere.com/api/update-user-profileAPI/', {
        method: 'PUT',
        headers: {
          // Include your authentication token here if needed
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // User profile updated successfully
        alert('User profile updated successfully');
        // Redirect to the user profile page or any other appropriate page
      } else {
        // Handle the case where the request was not successful
        console.error('Error updating user profile:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating user profile:', error.message);
    }
  };

  return (
    <main className="update-account layout">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <Link to="/">
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <title>arrow-left</title>
                  <path
                    d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"
                  ></path>
                </svg>
              </Link>
              <h3>Edit your profile</h3>
            </div>
          </div>
          <div className="layout__body">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form__group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="E.g. John Doe"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="E.g. JohnDoe123"
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="E.g. john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form__group">
                <label htmlFor="user_bio">Bio</label>
                <textarea
                  name="bio"
                  id="user_bio"
                  placeholder="Write about yourself..."
                  value={formData.bio}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              <div className="form__action">
                <Link className="btn btn--dark" to="/">
                  Cancel
                </Link>
                <button className="btn btn--main" type="submit">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateUserProfile;
