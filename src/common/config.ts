export const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET,
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
};

export const cloudinaryConfig = {
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_API_KEY,
  apiSecret: process.env.CLOUDINARY_API_SECRET,
};
