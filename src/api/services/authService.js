import _User from '../models/User.model';
import _Otp from '../models/Otp.model';
import otpGenerator from 'otp-generator';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';

const isEmailExist = async (email) => {
    const user = await _User.findOne({ email });
    if (user) {
        return true;
    } else {
        return false;
    }
};
const isPhoneExist = async (phone) => {
    const user = await _User.findOne({ phone });
    if (user) {
        return true;
    } else {
        return false;
    }
};
const sendOtp = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'duykhoa21062003@gmail.com',
            // pass: 'hksz zqbq jzud sheh',
            pass: 'okzk ghpw niwd ltwb',
        },
    });

    await transporter.sendMail({
        from: '"khoa dz" <duykhoa21062003@gmail.com>',
        to: email,
        subject: 'verify to register accout',
        text: `your otp is ${otp}`,
        // html: '<b>Hello world?</b>', // html body
    });
};
const createUser = async (user) => {
    try {
        const checkEmail = await isEmailExist(user.email);
        if (checkEmail) {
            return {
                status: 'error',
                message: 'email is already exist',
                data: '',
            };
        }
        const checkPhone = await isPhoneExist(user.phone);
        if (checkPhone) {
            return {
                status: 'error',
                message: 'phone is already exist',
                data: '',
            };
        }
        const otp = await otpGenerator.generate(6, {
            digits: true,
            upperCaseAlphabets: false,
            specialChars: false,
            lowerCaseAlphabets: false,
        });

        const salt = await bcrypt.genSalt(10);
        const hashOtp = await bcrypt.hash(otp, salt);
        await _Otp.create({
            email: user.email,
            otp: hashOtp,
        });

        await sendOtp(user.email, otp);
        return { status: 'success', message: 'Please check mail to get otp', data: '' };
    } catch (error) {
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};
const verifyOtp = async (data) => {
    try {
        const listOtp = await _Otp.find({ email: data.email });
        if (listOtp.length > 0) {
            const lastOtp = listOtp[listOtp.length - 1].otp;
            const verify = await bcrypt.compare(data.otp, lastOtp);
            if (verify) {
                const salt = await bcrypt.genSalt(10);
                const hashPass = await bcrypt.hash(data.password, salt);
                await _User.create({
                    name: data.name,
                    email: data.email,
                    password: hashPass,
                    phone: data.phone,
                    dob: data.dob,
                    sex: data.sex,
                });
                return {
                    status: 'success',
                    message: 'register success',
                    data: '',
                };
            }
        }
        return {
            status: 'error',
            message: 'otp is wrong',
            data: '',
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
    createUser,
    verifyOtp,
};
