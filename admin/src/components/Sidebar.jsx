import { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  return (
    <div  className="min-h-screen bg-white/10 backdrop-blur-md border-white/20 ">
      {aToken && (
        <ul className="text-black mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center transition-all duration-300 ease-in-out gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-lg ${
                isActive
                  ? "bg-blue-800/10 border-r-4 border-primary text-black"
                  : "hover:bg-[#f2f3ff]/10 hover:border-primary hover:text-primary"
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="Dashboard" />
            <p>Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center transition-all duration-300 ease-in-out gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-lg ${
                isActive
                  ? "bg-blue-800/10 border-r-4 border-primary text-black"
                  : "hover:bg-[#f2f3ff]/10 hover:border-primary hover:text-primary"
              }`
            }
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="Appointments" />
            <p>Appointments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center transition-all duration-300 ease-in-out gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-lg ${
                isActive
                  ? "bg-blue-800/10 border-r-4 border-primary text-black"
                  : "hover:bg-[#f2f3ff]/10 hover:border-primary hover:text-primary"
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="Add Doctor" />
            <p>Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex items-center transition-all duration-300 ease-in-out gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer rounded-lg ${
                isActive
                  ? "bg-blue-800/10 border-r-4 border-primary text-black"
                  : "hover:bg-[#f2f3ff]/10 hover:border-primary hover:text-primary"
              }`
            }
            to={"/doctors-list"}
          >
            <img src={assets.people_icon} alt="Doctors List" />
            <p>Doctors List</p>
          </NavLink>
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
