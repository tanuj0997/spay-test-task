import { ApiPropertyOptional } from '@nestjs/swagger';
import { AbstractDto } from '../../../common/dto/abstract.dto';
import { UserEntity } from '../user.entity';

export class UserDto extends AbstractDto {
  @ApiPropertyOptional()
  name: string;

  @ApiPropertyOptional()
  id: string;

  constructor(user: UserEntity, options?: Partial<{ isActive: boolean }>) {
    super(user);
    this.name = user.name;
    this.id = user.id;
  }
}
