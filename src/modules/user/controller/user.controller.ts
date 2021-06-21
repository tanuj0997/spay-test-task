import * as Boom from "@hapi/boom";
import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Query, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UUIDParam } from "decorators/http.decorators";
import { ValidationError } from "joi";
import { UserDto } from "../dto/user-dto";
import { UserService } from "../services/user.service";
import { UserRegisterDto } from '../dto/UserRegisterDto';


@Controller("users")
@ApiTags("Users")
export class UserController {
    constructor(private userService: UserService,) { }

    @Post("/")
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: "Successful Registration"
    })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    async register(@Body() payload: UserRegisterDto): Promise<any> {
        await this.userService.createUser(payload);
        return {
            message: "User Stored Successfully!",
            data: {
                user: payload.name,
                id: payload.id
            }
        }
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get users list',
        type: UserDto,
    })
    async getUser(@Query() userId: any): Promise<any> {
        const data = await this.userService.getUser(userId.id || 0);
        return { data }

    }
}
