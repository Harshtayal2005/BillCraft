import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { getInfo } from "../controllers/profile.controller.js";

const router = Router();

//protected route
router.route("/:user").get(authenticate, getInfo);

export default router;
