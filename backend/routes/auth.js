import express from 'express';
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

// Register 
router.post('/register', async (req, res) => {
    try {
        const {name, email, password, role} = req.body;

        // check if user exits
        const existingUser = User.findOne( {email} );

        if(existingUser) {
            return res.status(400).json({'Message': 'Email already registered'});
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create new user
        const newUser = new User({name, email, password: hashedPassword, role});
        newUser.save();

        res.status(201).json({'message': 'User registered successfully'});

    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

// Login 
router.post('/login', async (req,res) => {
    try {
        const {email, password} = req.body;

        // find user
        const existingUser = await User.findOne({email});
        if(!existingUser) {
            return res.status(400).json({message: 'Invalid email'});
        }

        // compare password
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if(!isMatch) {
            return res.status(400).json({message: 'Incorrect password'});
        }

        // create jwt token
        const token = jwt.sign({id: existingUser._id, role: existingUser.role}, process.env.JWT_SECRET, {expiresIn: '1d'});
        res.json({token, user: {id: existingUser._id, name: existingUser.name, email: existingUser.email, role: existingUser.role} });

    } catch (error) {
        res.status(500).json({message: 'Server error'});
    }
});

export default router;