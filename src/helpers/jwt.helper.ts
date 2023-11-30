import { UserTokensModel } from "@/db/models/tokens.model";
import * as jwt from "jsonwebtoken";
import { JWT } from "@config/index";

class JWTService {
  constructor() { }

  GenerateAccessToken = (payload: any): string => {
    const AccessToken = jwt.sign(payload, JWT.ACCESS_SECRET, {
      expiresIn: JWT.ACCESS_EXPIRY,
    });
    return AccessToken;
  };

  GenerateRefreshToken = (payload: any): string => {
    const RefreshToken = jwt.sign(payload, JWT.REFRESH_SECRET, {
      expiresIn: JWT.REFRESH_EXPIRY,
    });
    return RefreshToken;
  };

  GenerateToken = async (
    user: any
  ): Promise<{ AccessToken: string; RefreshToken: string }> => {
    try {
      const Payload = { _id: user._id };

      const AccessToken = this.GenerateAccessToken(Payload);
      const RefreshToken = this.GenerateRefreshToken(Payload);

      const UserToken = await UserTokensModel.findOne({ userid: user._id });

      if (!UserToken) {
        await UserTokensModel.create({
          userid: user._id,
          refreshToken: RefreshToken,
          accessToken: AccessToken,
        });
      } else {
        await UserTokensModel.updateOne(
          { userid: user._id },
          {
            refreshToken: RefreshToken,
            accessToken: AccessToken,
          }
        );
      }

      return { AccessToken, RefreshToken };
    } catch (error) {
      throw error;
    }
  };

  VerifyRefreshToken = async (RefreshToken: string) => {
    try {
      const UserToken = await UserTokensModel.findOne({
        refreshToken: RefreshToken,
      });
      if (!UserToken) throw new Error("Invalid Refresh Token");

      const Payload = jwt.verify(
        RefreshToken,
        JWT.REFRESH_SECRET,
        (error: any, decoded: any) => {
          if (error) throw new Error("Invalid Refresh Token");
          return decoded;
        }
      );
      return Payload;
    } catch (error) {
      throw error;
    }
  };
}

export default new JWTService();
