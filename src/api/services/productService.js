import _Product from '../models/Product.model';
import _ProductCategory from '../models/ProductCategory.model';

const getProductsByCategory = async (data) => {
    try {
        const { name, species, type } = data;
        let products = [];
        let category = [];
        let categoryId = [];
        if (!name && !species) {
            products = await _Product.find({ type }).select('_id name image des price quantity status');
        } else if (!name) {
            category = await _ProductCategory.find({ species });
            categoryId = category.map((c) => c._id);
            products = await _Product
                .find({ category: { $in: categoryId }, type })
                .select('_id name image des price quantity status');
        } else {
            category = await _ProductCategory.findOne({ name, species });
            products = await _Product
                .find({ category: category._id, type })
                .select('_id name image des price quantity status');
        }

        if (products.length > 0) {
            return {
                status: 'success',
                message: 'get list products success !',
                data: products,
            };
        }
        return {
            status: 'success',
            message: 'There are not any products',
            data: [],
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};
const getProductsAndSortByPrice = async (data) => {
    try {
        const { name, species, type, sort } = data;
        let sortValue = 0;
        if (sort == 'asc') {
            sortValue = 1;
        }
        if (sort == 'desc') {
            sortValue = -1;
        }

        let products = [];
        let category = [];
        let categoryId = [];
        if (!name && !species) {
            products = await _Product
                .find({ type })
                .select('_id name image des price quantity status')
                .sort({ price: sortValue });
        } else if (!name) {
            category = await _ProductCategory.find({ species });
            categoryId = category.map((c) => c._id);
            products = await _Product
                .find({ category: { $in: categoryId }, type })
                .select('_id name image des price quantity status')
                .sort({ price: sortValue });
        } else {
            category = await _ProductCategory.findOne({ name, species });
            products = await _Product
                .find({ category: category._id, type })
                .select('_id name image des price quantity status')
                .sort({ price: sortValue });
        }

        if (products.length > 0) {
            return {
                status: 'success',
                message: 'get list products success !',
                data: products,
            };
        }
        return {
            status: 'success',
            message: 'There are not any products',
            data: [],
        };
    } catch (error) {
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};
const getProductsById = async (id) => {
    try {
        const product = await _Product.findOne({ _id: id }).select('_id name image des price quantity status');
        if (product) {
            return {
                status: 'success',
                message: 'get product detail success !',
                data: product,
            };
        }
        return {
            status: 'success',
            message: 'not found product',
            data: [],
        };
    } catch (error) {
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};
const getProductsByName = async (data) => {
    try {
        const { name, type } = data;
        if (type) {
            const product = await _Product
                .find({ name: { $regex: name, $options: 'i' }, type })
                .select('_id name image des price quantity status');
            if (product) {
                return {
                    status: 'success',
                    message: 'get product detail success !',
                    data: product,
                };
            }
        } else {
            const product = await _Product
                .find({ name: { $regex: name, $options: 'i' } })
                .select('_id name image des price quantity status');
            if (product) {
                return {
                    status: 'success',
                    message: 'get product detail success !',
                    data: product,
                };
            }
        }
        return {
            status: 'success',
            message: 'not found product',
            data: [],
        };
    } catch (error) {
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};

const getPriceByProductId = async (id) => {
    try {
        const product = await _Product.findOne({ _id: id });
        return product.price;
    } catch (error) {
        console.log(error);
    }
};
const createProduct = async (req) => {
    try {
        const { path, filename } = req.file;
        const { name, des, price, type, quantity, weight } = req.body;
        const image = {
            url: path,
            public_id: filename,
        };
        const pet = await _Pet.create({
            name,
            species,
            sex,
            breed,
            age,
            image,
            weight,
        });
        if (pet._id) {
            await _User.findByIdAndUpdate(userId, { $push: { pets: pet._id } });
            return {
                status: 'success',
                message: 'Pet created successfully !',
                data: pet,
            };
        }
        return {
            status: 'error',
            message: 'Pet created fail !',
            data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};
module.exports = {
    getProductsByCategory,
    getProductsById,
    getProductsAndSortByPrice,
    getProductsByName,
    getPriceByProductId,
    createProduct,
};
