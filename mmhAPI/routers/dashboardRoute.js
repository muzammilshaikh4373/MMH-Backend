import express from 'express';
import { dashboardController, dashboardOperatorDetailsController } from '../controllers/dashboardController.js';

const dashboardRoute = express.Router()


dashboardRoute.get('/dashboard' ,  dashboardController)

dashboardRoute.get('/dashboard/operator' ,  dashboardOperatorDetailsController)


export default dashboardRoute