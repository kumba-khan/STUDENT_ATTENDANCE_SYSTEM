import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { getAllCourses } from "./courseController.js";
import Course from "../models/Course.js";

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).lean().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error: error.message })
  }
};

//get Active students
export const getActiveStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "student", status: "active" }).lean().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching active students", error: error.message })
  }
}

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const { name, password, email, phone, status } = req.body;
    const existingStudent = await User.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'A student with this email already exists' });
    }

    const newPassword = await bcrypt.hash(password, 10);
    const newStudent = await User.create({ name, password: newPassword, email, phone, status, enrolledDate: new Date() });
    res.status(201).json({ message: 'student created successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ message: 'student not created', error: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await User.findOne({
      _id: req.params.id,
      role: "student"
    }).lean();

    if (!student) {
      return res.status(404).json({ message: "Student not found" })
    }
    res.status(200).json(student)
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error: error.message })
  }
};

export const updateStudent = async (req, res) => {
  try {
    const userData = req.body;

    if(userData.password){
      return res.status(400).json({ message: "You cannot update student's password" });
    }

    const student = await User.findOne({
      _id: req.params.id,
      role: "student"
    }).lean();

    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }

    await User.findByIdAndUpdate(req.params.id, userData);
    res.status(200).json({ message: "Student updated successfully", student });

  } catch (error) {
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await User.findOne({
      _id: req.params.id,
      role: "student"
    }).lean();

    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }

    await User.findByIdAndDelete(req.params.id);

    // Remove student from all courses
    await Course.updateMany(
      {},
      {
        $pull: {
          students: req.params.id
        }
      }
    );

    res.status(200).json({ message: "Student deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message })
  }
};

export const studentStatistic = async (req, res) => {
  try {
    const students = await User.find({ role: "student" }).lean().sort({ createdAt: -1 });
    const graduated = students.filter(
      student => student.status === "graduated"
    ).length;
    const inactive = students.filter(
      student => student.status === "inactive"
    ).length;
    const active = students.filter(
      student => student.status === "active"
    ).length;

    const total = students.length;

    res.status(200).json({ total, active, inactive, graduated });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message })
  }
}

export const getEnrolledCourses = async (req, res) => {
  try {
    const student = await User.findOne({_id: req.params.id,role: "student"});

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const courses = await Course.find({
      students: req.params.id
    })
      .lean()
      .sort({ createdAt: -1 });

    res.status(200).json(courses);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching enrolled courses",
      error: error.message
    });
  }
};

export const getUnEnrolledCourses = async (req, res) => {
  try {
    const student = await User.findOne({
      _id: req.params.id,
      role: "student"
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    const courses = await Course.find({
      students: {
        $ne: req.params.id
      }
    })
      .lean()
      .sort({ createdAt: -1 });

    res.status(200).json(courses);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching unenrolled courses",
      error: error.message
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // validate input
    const allowedStatuses = ["active", "inactive"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status value"
      });
    }

    // find student
    const student = await User.findOne({
      _id: req.params.id,
      role: "student"
    });

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // update status
    student.status = status;
    await student.save();

    res.status(200).json({
      message: "Status updated successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating status", error: error.message });
  }
};