import User from "../Model/UserSchema";
export const isAlreadyExists = async ({ username, email, role }) => {
    console.log("Checking for:", { username, email });
    const isExists = await User.findOne({
        $and: [{ isRemoved: false }, {
                $or: [
                    { role, username: { $regex: `^${username}$`, $options: 'i' } },
                    { email }
                ]
            }]
    });
    console.log("Debug isExists", isExists);
    if (!isExists) {
        return { message: "User not found", status: false, user: null };
    }
    return { message: "Done", status: true, user: isExists };
};
