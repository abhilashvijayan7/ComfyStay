/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { propertylist } from '../../Services/UserApi';
import { useNavigate } from 'react-router-dom'


function PropertyList() {
    const navigate = useNavigate("")

    const [property, setProperty] = useState(null);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [earnings, setEarnings] = useState(0);
    const [noProperties, setNoProperties] = useState(false)

    const limit = 6;

    useEffect(() => {
        let isMounted = true; // Add a flag to track component mount status
        propertylist(currentPage, limit)
            .then((response) => {
                if (isMounted) { // Check if the component is still mounted before updating state
                    try {

                        if (response.data.status) {
                            setProperty(response.data.homelist);
                            setTotalPages(response.data.totalPages);
                            setEarnings(response.data.earnings)
                        } else {
                            setNoProperties(true)
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
        <div>

            {property ? (<div>
                <div className="flex items-center justify-center sm:justify-center mt-6">
                    <p style={{ fontSize: '24px' }} className="text-green-900 px-4 sm: text-xl sm:text-2xl font-sans font-semibold">
                        Properties
                    </p>

                </div>

                <div className='h-screen'>

                    <div className='flex justify-end mx-6 my-5  '>
                        <p className='border px-3 py-2 rounded-md bg-black text-white font-normal'>Total Earnings : <p className='text-green-500 inline font-semibold'>₹{earnings}</p> </p>
                    </div>
                    <div className="overflow-x-auto shadow-md sm:rounded-lg m-6">

                        <div className="inline-block min-w-full  overflow-hidden bg-gray-100">


                            <table className="w-full h-full text-sm text-left">
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
                                        <th scope="col" className="px-6 py-3 text-center">
                                            Booked Status
                                        </th>
                                        {/* <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">Edit</span>
                                </th> */}
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
                                                <td className="px-6 py-4 text-gray-700 text-center">{item.status}</td>
                                                <td className="px-6 py-4 text-gray-700 text-center">{item.guests}</td>
                                                <td className="px-6 py-4 text-gray-700 text-center">₹{item.homeprice}</td>
                                                <td className="px-6 py-4 text-gray-700 text-center">{item.bedrooms}</td>
                                                <td className="px-6 py-4 text-gray-700 text-center">{item.beds}</td>
                                                <td className="px-6 py-4 text-gray-700 text-center">{item.bathrooms}</td>
                                                <td className="px-6 py-4 text-gray-700 text-center">{item.address.houseName}, {item.address.city}, {item.address.district}-{item.address.pincode}, {item.address.state}  phone:{item.address.phoneNumber}</td>

                                                <td className="px-6 py-4 text-gray-700 text-center">
                                                    {item.bookedstatus ? (
                                                        <p className='text-yellow-500'>booked</p>
                                                    ) : (
                                                        item.status === 'pending' || item.status === 'declined' ? (
                                                            <p className='text-red-500'>Not Listed</p>
                                                        ) : (
                                                            <p className='text-green-500'>Available</p>
                                                        )
                                                    )}
                                                </td>



                                                {/* <td className="px-6 py-4 text-right">
                                            <a
                                                href="#"
                                                className="font-medium text-blue-600 hover:underline"
                                            >
                                                Edit
                                            </a>
                                        </td> */}
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
            </div>) : (!noProperties && (<div role="status " className='flex justify-center h-screen items-center'>
                <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <p className="sr-only">Loading...</p>
            </div>))}




            {noProperties && <div className='flex justify-center items-center bg-white h-screen'>
                NO PROPERTY

            </div>}



        </div>
    );



}



export default PropertyList;
