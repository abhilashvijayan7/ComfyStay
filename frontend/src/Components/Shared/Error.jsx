/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate


function Error() {

    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleGoBack = () => {
      // Define the action you want to take when the button is clicked
      navigate(-1); // Navigate back by one step in the history
    };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=2000&t=st=1691348999~exp=1691349599~hmac=f2eeb797a9b99ee95c887a8968d103a660e37e270693866dcdcb62c2e1e952f0')" }}>
      <h1 className="text-3xl font-semibold mb-2 text-gray-200 ">404 - Page Not Found</h1>
      <p className="text-gray-50">The page you're looking for doesn't exist.</p>
      <button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleGoBack} >
        Go Back
      </button>
    </div>
  );
}

export default Error;
