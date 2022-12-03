import {Component, OnInit} from '@angular/core';
import {ProjectHttpService} from "../../../services/projects/project-http.service";
import {CommentInterface, ProjectInterface} from "@triplo/models";
import {ActivatedRoute, Router} from "@angular/router";
import {CommentHttpService} from "../../../services/comments/comment-http.service";
import {Observable} from "rxjs";

@Component({
  selector: 'triplo-project-detail',
  templateUrl: './project-detail.component.html',
  styles: [],
})
export class ProjectDetailComponent implements OnInit {
  project$!: Observable<ProjectInterface>
  recentComments: CommentInterface[] = []
  comments$!: Observable<CommentInterface[]>
  id!: string

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectHttpService,
    private commentService: CommentHttpService
  ) {
  }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id']
    });

    this.project$ = this.projectService.findProjectById(this.id)
    this.comments$ = this.commentService.getTopLevelComments(this.id)
  }

  deleteProject() {
    this.projectService.deleteProject(this.id).subscribe(
      p => {
        this.router.navigate(["/Projects"])
      }
    )
  }

  back() {
    this.router.navigate(["/Projects"])
  }

  async createComment($event: CommentInterface) {
    // TODO: implement assign proper user
    $event.username = "Monke"
    $event.owner = "638b2dd312a4cfd63a04ba40"
    this.commentService.createComment(this.id, $event).subscribe(data => {
        this.recentComments.push(data)
      }
    );
  }
}
