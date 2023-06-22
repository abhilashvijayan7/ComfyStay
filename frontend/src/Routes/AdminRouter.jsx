import { Route, Routes } from 'react-router-dom'

import AdminLoginPage from '../Pages/Admin/AdminLoginPage'
import AdminDashboardPage from '../Pages/Admin/AdminDashboardPage'
function AdminRouter() {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<AdminLoginPage/>}/>
        <Route path='/' element={<AdminDashboardPage/>}/>
      </Routes>
    </div>
  )
}

export default AdminRouter
