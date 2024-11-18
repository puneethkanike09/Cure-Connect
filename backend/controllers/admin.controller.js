import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorModel from "../models/doctor.model.js";
import jwt from "jsonwebtoken";
import appointmentModel from "../models/appointment.model.js";


//Api for adding doctors
const addDoctor = async (req, res) => {
    try {

        const {name, email, password, speciality, degree, experience, about,  fees, address} = req.body;
        const imageFile = req.file

        //checking for all data to add doctor
        if(!name || !email || !password || !speciality || !degree || !experience || !about || !fees || !address || !imageFile){
           return res.json({success: false, message: "Please provide all the details"}) 
        }

        //validating password format
        if(password.length < 8){
            return res.json({success: false, message: "Please provide strong password"})
        }
        
        //check for existing email
        const existingDoctor = await doctorModel.findOne({ email });
        if (existingDoctor) {
            return res.json({ success: false, message: "Doctor email already exists" });
        }

        //encrypt the doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // upload image to cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            resource_type: "image"
        })
        const imageUrl = imageUpload.secure_url;

        //save data to database
        const doctorData = {
            name,
            email,
            image: imageUrl,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address: JSON.parse(address),
            date: Date.now()
        }

        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        res.json({success: true, message: "Doctor added successfully"})


    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


//API for admin login
const loginAdmin = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success: true, message: "Login Successful", token})
        }else{  
            res.json({success: false, message: "Invalid Credentials"})
        }

    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


//API for get all doctors list for admin panel

const allDoctors = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select('-password') // exclude password from response
        res.json({success: true, doctors})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}


//API to get all appointments list

const appointmentsAdmin = async (req, res) => {
    try {
        const appointments = await appointmentModel.find({})
        res.json({success: true, appointments})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

//API to appointment cancel
const AppointmentCancel = async (req, res) => {
  try {
    const { appointmentId} = req.body;
    const appointmentData = await appointmentModel.findById(appointmentId);
    
    

    await appointmentModel.findByIdAndUpdate(appointmentId, {cancelled:true});

    //releading doctor slot
    const {docId, slotDate, slotTime} = appointmentData;
    const doctorData = await doctorModel.findById(docId);
    let slots_booked = doctorData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter((slot) => slot !== slotTime);
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled successfully" });

  } catch (error) {
     console.log(error);
     res.json({ success: false, message: error.message });
  }
}





export {addDoctor, loginAdmin,allDoctors, appointmentsAdmin, AppointmentCancel }

