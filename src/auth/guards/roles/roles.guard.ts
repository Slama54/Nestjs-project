/* eslint-disable prettier/prettier */
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role_KEY } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector : Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean  {
    const requiredRols = this.reflector.getAllAndOverride<Role[]>(
      Role_KEY,
      [
        context.getHandler(),
         context.getClass()]
        )
        const user = context.switchToHttp().getRequest().user;
        const hasRequiredRole = requiredRols.some(role => user.role === role)
        return hasRequiredRole;
  }
}
