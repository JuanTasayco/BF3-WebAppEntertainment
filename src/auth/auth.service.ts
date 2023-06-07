import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from './entities/auth.entity';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserClass } from './interfaces/auth-responses.interface';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth.name) private dbdbAuth: Model<Auth>,
    private jwtService: JwtService) { }


  async create(createAuthDto: CreateAuthDto) {
    try {
      let { email, password } = createAuthDto
      createAuthDto.password = await bcrypt.hash(password, 10)
      const user = await this.dbdbAuth.create(createAuthDto);
      if (!user) throw new BadRequestException('Error al crear usuario');
      return {
        user,
        token: this.generateJwt({ email })
      };
    } catch (error) {
      console.log(error.code)
      if (error.code == '11000') {
        throw new BadRequestException('El email ya está registrado')
      }
      return error;
    }
  }

  async login(createAuthDto: CreateAuthDto) {
    try {
      const { email, password } = createAuthDto;

      const user = await this.dbdbAuth.findOne({ email })

      if (!user) throw new UnauthorizedException('Usuario no existe');

      if (!bcrypt.compareSync(password, user.password)) throw new UnauthorizedException('Contraseña incorrecta')

      return {
        user,
        token: this.generateJwt({ email })
      };

    } catch (error) {
      console.log(error)
      if (error.code == '11000') {
        throw new BadRequestException('El email ya está registrado')
      }
      return error;
    }
  }


  generateJwt(payload: UserClass) {
    const token = this.jwtService.sign(payload);
    return token
  }

}
