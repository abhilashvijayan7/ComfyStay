





/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useFormik } from 'formik'
import { toast } from 'react-toastify';
import { propertySubmit } from '../../Services/UserApi';
import * as Yup from 'yup'



function PropertyDescribe() {
    const initialValues = {
        hometype: 'home',
        propertynumber: '',
        houseName: '',
        city: '',
        district: '',
        state: '',
        pincode: '',
        guests: '1',
        bedrooms: '1',
        beds: '1',
        bathrooms: '1',
        wifi: false,
        tv: false,
        kitchen: false,
        washingmachine: false,
        freeparking: false,
        paidparking: false,
        airconditioning: false,
        dedicatedworkspace: false,
        homephoto: '',
        homeprice: '',
        phoneNumber: ''
      };
      
      
    const onSubmit = async (values) => {
        try {

            const { data } = await propertySubmit(values)
            if (data.status) {
                toast(data.message, {
                    position: 'top-center',
                })
                navigate('/propertylist');
            } else {
                toast(data.message, {
                    position: 'top-center'
                })
            }

        } catch (error) {
            toast.error(error.message, {
                position: 'top-center'
            })
        }

    }

    // const validate =(values)=>{
    //     let errors = {}



    //     if(!values.address){
    //         errors.address='Required'
    //     }

    //     if(!values.homephoto){
    //         errors.homephoto='Required'
    //     }
    //     if(!values.homeprice){
    //         errors.homeprice='Required'
    //     } else if (!/^[1-9]\d*$/.test(values.homeprice)) {
    //         errors.homeprice = 'Invalid price';
    //       }




    //     return errors
    // }

//     const validationSchema = Yup.object().shape({
//   address: Yup.object().shape({
//     houseName: Yup.string().required('House Name is required'),
//     city: Yup.string().required('City is required'),
//     district: Yup.string().required('District is required'),
//     state: Yup.string().required('State is required'),
//     pincode: Yup.string().required('Pincode is required')
//   }),
//   homephoto: Yup.string().required('This field is required'),
//   homeprice: Yup.number()
//     .typeError('Please enter a valid number')
//     .required('This field is required'),
//   propertynumber: Yup.number()
//     .typeError('Please enter a valid number')
//     .required('This field is required')
// });

    


const validationSchema = Yup.object().shape({
    houseName: Yup.string().required('House Name is required'),
    city: Yup.string().required('City is required'),
    district: Yup.string().required('District is required'),
    state: Yup.string().required('State is required'),
    pincode: Yup.string().required('Pincode is required'),  
    homephoto: Yup.string().required('This field is required'),
    homeprice: Yup.number()
        .typeError('Please enter a valid number')
        .required('This field is required'),
    propertynumber: Yup.number()
        .typeError('Please enter a valid number')
        .required('This field is required'),

        phoneNumber: Yup.number()
        .typeError('Please enter a valid number')
        .required('This field is required')    

})






    const navigate = useNavigate();
    const [selectedImage, setSelectedImage] = useState(null);


    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
        //    validate

    })

    const handleImageChange = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue("image", file);
        setSelectedImage(URL.createObjectURL(file));
    };

    return (
        <>
            <header className="py-6 bg-gray-800">
                <div className="flex items-center justify-center sm:justify-start">
                    <p className="text-white px-4 sm:px-12 text-2xl sm:text-2xl font-serif">
                        AddProperty
                    </p>
                </div>
            </header>


            <div className=" m-10">
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4 flex flex-col sm:flex-row sm:justify-between">



                        <div className="mb-4 sm:mb-0">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="hometype"
                            >
                                Which of these best describes your place?
                            </label>
                            <select
                                id="hometype"
                                name="hometype"
                                className="form-select block w-full sm:w-96 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                onChange={formik.handleChange}
                                value={formik.values.hometype}

                            >
                                <option value="home">Home</option>
                                <option value="flat/apartment">Flat/Apartment</option>
                                <option value="hotel">Hotel Room</option>
                            </select>

                        </div>



                        <div className="mb-4 sm:mb-0">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="propertynumber"
                            >
                                Property number
                            </label>


                            <input
                                type="text"
                                id="propertynumber"
                                name="propertynumber"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                                value={formik.values.propertynumber}
                                className="form-select block w-full sm:w-96 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            />
                            {formik.touched.propertynumber && formik.errors.propertynumber ? <div className="text-red-500 text-sm"> {formik.errors.propertynumber}</div> : null}





                        </div>



                    </div>



                    <div>
  <label
    htmlFor="houseName"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    House Name
  </label>
  <input
    type="text"
    id="houseName"
    name="houseName"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.houseName}
    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="House Name"
  />
  {formik.touched.houseName && formik.errors.houseName ? (
    <div className="text-red-500 text-sm">{formik.errors.houseName}</div>
  ) : null}
