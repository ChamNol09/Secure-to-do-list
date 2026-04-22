const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const { isLogin } = require('../middlewares/auth');
const { authoriz } = require('../middlewares/role');

router.post('/create', isLogin, authoriz("user"), taskController.createTask);
router.get('/own-tasks', isLogin, authoriz("user"), taskController.getOwnTasks);
router.put('/update/:id', isLogin, authoriz("user"), taskController.updateTask);
router.delete('/delete/:id', isLogin, authoriz("user"), taskController.deleteTask);

module.exports = router;