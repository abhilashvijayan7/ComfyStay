/* eslint-disable no-unused-vars */
import React from 'react'
import HostPropertyBookings from '../../Components/User/HostPropertyBookings'
import UserFooter from '../../Components/User/UserFooter'
import UserHeader from '../../Components/User/UserHeader'

function HostBookingListPage() {
  return (
    <div>
       <UserHeader/>
            <HostPropertyBookings />
            <UserFooter />
    </div>
  )
}

export default HostBookingListPage
