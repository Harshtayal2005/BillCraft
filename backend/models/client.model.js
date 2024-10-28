import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
    {
        userId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        userAvatar: {
            type: String // cloudinary URL
        }
    },
    { timestamps: true }
);

export default mongoose.model("Client", clientSchema);
