import { Router } from 'express';
import { Routes } from '@/interfaces/routes.interface';
import { RolesController } from './roles.controller';
import { ValidationMiddleware } from '@/middleware/validation.middleware';
import { AddRoleSchema, UpdateRoleSchema } from './roles.schema';
import ValidateAccessToken from '@/middleware/jwt.validateaccess';

export class RoleRoute implements Routes {
  public path = '/api/roles';
  public router = Router();
  public roles = new RolesController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/addrole`, ValidationMiddleware(AddRoleSchema), this.roles.addNewRole);
    this.router.delete(`${this.path}/deleterole/:_id`, ValidateAccessToken, this.roles.deleteUserRole);
    this.router.get(`${this.path}/getroles`, this.roles.getUserRoles);
    this.router.patch(`${this.path}/updaterole`, ValidateAccessToken, ValidationMiddleware(UpdateRoleSchema), this.roles.updateUserRole)
  }
}