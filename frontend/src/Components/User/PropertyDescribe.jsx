/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useFormik } from 'formik'
import * as Yup from 'yup'
const initialValues = {
    hometype: 'home',
    homeportion: 'an-entire-place',
    address: '',
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

}
const onSubmit = (values) => {
    console.log('form data', values);
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

const validationSchema = Yup.object().shape({
    address: Yup.string().required('This field is required'),
    homephoto: Yup.string().required('This field is required'),
    homeprice: Yup.number()
        .typeError('Please enter a valid number')
        .required('This field is required'),

})


function PropertyDescribe() {

    const formik = useFormik({
        initialValues,
        onSubmit,
        validationSchema
        //    validate

    })
    console.log('form error', formik.errors);

    return (
        <>
            <header className="py-7 bg-gray-800">
                <div className="flex items-center justify-center sm:justify-start">
                    <p className="text-white pl-4 sm:pl-12 text-2xl sm:text-3xl font-serif">
                        ComfyStay
                    </p>
                </div>
            </header>


            <div className=" m-20">
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
                                <option value="hotel">Hotel</option>
                            </select>

                        </div>



                        <div className="mb-4 sm:mb-0">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="homeportion"
                            >
                                What type of place will guests have?
                            </label>
                            <select
                                id="homeportion"
                                name="homeportion"
                                className="form-select block w-full sm:w-96 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                onChange={formik.handleChange}
                                value={formik.values.homeportion}
                            >
                                <option value="an-entire-place">An entire place</option>
                                <option value="a-private-room">A private room</option>
                                <option value="a-shared-room">A shared room</option>
                            </select>
                        </div>



                    </div>



                    <div>
                        <>
                            <label
                                htmlFor="address"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Where's your place located?
                            </label>
                            <textarea
                                id="address"
                                name="address"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Where's your place located?"

                            />
                            {formik.touched.address && formik.errors.address ? <div className="text-red-500 text-sm"> {formik.errors.address}</div> : null}
                        </>

                    </div>



                    <div className=" flex flex-col sm:flex-row ml-5 sm: justify-center mt-10 mb-10">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor=" "
                        >
                            Which of these best describes your place?
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



                        <div className=" flex flex-col sm:flex-row ml-5 sm: justify-center mt-14 mb-14">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor=" "
                            >
                                what your place has to offer
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


                    <div className=" flex flex-col sm:flex-row ml-5 sm: justify-center mt-5 mb-5">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="homephoto"
                        >
                            Add photo of your house
                        </label>
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
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}

                                value={formik.values.homephoto}
                            />
                            {formik.touched.homephoto && formik.errors.homephoto ? <div className="text-red-500 text-sm"> {formik.errors.homephoto}</div> : null}
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
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
