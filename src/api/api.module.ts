import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { EventModule } from './event/event.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, AuthModule, EventModule],
})
export class ApiModule {}
