import express from 'express';
import { addDoctor } from '../controllers/admin.controller.js';
import upload from '../middlewares/multer.js';

const adminRouter = express.Router();

// add doctor
adminRouter.post('/add-doctor', upload.single('image'), addDoctor);

export default adminRouter;