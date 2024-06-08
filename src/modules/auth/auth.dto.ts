import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
export class RegisterUserDto {
    @ApiProperty({
        description: 'UserName',
        example: 'John',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(30)
    userName: string;

    @ApiProperty({
        description: 'Email',
        example: 'john@example.com',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(50)
    email: string;

    @ApiProperty({
        description: 'Password',
        example: 'P@ssw0rd',
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/, {
        message:
            'Password must contain at least 6 characters, including symbols and numbers',
    })
    password: string;
}

export class LoginDto {
    @ApiProperty({
        description: 'User Email',
        example: 'john@example.com',
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({
        description: 'User Password',
        example: 'P@ssw0rd',
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    password: string;
}
