import { NextFunction, Request, Response } from 'express';
import { Container, } from 'typedi';
import { IUser } from 'interfaces/users.interface';
import { AuthService } from './auth.service';
export class AuthController {
  public user = Container.get(AuthService);


  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.body;
      const { AccessToken, RefreshToken, user } = await this.user.login(userData);
      {/*
      res.cookie(
        "jwt",
      RefreshToken,
        {
          httpOnly: true,
          sameSite: true,
          maxAge: 24 * 60 * 60 * 1000,
        }
      )
      */}
      res.status(201).json({ data: { AccessToken, RefreshToken, user }, message: 'Logged In Successfully', });
    } catch (error) {
      next(error);
    }
  };

  public GetNewAccessToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.params;
      const AccessToken = await this.user.GetNewAccessToken(refreshToken);
      res.status(201).json({ data: { AccessToken }, message: 'created', });
    } catch (error) {
      next(error);
    }
  }

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.params;
      const Result = await this.user.logout(refreshToken);
      res.status(201).json({ data: { Result }, message: 'Logged out Successfully', });
    }
    catch (error) {
      next(error);
    }
  };

}
