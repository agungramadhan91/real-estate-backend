import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	const { username, email, password } = req.body;

	try {
		//HASH THE PASSWORD
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log(hashedPassword);

		// CREATE A NEW USER AND SAVE TO DB
		const newUser = await prisma.user.create({
			data: {
				username,
				email,
				password: hashedPassword,
			},
		});

		console.log(newUser);

		res.status(201).json({ message: "User created successfully" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to create user" });
	}
};

export const login = async (req, res) => {
	const { username, password } = req.body;

	try {
		// CHECK IF THE USER EXIST
		const user = await prisma.user.findUnique({
			where: { username },
		});

		if (!user)
			return res.status(401).json({ message: "Invalid credentials!" });

		// CHECK IF THE PASSWORD IS CORRECT
		const isValidPassword = await bcrypt.compare(password, user.password);

		if (!isValidPassword)
			return res.status(401).json({ message: "Invalid credentials!" });

		// GENERATE COOKIE TOKEN AND SEND TO THE USER
		const cookieAge = 1000 * 60 * 60 * 24 * 7;

		const token = jwt.sign(
			{
				// pass user information, you can sent anything you want
				id: user.id,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: cookieAge,
			}
		);

		const {password: hashedPassword, ...userInfo} = user;

		res.cookie("token", token, {
			httpOnly: true,
			maxAge: cookieAge,
			// secure: true
		})
			.status(200)
			.json(userInfo);
	} catch (error) {
		console.log(error);
		res.status(500).json({ message: "Failed to login" });
	}
};

export const logout = (req, res) => {
	res.clearCookie("token").status(200).json({message: "Logout successful"});
};
