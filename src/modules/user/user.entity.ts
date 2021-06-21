import { AbstractEntity } from '../../common/abstract.entity';
import { Column, Entity } from 'typeorm';
import { UserDto } from './dto/user-dto';

@Entity({ name: 'users' })
export class UserEntity extends AbstractEntity<UserDto> {
    @Column({ nullable: true })
    name: string;

    dtoClass = UserDto;
}
