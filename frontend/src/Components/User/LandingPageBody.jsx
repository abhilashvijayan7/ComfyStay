/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    homePropertylist(currentPage, limit)
      .then((response) => {
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
          } finally {
            setIsLoading(false);
          }
        }
      })
      .catch((error) => {
        toast.error('Error fetching data', {
          position: toast.POSITION.TOP_CENTER,
          toastId: 'property-toast',
        });
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) {
      return;
    }

    setCurrentPage(pageNumber);
  };

  const filteredProperties = selectedCategory
    ? homeProperty.filter((item) => item.hometype === selectedCategory)
    : homeProperty;

  return (
    <div className="lg:px-16">
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          {/* Paste the provided loading animation SVG here */}
          <button
            disabled=""
            type="button"
            className="py-2.5 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
          >
            <svg
              aria-hidden="true"
              role="status"
              className="inline w-4 h-4 mr-3 text-gray-200 animate-spin dark:text-gray-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="#1C64F2"
              />
            </svg>
            Loading...
          </button>


        </div>
      ) : (
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
                      <h5 className="text-gray-900 text-xl font-medium mb-2">
                        {item.address.city}, {item.address.district}, {item.address.state}
                      </h5>
                      <p className="text-gray-400 text-lg font-medium mb-3">
                        {item.hometype && item.hometype.charAt(0).toUpperCase() + item.hometype.slice(1)}
                      </p>
                      <p className="text-gray-500 text-sm mb-3">PIN-{item.address.pincode}</p>
                      <p>
                        <span className="font-semibold"></span> ₹{item.homeprice}
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
                      >
                        <svg
                          className="w-2.5 h-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 1 1 5l4 4" />
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
                      >
                        <svg
                          className="w-2.5 h-2.5"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 6 10"
                        >
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 9 4-4-4-4" />
                        </svg>
                      </button>
                    </li>
                  </ul>
                </nav>
              </>
            </footer>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPageBody;
