import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {UserInterface} from "@triplo/models";
import {Observable} from "rxjs";

@Injectable()
export class AuthHttpService {
  constructor(private http: HttpClient) {
  }

  login(email: string, password: string): Observable<UserInterface> {
    return this.http.post<UserInterface>("/api/login", {email, password});
  }

  register(email: string, password: string, username: string, gender: string): Observable<UserInterface> {
    return this.http.post<UserInterface>("/api/register", {email, password, username, gender})
  }
}
