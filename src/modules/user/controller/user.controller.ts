import * as Boom from "@hapi/boom";
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UUIDParam } from "decorators/http.decorators";
import { ValidationError } from "joi";
import { UserDto } from "../dto/user-dto";
import { UserService } from "../services/user.service";


@Controller("users")
@ApiTags("Users")
export class UserController {
    constructor(private userService: UserService,) { }

    @Get("/")
    @ApiResponse({ status: HttpStatus.ACCEPTED, description: "Successful Login" })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    public async login(@Body() credentials: any): Promise<any> {
        return {
            message: "Logged in Successfully!",
            data: {
                user: "user",
                token: "token"
            }
        }
    }

    @Post("/")
    @ApiResponse({
        status: HttpStatus.ACCEPTED,
        description: "Successful Registration"
    })
    @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: "Bad Request" })
    @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: "Unauthorized" })
    async register(@Body() payload: any): Promise<any> {
        return {
            message: "Logged in Successfully!",
            data: {
                user: "user",
                token: "token"
            }
        }
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({
        status: HttpStatus.OK,
        description: 'Get users list',
        type: UserDto,
    })
    getUser(@UUIDParam('id') userId: string): Promise<UserDto> {
        return this.userService.getUser(userId);
    }

    @Get("health_check")
    async healthCheck(): Promise<any> {
        return {
            message: "server is working"
        };
    }
}
