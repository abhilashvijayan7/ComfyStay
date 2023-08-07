/* eslint-disable no-unused-vars */
import React from 'react'
import BookingList from '../../Components/User/BookingList'
import UserFooter from '../../Components/User/UserFooter'
import UserHeader from '../../Components/User/UserHeader'
const BookingListPage = () => {
    return (
        <div>


            <UserHeader/>
            <BookingList />
            <UserFooter />
        </div>
    )
}

export default BookingListPage
