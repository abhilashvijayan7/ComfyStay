/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { propertylist } from '../../Services/UserApi';

function PropertyList() {
    const [property, setProperty] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 2;

    useEffect(() => {
        let isMounted = true; // Add a flag to track component mount status
        propertylist(currentPage, limit)
            .then((response) => {
                if (isMounted) { // Check if the component is still mounted before updating state
                    try {

                        if (response.data.status) {
                            setProperty(response.data.homelist);
                            setTotalPages(response.data.totalPages);
                        } else {
                            toast(response.data.message, {
                                position: toast.POSITION.TOP_CENTER, // Set toast position to top-center
                                toastId: 'property-toast' // Set a unique toastId to prevent duplicates
                            });
                        }
                    } catch (error) {
                        toast.error(error.message, {
                            position: toast.POSITION.TOP_CENTER, // Set toast position to top-center
                            toastId: 'property-toast' // Set a unique toastId to prevent duplicates
                        });
                    }
                }
            });

        return () => {
            setProperty(null)
            isMounted = false; // Set the mounted flag to false on component unmount
        };
    }, [currentPage]);


    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return; // Invalid page number, do nothing
        }

        setCurrentPage(pageNumber);
    };

    return (
        <>
            <header className="py-7 bg-gray-800">
                <div className="flex items-center justify-center sm:justify-start">
                    <p className="text-white px-4 sm:px-12 text-2xl sm:text-3xl font-serif">
                        PropertyList
                    </p>
                </div>
            </header>

            <div className="overflow-x-auto shadow-md sm:rounded-lg m-10">
                <div className="inline-block min-w-full overflow-hidden bg-gray-100">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs bg-gray-200 text-gray-800 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    property number
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    image
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    no guests
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Bedrooms
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Beds
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Bathrooms
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Location
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {property &&
                                property.map((item, index) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                                        <td className="px-6 py-4 text-gray-700 text-center">{index + 1}</td>

                                        <td className="px-6 py-4 text-gray-700 text-center">{item.propertynumber}</td>

                                        <td className="flex items-center justify-center">
                                            <img
                                                src={`${import.meta.env.VITE_SERVER_URL}/${item.homephoto}`}
                                                className="h-20 w-20 object-contain mx-auto"
                                                alt=""
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.status}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.guests}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.bedrooms}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.beds}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.bathrooms}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.address.houseName}, {item.address.city}, {item.address.district}-{item.address.pincode}, {item.address.state}  phone:{item.address.phoneNumber}</td>
                                        <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {totalPages != null && totalPages > 0 && (
                <footer className="flex justify-center items-center mt-0 mb-10">
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

        </>
    );
}



export default PropertyList;
