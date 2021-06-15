import { Injectable } from '@nestjs/common';
import type { FindConditions } from 'typeorm';
import { UserRepository } from '../user.repository';
import type { UserDto } from '../dto/user-dto';
import type { UserEntity } from '../user.entity';
import { UserRegisterDto } from '../dto/UserRegisterDto';

@Injectable()
export class UserService {
  constructor(
    public readonly userRepository: UserRepository
  ) {}

  /**
   * Find single user
   */
  findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.userRepository.findOne(findData);
  }
  async findByUsernameOrEmail(
    options: Partial<{ username: string; email: string }>,
  ): Promise<UserEntity | undefined> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    if (options.email) {
      queryBuilder.orWhere('user.email = :email', {
        email: options.email,
      });
    }
    if (options.username) {
      queryBuilder.orWhere('user.username = :username', {
        username: options.username,
      });
    }

    return queryBuilder.getOne();
  }

  async createUser(
    userRegisterDto: UserRegisterDto,
  ): Promise<UserEntity> {
    const user = this.userRepository.create(userRegisterDto);

    return this.userRepository.save(user);
  }

  async getUser(userId: string): Promise<UserDto> {
    const queryBuilder = this.userRepository.createQueryBuilder('user');

    queryBuilder.where('user.id = :userId', { userId });

    const userEntity = await queryBuilder.getOne();

    return userEntity.toDto();
  }
}
