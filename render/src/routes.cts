import { Router } from "express";
import { testController } from "./controllers/test.control.cjs";
import { renderController } from "./controllers/render.control.cjs";

const router = Router();

router.get("/test", testController.test);
router.get("/render", renderController.render);

export default router;
