import { ApiError } from "../utils/ApiError.js";
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
