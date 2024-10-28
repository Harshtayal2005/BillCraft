import Client from "../models/client.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getClients = async (req, res) => {
    const { id } = req.user;

    try {
        const userClients = await Client.find({ userId: id });
        if (!userClients.length) {
            return res.status(404).json({
                error: "No clients were found",
            });
        }
        return res
            .status(200)
            .json(
                new ApiResponse(
                    200,
                    userClients,
                    "Clients retrieved successfully"
                )
            );
    } catch (error) {
        return res.status(500).json({
            error: `Clients can't be retrieved. Error: ${error.message}`,
        });
    }
};

const addClient = async (req, res) => {
    const { id } = req.user;
    const { name, email } = req.body;

    try {
        //check if client already exists or not
        const existedClient = await Client.findOne({ email });

        if (existedClient) {
            //Client exists, so just push the current user id in the array
            if (!existedClient.userId.includes(id)) {
                existedClient.userId.push(id);
                await existedClient.save();
            }

            return res
                .status(200)
                .json(
                    new ApiResponse(
                        200,
                        existedClient,
                        "Client already exists. Userd Id added"
                    )
                );
        } else {
            //Client don't exist, so create a fresh entry in the data base
            let userAvatarLocalPath = "";
            if (req.file) {
                userAvatarLocalPath = req.file.path;
            }
            let avatar;
            if (userAvatarLocalPath !== "") {
                avatar = await uploadOnCloudinary(userAvatarLocalPath);
                if (!avatar) {
                    return res
                        .status(500)
                        .json({ error: "Avatar not uploaded" });
                }
            }
            const client = await Client.create({
                userId: [id],
                name,
                email,
                userAvatar: avatar.url || "",
            });

            if (!client) {
                return res.status(500).json({
                    error: "Something went wrong while registring the client",
                });
            }

            return res
                .status(201)
                .json(
                    new ApiResponse(
                        201,
                        client,
                        "Client registered successfully"
                    )
                );
        }
    } catch (error) {
        return res.status(500).json({
            error: `Client can't be registered. Error: ${error.message}`,
        });
    }
};

export { addClient, getClients };
