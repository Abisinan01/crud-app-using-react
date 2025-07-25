import express from "express"
import { Delete, FetchUserData } from "../controllers/adminControllers/dashboardController"
import { Logout } from "../controllers/authController/logout"
import { CreateUser } from "../controllers/adminControllers/createUser"
import { EditUser } from "../controllers/adminControllers/editUser"
const router = express.Router()

router.get('/fetch-data', FetchUserData)
router.post('/logout', Logout)
router.delete('/delete/:id', Delete)
router.post('/create-user', CreateUser)
router.post("/edit-user", EditUser)
export default router