import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user; //assuming that the request object has the user property after it is passed from the middleware
    console.log('this is from guard', user);
    if (user && user.roles && user.roles === 'admin') {
      console.log('this is passsing true');
      return true;
    }
    console.log('this is passing false');
    return false;
  }
}
// just to commit
