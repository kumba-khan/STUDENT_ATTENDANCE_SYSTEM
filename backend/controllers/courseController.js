import Course from '../models/Course.js';
import Student from '../models/Student.js';

// Get all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().lean().sort({ createdAt: -1 });
        res.status(200).json(courses);
    }
    catch (error) {
        res.status(500).json({message: "error getting courses", error: error.message})
    }
};

// Create a new course
export const createCourse = async (req, res) => {
    try {
        const { name, description, startDate, endDate, schedule } = req.body;
        const existingCourse = await Course.findOne({ name });
        if (existingCourse) {
            return res.status(400).json({message: "Course already exists"})
        }
        const course = await Course.create({ name, description, schedule, startDate: new Date(startDate), endDate: new Date(endDate) });
        res.status(201).json({message: "course created successfully", course});
    } catch (error) {
        res.status(500).json({message: "error creating course", error: error.message});
    }
};


// Get course by ID
export const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('students').lean();
        if (!course) {
            return res.status(404).json({message: "course not found"})
        }
        res.status(200).json(course);
    }catch (error) {
        res.status(500).json({message: "error fetching course", error: error.message});
    }
};


// Update a course
export const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({message: "course not found"})
        }

        const courseData = req.body;
        const updatedCourse = await Course.findByIdAndUpdate(req.params.id, courseData, { new: true });
        res.status(200).json({message: "course updated successfully", updatedCourse});
    }

    catch (error) {
        res.status(500).json({message: "error updating course", error: error.message});
    }
};

// Delete a course
export const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) {
            return res.status(404).json({message: "course not found"})
        }

        await Course.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "course deleted successfully"});
    }
    catch (error) {
        res.status(500).json({message: "error deleting course", error: error.message});
    }
};

// Enroll a student in a course
export const enrollStudent = async (req, res) => {
    try {
        const { student } = req.body;

        if(!student){
            return res.status(400).json({message: "Please select a student to enroll"});
        }

        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({message: "course not found"});
        }

        const existingStudent = await Student.findById(student);

        if (!existingStudent) {
            return res.status(404).json({message: "Student not found"});
        }

        // 🔥 FIX: proper duplicate check
        const alreadyEnrolled = course.students
            .map(s => s.toString())
            .includes(student);

        if (alreadyEnrolled) {
            return res.status(400).json({message: "Student already enrolled"});
        }

        // 🔥 safer update
        course.students.push(student);
        const updatedCourse = await course.save();

        return res.status(200).json({message: "Student enrolled successfully", updatedCourse});

    } catch (error) {
        res.status(500).json({message: "Error enrolling student", error: error.message});
    }
};

// Remove a student from a course
export const removeStudent = async (req, res) => {
    try {
        const { id, studentId } = req.params;

        const course = await Course.findById(id);

        if (!course) {
            return res.status(404).json({message: "course not found"});
        }

        //check whether student is enrolled
        const isEnrolled = course.students
            .map(s => s.toString())
            .includes(studentId);

        if (!isEnrolled) {
            return res.status(400).json({message: "Student not enrolled in this course"});
        }

        // remove student
        course.students = course.students.filter(
            (s) => s.toString() !== studentId
        );

        const updatedCourse = await course.save();

        return res.status(200).json({message: "Student removed successfully", updatedCourse});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Error removing student", error: error.message});
    }
};

export const getCourseStats = async (req, res) => {
    try {
        const courses = await Course.find();
        const total = courses.length;

        res.status(200).json({total});
    }
    catch (error) {
        res.status(500).json({message: "error getting courses", error: error.message})
    }
};