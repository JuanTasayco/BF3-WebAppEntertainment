import { InjectModel } from "@nestjs/mongoose";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Auth } from "../entities/auth.entity";
import { Model } from "mongoose";
import { ConfigService } from "@nestjs/config";
import { JwtPayloadInt, User, UserClass } from "../interfaces/auth-responses.interface";
import { UnauthorizedException } from "@nestjs/common";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {

    constructor(@InjectModel(Auth.name) private dbUser: Model<Auth>, private configService: ConfigService) {
        super({
            secretOrKey: configService.get('JWT_PASSWORD'),
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }


    async validate(payload: JwtPayloadInt): Promise<any> {
        const { email } = payload;
        const user = await this.dbUser.findOne({ email })
        if (!user) throw new UnauthorizedException('Usuario no existe');
        return user;
    }
}