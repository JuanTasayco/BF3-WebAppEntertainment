import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, UserSchema } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ConfigService],
  imports: [
    MongooseModule.forFeature([
      {
        name: Auth.name,
        schema: UserSchema
      }
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_PASSWORD')
      })
    }),
    PassportModule.register({ defaultStrategy: 'jwt' })
  ],
  exports: [AuthService, JwtStrategy, ConfigService, MongooseModule]
})
export class AuthModule { }
