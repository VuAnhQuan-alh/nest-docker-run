import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);

    const { user } = context.switchToHttp().getRequest();

    if (!user.confirmed) {
      throw new HttpException(
        'Account is not activated!',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!roles) return true;

    const hasRole = () =>
      user.roles.some(
        (role: string) => !!roles.find((item: string) => item === role),
      );

    if (user && user.roles && hasRole()) return true;

    throw new HttpException('Not permission!', HttpStatus.BAD_REQUEST);
  }
}
