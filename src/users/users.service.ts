import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entities';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(user: CreateUserDto): Promise<User | undefined> {
    const exists = await this.userRepository.findOne({
      where: { username: user.username },
    });
    if (exists) {
      throw new BadRequestException(
        'Username has been used. Choose another one',
      );
    }
    const newUser = await this.userRepository.create(user);
    const savedUser = await this.userRepository.save(newUser);
    return savedUser;
  }
}
