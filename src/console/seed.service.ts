import { Inject } from '@nestjs/common';
import { UserService } from 'modules/user/services/user.service';
import { Console, Command } from 'nestjs-console';
import fs from "fs";
import * as Papa from 'papaparse';
import { UserRegisterDto } from '../modules/user/dto/UserRegisterDto';

@Console()
export class SeedService {
    constructor(
        @Inject(UserService) private usersService: UserService,
    ) { }
    @Command({
        command: 'seed',
        description: 'Seed DB',
    })
    async seed(): Promise<void> {
        await this.seedUsers();
    }

    async seedUsers() {
        const userData = fs.readFileSync('src/console/data.csv',
            'utf8',
        );

        const parsedUsersData = Papa.parse(userData, { header: true });
        console.log(parsedUsersData);
        for (const user of parsedUsersData.data) {
            const tempUser = user as UserRegisterDto;
            await this.usersService.createUser(tempUser);
        }

    }
}