import express from 'express';
import { addDoctor, allDoctors, AppointmentCancel, appointmentsAdmin, loginAdmin } from '../controllers/admin.controller.js';
import upload from '../middlewares/multer.js';
import authAdmin from '../middlewares/authAdmin.js';
import { adminDashboard, changeAvailability } from '../controllers/doctor.controller.js';

const adminRouter = express.Router();

// add doctor
adminRouter.post('/add-doctor',authAdmin,upload.single('image'), addDoctor);
adminRouter.post('/login', loginAdmin);
adminRouter.post('/all-doctors',authAdmin, allDoctors);
adminRouter.post('/change-availability',authAdmin, changeAvailability);

adminRouter.get('/appointments',authAdmin, appointmentsAdmin);
adminRouter.post('/cancel-appointment',authAdmin, AppointmentCancel);

adminRouter.get('/dashboard',authAdmin, adminDashboard);

export default adminRouter;