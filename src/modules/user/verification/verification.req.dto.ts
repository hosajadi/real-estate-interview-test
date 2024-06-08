import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail, MaxLength } from 'class-validator';

export class VerifyCustomerEmailDto {
    @ApiProperty({
        description: 'Customer Email',
        example: 'john@example.com',
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MaxLength(50)
    email: string;

    @ApiProperty({
        description: 'Customer Verification Code',
        example: '123456',
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(6)
    verificationCode: string;
}
