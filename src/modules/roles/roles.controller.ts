import { IRolesSchema } from "@/interfaces/userRoles.interface";
import { NextFunction, Request, Response } from "express";
import { Container } from "typedi";
import { RolesService } from "./roles.service";

export class RolesController {
  public roles = Container.get(RolesService);

  public addNewRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rolesData: IRolesSchema = req.body;
      const { createRolesData } = await this.roles.addNewRole(rolesData);
      res.status(201).json({ data: createRolesData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public deleteUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { _id } = req.params;

      const { createRolesData } = await this.roles.deleteUserRole(_id);
      res.status(201).json({ data: createRolesData, message: "created" });
    } catch (error) {
      next(error);
    }
  };

  public getUserRoles = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const findAllRolesData: IRolesSchema[] = await this.roles.getUserRoles();
      res.status(200).json({ data: findAllRolesData, message: "findAll" });
    } catch (error) {
      next(error);
    }
  };

  public updateUserRole = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const rolesData: IRolesSchema = req.body;
      const { createRolesData } = await this.roles.updateUserRole(rolesData);
      res.status(201).json({ data: createRolesData, message: "created" });
    } catch (error) {
      next(error);
    }
  };
}
