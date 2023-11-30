import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import { AuthController } from './auth.controller';
import ValidateAccessToken from '@/middleware/jwt.validateaccess';
import { ValidationMiddleware } from '@/middleware/validation.middleware';
import { LoginSchema } from './auth.schema';

export class AuthRoute implements Routes {
  public path = '/api/auth';
  public router = Router();
  public auth = new AuthController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/login`, ValidationMiddleware(LoginSchema), this.auth.login);
    this.router.get(`${this.path}/generateAccessToken/:refreshToken`, this.auth.GetNewAccessToken);
    this.router.get(`${this.path}/logout/:refreshToken`, this.auth.logout);
  }
}