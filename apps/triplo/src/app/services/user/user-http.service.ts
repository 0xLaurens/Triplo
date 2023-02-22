import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {UserInterface} from "@triplo/models";
import {HttpClient} from "@angular/common/http";


@Injectable()
export class UserHttpService {
  constructor(private http: HttpClient) {
  }

  findAllUsers(search?: string): Observable<UserInterface[]> {
    if (search && !(search.length > 0)) {
      return this.http.get<UserInterface[]>('/api/users')
    }
    return this.http.get<UserInterface[]>(`/api/users?search=${search}`)
  }

  findUserById(userId: string, ): Observable<UserInterface> {
      return this.http.get<UserInterface>(`/api/users/${userId}`)
  }

  updateUser(userId: string, user: Partial<UserInterface>): Observable<UserInterface> {
    return this.http.put<UserInterface>(`/api/users/${userId}`, user)
  }

  deleteUser(userId: string): Observable<UserInterface> {
    return this.http.delete<UserInterface>(`/api/users/${userId}`)
  }
}
