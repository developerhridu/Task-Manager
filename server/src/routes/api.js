const express = require('express');
const UsersController = require("../controllers/UsersController")
const AuthVerifyMiddleware = require('../middleware/AuthVerifyMiddleware')
const TasksController = require('../controllers/TasksController')

const router = express.Router();

router.post("/registration", UsersController.registration);
router.post("/login", UsersController.login);
router.post("/profileUpdate",AuthVerifyMiddleware,UsersController.profileUpdate);


router.post("/createTask",AuthVerifyMiddleware,TasksController.createTask);
router.get("/updateTaskStatus/:id/:status",AuthVerifyMiddleware,TasksController.updateTaskStatus);
router.get("/deleteTask/:id",AuthVerifyMiddleware,TasksController.deleteTask);

module.exports=router;