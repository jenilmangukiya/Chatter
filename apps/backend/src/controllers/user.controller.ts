import { Response } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  removeFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { RequestExpress } from "../utils/types.js";
import { User } from "./../models/user.model.js";
import { QueryParams } from "./types.js";

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
    console.log("error", error);
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
      throw new ApiError(409, "This email address already exist.");
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

export const loginUser = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { email, password } = req.body;

    if (!email) {
      throw new ApiError(400, "email is required!");
    }

    const user: any = await User.findOne({ email });
    if (!user) {
      throw new ApiError(404, "This email address does not exist.");
    }

    const isUserValid = await user.isPasswordCorrect(password);

    if (!isUserValid) {
      throw new ApiError(401, "Please enter valid password");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
      user._id
    );

    const validateUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    return res
      .status(200)
      .cookie("accessToken", accessToken, cookiesOptions)
      .cookie("refreshToken", refreshToken, {
        ...cookiesOptions,
        maxAge: 10 * 24 * 60 * 60 * 1000, // For 10d
      })
      .json(
        new ApiResponse(
          200,
          { user: validateUser, accessToken, refreshToken },
          "User login successful"
        )
      );
  }
);

export const refreshAccessToken = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const incomingRefreshToken =
      req.cookies?.refreshToken || req.body?.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized Request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET as jwt.Secret
    );

    const currentTimeInSeconds = Math.floor(Date.now() / 1000); // Convert to seconds

    if (
      typeof decodedToken !== "string" &&
      decodedToken?.exp &&
      decodedToken?.exp < currentTimeInSeconds
    ) {
      throw new ApiError(401, "Refresh Token is expired");
    }

    try {
      let user = null;
      if (
        typeof decodedToken !== "string" &&
        "_id" in decodedToken &&
        decodedToken?._id
      ) {
        user = await User.findById(decodedToken?._id.toString());
      }

      if (!user) {
        throw new ApiError(401, "Invalid refresh token");
      }

      if (user.refreshToken !== incomingRefreshToken) {
        throw new ApiError(401, "Refresh token is expired or used");
      }

      const { refreshToken, accessToken } = await generateAccessAndRefreshToken(
        user._id.toString()
      );

      res
        .status(200)
        .cookie("accessToken", accessToken, cookiesOptions)
        .cookie("refreshToken", refreshToken, {
          ...cookiesOptions,
          maxAge: 10 * 24 * 60 * 60 * 1000, // For 10d
        })
        .json(
          new ApiResponse(
            200,
            { refreshToken, accessToken },
            "Access token refreshed"
          )
        );
    } catch (error) {
      throw new ApiError(401, "Invalid refresh Token");
    }
  }
);

export const changeCurrentPassword = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { currentPassword, newPassword } = req.body;

    const user: any = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(currentPassword);

    if (!isPasswordCorrect) {
      throw new ApiError(400, "Invalid Old Password");
    }

    user.password = newPassword;

    await user.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, {}, "Password change successfully"));
  }
);

export const getCurrentUser = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const user = await User.findById(req.user?._id).select(
      "-password -refreshToken"
    );
    res.status(200).json(new ApiResponse(200, user, "success"));
  }
);

export const updateAccountInfo = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const { email, fullName } = req.body;

    if (!email || !fullName) {
      throw new ApiError(400, "email and fullName is required");
    }

    const user = User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          email,
          fullName,
        },
      },
      {
        new: true,
      }
    ).select("-password");

    if (!user) {
      throw new ApiError(500, "Internal server error");
    }

    res
      .status(200)
      .json(new ApiResponse(200, user, "User updated Successfully"));
  }
);

export const updateUserAvatar = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const avatarFile = req.file?.path;
    if (!avatarFile) {
      throw new ApiError(400, "Avatar is required");
    }

    const uploadedAvatar = await uploadOnCloudinary(avatarFile);
    if (!uploadedAvatar?.url) {
      throw new ApiError(500, "something went wrong");
    }

    const user = await User.findByIdAndUpdate(
      req.user?._id,
      {
        $set: {
          avatar: uploadedAvatar.url,
        },
      },
      { new: true }
    ).select("-password -refreshToken");

    await removeFromCloudinary(req.user?.avatar);

    return res.status(200).json(new ApiResponse(200, user, "Avatar updated"));
  }
);

export const logoutUser = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: { refreshToken: 1 },
      },
      { new: true }
    );

    return res
      .status(200)
      .clearCookie("accessToken", cookiesOptions)
      .clearCookie("refreshToken", cookiesOptions)
      .json(new ApiResponse(200, {}, "User logged out successfully"));
  }
);

export const getUsers = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const {
      page = 1,
      limit = 10,
      query,
      sortBy,
      sortType,
    } = req.query as QueryParams;
    const includeCurrentUser = req.query?.includeCurrentUser;

    const aggregation: any = [];

    if (!includeCurrentUser) {
      aggregation.push({
        $match: {
          email: {
            $ne: req.user.email,
          },
        },
      });
    }

    if (query) {
      aggregation.push({
        $match: {
          $or: [
            { email: { $regex: new RegExp(query, "i") } },
            { fullName: { $regex: new RegExp(query, "i") } },
          ],
        },
      });
    }

    if (
      sortBy &&
      ["email", "fullName", "views", "createdAt"].includes(sortBy)
    ) {
      const sortOrder = sortType?.toLowerCase() === "desc" ? -1 : 1;
      aggregation.push({
        $sort: {
          [sortBy]: sortOrder,
        },
      });
    }

    const options = {
      page: +page,
      limit: +limit,
    };

    const pipeline = User.aggregate(aggregation);

    const userPaginated = await User.aggregatePaginate(pipeline, options);

    res.status(200).json(new ApiResponse(200, userPaginated));
  }
);

export const getExploreUsers = asyncHandler(
  async (req: RequestExpress, res: Response) => {
    const {
      page = 1,
      limit = 10,
      query,
      sortBy,
      sortType,
    } = req.query as QueryParams;
    const includeCurrentUser = req.query?.includeCurrentUser;

    const aggregation: any = [];

    if (!includeCurrentUser) {
      aggregation.push({
        $match: {
          email: {
            $ne: req.user.email,
          },
        },
      });
    }

    if (query) {
      aggregation.push({
        $match: {
          $or: [
            { email: { $regex: new RegExp(query, "i") } },
            { fullName: { $regex: new RegExp(query, "i") } },
          ],
        },
      });
    }

    aggregation.push(
      {
        $lookup: {
          from: "requests",
          let: {
            userId: "$_id",
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $or: [
                    { $eq: ["$sender", "$$userId"] },

                    { $eq: ["$receiver", "$$userId"] },
                  ],
                },
              },
            },
          ],
          as: "result",
        },
      },
      {
        $match: {
          result: { $eq: [] }, // Filter users who have no requests
        },
      }
    );

    if (
      sortBy &&
      ["email", "fullName", "views", "createdAt"].includes(sortBy)
    ) {
      const sortOrder = sortType?.toLowerCase() === "desc" ? -1 : 1;
      aggregation.push({
        $sort: {
          [sortBy]: sortOrder,
        },
      });
    }

    const options = {
      page: +page,
      limit: +limit,
    };

    const pipeline = User.aggregate(aggregation);

    const userPaginated = await User.aggregatePaginate(pipeline, options);

    res.status(200).json(new ApiResponse(200, userPaginated));
  }
);
