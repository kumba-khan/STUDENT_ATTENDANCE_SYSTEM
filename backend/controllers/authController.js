import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

//Handle login form submission
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email' });
    }
    //check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    // Set user session
    const accessToken = jwt.sign({
      userId: user._id,
      username: user.name,
      email: user.email,
      role: user.role,
      status: user?.status
    },
      process.env.JWT_SECRET,
      { expiresIn: '3h' }
    )

    res.status(200).json({ accessToken })
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).json({
      message: "Logged out successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Logout failed",
      error: error.message
    });
  }
};

//updatePassword
export const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    if (!currentPassword || !newPassword) {
      return res.status(400).json({message: "Current password and new password are required"});
    }

    if (newPassword.length < 6) {
      return res.status(400).json({message: "Password must be at least 6 characters"});
    }

    // Check current password
    const isMatch = await bcrypt.compare(currentPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      message: "Password updated successfully"
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating password", error: error.message });
  }
};