import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {AuthHttpService} from "../authentication/auth-http.service";
import {ProjectHttpService} from "../projects/project-http.service";
import {map, Observable} from "rxjs";
import {ProjectInterface, UserInterface} from "@triplo/models";

@Injectable({
  providedIn: 'root'
})
export class ProjectOwnerGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthHttpService) private auth: AuthHttpService, private router: Router, private projectService: ProjectHttpService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (!this.auth.getUser()) {
      this.router.navigate([`/Login`])
      return false;
    }

    const userId = this.auth.getUser() as string;
    const projectId = this.findProjectId(route)
    const project$ = this.projectService.findProjectById(projectId, true)

    if (projectId === "") {
      this.router.navigate([`/Projects`])
      return false
    }

    if(this.canOwnerActivate(project$, userId)) {
      return true
    }

    this.router.navigate([`/Projects/${projectId}`])
    return false
  }

  canActivateChild(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route);
  }

  findProjectId(route: ActivatedRouteSnapshot): string {
    if (route.params['projectId'])
      return route.params['projectId']

    if (route.parent?.params['projectId'])
      return route.parent?.params['projectId']

    if (route.parent?.parent?.params['projectId'])
      return route.parent?.parent?.params['projectId']

    return "";
  }

  canOwnerActivate(project$: Observable<ProjectInterface>, userId: string) {
    return project$.pipe(map((project) => {
      const owner: UserInterface = project.ownerId as UserInterface
      return owner._id === userId;
    }))
  }
}
