import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateUserDto } from './dto/updateUser.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private readonly repository: Repository<User>;

  async getUser(id: any): Promise<any> {
    const user = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    } 
    return {
      status: 400,
      message: `User with id: ${id} does not exist!`
    }
  }

  async updateUser(dto: UpdateUserDto) {
    const user = await this.repository.findOne({
      where: {
        email: dto.email,
      },
    });
    user.firstName = dto.firstName;
    user.secondName = dto.secondName;
    user.email = dto.newEmail;
    try {
      return this.repository.save(user);
    } catch (error) {
      return {
        status: 400,
        message: "Invalid change!"
      }
    }
  }
}