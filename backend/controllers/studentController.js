import Student from "../models/Student.js";

// Get all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find().lean().sort({ createdAt: -1 });
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message })
  }
};

// Create a new student
export const createStudent = async (req, res) => {
  try {
    const { name, email, phone, status } = req.body;
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: 'A student with this email already exists' });
    }
    const newStudent = await Student.create({ name, email, phone, status, enrolledDate: new Date() });
    res.status(201).json({ message: 'student created successfully', student: newStudent });
  } catch (error) {
    res.status(500).json({ message: 'student not created', error: error.message });
  }
};

// Get student by ID
export const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate().lean();
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
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }

    await Student.findByIdAndUpdate(req.params.id, userData);
    res.status(200).json({ message: "Student updated successfully", student });

  } catch (error) {
    res.status(500).json({ message: "Error updating student", error: error.message });
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "student not found" });
    }

    await Student.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Student deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error: error.message })
  }
};

export const studentStatistic = async (req, res) => {
  try {
    const students = await Student.find();
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