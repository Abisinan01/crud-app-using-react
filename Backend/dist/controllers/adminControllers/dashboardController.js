import User from "../../Model/UserSchema";
export const FetchUserData = async (req, res) => {
    try {
        console.log("Req fetchuser", req.query);
        const limit = Number(req.query.limit) || 4;
        const page = Number(req.query.page) || 1;
        // const search = String(req.query.search || "");
        const allUsers = await User.aggregate([
            { $match: { role: "user", isRemoved: false } }, {
                $project: {
                    _id: 1,
                    username: 1,
                    email: 1,
                    profile: 1
                }
            },
            { $skip: (page - 1) * limit },
            { $limit: limit },
            { $sort: { username: 1 } }
        ]);
        const totalUsers = await User.find({ role: "user" }).countDocuments();
        const totalPages = Math.ceil((totalUsers / limit));
        if (!allUsers.length) {
            res.json({ users: allUsers, success: false, message: "Not found users" });
            return;
        }
        console.log("All Users ", allUsers);
        res.json({
            users: allUsers,
            success: true,
            totalPages,
            totalUsers,
            message: "Users fetching done"
        });
    }
    catch (error) {
        console.log("User data fetching failed admin : ", error);
        res.json({ message: "Data fetching failed ", success: false });
    }
};
export const Delete = async (req, res) => {
    try {
        console.log("id ", req.params.id);
        const id = req.params.id;
        await User.findByIdAndUpdate(id, { $set: { isRemoved: true } });
        res.status(200).json({ message: "User deleted", success: true });
    }
    catch (error) {
        console.log("Deletion failed: ", error);
        res.json({ message: "User deletion failed", success: false });
    }
};
