import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credientials: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

import userRouter from "./routes/user.route.js";
import profileRouter from "./routes/profile.route.js";
app.use("/api/v1/user", userRouter);
app.use("/api/v1/profile", profileRouter);

//checking
app.get("/", (req, res) => {
    res.send("hello world");
})

export default app;
