import { RolesModel } from "@/db/models/roleModel.model";
import { UserModel } from "@/db/models/users.model";
import JWTService from "@/helpers/jwt.helper";
import { HttpException } from "@/http/HttpExceptions";
import { IRolesSchema } from "@/interfaces/userRoles.interface";
import { IUser } from "@interfaces/users.interface";
import * as bcrypt from "bcrypt";
import { Service } from "typedi";

@Service()
export class UserService {
  public async findAllUser(): Promise<IUser[]> {
    const users: IUser[] = await UserModel.find();
    return users;
  }

  public async findUserByEmail(email: string): Promise<IUser> {
    const findUser: IUser = await UserModel.findOne({ email: email });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    return findUser;
  }

  public async createUser(userData: IUser): Promise<{
    AccessToken: string;
    RefreshToken: string;
    createUserData: IUser;
  }> {
    const findUser: IUser = await UserModel.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `User with email ${userData.email} already exists`
      );

    const Salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, Salt);

    const StudentRoleId: IRolesSchema = await RolesModel.findOne({
      roleName: "ADMIN",
    });
    const Roles = [StudentRoleId._id];

    const Data = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      phoneNumber: userData.phoneNumber,
      roles: Roles,
    };

    const createUserData: IUser = await UserModel.create({
      ...Data,
      password: hashedPassword,
    });
    const { AccessToken, RefreshToken } = await JWTService.GenerateToken(
      createUserData
    );
    return { AccessToken, RefreshToken, createUserData };
  }


  public ResetPassword = async (
    email: string,
    password: string,
    new_password: string
  ): Promise<IUser> => {
    try {
      const findUser: IUser = await UserModel.findOne({ email }).select(
        "+password"
      );
      if (!findUser)
        throw new HttpException(409, `User with email ${email} does not exist`);

      const OldPassword = findUser.password;

      const CheckPassword = await bcrypt.compare(password, findUser.password);
      if (!CheckPassword)
        throw new HttpException(409, `Old Password is incorrect`);

      const Salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(new_password, Salt);

      const newpassword_change_info = {
        old_password: OldPassword,
        new_password: hashedPassword,
        updated_at: new Date().toISOString(),
      };

      await UserModel.findOneAndUpdate(
        { email },
        {
          $set: {
            password: hashedPassword,
            updatedAt: new Date().toISOString(),
          },
          $push: { passwordChangeInfo: newpassword_change_info },
        }
      );
      // send mail to user for resetting the password
      return findUser;
    } catch (error) {
      throw error;
    }
  };


  public async createAdminUser(data: IUser): Promise<IUser> {
    try {

      const AlreadyUser = await UserModel.findOne({ email: data.email });
      if (AlreadyUser) throw new Error("User Already Exists");

      const Salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, Salt);

      const DataMapping = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        phoneNumber: data.phoneNumber,
        roles: data.roles,
        addedBy: data.addedBy,
      };

      const createUserData: IUser = await UserModel.create({ ...DataMapping });
      return createUserData;
    } catch (error) {
      throw new Error(error)
    }
  }


  public async createNewUser(userData: IUser): Promise<{
    createUserData: IUser;
  }> {
    const findUser: IUser = await UserModel.findOne({ email: userData.email });
    if (findUser)
      throw new HttpException(
        409,
        `User with email ${userData.email} already exists`
      );

    const Salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, Salt);

    const StudentRoleId: IRolesSchema = await RolesModel.findOne({
      roleName: "STUDENT",
    });
    const Roles = [StudentRoleId._id];

    const Data = {
      email: userData.email,
      password: hashedPassword,
      phoneNumber: userData.phoneNumber,
      roles: Roles,
      addedBy: userData.addedBy,
    };

    const createUserData: IUser = await UserModel.create({
      ...Data,
      password: hashedPassword,
    });
    return { createUserData };
  }




}
