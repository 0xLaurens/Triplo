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
import {ProjectInterface} from "@triplo/models";
import {ProjectOwnerGuard} from "./project-owner.guard"

@Injectable({
  providedIn: 'root'
})
export class ProjectMemberGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthHttpService) private auth: AuthHttpService, private router: Router, private projectService: ProjectHttpService, private projectOwnerGuard: ProjectOwnerGuard) {
  }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (!this.auth.getUser()) {
      this.router.navigate([`/Login`])
      return false;
    }

    const userId: string = this.auth.getUser() as string;
    const projectId = this.projectOwnerGuard.findProjectId(route)
    const project$ = this.projectService.findProjectById(projectId, true)

    if (projectId === "") {
      this.router.navigate([`/Projects`])
      return false
    }

    if(this.canMemberActivate(project$, userId) || this.projectOwnerGuard.canOwnerActivate(project$, userId)) {
      return true;
    }

    this.router.navigate([`/Projects/${projectId}`])
    return false
  }

  canActivateChild(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route);
  }

  canMemberActivate(project$: Observable<ProjectInterface>, userId: string): Observable<boolean> {
    return project$.pipe(map((project) => {
      return project.members.some(m => m._id === userId);
    }))
  }
}
