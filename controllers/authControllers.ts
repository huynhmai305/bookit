import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from "../models/user";
import cloudinary from "cloudinary";

// setting up cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

// Register user => /api/auth/register
const registerUser = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse) => {
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "bookit/avatars",
      width: "150",
      crop: "scale",
    });

    const { name, email, password } = req.body;

    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
    });

    res.status(200).json({
      success: true,
      message: "Account registered successfully",
      user,
    });
  }
);

export { registerUser };
