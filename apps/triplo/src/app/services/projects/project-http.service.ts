import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ProjectInterface} from "@triplo/models";


@Injectable()
export class ProjectHttpService {
  constructor(private http: HttpClient) {
  }

  findAllProjects(): Observable<ProjectInterface[]>{
    return this.http.get<ProjectInterface[]>('/api/projects')
  }

  findProjectById(projectId: string): Observable<ProjectInterface>{
    return this.http.get<ProjectInterface>(`/api/projects/${projectId}`)
  }

  updateProject(projectId: string, changes: Partial<ProjectInterface>): Observable<ProjectInterface> {
    return this.http.put<ProjectInterface>(`/api/projects/${projectId}`, changes)
  }

  createProject(projectId: string, changes: Partial<ProjectInterface>): Observable<ProjectInterface> {
    return this.http.post<ProjectInterface>(`/api/projects/${projectId}`, changes)
  }

  deleteProject(projectId:string) {
    return this.http.delete(`/api/projects/${projectId}`)
  }
}
