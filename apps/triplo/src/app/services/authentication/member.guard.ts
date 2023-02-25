import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {AuthHttpService} from "./auth-http.service";
import {ProjectHttpService} from "../projects/project-http.service";
import {map, Observable} from "rxjs";
import {UserInterface} from "@triplo/models";

@Injectable({
  providedIn: 'root'
})
export class MemberGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthHttpService) private auth: AuthHttpService, private router: Router, private projectService: ProjectHttpService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    let projectId;
    if (!this.auth.getUser()) {
      this.router.navigate([`/Login`])
      return false;
    }

    const userId: string = this.auth.getUser() as string;

    if (route.parent?.params['projectId'])
      projectId = route.parent?.params['projectId']

    if (route.parent?.parent?.params['projectId'])
      projectId = route.parent?.parent?.params['projectId']

    return this.projectService.findProjectById(projectId, true).pipe(map((project) => {
      if (project.members.some(m => m._id === userId)) {
        return true;
      }
      const owner: UserInterface = project.ownerId as UserInterface
      if(owner._id === userId)
        return true;

      this.router.navigate([`/Projects/${project._id}`])
      return false;
    }))
  }

  canActivateChild(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route);
  }
}
