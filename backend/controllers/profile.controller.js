import Client from "../models/client.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const getInfo = async (req, res) => {
    console.log(req.user);
    res.status(200).json({
        message: "Success!",
    });
};

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

export { getInfo, getClients };
