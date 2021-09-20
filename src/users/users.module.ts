import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    RedisModule.forRoot(
      {
        config: {
          url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        },
      },
      'con-1',
    ),
    RedisModule.forRoot(
      {
        config: {
          url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
        },
      },
      'con-2',
    ),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
