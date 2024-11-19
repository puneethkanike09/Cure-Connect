import { useContext } from "react";
import Login from "./pages/Login"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AdminContext } from "./context/AdminContext";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/admin/Dashboard";
import AllAppointments from "./pages/admin/AllAppointments";
import AddDoctor from "./pages/admin/AddDoctor";
import DoctorsList from "./pages/admin/DoctorsList";
import { DoctorContext } from "./context/DoctorContext";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointment from "./pages/doctor/DoctorAppointment";
import DoctorProfile from "./pages/doctor/DoctorProfile";

const App = () => {
  const { aToken } = useContext(AdminContext)
  const { dToken } = useContext(DoctorContext)
  return aToken || dToken ? (
    <div className="bg-[#f8f9fd]">
      <ToastContainer theme="colored" autoClose={1000} />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Route */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctors-list" element={<DoctorsList />} />

          {/* Doctor Route */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer theme="colored" autoClose={1000} />
      <Login />

    </>
  )
}

export default App
