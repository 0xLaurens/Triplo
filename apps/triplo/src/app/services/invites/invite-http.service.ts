import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {InviteInterface} from "@triplo/models";


@Injectable()
export class InviteHttpService {
  constructor(private http: HttpClient) {
  }

  createInvite(userId: string, invite: InviteInterface): Observable<InviteInterface> {
    return this.http.post<InviteInterface>(`/api/invite/user/${userId}`, invite)
  }

  getInviteById(inviteId: string): Observable<InviteInterface> {
    return this.http.get<InviteInterface>(`/api/invite/${inviteId}`)
  }

  getInviteByProjectId(projectId: string): Observable<InviteInterface[]> {
    return this.http.get<InviteInterface[]>(`/api/invite/project/${projectId}`)
  }

  getInviteByUserId(userId: string): Observable<InviteInterface[]> {
    return this.http.get<InviteInterface[]>(`/api/invite/user/${userId}`)
  }

  updateInvite(inviteId:string, invite: InviteInterface): Observable<InviteInterface> {
    return this.http.put<InviteInterface>(`/api/invite/invite/${inviteId}`, invite)
  }

  deleteInvite(inviteId:string): Observable<InviteInterface> {
    return this.http.delete<InviteInterface>(`/api/invite/invite/${inviteId}`)
  }
}




