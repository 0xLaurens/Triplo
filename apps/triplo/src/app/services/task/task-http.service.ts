import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {TaskInterface} from "@triplo/models";
import {Observable} from "rxjs";

@Injectable()
export class TaskHttpService {
  constructor(private http: HttpClient) {
  }

  getTopLevelTasks(projectId: string): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(`api/projects/${projectId}/tasks`)
  }

  getTaskReplies(taskId: string): Observable<TaskInterface[]> {
    return this.http.get<TaskInterface[]>(`api/tasks/${taskId}/replies`)
  }



  createTask(projectId: string, task: Partial<TaskInterface>): Observable<TaskInterface> {
    return this.http.post<TaskInterface>(`api/projects/${projectId}/tasks`, task)
  }

  findTaskById(taskId: string): Observable<TaskInterface> {
    return this.http.get<TaskInterface>(`api/tasks/${taskId}`)
  }

  updateTask(taskId: string, task: Partial<TaskInterface>): Observable<TaskInterface> {
    return this.http.put<TaskInterface>(`api/tasks/${taskId}`, task)
  }

  deleteTask(taskId: string,): Observable<TaskInterface> {
    return this.http.delete<TaskInterface>(`api/tasks/${taskId}`)
  }

  createSubTask(parentId: string, taskId: string, comment: TaskInterface): Observable<TaskInterface> {
    return this.http.post<TaskInterface>(`api/projects/${parentId}/tasks/${taskId}`, comment)
  }

}
