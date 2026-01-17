import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignIn } from './dto/sign.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async signIn(@Body() SignIn: SignIn){
        const user = await this.authService.validateUser(
            SignIn.email,
            SignIn.password,
        );
        
        return this.authService.login(user)
    }
}
