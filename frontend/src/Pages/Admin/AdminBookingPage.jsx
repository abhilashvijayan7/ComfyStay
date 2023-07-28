/* eslint-disable no-unused-vars */
import React from 'react'

import AdminSidebar from '../../Components/Admin/AdminSidebar'
import AdminBookingList from '../../Components/Admin/AdminBookingList'

function AdminBookingPage() {
  return (
    <section className="flex gap-0">
    <AdminSidebar />
    <AdminBookingList />
</section>
  )
}

export default AdminBookingPage
