import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { getInfo } from "../controllers/user.controller.js";
import { getClients } from "../controllers/client.controller.js";
import { addClient } from "../controllers/client.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

//protected route to get user information
router.route("/").get(authenticate, getInfo);

//protected route to add user clients
router.route("/add-client").post(
    authenticate,
    upload.single("userAvatar"),
    addClient
);

//protected route to get user clients
router.route("/clients").get(authenticate, getClients);

export default router;
