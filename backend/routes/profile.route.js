import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { getClients, getInfo } from "../controllers/profile.controller.js";
import { addClient } from "../controllers/client.controller.js";

const router = Router();

//protected route to get user information
router.route("/").get(authenticate, getInfo);

//protected route to add user clients
router.route("/add-client").post(authenticate, addClient);

//protected route to get user clients
router.route("/clients").get(authenticate, getClients);

export default router;
