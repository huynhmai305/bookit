import { NextApiRequest, NextApiResponse } from "next";
import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import User from "../models/user";
import cloudinary from "cloudinary";
import ErrorHandler from "../utils/errorHandler";
import absoluteUrl from "next-absolute-url";
import sendEmail from "../utils/sendEmail";
import crypto from "crypto";
import { AnyAction } from "redux";

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

// Current user profile => /api/me
const currentUserProfile = catchAsyncErrors(
  async (req: any, res: NextApiResponse) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  }
);

// Update user profile => /api/me/update
const updateUserProfile = catchAsyncErrors(
  async (req: any, res: NextApiResponse) => {
    const user = await User.findById(req.user._id);

    const { name, email, password, avatar } = req.body;

    if (user) {
      user.name = name;
      user.email = email;

      if (password) user.password = password;
    }

    // update avatar
    if (avatar) {
      const image_id = user.avatar.public_id;

      // delete user previous image/avatar
      await cloudinary.v2.uploader.destroy(image_id);

      const result = await cloudinary.v2.uploader.upload(avatar, {
        folder: "bookit/avatars",
        width: "150",
        crop: "scale",
      });

      user.avatar = {
        public_id: result.public_id,
        url: result.secure_url,
      };
    }

    await user.save();

    res.status(200).json({
      success: true,
    });
  }
);

// Forgot password => /api/password/forgot
const forgotPassword = catchAsyncErrors(
  async (req: NextApiRequest, res: NextApiResponse, next: any) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(new ErrorHandler("User not found with this email", 404));
    }

    // get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // get origin
    const { origin } = absoluteUrl(req);

    // create reset password url
    const resetUrl = `${origin}/password/reset/${resetToken}`;
    const message = `Your password reset url is as follow: \n\n ${resetUrl} \n\n If you have not requested this email, then ignore it.`;

    try {
      await sendEmail({
        email: user.email,
        subject: "BookIT Password Recovery",
        message,
      });

      res.status(200).json({
        success: true,
        message: `Email sent to: ${user.email}`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new ErrorHandler(error.message, 500));
    }
  }
);

// Reset password => /api/password/reset/:token
const resetPassword = catchAsyncErrors(
  async (req: any, res: NextApiResponse, next: any) => {
    // hash URL token
    const resetPasswordToken = crypto
      .createHash("sha256")
      .update(req.query.token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(
        new ErrorHandler(
          "Password reset token is invalid or has been expired",
          400
        )
      );
    }

    if (req.body.password !== req.body.confirmPassword) {
      return next(new ErrorHandler("Password is not match", 400));
    }

    // setup new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  }
);

// Get all users => /api/admin/users
const allAdminUsers = catchAsyncErrors(
  async (req: any, res: NextApiResponse) => {
    const users = await User.find();

    res.status(200).json({
      success: true,
      users,
    });
  }
);

// Get user details => /api/admin/users/:id
const getUserDetails = catchAsyncErrors(
  async (req: any, res: NextApiResponse, next: any) => {
    const user = await User.findById(req.query.id);

    if (!user) {
      return next(new ErrorHandler("User not found with this ID", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);

// Update user details => /api/admin/users/:id
const updateUser = catchAsyncErrors(
  async (req: any, res: NextApiResponse, next: any) => {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };

    const user = await User.findByIdAndUpdate(req.query.id, newUserData, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
    });
  }
);

// Delete user - admin => /api/admin/users/:id
const deleteUser = catchAsyncErrors(
  async (req: any, res: NextApiResponse, next: any) => {
    const user = await User.findById(req.query.id);

    if (!user) {
      return next(new ErrorHandler("User not found with this ID", 400));
    }

    // remove avatar
    const image_id = user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(image_id);

    await user.remove();

    res.status(200).json({
      success: true,
    });
  }
);

export {
  registerUser,
  currentUserProfile,
  updateUserProfile,
  forgotPassword,
  resetPassword,
  allAdminUsers,
  getUserDetails,
  updateUser,
  deleteUser,
};
