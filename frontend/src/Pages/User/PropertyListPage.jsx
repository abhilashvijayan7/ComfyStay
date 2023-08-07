/* eslint-disable no-unused-vars */
import React from 'react'
import PropertyList from '../../Components/User/PropertyList'
import UserFooter from '../../Components/User/UserFooter';
import UserHeader from '../../Components/User/UserHeader';

function PropertyListPage() {
  return (
    <div>
      <UserHeader/>
      <PropertyList/>
      <UserFooter/>
    </div>
  )
}

export default PropertyListPage
