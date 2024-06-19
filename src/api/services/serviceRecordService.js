import _ServiceRecords from '../models/ServiceRecords.model';
import _Pet from '../models/Pet.model';

const createServiceRecord = async (data) => {
    try {
        const { petId, dateUseService, productId } = data;

        const serviceRecord = await _ServiceRecords.create({
            dateUseService: new Date(dateUseService),
            product: productId,
        });
        if (serviceRecord) {
            const pet = await _Pet.findByIdAndUpdate(petId, { $push: { serviceRecords: serviceRecord._id } });
            if (pet) {
                pet.serviceStatus = 'active';
                await pet.save();
                return {
                    status: 'success',
                    message: 'Order created successfully !',
                    data: serviceRecord,
                };
            }
        }
        return {
            status: 'error',
            message: 'Order created fail !',
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
    createServiceRecord,
};
