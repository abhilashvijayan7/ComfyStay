/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable no-unreachable */
/* eslint-disable react/jsx-key */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { bookingDetailsApi, completeOrder } from '../../Services/AdminApi';
import { useNavigate } from 'react-router-dom'

function AdminBookingList() {
    const navigate = useNavigate()
    const [bookings, setBookings] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [orderId, setOrderId] = useState("")
    const [completed, setCompleted] = useState(false)
    const [noBookings, setNoBookings] = useState(false)
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const limit = 6;

    useEffect(() => {
        try {
            const token = localStorage.getItem("adminjwt")
            if (!token) {
                navigate("/login")
            }
            bookingDetailsApi(currentPage, limit).then((response) => {
                if (response.data.status) {
                    setBookings(response.data.bookings)
                    setTotalPages(response.data.totalPages);
                } else {
                    setNoBookings(true)
                }
            })
        } catch (error) {
            toast.error(error.message)
        }
    }, [completed, currentPage]);


    function toCapitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
    const handleComplete = (orderId) => {
        console.log(orderId)
        setShowModal(!showModal)
        setOrderId(orderId)
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber < 1 || pageNumber > totalPages) {
            return; // Invalid page number, do nothing
        }

        setCurrentPage(pageNumber);
    };

    const completeuserOrder = () => {
        try {
            completeOrder(orderId).then((response) => {
                if (response.data.status) {
                    setCompleted(true)
                    const updatedBookings = bookings.map((booking) => {
                        if (booking._id === orderId) {
                            booking = response.data.completedBooking
                        }
                        return booking
                    })
                    setBookings(updatedBookings)
                    toast(response.data.message)
                    setShowModal(false)
                }

            })
        } catch (error) {
            toast(error.message)
        }
    }


    return (
        <div className="flex flex-col w-full">
            <div className="py-4 w-full bg-[#0e0e0e]">
                <header>
                    <div className="flex items-center justify-center sm:justify-start">
                        <p className="text-white px-4 sm:px-12 text-xl sm:text-2xl font-serif">
                            Bookings
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
                                <th scope="col" className="px-6 py-3 text-center">
                                    Cancel Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    Actions
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
                                        <td className="px-6 py-4 text-gray-700 text-center">{booking.property_id.guests}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{booking.property_id.homeprice}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{booking.property_id.bedrooms}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{booking.property_id.beds}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{booking.property_id.bathrooms}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{booking.property_id.address.houseName}, {booking.property_id.address.city}, {booking.property_id.address.district}-{booking.property_id.address.pincode}, {booking.property_id.address.state}   phone:{booking.property_id.address.phoneNumber}</td>
                                        <td>{booking.cancelStatus ? <p>Cancelled</p> : <p>Not cancelled</p>}</td>
                                        <td>
                                            {showModal && <div id="popup-modal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

                                                <div className="relative w-full max-w-md max-h-full">
                                                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                                        <button type="button" onClick={() => setShowModal(false)} className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                                            </svg>
                                                            <span className="sr-only">Close modal</span>
                                                        </button>
                                                        <div className="p-6 text-center">
                                                            <svg aria-hidden="true" className="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                            </svg>
                                                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure ?</h3>
                                                            <button onClick={() => completeuserOrder()} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
                                                                Yes, I am sure
                                                            </button>
                                                            <button data-modal-hide="popup-modal" type="button" onClick={() => setShowModal(false)} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>}
                                            {booking.cancelStatus ? (
                                                <button className='bg-green-500' disabled>Available</button>
                                            ) : (booking.completed ? (
                                                <button className='bg-green-500' disabled>Available</button>
                                            ) : (
                                                <button className='bg-red-500' onClick={() => handleComplete(booking._id)}>Booked</button>
                                            ))}
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
    )
}

export default AdminBookingList
