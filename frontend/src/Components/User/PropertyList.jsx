/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { propertylist } from '../../Services/UserApi';

function PropertyList() {
    const [property, setProperty] = useState(null);

    useEffect(() => {
        let isMounted = true; // Add a flag to track component mount status
        propertylist()
            .then((response) => {
                if (isMounted) { // Check if the component is still mounted before updating state
                    try {
                      
                        if (response.data.status) {
                            setProperty(response.data.homelist);
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
            isMounted = false; // Set the mounted flag to false on component unmount
        };
    }, []);


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
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.address.houseName},{item.address.city},{item.address.district},{item.address.state}-{item.address.pincode}, phone:{item.address.phoneNumber}</td>
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
        </>
    );
}



export default PropertyList;
