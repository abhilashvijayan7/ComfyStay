/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { propertylist ,updatePropertyStatus} from '../../Services/AdminApi';

function AdminPropertylist() {
    const [property, setProperty] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);
    console.log(selectedOptions,'traap');

    useEffect(() => {
        let isMounted = true;
        propertylist()
            .then((response) => {
                if (isMounted) {
                    try {
                        if (response.data.status) {
                            setProperty(response.data.homelist);
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
            isMounted = false;
        };
    }, []);


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
        <div className="flex flex-col">
            <div className="py-4 w-full bg-[#0e0e0e]">
                <header>
                    <div className="flex items-center justify-center sm:justify-start">
                        <p className="text-white px-4 sm:px-12 text-xl sm:text-2xl font-serif">
                            PropertyList
                        </p>
                    </div>
                </header>
            </div>
            <div className="overflow-x-auto shadow-md sm:rounded-lg m-16">
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
                                <th scope="col" className="px-6 py-3">
                                    <span className="sr-only">status</span>
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
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.guests}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.homeprice}</td>

                                        <td className="px-6 py-4 text-gray-700 text-center">{item.bedrooms}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.beds}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.bathrooms}</td>
                                        <td className="px-6 py-4 text-gray-700 text-center">{item.address}</td>
                                        <td className="px-6 py-4 text-right">
                                            <select
                                                value={selectedOptions[index] || ''}
                                                onChange={(e) => handleOptionChange(index, e.target.value)}
                                                className={`rounded-md px-2 py-1 ${getOptionColor(
                                                    selectedOptions[index] || item.status
                                                )}`}
                                            >
                                                <option  value={item.status}>{item.status}</option>
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
        </div>
    );
}

export default AdminPropertylist;
