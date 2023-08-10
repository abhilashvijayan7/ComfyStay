/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { bookingDetailApi } from '../../Services/UserApi';

import { useNavigate } from 'react-router-dom'
function HostPropertyBookings() {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState("")
    const [noBookings, setNoBookings] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 6;
    useEffect(() => {
        try {
            const token = localStorage.getItem("jwt")
            if (!token) {
                navigate("/login")
            }
            bookingDetailApi(currentPage, limit).then((response) => {
                if (response.data.status) {
                    setBookings(response.data.bookings)
                    setTotalPages(response.data.totalPages);
                } else {
                    setNoBookings(true)
                    toast(response.data.message)

                }
            })
        } catch (error) {
            toast.error(error.message)
        }
    }, [currentPage]);





    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return; // Invalid page number, do nothing
        }

        setCurrentPage(pageNumber);
    };


    return (
        <div>
            <div className="py-4 w-full">
                <header>
                  
                {!noBookings && bookings && <div className="flex items-center justify-center sm:justify-center mt-2">
                    <p style={{ fontSize: '24px' }} className="text-green-900 px-4 sm: text-xl sm:text-2xl font-sans font-semibold">
                      My Property Bookings
                    </p>

                </div>
                }
                </header>
            </div>


            {bookings ? (<div className="flex flex-col w-full h-screen">




                <div className="overflow-x-auto shadow-md sm:rounded-lg m-10">
                    <div className="inline-block min-w-full overflow-hidden bg-gray-100">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs bg-gray-200 text-gray-800 uppercase">
                                <tr>
                                    <th scope="col" className="px-2 py-3 text-center">
                                        No
                                    </th>
                                    <th scope="col" className="px-3 py-3 text-center">
                                        Property number
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Image
                                    </th>


                                    <th scope="col" className="px-6 py-3 text-center">
                                        price
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        Booked by
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        From
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                        To
                                    </th>
                                    <th scope="col" className="px-1 py-3 text-center">
                                        Location
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-center">
                                         Status
                                    </th>

                                </tr>
                            </thead>
                            <tbody>
                                {bookings &&
                                    bookings.map((booking, index) => (
                                        <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                                            <td className="px-6 py-4 text-gray-700 text-center">{(index + currentPage * limit) - limit + 1}</td>
                                            <td className="px-6 py-4 text-gray-700 text-center">{booking.property_id.propertynumber}</td>
                                            <td className="flex items-center justify-center m-1">
                                                <img
                                                    src={`${import.meta.env.VITE_SERVER_URL}/${booking.property_id.homephoto}`}
                                                    className="h-20 w-20 object-contain mx-auto"
                                                    alt=""
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-gray-700 text-center">₹{booking.amount}</td>
                                            <td className="px-6 py-4 text-gray-700 text-center">{booking.user_id.username}</td>
                                            <td className="px-6 py-4 text-gray-700 text-center">{booking.fromDate}</td>
                                            <td className="px-6 py-4 text-gray-700 text-center">{booking.toDate}</td>
                                            <td className="px-6 py-4 text-gray-700 text-center w-[230px]">{booking.property_id.address.houseName}, {booking.property_id.address.city}, {booking.property_id.address.district}-{booking.property_id.address.pincode}, {booking.property_id.address.state}   phone:{booking.property_id.address.phoneNumber}</td>
                                            <td className="px-6 py-4 text-gray-700 text-center">
                                                {booking.cancelStatus
                                                    ? <p className='text-red-500'>Cancelled</p>
                                                    : booking.completed
                                                        ? <p className='text-green-600'>Completed</p>
                                                        : <p className='text-yellow-500'>Booked</p>}
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
            </div>) : (!noBookings && (<div role="status " className='flex justify-center h-screen w-screen items-center'>
                <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <p className="sr-only">Loading...</p>
            </div>))}

            {noBookings && <div className='flex justify-center items-center bg-white h-screen w-screen'>
                NO BOOKINGS

            </div>}
        </div>
    )
}

export default HostPropertyBookings
