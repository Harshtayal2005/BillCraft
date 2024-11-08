import { Router } from "express";
import { authenticate } from "../middlewares/authenticate.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { addUserAvatar } from "../controllers/userAvatar.controller.js";

const router = Router();

router
    .route("/")
    .post(authenticate, upload.single("userAvatar"), addUserAvatar);

export default router;
