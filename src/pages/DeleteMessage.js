import React, { useState, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const DeleteMessage = () => {
  const { messageId } = useParams();
  const history = useNavigate();
  const [confirmation, setConfirmation] = useState(false);

  const { authTokens } = useContext(AuthContext);

  const handleConfirmation = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/delete-messageAPI/${messageId}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authTokens.access}`,
          },
        }
      );

      if (response.status === 204) {
        // Message deleted successfully
        alert('Message deleted successfully');
        history('/'); // You can redirect to the appropriate page after deletion
      } else if (response.status === 403) {
        // User not allowed to delete the message
        console.error('You are not allowed to delete this message.');
      } else if (response.status === 404) {
        // Message not found
        console.error('Message not found.');
      } else {
        // Handle other errors
        console.error('Error deleting the message.');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <main className="delete-item layout">
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
              <h3>Back</h3>
            </div>
          </div>
          <div className="layout__body">
            <form className="form" onSubmit={handleConfirmation}>
              <div className="form__group">
                <p>Are you sure you want to delete this message?</p>
              </div>

              <div className="form__group">
                <button className="btn btn--main" type="submit">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DeleteMessage;
