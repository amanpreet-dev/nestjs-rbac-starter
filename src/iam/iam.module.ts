import { Module } from '@nestjs/common';
import { HashingService } from './hashing/hashing.service';
import { BcryptService } from './hashing/bcrypt.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from './config/jwt.config';
import { ConfigModule } from '@nestjs/config';
import { AuthGuard } from './guards/auth/auth.guard';
import { AccessTokenGuard } from './guards/access-token/access-token.guard';
import { APP_GUARD } from '@nestjs/core';
import { RefreshTokenIdsStorage } from './storage/refresh-token-ids.storage/refresh-token-ids.storage';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    { provide: APP_GUARD, useClass: AuthGuard },
    AccessTokenGuard,
    RefreshTokenIdsStorage,
    AuthService,
  ],
  controllers: [AuthController],
})
export class IamModule {}
