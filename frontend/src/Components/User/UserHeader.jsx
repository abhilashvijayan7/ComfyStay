/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-undef */
/* eslint-disable no-empty */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { userHeader } from '../../Services/UserApi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setUserDetails } from '../../features/setUser';
import { FaUserCircle } from 'react-icons/fa';
function UserHeader() {
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false)

  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.value)

  useEffect(() => {

    const userToken = localStorage.getItem('jwt');

    userHeader().then((response) => {
      if (response.data.status) {
        dispatch(setUserDetails(response.data.user))
      }

      if (response.data.loginfail) {
        localStorage.removeItem("jwt")
      }

    }).catch((error) => {
      toast(error.message)
    })


  }, []);


  const UserLogout = () => {
    try {
      localStorage.removeItem("jwt")
      dispatch(setUserDetails(null))
      setToggle(false)
      navigate("/")
      window.location.reload(false);


    } catch (error) {

    }
  }

  const userLogin = () => {
    navigate("/login")
  }
  const gotoLandingPage = () => {

    navigate("/");
    location.reload();
  };

  const gotoAddHomeDetailsPage = () => {
    if (user) {
      navigate("/addyourhome");

    } else {
      navigate("/login");

    }
  };




  const handleList = () => {

    navigate("/propertylist");
  };
  const bookingList = () => {

    navigate("/bookinglist");
  };
  return (
    <div>
      <nav className="bg-white border-gray-500 px-2 sm:px-4 py-2 dark:bg-gray-800">
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
              {user ?

                <><li>
                  <button
                    onClick={handleList}
                    href="#"
                    className="block mt-1 py-2 pl-3 pr-4 md:text-lg text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    My properties
                  </button>
                </li><li>
                    <button
                      onClick={bookingList}
                      href="#"
                      className="block mt-1 py-2 pl-3 pr-4 md:text-lg text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-white dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      My bookings
                    </button>
                  </li></>
                : null}
              <li>
                {user ? <div>
                  <button type="button" onClick={() => setToggle(!toggle)} className="flex mr-3 text-sm  rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300" id="user-menu-button" aria-expanded="false" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
                    <p className="sr-only">Open user menu</p>
                    <img className="w-8 h-8 rounded-full" src="https://st3.depositphotos.com/3431221/13621/v/450/depositphotos_136216036-stock-illustration-man-avatar-icon-hipster-character.jpg" alt="user photo" />
                  </button>
                </div> :
                  <div onClick={userLogin} className="flex cursor-pointer  items-center md:order-2 mt-1.5  font-bold md:mr-0 text-sm  rounded-full">
                    <button >
                      <FaUserCircle className='w-6 h-6 text-[#6b7280]' />
                    </button>
                    <p className='ml-2 text-xs text-blue-300'>Signin</p>
                  </div>

                }
                {toggle &&
                  <div className="z-50 absolute top-10 right-5 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600" id="user-dropdown">
                    <div className="px-4 py-3">
                      <p className="block text-sm text-gray-900 dark:text-white">{user.username}</p>
                      <p className="block text-sm  text-gray-500 truncate dark:text-gray-400">{user.email}</p>
                    </div>
                    <ul className="py-2" aria-labelledby="user-menu-button">
                      <li onClick={() => navigate("/profile")} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Profile
                      </li>

                      {/* <li  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 cursor-pointer dark:hover:text-white">Get in touch
                    </li> */}
                      <li>
                        <p onClick={UserLogout} className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 cursor-pointer dark:hover:text-white'>Sign out</p>
                      </li>
                    </ul>
                  </div>}
              </li>


            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default UserHeader;
