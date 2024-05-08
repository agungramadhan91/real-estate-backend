import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
	const { username, email, password } = req.body;
   
   //HASH THE PASSWORD
   const hashedPassword = await bcrypt.hash(password, 10);
   console.log(hashedPassword);
	
};

export const login = (req, res) => {
	//db operations
};

export const logout = (req, res) => {
	//db operations
};