</div>

<div>
  <label
    htmlFor="city"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    City
  </label>
  <input
    type="text"
    id="city"
    name="city"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.city}
    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="City"
  />
  {formik.touched.city && formik.errors.city ? (
    <div className="text-red-500 text-sm">{formik.errors.city}</div>
  ) : null}
</div>

<div>
  <label
    htmlFor="district"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    District
  </label>
  <input
    type="text"
    id="district"
    name="district"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.district}
    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="District"
  />
  {formik.touched.district && formik.errors.district ? (
    <div className="text-red-500 text-sm">{formik.errors.district}</div>
  ) : null}
</div>

<div>
  <label
    htmlFor="state"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    State
  </label>
  <input
    type="text"
    id="state"
    name="state"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.state}
    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="State"
  />
  {formik.touched.state && formik.errors.state ? (
    <div className="text-red-500 text-sm">{formik.errors.state}</div>
  ) : null}
</div>

<div>
  <label
    htmlFor="pincode"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Pincode
  </label>
  <input
    type="text"
    id="pincode"
    name="pincode"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.pincode}
    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Pincode"
  />
  {formik.touched.pincode && formik.errors.pincode ? (
    <div className="text-red-500 text-sm">{formik.errors.pincode}</div>
  ) : null}
</div>

<div>
  <label
    htmlFor="phoneNumber"
    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
  >
    Phone Number
  </label>
  <input
    type="text"
    id="phoneNumber"
    name="phoneNumber"
    onChange={formik.handleChange}
    onBlur={formik.handleBlur}
    value={formik.values.phoneNumber}
    className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
    placeholder="Phone Number"
  />
  {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
    <div className="text-red-500 text-sm">{formik.errors.phoneNumber}</div>
  ) : null}
