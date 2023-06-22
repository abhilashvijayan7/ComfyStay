/* eslint-disable no-unused-vars */
import React from 'react'
// import UserHome from '../../Components/User/Home'
import LandingPageBody from "../../Components/User/LandingPageBody";
import PropertyCategories from "../../Components/User/LandingPageCategories";
import UserFooter from "../../Components/User/UserFooter";
import UserHeader from "../../Components/User/UserHeader";

function UserHomePage() {
  return (
    <div>
           <UserHeader />
            <PropertyCategories />
            <LandingPageBody />
            <UserFooter />

    </div>
  )
}

export default UserHomePage
