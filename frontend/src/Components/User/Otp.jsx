/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useState ,useEffect} from 'react';
import OtpInput from 'react-otp-input';
import { verifyOtp,resentOtpSignup } from '../../Services/UserApi';
import {  useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
// import { toast, ToastContainer } from "react-toastify";


function Otp() {
  const [otp, setOtp] = useState('');
  const [errorMessage,setErrorMessage]=useState('');
   const navigate=useNavigate()
   const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(60);
  // const location = useLocation()
  // const input1 = location.inputs;
  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);
  const otpResentSubmit = async () => { 
    setMinutes(0);
    setSeconds(60);
    const {data}=await resentOtpSignup();
    toast(data.message);

  
  };

  const handleSubmit=async()=>{
  
    if (otp.length !== 4) {
     setErrorMessage('OTP must be 4 digit long')
      return;
    }else{
       const {data}= await verifyOtp(otp)
     if(!data.status){
     
      toast.error(data.message)
    }else{
      toast(data.message)
     navigate('/login');
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
     <div className="countdown-text">
          {seconds > 0 || minutes > 0 ? (
            <p>
              Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          ) : (
            <p>Didt recieve code?</p>
          )}

          <button
            disabled={seconds > 0 || minutes > 0}
            style={{
              color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
            }}
            onClick={otpResentSubmit}
          >
            Resend OTP
          </button>
        </div>

      <div className="text-red-500 text-sm">{errorMessage}</div>
      <div className='pt-10'>
      <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md " type='submit' onClick={handleSubmit}>submit</button>
      </div>
       </div> 
  )
}

export default Otp
