import {CanActivate, ExecutionContext, Injectable} from "@nestjs/common";
import {Reflector} from "@nestjs/core";

@Injectable()
export class AuthorizationUserGuard implements CanActivate {
  constructor(private reflector: Reflector) {
  }

  canActivate(context: ExecutionContext): boolean {
    const host = context.switchToHttp(),
      request = host.getRequest();
    const ownerId = this.reflector.get('ownerId', context.getHandler())
    if(!ownerId) {
      return true;
    }


    const user = request['user'];

    return this.matchIdentities(user._id, ownerId);
  }

  matchIdentities(userId: string, ownerId: string): boolean {
    return userId === ownerId;
  }

}
