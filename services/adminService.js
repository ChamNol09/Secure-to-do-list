const userModel = require('../models/user');
const taskModel = require('../models/task');

const getAllUsers = async () => {
    let rows = await userModel.getAllUsers();
    return rows;
}

const deleteUser = async (id) => {
    await userModel.deleteUser(id);
}

const getAllTasks = async () => {
    let rows = await taskModel.getAllTasks();
    return rows;
}

const deleteTask = async (id ) => {
    if (!id) {
        throw new Error("Task id is required");
    }   
    await taskModel.deleteTask(id);
}


module.exports = {
    getAllUsers,
    deleteUser,
    getAllTasks,
    deleteTask
}
