import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CommentInterface} from "@triplo/models";


@Injectable()
export class CommentHttpService {
  constructor(private http: HttpClient) {
  }

  getTopLevelComments(projectId: string): Observable<CommentInterface[]>{
    return this.http.get<CommentInterface[]>(`api/projects/${projectId}/comments`)
  }

  getCommentReplies(commentId:string): Observable<CommentInterface[]> {
    return this.http.get<CommentInterface[]>(`api/comments/${commentId}/replies`)
  }

  createComment(projectId: string, comment: CommentInterface): Observable<CommentInterface>{
    return this.http.post<CommentInterface>(`api/projects/${projectId}/comments`, comment)
  }

  updateComment(commentId: string, comment: CommentInterface): Observable<CommentInterface>{
    return this.http.put<CommentInterface>(`api/comments/${commentId}`, comment)
  }

  deleteComment(commentId: string, ): Observable<CommentInterface>{
    return this.http.delete<CommentInterface>(`api/comments/${commentId}`)
  }
}
