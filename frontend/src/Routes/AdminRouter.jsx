import { Route, Routes } from 'react-router-dom'

import AdminLoginPage from '../Pages/Admin/AdminLoginPage'

import AdminHomePage from '../Pages/Admin/AdminHome'
import AdminProperty from '../Pages/Admin/AdminProperty'
import PropertyListPage from '../Pages/Admin/PropertyListPage'

function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLoginPage/>}/>
        <Route path='/' element={<AdminHomePage/>}/>
        <Route path='/propertylist' element={<AdminProperty/>}/>
        <Route path='/propertylist' element={<PropertyListPage/>}/>

      </Routes>
    </div>
  )
}

export default AdminRouter
