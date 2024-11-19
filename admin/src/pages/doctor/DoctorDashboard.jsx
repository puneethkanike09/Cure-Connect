import { useContext, useEffect } from "react"
import { DoctorContext } from "../../context/DoctorContext"
import { assets } from "../../assets/assets"
import { AppContext } from "../../context/AppContext"

const DoctorDashboard = () => {
  const { dToken, getDashData, dashData, setDashData, cancelAppointment, completeAppointment, getAppointments } = useContext(DoctorContext)
  const { currency, slotDateFormat } = useContext(AppContext)

  useEffect(() => {
    if (dToken) {
      getDashData()
      getAppointments()

    }
  }, [dToken, dashData])

  return dashData && (
    <div className="m-5">
      <div className="flex flex-wrap gap-5 mb-10">
        {[
          { icon: assets.earning_icon, label: "Earnings", value: currency + " " + dashData.earnings },
          { icon: assets.appointments_icon, label: "Appointments", value: dashData.appointments },
          { icon: assets.patients_icon, label: "Patients", value: dashData.patients },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:scale-105 transition-transform"
          >
            <img className="w-14" src={item.icon} alt={item.label} />
            <div>
              <p className="text-lg font-bold  text-gray-700">{item.value}</p>
              <p className="text-sm text-gray-500">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-b">
          <div className="flex items-center gap-2">
            <img src={assets.list_icon} alt="List Icon" />
            <p className="text-lg font-semibold text-gray-700">Latest Bookings</p>
          </div>
        </div>

        {/* Bookings List */}
        <div className="divide-y">
          {dashData.latestAppointments.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
            >
              {/* Doctor Image and Details */}
              <div className="flex items-center gap-4">
                <img
                  className="w-12 h-12 rounded-full border border-gray-200"
                  src={item.userData.image}
                  alt={item.userData.name}
                />
                <div>
                  <p className="font-medium text-gray-800">{item.userData.name}</p>
                  <p className="text-sm text-gray-500">{slotDateFormat(item.slotDate)}</p>
                </div>
              </div>

              {/* Appointment Status / Action */}
              {
                item.cancelled ? <p className="text-red-400 text-xs font-medium">Cancelled</p> : item.isCompleted ? <p className="text-green-500 text-xs font-medium">Completed</p> :
                  <div className="flex">
                    <img onClick={() => cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
                    <img onClick={() => completeAppointment(item._id)} className="w-10 cursor-pointer" src={assets.tick_icon} alt="" />
                  </div>
              }
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}

export default DoctorDashboard
