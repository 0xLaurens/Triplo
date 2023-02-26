import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {AuthHttpService} from "../authentication/auth-http.service";
import {ProjectHttpService} from "../projects/project-http.service";
import {forkJoin, map, Observable} from "rxjs";
import {ProjectInterface} from "@triplo/models";
import {ProjectOwnerGuard} from "./project-owner.guard"
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";

@Injectable({
  providedIn: 'root'
})
export class ProjectMemberGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthHttpService) private auth: AuthHttpService, private router: Router, private projectService: ProjectHttpService,
    private projectOwnerGuard: ProjectOwnerGuard,
    @Inject(TuiAlertService) private alertService: TuiAlertService
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (!this.auth.getUser()) {
      this.alertService.open('You need to be logged in to access this page!', {
        label: "Warning!",
        status: TuiNotification.Warning,
        autoClose: 5000
      }).subscribe()
      this.router.navigate([`/Login`])
      return false;
    }

    const userId: string = this.auth.getUser() as string;
    const projectId = this.projectOwnerGuard.findProjectId(route)
    const project$ = this.projectService.findProjectById(projectId, true)

    if (projectId === "") {
      this.alertService.open('No project found!', {
        label: "Error!",
        status: TuiNotification.Error,
      }).subscribe()
      this.router.navigate([`/Projects`])
      return false
    }


    const canActivate$ = forkJoin([this.canMemberActivate(project$, userId), this.projectOwnerGuard.canOwnerActivate(project$, userId)]).pipe(
      map(([members, owner]) => members || owner));

    canActivate$.subscribe(canActivate => {
      if (!canActivate) {
        this.alertService.open('You need to be a member to access this page', {label: "Warning!", status: TuiNotification.Warning}).subscribe()
      }
    })

    return canActivate$;
  }

  canActivateChild(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    return this.canActivate(route);
  }

  canMemberActivate(project$: Observable<ProjectInterface>, userId: string): Observable<boolean> {
    this.projectOwnerGuard.canOwnerActivate(project$, userId)
    return project$.pipe(map((project) => {
      return project.members.some(m => m._id === userId);
    }))
  }
}
