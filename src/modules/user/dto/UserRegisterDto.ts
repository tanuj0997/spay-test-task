import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

import { Trim } from '../../../decorators/transforms.decorator';

export class UserRegisterDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @Trim()
    readonly id: string;
}
