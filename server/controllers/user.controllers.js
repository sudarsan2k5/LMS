import AppError from "../utils/error.utils.js";
import User from "../model/user.model.js";

const cookieOptions = {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    http: true,
    secure: true
}

const register = async (req, res, next) => {
    const {fullName, email, password} = req.body;

    if(!fullName || !email || !password){
        return next(new AppError('All fields are required', 400));
    }

    const userExists = User.findOne({
        email
    });

    if(userExists){
        return next(AppError('Email already exists', 400))
    }

    const user = await User.create({
        fullName: fullName,
        email: email,
        password: password,
        avatar: {
            public_id: email,
            secure_url: 'https://github.com/sudarsan2k5'
        }
    })
    if(!user){
        return next(AppError('User Registration Failds :(', 400));
    }

    // File Upload
    await user.save();

    user.password = undefined;

    const token = user.generateJWTToken();

    res.cookie('token', token, cookieOptions)


    res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
    })
};
const login = async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        return next(new AppError('All fields are required', 400));
    }

    const user = await User.findOne({
        email
    }).select('+password')

    if(!user || !user.comparePassword(password)){
        return next(new AppError('Email or password does not match', 400))
    }

    const token = await user.generateJWTToken();
    user.password = undefined;

    res.cookie('token', token, cookieOptions)

    res.status.json({
        success
    })

};
const logout = (req, res) => {};
const getProfile = (req, res) => {};

export { register, login, logout, getProfile };
