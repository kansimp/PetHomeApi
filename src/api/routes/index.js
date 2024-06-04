import express from 'express';
import userRoutes from './user.routes';
import authRoutes from './auth.routes';
import productRoutes from './product.routes';

const router = express.Router();

const apiRoutes = (app) => {
    router.use(userRoutes);
    router.use(authRoutes);
    router.use(productRoutes);

    app.use('/api/v1', router);
    app.use((req, res, next) => {
        res.status(404).json({ status: 'error', message: 'Not Found', data: '' });
    });
    return app;
};

export default apiRoutes;
