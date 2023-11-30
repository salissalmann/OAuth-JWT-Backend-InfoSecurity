import * as bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { IUser } from '@interfaces/users.interface';
import { HttpException } from '@/http/HttpExceptions';
import { UserModel } from '@/db/models/users.model';
import { UserTokensModel } from '@/db/models/tokens.model';
import JWTService from "@/helpers/jwt.helper";


@Service()
export class AuthService {



  public async login(userData: IUser): Promise<{ AccessToken: string, RefreshToken: string, user: IUser }> {
    const FindUser: IUser = await UserModel.findOne({ email: userData.email }).select("+password")


    if (!FindUser) 
    {
      throw new HttpException(401, "Invalid Credentials");      
    }    
    const isPasswordValid = await bcrypt.compare(userData.password, FindUser.password);
    if (!isPasswordValid) 
    {
      throw new HttpException(401, "Invalid Credentials");      
    }
    FindUser.password = undefined;
    const { AccessToken, RefreshToken } = await JWTService.GenerateToken(FindUser);
    return { AccessToken, RefreshToken, user: FindUser };

  }


  public async GetNewAccessToken(data: string): Promise<string> {
    try {
      const Response = await JWTService.VerifyRefreshToken(data)
      const Payload = { _id: Response._id }
      const AccessToken = JWTService.GenerateAccessToken(Payload);
      return AccessToken;
    } catch (err) {
      throw err;
    }
  };

  public async logout(data: string): Promise<boolean> {
    try {
      
      const UserToken = await UserTokensModel.findOne({ refreshToken: data });
      if (!UserToken) throw new Error("Invalid Refresh Token");

      await UserTokensModel.deleteOne({ refreshToken: data });
      return true;
    }
    catch (error) {
      throw error;
    }
  };
};

