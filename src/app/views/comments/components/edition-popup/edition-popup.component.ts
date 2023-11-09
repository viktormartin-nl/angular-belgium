import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comments } from 'src/app/shared/interface/comments.interface';

export interface DialogData {
  editedComment: Comments;
}

@Component({
  selector: 'app-edition-popup',
  templateUrl: './edition-popup.component.html',
  styleUrls: ['./edition-popup.component.scss'],
})
export class EditionPopup implements OnInit {
  commentForm: FormGroup;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.commentForm = this.fb.group({
      title: [data.editedComment.title, Validators.required],
      description: [data.editedComment.description, Validators.required],
    });
  }

  ngOnInit(): void {}
}
