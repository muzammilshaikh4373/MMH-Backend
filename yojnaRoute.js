import express from 'express';
const yojnaRouter = express.Router();
import { getYojna,createYojna ,updateYojna,deleteYojna} from '../controllers/yojnaController.js';

yojnaRouter.get('/getYojna',getYojna)
yojnaRouter.post('/createYojna', createYojna);
yojnaRouter.post('/updateYojna',updateYojna);
yojnaRouter.post('/deleteYojna/:id',deleteYojna)

export default yojnaRouter



