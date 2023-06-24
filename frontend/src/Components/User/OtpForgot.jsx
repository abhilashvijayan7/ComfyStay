/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { verifyOtpForgot } from '../../Services/UserApi';
import {  useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
// import { toast, ToastContainer } from "react-toastify";


function OtpForgot() {
  const [otp, setOtp] = useState('');
  const [errorMessage,setErrorMessage]=useState('');
   const navigate=useNavigate()
  // const location = useLocation()
  // const input1 = location.inputs;

  const handleSubmit=async()=>{
    console.log("handlesubmit");
  
    if (otp.length !== 4) {
     setErrorMessage('OTP must be 4 digit long')
      return;
    }else{
       const {data}= await verifyOtpForgot(otp)
       console.log(data)
     if(!data.status){
     
      toast.error(data.message)
    }else{
      toast(data.message)
     navigate('/newpassword');
    }
    }
  }
  return (
    <div className='h-screen flex flex-col items-center justify-center '>
      <div className="pb-10">
        <h3 className='text-base text-black-500 font-bold'>Verify OTP</h3>
      </div>
    <OtpInput 
      value={otp}
      onChange={setOtp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input   {...props} />}
      separator={<span style={{ width: "8px" }}></span>}
        isInputNum={true}
        shouldAutoFocus={true}
        containerStyle={"bg-#D5531F; p-3 "}
        inputStyle={{
          border: "1px orange solid ",
          borderRadius:  "8px",
          margin:"5px",
          width: "54px",
          height: "54px",
          fontSize: "20px",
          color: "#000",
          fontWeight: "400",
          caretColor: "blue"
        }}
        focusStyle={{
          border: "1px solid #CFD3DB",
          outline: "none"
        }}
       
      />
     
      <div className="text-red-500 text-sm">{errorMessage}</div>
      <div className='pt-10'>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md " type='submit' onClick={handleSubmit}>submit</button>
      </div>
       </div> 
  )
}

export default OtpForgot
