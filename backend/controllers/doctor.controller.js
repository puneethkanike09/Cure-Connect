import appointmentModel from "../models/appointment.model.js"
import doctorModel from "../models/doctor.model.js"
import userModel from "../models/user.model.js"

const changeAvailability = async (req, res) => {
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success: true, message: "Availability changed successfully"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


 const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success: true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
 }


 //API to get the dashboard to get the data

 const adminDashboard = async (req, res) => {
     try {
        
        const doctors = await doctorModel.find({})
        const users = await userModel.find({})
        const appointments = await appointmentModel.find({})

        const dashData = {
            doctors: doctors.length,
            appointments: appointments.length,
            patients: users.length,
            latestAppointments: appointments.reverse().slice(-5)

        }

        res.json({success: true, dashData})

     } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
     }
 }


export {changeAvailability, doctorList, adminDashboard}