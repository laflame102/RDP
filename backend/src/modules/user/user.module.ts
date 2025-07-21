import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserToken } from './entities/user_tokens.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserToken])],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
