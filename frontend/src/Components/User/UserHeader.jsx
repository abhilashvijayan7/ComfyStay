/* eslint-disable no-unused-vars */
import React from "react";
import { useNavigate } from "react-router-dom";

function UserHeader() {
  const navigate = useNavigate();

  const gotoLandingPage = () => {

    navigate("/");
    location.reload();
  };

  const gotoAddHomeDetailsPage = () => {
    navigate("/addyourhome");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };


  const handleList = () => {

    navigate("/propertylist");
  };
  const bookingList = () => {

    navigate("/bookinglist");
  };
  return (
    <div>
      <nav className="bg-white border-gray-500 px-2 sm:px-4 py-2.5 dark:bg-gray-800">
        <div className="container flex flex-wrap items-center justify-between mx-auto">
          <div className="flex items-center">
            <button
              type="button"
              onClick={gotoLandingPage}
              className="block py-2 pl-3 md:text-2xl text-white rounded hover:bg-gray-700 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 font-bold text-4xl font-serif"
            >
              ComfyStay
            </button>
          </div>
          <div
            className="items-center justify-evenly md:w-auto md:order-1"
            id="navbar-search"
          >
            <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 dark:bg-gray-800 dark:border-gray-700">
              <li>
                <button
                  onClick={gotoAddHomeDetailsPage}
                  className="block mt-1 py-2 pl-3 pr-4 md:text-lg text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Add Your Home
                </button>
              </li>
              <li>
                <button
                  onClick={handleList}
                  href="#"
                  className="block mt-1 py-2 pl-3 pr-4 md:text-lg text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  My properties
                </button>
              </li>
              <li>
                <button
                  onClick={bookingList}
                  href="#"
                  className="block mt-1 py-2 pl-3 pr-4 md:text-lg text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  My bookings
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  href="#"
                  className="block mt-1 py-2 pl-3 pr-4 md:text-lg text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Logout
                </button>
              </li>


            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserHeader;
