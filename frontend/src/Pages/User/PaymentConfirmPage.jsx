/* eslint-disable no-unused-vars */
import React from 'react'
import PaymentConfirm from '../../Components/User/PaymentConfirm'
import UserHeader from '../../Components/User/UserHeader';
import UserFooter from '../../Components/User/UserFooter';
function PaymentConfirmPage() {
  return (
    <div>
        <UserHeader/>
      <PaymentConfirm/>
      <UserFooter/>
    </div>
  )
}

export default PaymentConfirmPage
