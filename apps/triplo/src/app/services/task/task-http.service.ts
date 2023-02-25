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

  getTaskById(taskId: string): Observable<TaskInterface> {
    return this.http.get<TaskInterface>(`api/tasks/${taskId}`)
  }

  createTask(projectId: string, task: Partial<TaskInterface>): Observable<TaskInterface> {
    return this.http.post<TaskInterface>(`api/projects/${projectId}/tasks`, task)
  }

  updateTask(taskId: string, task: Partial<TaskInterface>): Observable<TaskInterface> {
    return this.http.put<TaskInterface>(`api/tasks/${taskId}`, task)
  }

  deleteTask(taskId: string,): Observable<TaskInterface> {
    return this.http.delete<TaskInterface>(`api/tasks/${taskId}`)
  }

  findSubtaskById(taskId: string, subtaskId: string): Observable<TaskInterface> {
    return this.http.get<TaskInterface>(`api/tasks/${taskId}/subtask/${subtaskId}`)
  }

  createSubtask(taskId: string, subtask: Partial<TaskInterface>): Observable<TaskInterface> {
    return this.http.post<TaskInterface>(`api/tasks/${taskId}/subtask/`, subtask)
  }

  updateSubtask(taskId: string, subtaskId: string, subtask: Partial<TaskInterface>): Observable<TaskInterface> {
    return this.http.put<TaskInterface>(`api/tasks/${taskId}/subtask/${subtaskId}`, subtask)
  }

  deleteSubtask(taskId: string, subtaskId: string): Observable<TaskInterface> {
    return this.http.delete<TaskInterface>(`api/tasks/${taskId}/subtask/${subtaskId}`)
  }

  getSubtaskById(taskId: string, subtaskId: string): Observable<TaskInterface> {
    return this.http.get<TaskInterface>(`api/tasks/${taskId}/subtask/${subtaskId}`)
  }
}
