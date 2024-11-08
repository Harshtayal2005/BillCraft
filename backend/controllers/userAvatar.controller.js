import User from "../models/user.model.js";
import UserAvatar from "../models/userAvatar.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const addUserAvatar = async (req, res) => {
    const { id } = req.user;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({
                error: "User doesn't exist",
            });
        }
        let avatarUrl = "";
        if (req.file) {
            const avatar = await uploadOnCloudinary(req.file.buffer);
            if (avatar && avatar.url) {
                avatarUrl = avatar.url;
            } else {
                return res.status(500).json({ error: "Avatar not uploaded!" });
            }
        } else {
            avatarUrl = "https://api.dicebear.com/9.x/adventurer/svg";
        }
        const createdUserAvatar = await UserAvatar.create({
            userId: id,
            avatarUrl,
        });

        if (!createdUserAvatar) {
            return res.status(500).json({
                error: "Something went wrong while uploading the avatar",
            });
        }

        return res
            .status(201)
            .json(new ApiResponse(201, createdUserAvatar, "Avatar Uploaded!"));
    } catch (error) {
        return res
            .status(500)
            .json({ error: `Internal Server error: ${error.message}` });
    }
};

export { addUserAvatar };

