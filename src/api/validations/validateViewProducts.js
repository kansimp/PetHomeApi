const validateViewProducts = (req, res, next) => {
    const { type, name, species } = req.query;

    if (!type) {
        return res
            .status(400)
            .json({ status: 'error', message: 'Bad Request', data: { field: 'type', error: 'type is require' } });
    }

    if (!name) {
        return res.status(400).json({
            status: 'error',
            message: 'Bad Request',
            data: { field: 'name', error: 'name is require' },
        });
    }
    if (!species) {
        return res.status(400).json({
            status: 'error',
            message: 'Bad Request',
            data: { field: 'species', error: 'species is require' },
        });
    }

    next();
};

export default validateViewProducts;
