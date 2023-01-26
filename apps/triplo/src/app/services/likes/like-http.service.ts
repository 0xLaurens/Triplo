import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LikeInterface} from "@triplo/models";


@Injectable()
export class LikeHttpService {
  constructor(private http: HttpClient) {
  }

  findLikeById(likeId: string): Observable<LikeInterface> {
    return this.http.get<LikeInterface>(`api/like/${likeId}`)
  }

  createLike(like: LikeInterface): Observable<LikeInterface> {
    return this.http.post<LikeInterface>(`api/like`, like)
  }

  updateLike(likeId: string, like: LikeInterface): Observable<LikeInterface> {
    return this.http.put<LikeInterface>(`api/like/${likeId}`, like)
  }

  deleteComment(likeId: string,): Observable<LikeInterface> {
    return this.http.delete<LikeInterface>(`api/like/${likeId}`)
  }

  findLikeCompositeId(userId: string, projectId: string): Observable<LikeInterface> {
    return this.http.get<LikeInterface>(`api/like/${userId}/${projectId}`)
  }
}
