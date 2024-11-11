import nodemailer from "nodemailer";
import { ApiResponse } from "../utils/ApiResponse.js";
import Client from "../models/client.model.js";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async (req, res) => {
    const { id } = req.user;
    try {
        const userClients = await Client.find({ userId: id });
        if (!userClients.length) {
            return res.status(404).json({
                error: "No clients were found",
            });
        }
        const recipientEmails = userClients
            .map((client) => client.email)
            .join(", ");
        
        const mailOptions = {
            from: "harshtayal2005@gmail.com",
            to: recipientEmails, // primary recipients
            subject: "Hello to Multiple Recipients!",
            text: "This email is sent to multiple people with haha.",
            html: "<p>This email is sent to <b>multiple recipients</b> using harshtayal.</p>",
        };
        const info = await transporter.sendMail(mailOptions);
        return res
            .status(200)
            .json(new ApiResponse(200, info.response, "Email sent!"));
    } catch (error) {
        res.status(500).json({
            error: `Failed to send email: error: ${error.message}`,
        });
    }
};

export { sendEmail };
