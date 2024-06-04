import _Product from '../models/Product.model';
import _ProductCategory from '../models/ProductCategory.model';

const getProductsByCategory = async (data) => {
    try {
        const { name, species, type } = data;
        const category = await _ProductCategory.findOne({ name, species });
        const products = await _Product
            .find({ category: category._id, type })
            .select('_id name image des price quantity status');
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
        const product = await _Product.find({ _id: id }).select('_id name image des price quantity status');
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

module.exports = {
    getProductsByCategory,
    getProductsById,
};
