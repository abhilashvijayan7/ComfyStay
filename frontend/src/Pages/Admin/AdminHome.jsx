import AdminDashboard from "../../Components/Admin/AdminDashboard"
import AdminSidebar from "../../Components/Admin/AdminSidebar"

function AdminHomePage() {
  return (
   <section className="flex">
   <AdminSidebar/>
   <AdminDashboard/>
   </section>
  )
}

export default AdminHomePage
