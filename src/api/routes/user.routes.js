import express from 'express';
import { checkUserAuth, checkPermissionUser } from '../middlewares/jwtMiddleWares';
const router = express.Router();

router.get('/hello', checkUserAuth, checkPermissionUser(['CUSTOMER']), (req, res) => {
    return res.status(200).json('hello');
});

export default router;
