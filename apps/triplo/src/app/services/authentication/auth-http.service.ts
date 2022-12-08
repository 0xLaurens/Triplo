import {Inject, Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInterface} from "@triplo/models";
import {BehaviorSubject, map, Observable, of, switchMap} from "rxjs";
import {TuiAlertService} from "@taiga-ui/core";

@Injectable()
export class AuthHttpService {
  public currentUser$ = new BehaviorSubject<UserInterface | undefined>(undefined);
  private readonly CURRENT_USER = 'token';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    @Inject(TuiAlertService) private alertService: TuiAlertService
  ) {
  }

  login(email: string, password: string): Observable<UserInterface> {
    return this.http.post<UserInterface>("/api/login", {email, password})
      .pipe(
        map((user: UserInterface) => {
          this.setTokenStorage(user?.token);
          this.currentUser$.next(user);
          this.alertService.open("User login successful", {label: "Success!"});
          return user;
        }))
      ;
  }

  register(email: string, password: string, username: string, gender: string): Observable<UserInterface> {
    return this.http.post<UserInterface>("/api/register", {email, password, username, gender})
  }


  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private setTokenStorage(token: string | undefined): void {
    if (token) {
      localStorage.setItem(this.CURRENT_USER, token);
    }
  }

  // userMayEdit(itemUserId: string): Observable<boolean> {
  //   console.log('userMayEdit');
  //   return this.currentUser$.pipe(
  //     map((user: UserInterface | undefined) =>
  //       user ? user.id === itemUserId : false
  //     )
  //   );
  // }

}
