import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import {AuthService} from "../modules/auth/auth.service";

@Injectable()
export class UserGuard implements CanActivate {
    constructor(
        private readonly authService: AuthService
    ) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const authorizationHeader = request.headers.authorization;

        if (!authorizationHeader) {
            return false;
        }

        const token = authorizationHeader.replace('Bearer ', '');
        const verificationResult = await this.authService.verifyAccessToken(token);
        if (!verificationResult.verified) {
            return false;
        }
        request.user = verificationResult.user;
        return true;
    }
}
