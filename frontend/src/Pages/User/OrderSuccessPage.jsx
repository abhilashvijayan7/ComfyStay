/* eslint-disable no-unused-vars */
import React from 'react'
import OrderSuccessful from '../../Components/User/OrderSuccessful'
import UserFooter from '../../Components/User/UserFooter'
import UserHeader from '../../Components/User/UserHeader'

function OrderSuccessPage() {
    return (
        <div>
            <UserHeader />
            <OrderSuccessful />
            <UserFooter  />
        </div>
    )
}

export default OrderSuccessPage
