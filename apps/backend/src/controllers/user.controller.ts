import { Response } from "express";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { RequestExpress } from "../utils/types.js";
import { User } from "./../models/user.model.js";

const cookiesOptions = {
  secure: true,
  maxAge: 24 * 60 * 60 * 1000, // For 1d
};

const generateAccessAndRefreshToken = async (userId: string) => {
  try {
    const user: any = await User.findById(userId);
    if (user) {
      const accessToken = user.generateAccessToken();
      const refreshToken = user.generateRefreshToken();
      user.refreshToken = refreshToken;
      await user.save({ validateBeforeSave: false });
      return { accessToken, refreshToken };
    } else {
      throw new ApiError(500, "Something went wrong");
    }
  } catch (error) {
    throw new ApiError(
      500,
      "something went wrong while creating access and refresh Token"
    );
  }
};

export const registerUser = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { password, fullName, email } = req.body;

    // Check for the All field are provided or not
    if ([password, fullName, email].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All field are required");
    }

    // Check if user Already Exist
    const userExist = await User.findOne({
      email: email,
    });

    if (userExist) {
      throw new ApiError(409, "Username or email already exist");
    }

    // Check for avatar path and upload it to cloudinary
    console.log("req", req);
    let avatar;
    if (req.file?.path) {
      const avatarLocalPath = req.file?.path;
      avatar = await uploadOnCloudinary(avatarLocalPath);
    }

    // Create user in DB
    const user = await User.create({
      fullName,
      email,
      avatar: avatar?.url || "",
      password,
    });

    // Get User detail from DB that we just created
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong while creating User");
    }

    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          { user: createdUser },
          "User registered Successfully"
        )
      );
  }
);
