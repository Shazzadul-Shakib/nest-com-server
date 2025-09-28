export const jwtConfig = {
  accessTokenSecret: process.env.JWT_ACCESS_SECRET,
  accessTokenExpiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
  refreshTokenSecret: process.env.JWT_REFRESH_SECRET,
  refreshTokenExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
};
