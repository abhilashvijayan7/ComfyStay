import { Route, Routes } from 'react-router-dom'

import AdminLoginPage from '../Pages/Admin/AdminLoginPage'

import AdminProperty from '../Pages/Admin/AdminProperty'
import AdminBookingPage from '../Pages/Admin/AdminBookingPage'
import AdminDashboardPage from '../Pages/Admin/AdminDashboardPage'
import Error from '../Components/Shared/Error'

function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLoginPage/>}/>
        <Route path='/propertylist' element={<AdminProperty/>}/>
        <Route path='/bookinglist' element={<AdminBookingPage/>}/>
        <Route path='/dashboard' element={<AdminDashboardPage/>}/>
        <Route path ="*" element={<Error/>}/>

      
        

      </Routes>
    </div>
  )
}

export default AdminRouter
