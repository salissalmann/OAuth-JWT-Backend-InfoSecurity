import { IsArray, IsString, IsNotEmpty, MinLength, MaxLength, isArray, IsBoolean } from 'class-validator';

export class AddRoleSchema {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    public roleName: string;

}

export class UpdateRoleSchema {

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    public _id: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    public roleName: string;
}





