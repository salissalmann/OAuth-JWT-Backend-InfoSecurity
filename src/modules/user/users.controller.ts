import { NextFunction, Request, Response } from 'express';
import { Container, } from 'typedi';
import { IUser } from 'interfaces/users.interface';
import { UserService } from './users.service';
import { Types } from "mongoose";


export class UserController {
  public user = Container.get(UserService);

  public getUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {

      const findAllUsersData: IUser[] = await this.user.findAllUser();
      res.status(200).json({ data: findAllUsersData, message: 'findAll' });

    } catch (error) {
      next(error);
    }
  };

  public findUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userDatabyID: IUser = await this.user.findUserByEmail(req.params.email);

      res.status(201).json({ data: userDatabyID, message: 'found' });
    } catch (error) {
      next(error);
    }
  };

  public createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.body;
      const { AccessToken, RefreshToken, createUserData } = await this.user.createUser(userData);
      res.status(201).json({ data: { AccessToken, RefreshToken, createUserData }, message: 'Account Created Successfully', });
    } catch (error) {
      next(error);
    }
  }

  public createAdminUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.body;
      //Check if user has admin role
      const RequestingUser = req.user
      const UserRoleIds = RequestingUser && RequestingUser.roles ? RequestingUser.roles : [];
      const IsAdmin = UserRoleIds.includes(new Types.ObjectId('65657a26d98f30e87305aa39'))
      if (!IsAdmin) {
        throw new Error('Unauthorized Access')
      }
      userData.addedBy = RequestingUser.email
      const createUserData = await this.user.createAdminUser(userData)
      res.status(201).json({ data: createUserData, message: 'Admin Account Created Successfully', });
    } catch (error) {
      next(error);
    }
  };

  public createNewUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userData: IUser = req.body;
      //Check if user has admin role
      const RequestingUser = req.user
      const UserRoleIds = RequestingUser && RequestingUser.roles ? RequestingUser.roles : [];
      const IsAdmin = UserRoleIds.includes(new Types.ObjectId('65657a26d98f30e87305aa39'))
      if (!IsAdmin) {
        throw new Error('Unauthorized Access')
      }
      userData.addedBy = RequestingUser.email

      const createUserData = await this.user.createNewUser(userData);
      
      res.status(201).json({ data: createUserData, message: 'Account Created Successfully', });
    } catch (error) {
      next(error);
    }
  }


}
