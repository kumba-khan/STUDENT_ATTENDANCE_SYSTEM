import express from "express";
import {
  getAllStudents,
  createStudent,
  getStudentById,
  updateStudent,
  deleteStudent,
  studentStatistic
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getAllStudents);
router.get("/stats", studentStatistic);
router.get("/:id", getStudentById);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;