import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = async (req, res) => {
    const { username, fullname, email, password, businessName } = req.body;

    //validate
    if (!username || !fullname || !email || !password || !businessName) {
        return res.status(400).json({
            error: "All the fields are required",
        });
    }

    //check if user is already present or not
    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });

    if (existedUser) {
        return res.status(409).json({
            error: "User already exists",
        });
    }

    const user = await User.create({
        username,
        fullname,
        email,
        password,
        businessName
    })

    const createdUser = await User.findById(user._id).select(
        "-password"
    )

    if(!createdUser) {
        return res.status(500).json({
            error: "Something went wrong while registring the user. Pls try again!"
        })
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully!")
    )
};

export { registerUser };
