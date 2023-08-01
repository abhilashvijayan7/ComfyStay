/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import Header from './UserHeader'
import { useDispatch, useSelector } from 'react-redux'
import { FiEdit, FiSettings } from 'react-icons/fi'
import { changePasswordAPI, editUserDetails, userDetails } from '../../Services/UserApi'
import { toast } from 'react-toastify'
import { setUserDetails } from '../../features/setUser';
import { useNavigate } from 'react-router-dom'


function UserProfile() {
    const navigate = useNavigate()
    const user = useSelector((state) => state.user.value)
    const dispatch = useDispatch()

    const [ChangePassword, setChangePassword] = useState(false)

    const [passwords, setsPassword] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    })
    const [values, setValues] = useState({
        username: "",
        email: ""
    })
    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("jwt")
        if (!token) {
            navigate("/login")
        }

        userDetails().then((response) => {
            setValues({ username: response.data.user.username, email: response.data.user.email })
        })
    }, [])
    const generateError = (err) => {
        toast.error(err, {
            position: "top-center"
        })
    }

    const handleSubmission = (e) => {
        e.preventDefault()
        const errors = {};
        if (!values.username) {
            errors.username = 'Name is required';
            generateError(errors.username);
        } else if (/\s/.test(values.username)) {
            errors.username = 'Name cannot contain white spaces';
            generateError(errors.username)
        } else if (/[^a-zA-Z0-9]/.test(values.username)) {
            errors.username = 'Name cannot contain special characters';
            generateError(errors.username)
        } else if (values.username.length < 3) {
            errors.username = 'Name must be at least 3 characters long';
            generateError(errors.username)
        }

        if (!values.email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
            errors.email = 'Email is invalid';
            generateError(errors.email);

        }

        if (Object.keys(errors).length > 0) {

            generateError(errors);
        } else {
            try {
                editUserDetails(values).then((response) => {
                    if (response.data.status) {
                        toast.success(response.data.message)
                        setEdit(false)
                        const updatedUser = response.data.newUser
                        dispatch(setUserDetails(updatedUser))

                    }
                })

            } catch (error) {
                generateError(error)
            }
        }
    }

    const passwordChange = (e) => {
        e.preventDefault()
        changePasswordAPI(passwords).then((response) => {
            if (response.data.status) {
                toast.success(response.data.message)
                setChangePassword(false)
                setsPassword(null)

            } else {
                toast.error(response.data.message)
            }
        })
    }

    return (
        <div>
            <div>
                <Header />
            </div>
            <div className=' mt-28 w-full text-center text-yellow-900 font-bold text-xl'>
                Profile
            </div>

            {user ? <div className='flex justify-center items-center p-4 '>
                {user && <div className="max-w-md p-10  mt-2 sm:flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100 border rounded-md">
                    <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0 ">
                        <img src="https://st3.depositphotos.com/3431221/13621/v/450/depositphotos_136216036-stock-illustration-man-avatar-icon-hipster-character.jpg" alt="" className="object-cover object-center w-full h-full rounded " />
                    </div>
                    <div className="flex flex-col space-y-10">
                        <div className='flex justify-between'>
                            <h2 className="text-2xl font-semibold">{user.username}</h2>
                            <div onClick={() => setEdit(!edit)}><FiEdit /></div>
                        </div>
                        <div className="space-y-1">
                            <p className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                                    <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                                </svg>
                                <p className="dark:text-gray-400">{user.email}</p>
                            </p>
                            <p className="flex items-center space-x-2">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Phonenumber" className="w-4 h-4">
                                    <path fill="currentColor" d="M449.366,89.648l-.685-.428L362.088,46.559,268.625,171.176l43,57.337a88.529,88.529,0,0,1-83.115,83.114l-57.336-43L46.558,362.088l42.306,85.869.356.725.429.684a25.085,25.085,0,0,0,21.393,11.857h22.344A327.836,327.836,0,0,0,461.222,133.386V111.041A25.084,25.084,0,0,0,449.366,89.648Zm-20.144,43.738c0,163.125-132.712,295.837-295.836,295.837h-18.08L87,371.76l84.18-63.135,46.867,35.149h5.333a120.535,120.535,0,0,0,120.4-120.4v-5.333l-35.149-46.866L371.759,87l57.463,28.311Z"></path>
                                </svg>
                                <p className="dark:text-gray-400">+91 {user.phonenumber}</p>
                            </p>
                        </div>
                        <div onClick={() => setChangePassword(true)} className='text-right text-blue-600 underline relative cursor-pointer'>
                            <p >ChangePassword</p>
                            {/* <div className='absolute top-1 left-24 right-0 bottom-0'><FiSettings /></div> */}
                        </div>
                    </div>

                </div>}

                {edit && <div id="popup-modal" className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button onClick={() => setEdit(!edit)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="popup-modal">
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
                                </svg>
                                <p className="sr-only">Close modal</p>
                            </button>
                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={() => setEdit(!edit)}
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                    data-modal-hide="authentication-modal"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <p className="sr-only">Close modal</p>
                                </button>
                                <div className="px-6 py-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                        Edit Your Details
                                    </h3>
                                    <form className="space-y-6" onSubmit={(e) => handleSubmission(e)} >
                                        <div>
                                            <label
                                                htmlFor="password"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder=""
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                                value={values.username}
                                            />

                                        </div>
                                        <div>
                                            <label
                                                htmlFor="email"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Your email
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                id="email"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder=""
                                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                                                value={values.email}
                                            />

                                        </div>

                                        <div className="flex justify-between">

                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Edit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}


                {ChangePassword && <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">

                    <div className="relative w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                                <button onClick={() => setChangePassword(!ChangePassword)}
                                    type="button"
                                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                    data-modal-hide="authentication-modal"
                                >
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <p className="sr-only">Close modal</p>
                                </button>
                                <div className="px-6 py-6 lg:px-8">
                                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                                        Change Password
                                    </h3>
                                    <form className="space-y-6" onSubmit={(e) => passwordChange(e)} >
                                        <div>
                                            <label
                                                htmlFor="currentPassword"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Current Password
                                            </label>
                                            <input
                                                type="password"
                                                name="currentPassword"
                                                id="currentPassword"
                                                placeholder=""
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                onChange={(e) => setsPassword({ ...passwords, [e.target.name]: e.target.value })}
                                                value={passwords ? passwords.currentPassword : null}
                                            />

                                        </div>
                                        <div>
                                            <label
                                                htmlFor="newPassword"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                New Password
                                            </label>
                                            <input
                                                type="password"
                                                name="newPassword"
                                                id="newPassword"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder=""
                                                onChange={(e) => setsPassword({ ...passwords, [e.target.name]: e.target.value })}
                                                value={passwords && passwords.newPassword}
                                            />

                                        </div>
                                        <div>
                                            <label
                                                htmlFor="confirmPassword"
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                Confirm Password
                                            </label>
                                            <input
                                                type="password"
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                placeholder=""
                                                onChange={(e) => setsPassword({ ...passwords, [e.target.name]: e.target.value })}
                                                value={passwords && passwords.confirmPassword}
                                            />

                                        </div>

                                        <div className="flex justify-between">
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Edit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>}

            </div> : <div role="status " className='flex justify-center h-screen items-center'>
                <svg aria-hidden="true" className="w-10 h-10 mr-2  text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <p className='sr-only'>Loading...</p>
            </div>}
        </div>


    )
}

export default UserProfile



