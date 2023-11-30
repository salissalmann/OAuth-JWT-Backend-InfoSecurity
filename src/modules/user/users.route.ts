import { Routes } from '@/interfaces/routes.interface';
import ValidateAccessToken from '@/middleware/jwt.validateaccess';
import { ValidationMiddleware } from '@/middleware/validation.middleware';
import { Router } from 'express';
import { UserController } from './users.controller';
import { CreateUserSchema } from './users.schema';



export class UserRoute implements Routes {
  public path = '/users';
  public router = Router();
  public user = new UserController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.user.getUsers);
    this.router.get(`${this.path}/:email`, this.user.findUserByEmail);
    this.router.post(`${this.path}/register`, this.user.createUser);
    this.router.post(`${this.path}/createAdminUser`, ValidateAccessToken, this.user.createAdminUser);
    this.router.post(`${this.path}/createNewUser`, ValidateAccessToken, this.user.createNewUser);

  }
}