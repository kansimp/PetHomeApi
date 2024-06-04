import express from 'express';
import { checkUserAuth, checkPermissionUser } from '../middlewares/jwtMiddleWares';
import _ProductCategory from '../models/ProductCategory.model';
import _Product from '../models/Product.model';
const router = express.Router();

router.get('/hello', checkUserAuth, checkPermissionUser(['CUSTOMER']), async (req, res) => {
    const k = await _Product.find({}).populate({
        path: 'category',
    });
    return res.status(200).json(k);
});

export default router;
