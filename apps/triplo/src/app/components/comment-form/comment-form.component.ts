import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentInterface} from "@triplo/models";

@Component({
  selector: 'triplo-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: [],
})
export class CommentFormComponent implements OnInit {

  @Input() submitLabel = "Submit";
  @Output() handleSubmit = new EventEmitter<CommentInterface>();

  form: FormGroup

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      message: new FormControl("", Validators.required)
    })
  }


  get f() {
    return this.form.controls;
  }

  onSubmit() {
    const changes: CommentInterface = {
      ...this.form.value
    }
    this.handleSubmit.emit(changes)
  }
}
