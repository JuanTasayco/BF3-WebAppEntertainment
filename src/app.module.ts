import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { SeedModule } from './seed/seed.module';
import { MoviesModule } from './movies/movies.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    MoviesModule,
    MongooseModule.forRoot('mongodb://localhost:27029/webapp-db'),
    SeedModule,
  ],

  controllers: [],
  providers: [JwtService],
})

export class AppModule { }