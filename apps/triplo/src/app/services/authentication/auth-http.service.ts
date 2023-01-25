import {Inject, Injectable, OnInit} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserInterface} from "@triplo/models";
import {BehaviorSubject, map, Observable } from "rxjs";
import {TuiAlertService} from "@taiga-ui/core";

@Injectable()
export class AuthHttpService {
  public currentUser$ = new BehaviorSubject<UserInterface | undefined>(undefined);
  public $loggedInStatus: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private readonly CURRENT_USER = 'token';
  private readonly headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(
    private http: HttpClient,
    @Inject(TuiAlertService) private alertService: TuiAlertService
  ) {
    this.$loggedInStatus.next(!this.getToken() == null)
  }


  login(email: string, password: string): Observable<UserInterface> {
    return this.http.post<UserInterface>("/api/login", {email, password})
      .pipe(
        map((user: UserInterface) => {
          console.log(user)
          this.setTokenStorage(user?.token);
          this.setIdStorage(user._id)
          this.$loggedInStatus.next(true)
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

  getUser(): string | null {
    return localStorage.getItem('id')
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

  signOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('id')
  }

  private setIdStorage(id: string): void {
    if (id) {
      localStorage.setItem('id', id)
    }
  }
}
