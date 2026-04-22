const bcrypt = require("bcryptjs");
const userModel = require("../models/user");

const createAdmin = async () => {
    try {
        const email = "admin123@gmail.com";
        const password = "admin@123";

        const [row] = await userModel.getUserByEmail(email);

        if (row.length > 0) {
            console.log("Admin already exists");
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const data = {
            name: "Admin",
            email: email,
            password: hashedPassword,
            role: "admin",
            is_verified: true
        };

        await userModel.create(data);

        console.log("Admin user created successfully");
    } catch (error) {
        console.error(error.message);
    }
};

module.exports = { createAdmin };