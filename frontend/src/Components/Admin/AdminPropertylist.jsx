/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { propertylist, updatePropertyStatus } from '../../Services/AdminApi';

function AdminPropertylist() {
    const [property, setProperty] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 6;

    useEffect(() => {
        let isMounted = true;
        propertylist(currentPage, limit)
            .then((response) => {
                if (isMounted) {
                    try {
                        if (response.data.status) {

                            setProperty(response.data.homelist);
                            setTotalPages(response.data.totalPages);

                        } else {


                            toast(response.data.message, {
                                position: toast.POSITION.TOP_CENTER,
                                toastId: 'property-toast'
                            });
                        }
                    } catch (error) {
                        toast.error(error.message, {
                            position: toast.POSITION.TOP_CENTER,
                            toastId: 'property-toast'
                        });
                    }
                }
            });

        return () => {
            setProperty(null)

            isMounted = false;
        };

    }, [currentPage]);



    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return; // Invalid page number, do nothing
        }

        setCurrentPage(pageNumber);
    };


    const handleOptionChange = (index, value) => {
        const updatedOptions = [...selectedOptions];
        updatedOptions[index] = value;
        setSelectedOptions(updatedOptions);

        // Make API call to update the property status
        const propertyId = property[index]._id;
        updatePropertyStatus(propertyId, value)
            .then((response) => {
                if (response.data.status) {
                    // Property status updated successfully
                    toast.success(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: 'property-toast'
                    });
                } else {
                    // Error updating property status
                    toast.error(response.data.message, {
                        position: toast.POSITION.TOP_CENTER,
                        toastId: 'property-toast'
                    });
                }
            })
            .catch((error) => {
                // Handle API error
                toast.error(error.message, {
                    position: toast.POSITION.TOP_CENTER,
                    toastId: 'property-toast'
                });
            });
    };

    const getOptionColor = (status) => {
        if (status === 'approved') {
            return 'bg-green-200 text-green-800';
        } else if (status === 'declined') {
            return 'bg-red-200 text-red-800';
        } else {
            return 'bg-yellow-200 text-yellow-800';
        }
    };

    return (
        <div className="flex flex-col w-full">
            <div className="py-4 w-full bg-[#0e0e0e]">
                <header>
                    <div className="flex items-center justify-center sm:justify-start">
                        <p className="text-white px-4 sm:px-12 text-xl sm:text-2xl font-serif">
                            PropertyList
                        </p>
                    </div>
                </header>
            </div>
            <div className="overflow-x-auto shadow-md sm:rounded-lg m-10">
                <div className="inline-block min-w-full overflow-hidden bg-gray-100">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs bg-gray-200 text-gray-800 uppercase">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-center">
                                    No
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Property number
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Image
                                </th>
                                <th scope="col" className="px-14 py-3 text-center">
                                   Host 
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    No guests
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    price
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
                                    <span className="sr-only">status</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {property &&
                                property.map((item, index) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                                        <td className="px-6 py-4 text-gray-700 text-center">{(index + currentPage * limit) - limit + 1}</td>

                                        <td className="px-6 py-4 text-gray-700 text-center">{item.propertynumber}</td>

                                        <td className="flex items-center justify-center m-1">
                                            <img
                                                src={`${import.meta.env.VITE_SERVER_URL}/${item.homephoto}`}
                                                className="h-20 w-20 object-contain mx-auto"
                                                alt=""
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.userId.username}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.guests}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">₹{item.homeprice}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.bedrooms}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.beds}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.bathrooms}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.address.houseName}, {item.address.city}, {item.address.district}-{item.address.pincode}, {item.address.state}   phone:{item.address.phoneNumber}</td>
                                        <td className="px-6 py-4 text-right">
                                            <select
                                                value={selectedOptions[index] || ''}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                className={`rounded-md px-2 py-1  ${getOptionColor(
                                                    selectedOptions[index] || item.status
                                                )}`}
                                            >
                                                <option value={item.status}>{item.status}</option>
                                                <option value="pending">pending</option>
                                                <option value="approved">approved</option>
                                                <option value="declined">declined</option>
                                            </select>
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



        </div>
    );
}

export default AdminPropertylist;
