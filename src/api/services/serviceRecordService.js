import _ServiceRecords from '../models/ServiceRecords.model';
import _Pet from '../models/Pet.model';
import _User from '../models/User.model';

const createServiceRecord = async (data) => {
    try {
        const { petId, timeStartService, productId } = data;
        const pet = await _Pet.findOne({ _id: petId });
        if (pet.serviceStatus == 'active') {
            return {
                status: 'error',
                message: 'Pet is being registered for the service',
                data: '',
            };
        }
        const startTime = new Date(timeStartService);
        const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
        const serviceRecord = await _ServiceRecords.create({
            timeStartService: startTime,
            timeEndService: endTime,
            product: productId,
        });
        if (serviceRecord) {
            const petUpdate = await _Pet.findByIdAndUpdate(petId, { $push: { serviceRecords: serviceRecord._id } });
            if (petUpdate) {
                petUpdate.serviceStatus = 'active';
                await petUpdate.save();
                return {
                    status: 'success',
                    message: 'Booking service successfully !',
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

const cancelServiceRecord = async (data) => {
    try {
        const { serviceRecordId, reason } = data;
        const serviceRecord = await _ServiceRecords.findOne({ _id: serviceRecordId });
        if (serviceRecord && serviceRecord.status === 'Processing') {
            serviceRecord.status = 'Cancelled';
            serviceRecord.cancellation = {
                date: Date.now(),
                reason,
            };
            const newserviceRecord = await serviceRecord.save();
            if (newserviceRecord) {
                return {
                    status: 'success',
                    message: 'Cancel service success !',
                    data: '',
                };
            }
        }

        return {
            status: 'error',
            message: 'Cancel service fail !',
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
const confirmServiceRecord = async (data) => {
    try {
        const { bookingId, cageId } = data;
        const booking = await _ServiceRecords.findOne({ _id: bookingId });
        if (booking && booking.status === 'Processing') {
            const pet = await _Pet.findOne({ serviceRecords: bookingId });
            if (pet) {
                const user = await _User.findOne({ pets: pet._id });

                booking.status = 'Processed';
                booking.cage = cageId;
                const newBooking = await booking.save();
                if (newBooking) {
                    const listBooking = await _ServiceRecords.findOne({ _id: newBooking._id }).populate('product');
                    // await sendBookingEmail(listBooking, user, pet);
                    return {
                        status: 'success',
                        message: 'Confirm booking success please check mail to verify !',
                        data: '',
                    };
                }
            }
        }

        return {
            status: 'error',
            message: 'Confirm order fail !',
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
    cancelServiceRecord,
    confirmServiceRecord,
};
