/* eslint-disable prettier/prettier */
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { AuthJwtPayload } from './types/auth-jwtPayload';
import refreshJwtConfig from './config/refresh-jwt.config';
import { ConfigType } from '@nestjs/config';
import * as argon2 from 'argon2'
import { currentUser } from './types/current-user';

@Injectable()
export class AuthService {
    // refreshToken(id:any){
    //     throw new Error("Method not implemented")
    // }
    constructor(private userService: UserService,private jwtService:JwtService,
        @Inject(refreshJwtConfig.KEY) private refreshTokenConfig : ConfigType<typeof refreshJwtConfig>

    ){}
    async validateUser(email:string, password:string){
        const user = await this.userService.findByEmail(email)
        if(!user) throw new UnauthorizedException("User not found")
        const isPasswordMatch = await compare(password, user.password)
    if(!isPasswordMatch) throw new UnauthorizedException("Invalid credentials")

    return{id: user.id}
    }
    // login(userId:number){
    //     const payload : AuthJwtPayload={sub:userId}
    //     const token = this.jwtService.sign(payload)
    //     const refreshToken = this.jwtService.sign(payload, this.refreshTokenConfig)
    //     return(
    //             {
    //                 id:userId,
    //                 token,
    //                 refreshToken
    //             }
    //         )
    // }
    async login(userId:number){
        const {accessToken, refreshToken}=await this.generateTokens(userId);
        const hashedRefreshToken = await argon2.hash(refreshToken)
        await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken)
        //const this.userService.updateHashedRefreshToken(userId,hashedRefreshToken)
        return{
            id:userId,
            accessToken,
            refreshToken
        }
    }
     async generateTokens(userId:number){
        const payload :AuthJwtPayload = {sub:userId};
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload),
            this.jwtService.signAsync(payload, this.refreshTokenConfig)
        ])
        return {accessToken, refreshToken}
    }

   async  refreshToken(userId:number){
    const {accessToken, refreshToken}=await this.generateTokens(userId);
    const hashedRefreshToken = await argon2.hash(refreshToken)
    await this.userService.updateHashedRefreshToken(userId, hashedRefreshToken)
    return{
        id:userId,
        accessToken,
        refreshToken
    }
    }
    async validateRefreshToken(userId:number, refreshToken:string){
        const user = await this.userService.findOne(userId);
        if(!user || !user.hashedRefreshToken) throw new UnauthorizedException('Invalid Refresh Token');
        const refreshTokenMatches = await argon2.verify(user.hashedRefreshToken, refreshToken)
        if(!refreshTokenMatches) throw new UnauthorizedException('Invalid Refresh Token');
        return {id : userId}
    }
    async signOut(userId: number){
        await this.userService.updateHashedRefreshToken(userId, null)
        return {message: 'Logged out'}
    }
    
    async validateJwt(userId: number){
        const user = await this.userService.findOne(userId);
        if(!user) throw new UnauthorizedException('Invalid User')
        const currentUser:currentUser ={id:user.id, role:user.role}
    return currentUser;
    }
}
