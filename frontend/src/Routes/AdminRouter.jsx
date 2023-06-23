import { Route, Routes } from 'react-router-dom'

import AdminLoginPage from '../Pages/Admin/AdminLoginPage'

import AdminHomePage from '../Pages/Admin/AdminHome'
function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLoginPage/>}/>
        <Route path='/' element={<AdminHomePage/>}/>
      </Routes>
    </div>
  )
}

export default AdminRouter
