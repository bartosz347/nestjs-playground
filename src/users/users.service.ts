import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRedis('con-1') private readonly redis1: Redis,
    @InjectRedis('con-2') private readonly redis2: Redis,
  ) {
    this.redis2.on('message', (channel, message) => {
      const createUserDto: CreateUserDto = JSON.parse(message);
      this.create(createUserDto);
      // TODO REMOVE
      console.log('Received: ' + message + ' on channel: ' + channel);
    });
    this.redis2.subscribe('user-channel', (err) => {
      if (err) {
        console.log(err);
      }
    });
  }

  create(createUserDto: CreateUserDto): Promise<User> {
    return this.usersRepository.save(createUserDto);
  }

  publishTest() {
    const message: CreateUserDto = {
      name: 'New name',
      address: 'New address',
      surname: 'New surname',
    };

    this.redis1.publish('user-channel', JSON.stringify(message));
    // TODO REMOVE
    console.log('Publishing %s ', message);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }
}
