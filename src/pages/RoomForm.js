import React, { useState, useContext} from 'react';
import AuthContext from '../context/AuthContext';

const RoomForm = () => {
    let {authTokens}=useContext(AuthContext) 

  // State to manage form data
  const [formData, setFormData] = useState({
    topic: '',
    name: '',
    description: '',
    private: false,
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Call the createRoom function with the form data
    createRoom(formData);

    // You can also reset the form if needed
    setFormData({
      topic: '',
      name: '',
      description: '',
      private: false,
    });
  };

  // The createRoom function, you can replace this with your actual logic
  const createRoom = async (roomData) => {
    try {
      // Assuming you want to log the roomData for now
      console.log('Creating room with data:', roomData);
      
  
      // Send a POST request to the Django API endpoint
      const response = await fetch('http://127.0.0.1:8000/api/create-roomAPI/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authTokens.access}`, // Replace with your actual access token
        },
        body: JSON.stringify(roomData),
      });

      

  
      if (!response.ok) {
        // Handle the case where the request was not successful
        console.error('Error creating room:', response.statusText);
        return;
      }
  
      // Assuming the response contains a success message
      const responseData = await response.json();
      console.log('Room created successfully:', responseData.message);
  
      // Optionally handle additional logic or UI updates after room creation
  
    } catch (error) {
      console.error('Error creating room:', error.message);
    }
  };
  

  return (
    <main className="create-room layout">
      <div className="container">
        <div className="layout__box">
          <div className="layout__boxHeader">
            <div className="layout__boxTitle">
              <a href='/'>
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <title>arrow-left</title>
                  <path d="M13.723 2.286l-13.723 13.714 13.719 13.714 1.616-1.611-10.96-10.96h27.625v-2.286h-27.625l10.965-10.965-1.616-1.607z"></path>
                </svg>
              </a>
              <h3>Create/Update Study Room</h3>
            </div>
          </div>
          <div className="layout__body">
            <form className="form" onSubmit={handleSubmit}>
              {/* CSRF token */}
              <input type="hidden" name="csrfmiddlewaretoken" value="your-csrf-token" />

              {/* Enter a Topic */}
              <div className="form__group">
                <label htmlFor="room_topic">Enter a Topic</label>
                <input
                  required
                  type="text"
                  value={formData.topic}
                  name="topic"
                  list="topic-list"
                  onChange={handleInputChange}
                />
                <datalist id="topic-list">
                  <option value="React">React</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="HTML">HTML</option>
                </datalist>
              </div>

              {/* Room Name */}
              <div className="form__group">
                <label htmlFor="room_name">Room Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              {/* Room Description */}
              <div className="form__group">
                <label htmlFor="room_description">Room Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                />
              </div>

              {/* Private Room Checkbox
              <div className="form__group" style={{ display: 'flex' }}>
                <label htmlFor="room_private">
                  Private Room
                  <input
                    type="checkbox"
                    name="private"
                    checked={formData.private}
                    onChange={handleInputChange}
                  />
                </label>
              </div> */}

              {/* Form Action */}
              <div className="form__action">
                <a className="btn btn--dark" href={document.referrer}>
                  Cancel
                </a>
                <button className="btn btn--main" type="submit">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RoomForm;
