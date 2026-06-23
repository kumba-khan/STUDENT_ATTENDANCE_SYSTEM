import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken"

//Handle login form submission
export const login = async (req, res) => {
  try{
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({message:'Invalid email'});
    }
    //check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({message:'Invalid password'});
    }

    // Set user session
    const accessToken = jwt.sign({
      userId:user._id,
      username: user.username,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET,
    {expiresIn: '1h'}
    )

    res.status(200).json({accessToken})
  }catch(error){
    res.status(500).json({message: 'Login failed', error: error.message});
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