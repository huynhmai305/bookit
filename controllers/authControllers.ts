import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from "../models/user";

// Register user => /api/auth/register
const registerUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const { name, email, password } = req.body;

    await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: "PUBLIC_ID",
        url: "URL",
      },
    });

    res.status(200).json({
      success: true,
      message: "Account registered successfully",
    });
  }
);

export { registerUser };
