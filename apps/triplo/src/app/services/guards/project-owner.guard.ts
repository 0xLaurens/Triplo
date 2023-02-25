import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router,} from "@angular/router";
import {Inject, Injectable} from "@angular/core";
import {AuthHttpService} from "../authentication/auth-http.service";
import {ProjectHttpService} from "../projects/project-http.service";
import {map, Observable} from "rxjs";
import {ProjectInterface, UserInterface} from "@triplo/models";
import {TuiAlertService, TuiNotification} from "@taiga-ui/core";

@Injectable({
  providedIn: 'root'
})
export class ProjectOwnerGuard implements CanActivate, CanActivateChild {
  constructor(
    @Inject(AuthHttpService) private auth: AuthHttpService,
    private router: Router,
    private projectService: ProjectHttpService,
    @Inject(TuiAlertService) private alertService: TuiAlertService
    ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | boolean {
    if (!this.auth.getUser()) {
      this.alertService.open('You need to be logged in to access that page!', {label: 'Warning!', status: TuiNotification.Warning}).subscribe()
      this.router.navigate([`/Login`])
      return false;
    }

    const userId = this.auth.getUser() as string;
    const projectId = this.findProjectId(route)
    const project$ = this.projectService.findProjectById(projectId, true)

    if (projectId === "") {
      this.alertService.open('No project Found!', {label: 'Error!', status: TuiNotification.Error}).subscribe()
      this.router.navigate([`/Projects`])
      return false
    }
    const canActivate$: Observable<boolean> = this.canOwnerActivate(project$, userId)
    canActivate$.subscribe(canActivate => {
      if(!canActivate) {
        this.alertService.open('Access denied!', {label: 'Forbidden!', status: TuiNotification.Error}).subscribe()
        this.router.navigate([`/Projects/${projectId}`])
      }
    })

    return canActivate$
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
