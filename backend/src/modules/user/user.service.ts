import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserToken } from './entities/user_tokens.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserToken)
    private userTokenRepository: Repository<UserToken>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findByEmail(value: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { email: value },
    });
  }

  async findOne(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['tokens'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateRefreshToken(
    userId: number,
    refreshToken: string,
  ): Promise<void> {
    const existingToken = await this.userTokenRepository.findOne({
      where: { user: { id: userId } },
    });

    if (existingToken) {
      existingToken.refreshToken = refreshToken;
      await this.userTokenRepository.save(existingToken);
    } else {
      const newToken = this.userTokenRepository.create({
        refreshToken,
        user: { id: userId },
      });
      await this.userTokenRepository.save(newToken);
    }
  }
}
