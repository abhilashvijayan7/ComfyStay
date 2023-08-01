
import AdminSidebar from "../../Components/Admin/AdminSidebar"
import DashboardPage from "./DashBoardPage"
function AdminDashboardPage() {
  return (
    <section className="flex gap-0">
      <AdminSidebar/>
      <DashboardPage/>
    
    </section>
  )
}

export default AdminDashboardPage
