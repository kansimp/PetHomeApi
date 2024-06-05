const validateSearch = (req, res, next) => {
    const { name, type } = req.query;

    if (!name) {
        return res
            .status(400)
            .json({ status: 'error', message: 'Bad Request', data: { field: 'name', error: 'name is require' } });
    }
    if (!type) {
        return res
            .status(400)
            .json({ status: 'error', message: 'Bad Request', data: { field: 'type', error: 'type is require' } });
    }

    next();
};

export default validateSearch;
