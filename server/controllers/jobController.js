import expressAsyncHandler from "express-async-handler";
import User from "../models/UserModel";

export const createJob = asyncHandler(async(req,res) => {
    try {
        const user = await User.findOne({ auth0Id: req.oidc.user.sub });

        console.log("User: ", user);
    } catch (error) {
        console.log("Error in createJob: ", error);
        return res.status(500).json({
            message: "Server Error",
        })
    }
})