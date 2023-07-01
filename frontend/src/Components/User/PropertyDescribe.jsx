

function PropertyDescribe() {
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
                <form>
                    <div className="mb-4 flex flex-col sm:flex-row sm:justify-between">
                        <div className="mb-4 sm:mb-0">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="dropdown"
                            >
                                Which of these best describes your place?
                            </label>
                            <select
                                id="dropdown"
                                name="dropdown"
                                className="form-select block w-full sm:w-96 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="option1">Home</option>
                                <option value="option2">Flat/Apartment</option>
                                <option value="option3">Hotel</option>
                            </select>
                        </div>
                        <div className="mb-4 sm:mb-0">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="dropdown"
                            >
                                What type of place will guests have?
                            </label>
                            <select
                                id="dropdown"
                                name="dropdown"
                                className="form-select block w-full sm:w-96 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="option1">An entire place</option>
                                <option value="option2">A private room</option>
                                <option value="option3">A shared room</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <>
                            <label
                                htmlFor="message"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Your message
                            </label>
                            <textarea
                                id="message"
                                rows={4}
                                className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 dark:text-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Where's your place located?"
                                defaultValue={""}
                            />
                        </>

                    </div>

                    <div className=" flex flex-col sm:flex-row ml-5 sm: justify-center mt-10 mb-10">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="dropdown"
                        >
                            Which of these best describes your place?
                        </label>
                    </div>


                    <div className="mb-4 flex flex-col sm:flex-row ml-1 sm: justify-between" >

                        <div className="mb-4 sm:mb-0">

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="dropdown"
                            >
                                Guestes
                            </label>

                            <select
                                id="dropdown"
                                name="dropdown"
                                className="form-select block w-full sm:w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="option1">1</option>
                                <option value="option2">2</option>
                                <option value="option3">3</option>
                                <option value="option1">4</option>
                                <option value="option2">5</option>
                                <option value="option3">6</option>
                                <option value="option1">7</option>
                                <option value="option2">8</option>
                            </select>
                        </div>
                        <div className="mb-4 sm:mb-0">

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="dropdown"
                            >
                                Bedrooms
                            </label>

                            <select
                                id="dropdown"
                                name="dropdown"
                                className="form-select block w-full sm:w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="option1">1</option>
                                <option value="option2">2</option>
                                <option value="option3">3</option>
                                <option value="option3">4</option>
                            </select>
                        </div>
                        <div className="mb-4 sm:mb-0">

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="dropdown"
                            >
                                Beds
                            </label>

                            <select
                                id="dropdown"
                                name="dropdown"
                                className="form-select block w-full sm:w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="option1">1</option>
                                <option value="option2">2</option>
                                <option value="option3">3</option>
                                <option value="option3">4</option>
                            </select>
                        </div>
                        <div className="mb-4 sm:mb-0">

                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="dropdown"
                            >
                                Bathrooms
                            </label>

                            <select
                                id="dropdown"
                                name="dropdown"
                                className="form-select block w-full sm:w-64 py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                            >
                                <option value="option1">1</option>
                                <option value="option2">2</option>
                                <option value="option3">3</option>
                                <option value="option3">4</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div className=" flex flex-col sm:flex-row ml-5 sm: justify-center mt-14 mb-14">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="dropdown"
                            >
                                what your place has to offer
                            </label>
                        </div>
                        <>
                            <div className=" flex flex-col sm:flex-row  sm: justify-evenly mt-7 mb-14" >


                                <div className="flex items-center ">
                                    <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="default-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Wifi
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        defaultChecked=""
                                        id="checked-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checked-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        TV
                                    </label>
                                </div>
                                <div className="flex items-center ">
                                    <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="default-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Kitchen
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        defaultChecked=""
                                        id="checked-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checked-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Washing machine
                                    </label>
                                </div>
                                <div className="flex items-center ">
                                    <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="default-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Free parking on premises
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        defaultChecked=""
                                        id="checked-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checked-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Paid parking on premises
                                    </label>
                                </div>
                                <div className="flex items-center ">
                                    <input
                                        id="default-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="default-checkbox"
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-500"
                                    >
                                        Air conditioning
                                    </label>
                                </div>
                                <div className="flex items-center">
                                    <input
                                        defaultChecked=""
                                        id="checked-checkbox"
                                        type="checkbox"
                                        defaultValue=""
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2  dark:border-gray-600"
                                    />
                                    <label
                                        htmlFor="checked-checkbox"
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
                            htmlFor="dropdown"
                        >
                            Add photo of your house
                        </label>
                    </div>


                    <div >

                        <>
                            <label
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                htmlFor="file_input"
                            >
                                Upload file
                            </label>
                            <input
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-50 dark:border-gray-600 dark:placeholder-gray-400"
                                id="file_input"
                                type="file"
                            />
                        </>






                    </div>
                    <div>
                        <div className="flex justify-center mt-5">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="dropdown"
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
                                    className="form-input w-40 py-2 pl-8 pr-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                                />
                            </div>
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
