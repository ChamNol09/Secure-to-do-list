const bcrypt = require("bcryptjs");
const pool = require("../configs/db");
const userModel = require("../models/user");

const createAdmin = async () => {
  try {
    const email = "admin123@gmail.com";
    const password = "admin@123";
    const rows = await userModel.getUserByEmail(email);

    if (rows && rows.length > 0) {
      console.log("Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = {
      name: "Admin",
      email: email,
      password: hashedPassword,
      role_id: 1,
      is_verified: true
    };
    await pool.query(
        "Insert into users (name, email, password, role_id, is_verified) values (?, ?, ?, ?, ?)",
        [data.name, data.email, data.password, data.role_id, data.is_verified]
        );
    console.log("Admin user created successfully");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = { createAdmin };
