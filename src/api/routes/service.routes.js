import express from 'express';
import { checkUserAuth, checkPermissionUser } from '../middlewares/jwtMiddleWares';
import serviceRecordController from '../controllers/serviceRecordController';

const router = express.Router();

router.post('/service', checkUserAuth, checkPermissionUser(['CUSTOMER']), serviceRecordController.createServiceRecord);

export default router;
