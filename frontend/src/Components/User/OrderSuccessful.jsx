/* eslint-disable react/no-unknown-property */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'
import { getOrderDetailsAPI } from '../../Services/UserApi'
import { toast } from 'react-toastify'

function OrderSuccessful() {
    const navigate = useNavigate("")
    const { id } = useParams()
    const [order, setOrder] = useState(false)
    useEffect(() => {
        try {
            getOrderDetailsAPI(id).then((response) => {
                console.table(response.data.order);
                setOrder(response.data.order)
            })
        } catch (error) {
            toast.error(error.message)
        }
    }, [])

    function toCapitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
        <div>


            {order ? <div>
                <div className="py-14 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">

                    <div className="flex items-center justify-center mb-7">
                        <div>
                            <div className="flex flex-col items-center space-y-2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="text-green-600 w-28 h-28"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={1}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <h1 className="text-4xl font-bold">Thank You !</h1>
                                <p>Your Order Placed Successfully</p>

                            </div>
                        </div>
                    </div>

                    <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
                        <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">

                            {order && <div className="flex flex-col justify-start items-start bg-gray-50 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                                <p className="text-lg md:text-xl font-semibold leading-6 xl:leading-5 mb-3 text-gray-800">
                                    Your Booking
                                </p>
                                <p>
                                    Booking ID: #{order._id}
                                </p>
                                <div className="mt-6 md:mt-0  flex justify-start flex-col md:flex-row items-start md:items-center space-y-4 md:space-x-6 xl:space-x-8 w-full">
                                    <div className="w-full md:w-40 mt-6">
                                        <img
                                            className="w-full "
                                            src={`${import.meta.env.VITE_SERVER_URL}/${order.property_id.homephoto}`}
                                            alt="dress"
                                        />
                                    </div>
                                    <div className="flex justify-between items-start w-full flex-col md:flex-row space-y-4 md:space-y-0">
                                        <div className="w-full flex flex-col items-start space-y-2">
                                            <h3 className="text-lg xl:text-xl font-semibold leading-6 text-gray-800">
                                                {toCapitalize(order.property_id.hometype)}
                                                <div className='text-base  font-medium text-gray-800'>
                                                    {order.property_id.address.houseName}
                                                </div>
                                            </h3>
                                            <div className="flex justify-start items-start flex-col space-y-2">
                                                <p className="text-sm leading-none text-gray-800">
                                                    <div className=" text-gray-400 inline">
                                                        No:{" "}
                                                    </div>{" "}
                                                    {order.property_id.propertynumber}
                                                </p>
                                                <p className="text-sm  leading-none text-gray-800">
                                                    <div className=" text-gray-400 inline">
                                                        District:{" "}
                                                    </div>{" "}
                                                    {order.property_id.address.district}

                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                            <div className="flex justify-center flex-col md:flex-row  items-stretch w-full space-y-4 md:space-y-0 md:space-x-6 xl:space-x-8">
                                <div className="flex flex-col px-4 py-6 md:p-6 xl:p-8 w-full bg-[#aad7e3]/30  space-y-6 mb-3 rounded-lg">
                                    <h3 className="text-xl  font-semibold leading-5 text-[#6d7fca]">
                                        Summary
                                    </h3>
                                    <div className="flex justify-center items-center w-full space-y-4 flex-col border-gray-200  pb-4">

                                        <div className="flex justify-between w-full">
                                            <p className="text-base  leading-4 text-gray-800">
                                                HOST NAME
                                            </p>
                                            <p className="text-base  leading-4 text-gray-600">
                                                {order.property_id.userId.username}
                                            </p>
                                        </div>
                                        <div className="flex justify-between w-full">
                                            <p className="text-base  leading-4 text-gray-800">
                                                HOST NUMBER
                                            </p>
                                            <p className="text-base leading-4 text-gray-600">
                                                {order.property_id.userId.phonenumber}
                                            </p>
                                        </div>

                                        <div className="flex justify-between w-full">
                                            <p className="text-base  leading-4 text-gray-800">
                                                PAYMENT ID
                                            </p>
                                            <p className="text-base  leading-4 text-gray-600">
                                                {order.payment_id}
                                            </p>
                                        </div>

                                    </div>
                                    <div className="flex justify-between items-center w-full">
                                        <p className="text-lg  font-semibold leading-4 text-gray-800">
                                            Total
                                        </p>
                                        <p className="text-lg  font-semibold leading-4 text-red-600">
                                            ₹ {order.amount}
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div className='flex justify-center items-center' onClick={() => navigate("/")}>
                        <div className="inline-flex items-center px-4 py-2 mt-10 text-white bg-[#2d66a8] border border-[#2d66a6]  rounded-full hover:bg-[#2d77b8] hover:cursor-pointer focus:outline-none focus:ring">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-3 h-3 mr-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M7 16l-4-4m0 0l4-4m-4 4h18"
                                />
                            </svg>
                            <div className="text-sm font-medium inline" >Home</div>
                        </div>
                    </div>
                </div>
            </div> : <div role="status " className='flex justify-center h-screen items-center'>
                <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
            </div>}
        </div>
    )
}

export default OrderSuccessful
