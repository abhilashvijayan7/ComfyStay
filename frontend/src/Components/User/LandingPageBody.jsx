/* eslint-disable react/prop-types */



/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { homePropertylist } from '../../Services/UserApi';
import { useNavigate } from 'react-router-dom';




const LandingPageBody = ({ selectedCategory }) => {
  const navigate = useNavigate();

  const propertyDetail = (propertyId) => {
    navigate(`/propertydetail/${propertyId}`);
  };

  const [homeProperty, setHomeProperty] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;

  useEffect(() => {
    let isMounted = true;

    homePropertylist(currentPage, limit).then((response) => {
      if (isMounted) {
        try {
          if (response.data.status) {
            setHomeProperty(response.data.approvedlist);
            setTotalPages(response.data.totalPages);
          } else {
            toast(response.data.message, {
              position: toast.POSITION.TOP_CENTER,
              toastId: 'property-toast',
            });
          }
        } catch (error) {
          toast.error(error.message, {
            position: toast.POSITION.TOP_CENTER,
            toastId: 'property-toast',
          });
        }
      }
    });

    return () => {
      isMounted = false;
    };
  }, [currentPage]);


  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return; // Invalid page number, do nothing
    }

    setCurrentPage(pageNumber);
  };

  // Filter the home properties based on the selected category
  const filteredProperties = selectedCategory
    ? homeProperty.filter((item) => item.hometype === selectedCategory)
    : homeProperty;

  return (
    <div className="lg:px-16">
      <div className="mx-auto">
        <div className="grid md:grid-cols-2 gap-3 grid-cols-1 lg:grid-cols-4 pt-1 sm:pt-6 pb-5">
          {filteredProperties &&
            filteredProperties.map((item) => (
              <div
                key={item._id}
                onClick={() => propertyDetail(item._id)}
                className="flex justify-center hover:shadow-2xl hover:cursor-pointer"
              >
                <div className="rounded-lg shadow-lg bg-white border border-gray-300 hover:border-gray-500">
                  <div className="flex justify-center pt-4 px-4 object-cover transform transition-transform hover:scale-105">
                    <img
                      className="rounded-lg h-64 w-72 md:h-80 md:w-80"
                      src={`${import.meta.env.VITE_SERVER_URL}/${item.homephoto}`}
                      alt=""
                    />
                  </div>
                  <div className="p-6 text-center">
                    <h5 className="text-gray-900 text-xl font-medium mb-2">{item.address.city},{item.address.district},{item.address.state}</h5>
                    <p className="text-gray-400 text-lg font-medium  mb-3">{item.hometype && item.hometype.charAt(0).toUpperCase() + item.hometype.slice(1)}</p>



                    <p className="text-gray-500 text-sm mb-3">PIN-{item.address.pincode}</p>
                    <p>
                      <span className="font-semibold "></span> ₹{item.homeprice}
                    </p>
                  </div>
                </div>
              </div>
            ))}

        </div>


        {totalPages != null && totalPages > 0 && (
          <footer className="flex justify-center items-center mt-3 mb-10">
            <>
              <nav aria-label="Page navigation example">
                <ul className="inline-flex -space-x-px text-sm">


                  <li>
                    <button
                      className={`flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg ${currentPage === 1 ? 'hidden' : ''
                        } hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      onClick={() => handlePageChange(currentPage - 1)}
                    // disabled={currentPage === 1}
                    >
                      <svg
                        className="w-2.5 h-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 1 1 5l4 4"
                        />
                      </svg>

                    </button>
                  </li>


                  {Array.from({ length: totalPages }, (_, index) => index + 1).map((pageNumber) => (
                    <li key={pageNumber}>
                      <button
                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 ${pageNumber === currentPage && 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-red-500'
                          } dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </button>
                    </li>
                  ))}



                  <li>
                    <button
                      className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg ${currentPage === totalPages ? 'hidden' : ''
                        } hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
                      onClick={() => handlePageChange(currentPage + 1)}
                    // disabled={currentPage === totalPages}
                    >
                      <svg
                        className="w-2.5 h-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 6 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="m1 9 4-4-4-4"
                        />
                      </svg>

                    </button>
                  </li>
                </ul>
              </nav>
            </>
          </footer>
        )}

      </div>

    </div>

  );
};

export default LandingPageBody;
