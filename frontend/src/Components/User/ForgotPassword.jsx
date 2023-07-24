
import './Style.css'
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { forgotpassword } from '../../Services/UserApi'


function ForgotPassword() {


    const navigate = useNavigate()

    const [inputs, setInputs] = useState({

        phonenumber: ''
    })

    const [focus, setFocus] = useState({

        errNumber: false
    })
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            const { data } = await forgotpassword(inputs)
            if (data.status) {

                navigate('/otpforgot')
            } else {
                toast.error(data.message, {
                    position: 'top-center'
                })
            }

        } catch (error) {
            toast.error(error.response.data.message, {
                position: 'top-center'
            })
            /* empty */
        }
    }
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInputs({ ...inputs, [name]: value })
    }
    return (
        <div>
            <div>
                <>


                    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                        <div>
                            <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
                                {/* <img
      className="mx-auto h-10 w-auto"
      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
      alt="Your Company"
    /> */}
                                <h2 className="mt-10 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">
                                    Enter your registered phone number
                                </h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                                <form onSubmit={handleSubmit} className="space-y-6 " action="#" method="POST">



                                    <div>

                                        <div className="mt-2">
                                            <input
                                                id="phonenumber"
                                                name="phonenumber"
                                                type="text"
                                                pattern="^[0-9]{10}$"
                                                autoComplete=" "
                                                required
                                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                placeholder="Enter your phone number"
                                                value={inputs.phonenumber}
                                                onChange={handleChange}
                                                onBlur={() => setFocus({ ...focus, errNumber: true })}
                                                // eslint-disable-next-line react/no-unknown-property
                                                focus={focus.errNumber.toString()} /><span>Enter a valid phone number</span>
                                        </div>
                                    </div>
                                    <div>
                                        <button
                                            type="submit"
                                            style={{ backgroundColor: "#FE3962" }}
                                            className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div></div>
                </>
            </div>
        </div>
    )
}

export default ForgotPassword
