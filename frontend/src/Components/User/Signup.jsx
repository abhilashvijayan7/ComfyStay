import React from 'react'
import { useState } from 'react'
import './Style.css'
// import Link from 'react-router-dom'

function Signup() {
    const[inputs,setInputs]=useState({
        username: '',
        email:'',
        password: '',
        cpassword: ''
    })
  
    const [focus , setFocus]= useState({
        errName:false,
        errEmail :false,
        errPass :false,
        errCpass :false

    })
    const handleSubmit=(e)=>{
        e.preventDefault();
    }
    const handleChange =(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setInputs({...inputs,[name]:value})
    }
  return (
<>


      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <div>
        <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create an account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
          <form onSubmit={handleSubmit} className="space-y-6 " action="#" method="POST">
          <div>
            <div className="mt-2">
                <input
                  id="name"
                  name="username"
                  type="text"
                  pattern='^[A-Za-z0-9].{2,16}'
                  autoComplete=""
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your name"
                  value={inputs.username}
                  onChange={handleChange}
                  onBlur={()=>setFocus({...focus,errName : true})}
                  focus ={focus.errName.toString()}/><span>Username should have 3-16 characters</span>
              </div>
            </div>

            <div>
        
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your email address"
                  value={inputs.email}
                  onChange={handleChange}
                  onBlur={()=>setFocus({...focus,errEmail : true})}                 
                   focus ={focus.errEmail.toString()}/><span>Enter a valid email id</span>
              </div>
            </div>

            <div>
             
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  pattern="(?=^.{8,16}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$" 
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Enter your password"
                  value={inputs.password}
                  onChange={handleChange}
                  onBlur={()=>setFocus({...focus,errPass : true})}                  
                  focus ={focus.errPass.toString()}/><span>password must have minimum 8 characters and atleast 1 uppercase,1 digit and 1 special character</span>
              </div>
              
            </div>
            <div>
            <div className="mt-2">
                <input
                  id="confirm-password"
                  name="cpassword"
                  type="password"
                  pattern={inputs.password}
                  autoComplete=""
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="Confirm your password"
                  value={inputs.cpassword}
                  onChange={handleChange}
                  onBlur={()=>setFocus({...focus,errCpass : true})}              
                  focus ={focus.errCpass.toString()}/><span>password is not matching</span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                style={{backgroundColor:"#FE3962"}}
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register 
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <a href="#" className="font-semibold leading-6 text-black hover:text-gray-500">
              Login 
            </a>
          </p>
        </div>
      </div></div>
</>
  )
}

export default Signup
