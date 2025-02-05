import { Router } from "express";
import {
  addGroup,
  getAllOwn,
  updateGroup,
  deleteGroup,
  getGroupById,
  getAll,
} from "../group/controller";
import auth from "../auth/middleware";

const router = Router();

router.get("/own", auth(false), getAllOwn);
router.get("/all", auth(true), getAll);
router.post("/", auth(false), addGroup);
router.get("/:id", auth(false), getGroupById);
router.put("/:id", auth(false), updateGroup);
router.delete("/:id", auth(false), deleteGroup);

export default router;
