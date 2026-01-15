import User from "../models/User.js"; 
import bcrypt from 'bcrypt';

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }
  
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();

        req.session.isLoggedIn = true;
        req.session.userId = newUser._id;

        req.session.save((err) => {
            if (err) return res.status(500).json({ message: "Session save failed" });
            return res.json({
                message: 'Account created successfully',
                user: {
                    _id: newUser._id,
                    name: newUser.name,
                    email: newUser.email
                }
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
    
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
    
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        req.session.isLoggedIn = true;
        req.session.userId = user._id; 

        req.session.save((err) => {
            if (err) return res.status(500).json({ message: "Session save failed" });
            return res.json({
                message: 'Login Successfully',
                user: {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
            });
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};

export const logoutUser = async (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.log(error);
            return res.status(500).json({ message: error.message });
        }

        res.clearCookie('connect.sid'); 
        return res.json({ message: 'Logout successful' });
    });
};

export const verifyUser = async (req, res) => {
    try {
        const { userId } = req.session; 
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return res.status(400).json({ message: 'Invalid user' });
        }

        return res.json({ user });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};