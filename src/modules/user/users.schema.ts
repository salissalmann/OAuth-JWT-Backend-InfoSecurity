import { IsArray, IsString, IsNotEmpty, MinLength, MaxLength, isArray, IsBoolean } from 'class-validator';
export class LoginSchema {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    readonly password: string;
}

export class CreateUserSchema {
    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(40)
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(4)
    @MaxLength(20)
    readonly phoneNumber: string;
}

