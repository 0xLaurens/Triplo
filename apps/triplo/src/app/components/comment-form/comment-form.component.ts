import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'triplo-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: [],
})
export class CommentFormComponent implements OnInit {

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

  }
}