</div>





                    <div className="flex flex-col items-center sm:flex-row sm:justify-center mt-10 mb-10">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
                            Share some basics about your place
                        </label>
                    </div>




                    <div className="mb-4 flex flex-col sm:flex-row ml-1 sm: justify-between" >



                        <div className="mb-4 sm:mb-0">

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="guests"
                            >
                                Guestes
                            </label>

                            <select
                                id="guests"
                                name="guests"
                                className="form-select block w-full sm:w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                onChange={formik.handleChange}
                                value={formik.values.guests}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                            </select>
                        </div>



                        <div className="mb-4 sm:mb-0">

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="bedrooms"
                            >
                                Bedrooms
                            </label>

                            <select
                                id="bedrooms"
                                name="bedrooms"
                                className="form-select block w-full sm:w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                onChange={formik.handleChange}
                                value={formik.values.bedrooms}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>



                        <div className="mb-4 sm:mb-0">

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="beds"
                            >
                                Beds
                            </label>

                            <select
                                id="beds"
                                name="beds"
                                className="form-select block w-full sm:w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                onChange={formik.handleChange}
                                value={formik.values.beds}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>



                        <div className="mb-4 sm:mb-0">

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="bathrooms"
                            >
                                Bathrooms
                            </label>

                            <select
                                id="bathrooms"
                                name="bathrooms"
                                className="form-select block w-full sm:w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                onChange={formik.handleChange}
                                value={formik.values.bathrooms}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                            </select>
                        </div>



                    </div>

                    <div>



                        <div className="flex flex-col items-center sm:flex-row sm:justify-center mt-14 mb-14">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="">
                                What does your place have to offer?
                            </label>
                        </div>



                        <>
                            <div className=" flex flex-col sm:flex-row  sm: justify-evenly mt-7 mb-14" >



                                <div className="flex items-center ">
                                    <input
                                        id="wifi"
                                        name="wifi"
                                        type="checkbox"

                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.wifi}
                                    />

                                    <label
                                        htmlFor="wifi"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Wifi
                                    </label>
                                </div>



                                <div className="flex items-center">
                                    <input
                                        defaultChecked=""
                                        id="tv"
                                        name="tv"
                                        type="checkbox"

                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.tv}
                                    />
                                    <label
                                        htmlFor="tv"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        TV
                                    </label>
                                </div>



                                <div className="flex items-center ">
                                    <input
                                        id="kitchen"
                                        name="kitchen"
                                        type="checkbox"

                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.kitchen}
                                    />
                                    <label
                                        htmlFor="kitchen"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Kitchen
                                    </label>
                                </div>



                                <div className="flex items-center">
                                    <input
                                        defaultChecked=""
                                        id="washingmachine"
                                        name="washingmachine"
                                        type="checkbox"

                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.washingmachine}
                                    />
                                    <label
                                        htmlFor="washingmachine"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Washing machine
                                    </label>
                                </div>



                                <div className="flex items-center ">
                                    <input
                                        id="freeparking"
                                        name="freeparking"
                                        type="checkbox"

                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.freeparking}
                                    />
                                    <label
                                        htmlFor="freeparking"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Free parking on premises
                                    </label>
                                </div>



                                <div className="flex items-center">
                                    <input
                                        defaultChecked=""
                                        id="paidparking"
                                        name="paidparking"
                                        type="checkbox"

                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.paidparking}
                                    />
                                    <label
                                        htmlFor="paidparking"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Paid parking on premises
                                    </label>
                                </div>



                                <div className="flex items-center ">
                                    <input
                                        id="airconditioning"
                                        name="airconditioning"
                                        type="checkbox"

                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.airconditioning}
                                    />
                                    <label
                                        htmlFor="airconditioning"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Air conditioning
                                    </label>
                                </div>



                                <div className="flex items-center">
                                    <input
                                        defaultChecked=""
                                        id="dedicatedworkspace"
                                        name="dedicatedworkspace"
                                        type="checkbox"

                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                        onChange={formik.handleChange}
                                        value={formik.values.dedicatedworkspace}
                                    />
                                    <label
                                        htmlFor="dedicatedworkspace"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Dedicated workspace
                                    </label>
                                </div>



                            </div>
                        </>

                    </div>


                    <div className="flex flex-col items-center sm:flex-row sm:justify-center mt-5 mb-5">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="homephoto">
                            Add photo of your house
                        </label>
                    </div>


                    <div className="flex justify-center items-center">
                        {selectedImage && (
                            <div className="w-34 sm:w-52 h-34 sm:h-52 bg-white mb-3">
                                <img className="w-full h-full object-contain" src={selectedImage} alt="" />
                            </div>
                        )}
                    </div>





                    <div >

                        <>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="homephoto"
                            >
                                Upload file
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400"
                                id="homephoto"
                                name="homephoto"
                                type="file"
                                onChange={(event) => {
                                    formik.handleChange(event);
                                    handleImageChange(event); // Call the handleImageChange function to update the selectedImage state
                                }}
                                onBlur={formik.handleBlur}
                            />

                            {formik.touched.homephoto && formik.errors.homephoto ? (
                                <div className="text-red-500 text-sm">{formik.errors.homephoto}</div>
                            ) : null}

                            {/* Display the selected file name */}
                            {formik.values.homephoto && (
                                <div>{formik.values.homephoto.name}</div>
                            )}
                        </>

                    </div>



                    <div>
                        <div className="flex justify-center mt-5">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="homeprice"
                            >
                                Now, set your price
                            </label>
                        </div>



                        <div className="flex justify-center mt-5">
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 text-lg">
                                    ₹
                                </span>
                                <input
                                    type="text"
                                    id="homeprice"
                                    name="homeprice"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}

                                    value={formik.values.homeprice}
                                    className="form-input w-40 py-2 pl-8 pr-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
                        </div>
                        <div className='flex justify-center'>
                            {formik.touched.homeprice && formik.errors.homeprice ? <div className="text-red-500 text-sm"> {formik.errors.homeprice}</div> : null}
                        </div>
                    </div>



                    <div className="mt-8 flex justify-center">
                        <button
                            type="submit"
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-4 py-2.5 text-center sm:text-sm dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Submit
                        </button>
                    </div>



                </form>

            </div>

        </>
    )
}

export default PropertyDescribe

