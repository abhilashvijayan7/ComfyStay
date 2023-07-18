import AdminPropertylist from "../../Components/Admin/AdminPropertylist"
import AdminSidebar from "../../Components/Admin/AdminSidebar"

function AdminProperty() {
    return (
            <section className="flex gap-0">
                <AdminSidebar />
                <AdminPropertylist />
            </section>
    )
}

export default AdminProperty