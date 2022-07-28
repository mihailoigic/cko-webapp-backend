import {
    ForbiddenException,
    Injectable,
  } from '@nestjs/common';
  import { AuthDto } from './dto/auth.dto';
  import * as argon from 'argon2';
  import { JwtService } from '@nestjs/jwt';
  import { ConfigService } from '@nestjs/config';
  import { InjectRepository } from '@nestjs/typeorm';
  import { User } from '../api/user/user.entity';
  import { Repository } from 'typeorm';
  
  @Injectable()
  export class AuthService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;
    constructor(
      private jwt: JwtService,
      private config: ConfigService,
    ) {}
  
    async signup(dto: AuthDto) {
      const hash = await argon.hash(dto.password);
      dto.password = hash;
      const user = await this.findUser(dto.email);
      if (user) {
        throw new ForbiddenException(
          'User already exists!',
        );
      }
      try {
        return {
            status: 200,
            message: "User successfully created!",
            user: await this.repository.save(dto)
    }
      } catch (error) {
        return {
            status: 400,
            message: "Signup unavailable!"
        }
      };
    }
  
    async signin(dto: AuthDto) {
        const user = await this.findUser(dto.email);
      if (!user)
        throw new ForbiddenException(
          'Incorrect email!',
        );
  
      const pwMatches = await argon.verify(
        user.password,
        dto.password,
      );

      if (!pwMatches)
        throw new ForbiddenException(
          'Incorrect password!',
        );
      return this.signToken(user.id, user.email);
    }

    async findUser(email: string) {
        return await this.repository.findOne({
            where: {
              email: email,
            },
          });
    }
  
    async signToken(userId: number, email: string): Promise<{ access_token: string }> {
      const payload = {
        sub: userId,
        email,
      };
      const secret = this.config.get('JWT_SECRET');
  
      const token = await this.jwt.signAsync(
        payload,
        {
          secret: secret,
        },
      );
  
      return {
        access_token: token,
      };
    }
  }