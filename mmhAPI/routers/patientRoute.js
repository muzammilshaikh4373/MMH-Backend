import express from 'express';
import multer from 'multer';

import { createPatient, deletePatient, getPatient, getPatientById, updatePatient } from '../controllers/patientController.js';
const patientRouter = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

patientRouter.post('/create' , createPatient)
patientRouter.get('/getpatient' , getPatient)
patientRouter.put('/:id', upload.array('files',10) , updatePatient)
patientRouter.delete('/:id' , deletePatient)
patientRouter.get('/:id', getPatientById)

export default patientRouter;