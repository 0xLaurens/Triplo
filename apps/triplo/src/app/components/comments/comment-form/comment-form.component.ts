import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentInterface} from "@triplo/models";
import {AuthHttpService} from "../../../services/authentication/auth-http.service";

@Component({
  selector: 'triplo-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: [],
})
export class CommentFormComponent implements OnInit {

  @Input() submitLabel = "Submit";
  @Input() tooltip = "Add a comment...";
  @Input() start_message = "";
  @Output() handleSubmit = new EventEmitter<CommentInterface>();
  @Output() handleCancel = new EventEmitter();

  form: FormGroup
  userId: string | null;

  constructor(private fb: FormBuilder, private readonly authService: AuthHttpService) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    if(this.tooltip === "Add a comment...") {
      this.tooltip = this.userId === null ? "You need to be logged in to comment..." : "Add a comment...";
    }
    this.form = this.fb.group({
      message: new FormControl(this.start_message, Validators.required)
    })
  }


  get f() {
    return this.form.controls;
  }

  onSubmit() {
    if (this.form.valid) {
      const changes: CommentInterface = {
        ...this.form.value
      }
      this.handleSubmit.emit(changes)
      this.form.reset()
    }
  }

  submitCancel() {
    this.form.reset()
    this.handleCancel.emit()
  }
}
