import {Router} from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { sendEmail } from "../controllers/email.controller.js";

const router = Router();

router.route("/").get(authenticate, sendEmail)

export default router;

