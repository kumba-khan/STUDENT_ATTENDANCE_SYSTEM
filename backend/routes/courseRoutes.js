import express from "express";

import {
    getAllCourses,
    createCourse,
    getCourseById,
    updateCourse,
    deleteCourse,
    enrollStudent,
    removeStudent,
    getCourseStats
} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getAllCourses);
router.get("/stats", getCourseStats);
router.post("/", createCourse);
router.post("/:id/enroll", enrollStudent);
router.delete("/:id/:studentId", removeStudent);
router.put("/:id", updateCourse);
router.delete("/:id", deleteCourse);
router.get("/:id", getCourseById);
export default router;