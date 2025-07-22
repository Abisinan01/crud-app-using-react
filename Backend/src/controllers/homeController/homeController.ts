
import { Response, Request } from "express"
import User from "../../Model/UserSchema"

export const Home = async (req: any, res: Response) => {
    try {
        const userData = await User.aggregate([
            { $match: { _id: req.user.id } }, {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    profile: 1
                }
            }])
        res.status(200).json({ message: "Fetcing done", success: true, user: userData })
    } catch (error) {
        res.json({ message: "Data fetching failed", success: false })
        console.log(error)
    }
}
