import { UserRole } from 'src/role.decorator';
import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UnprocessableEntityException } from '@nestjs/common';

@Entity()
@Unique(['username'])
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.User })
  role: string;

  @BeforeInsert()
  async hashPassword() {
    const hashRounds = Number(process.env.AUTH_PASSWORD_ROUNDS);
    if (isNaN(hashRounds)) {
      throw new UnprocessableEntityException(
        'Environment variable configuration for hash rounds should be a number',
      );
    }
    this.password = await bcrypt.hash(this.password, hashRounds);
  }
}
