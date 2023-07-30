import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

import {
  // AiOutlineTeam,
  AiOutlineAppstore,
  AiOutlineMessage,
  AiOutlinePicture,
  AiOutlineLogout,
  AiOutlineBars
} from "react-icons/ai";
import { Link } from "react-router-dom";

function AdminSidebar() {
  // const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("adminjwt");
    // navigate("/admin/login");
  };

  const menus = [
    { name: "Dashboard", link: "/", icon: AiOutlineAppstore },
    // { name: "Customers", link: "/", icon: AiOutlineTeam },
    { name: "Properties", link: "/admin/propertylist", icon: AiOutlineMessage },
    { name: "Bookings", link: "/admin/bookinglist", icon: AiOutlinePicture },
    { name: "Sign Out", icon: AiOutlineLogout, onClick: handleLogout , link: "/admin/login" },
  ];

  const [open, setOpen] = useState(false);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className={`bg-[#0e0e0e] min-h-screen ${open ? "w-40" : "w-16"} duration-500 text-gray-100 px-4`}>
      <div className="py-3 flex justify-end">
        <AiOutlineBars size={26} className="cursor-pointer" onClick={toggleSidebar} />
      </div>
      <div className="mt-4 flex flex-col gap-4 relative">
        {menus?.map((menu, i) => (
          <Link
            to={menu?.link}
            key={i}
            onClick={menu?.onClick}
            className="group flex items-center text-sm gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
          >
            <div>{React.createElement(menu?.icon, { size: "20" })}</div>
            <h2
              style={{
                transitionDelay: `${i + 3}00ms`,
              }}
              className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
            >
              {menu?.name}
            </h2>
            <h2
              className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900
              rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit`}
            >
              {menu?.name}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AdminSidebar;
