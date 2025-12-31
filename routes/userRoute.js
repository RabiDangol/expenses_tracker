
import express from 'express'
import { loginController, registerController } from '../controllers/userController.js'

//router object
const router = express.Router()

//routers 
//post || login user
router.post('/login', loginController)

//Post|| register user
router.post('/register', registerController)
export default router;
