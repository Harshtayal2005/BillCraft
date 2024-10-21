import User from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = async (req, res) => {
    const { username, fullname, email, password, businessName } = req.body;

    // Check all the necessary fields
    if (!username || !fullname || !email || !password || !businessName) {
        return res.status(400).json({
            error: "All the fields are required",
        });
    }

    try {
        //check if any users exist in the database
        const existingUsers = await User.countDocuments();

        //Check user already exists or not
        const existedUser = await User.findOne({
            $or: [{ username }, { email }],
        });

        if (existedUser) {
            return res.status(409).json({
                error: "User already exists",
            });
        }

        // Assign admin role only to the first user
        const isAdmin = existingUsers === 0;

        //Create a fresh entry in the database
        const user = await User.create({
            username,
            fullname,
            email,
            password,
            businessName,
            isAdmin,
        });

        const createdUser = await User.findById(user._id).select("-password");

        if (!createdUser) {
            return res.status(500).json({
                error: "Something went wrong while registring the user. Pls try again!",
            });
        }

        return res
            .status(201)
            .json(
                new ApiResponse(
                    201,
                    createdUser,
                    "User registered successfully!"
                )
            );
    } catch (error) {
        return res.status(500).json({
            error: `User can't be created. Error: ${error.message}`,
        });
    }
};

export { registerUser };
