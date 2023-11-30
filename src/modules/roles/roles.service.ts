import { Service } from "typedi";
import { HttpException } from "@/http/HttpExceptions";
import { IRolesSchema } from "@interfaces/userRoles.interface";

import { convertToObjectId } from "@/utils/objectId.convertor";
import { RolesModel } from "@/db/models/roleModel.model";

@Service()
export class RolesService {
  public async addNewRole(
    rolesData: IRolesSchema
  ): Promise<{ createRolesData: IRolesSchema }> {
    const findRole: IRolesSchema = await RolesModel.findOne({
      roleName: rolesData.roleName,
    });
    if (findRole)
      throw new HttpException(
        409,
        `Role with name ${rolesData.roleName} already exists`
      );

    const createRolesData: IRolesSchema = await RolesModel.create({
      ...rolesData,
    });
    return { createRolesData };
  }

  public async deleteUserRole(roleid: string): Promise<any> {
    const id = convertToObjectId(roleid);
    const findRole: IRolesSchema = await RolesModel.findByIdAndDelete({
      _id: id,
    });

    return { findRole };
  }

  public async getUserRoles(): Promise<IRolesSchema[]> {
    const findAllRolesData: IRolesSchema[] = await RolesModel.find();
    return findAllRolesData;
  }

  public async updateUserRole(rolesData: IRolesSchema): Promise<any> {
    const findRole: IRolesSchema = await RolesModel.findById(rolesData._id);
    if (!findRole) throw new HttpException(409, "Role doesn't exist");

    if (rolesData.roleName === findRole.roleName) {
      throw new HttpException(406, `You cannot change the Role Name!`);
    }

    const UpdatedData = await RolesModel.updateOne(
      { _id: rolesData._id },
      { $set: rolesData }
    );
    return UpdatedData;
  }
}
