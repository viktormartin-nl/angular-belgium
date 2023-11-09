import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'creation-popup',
  templateUrl: './creation-popup.component.html',
  styleUrls: ['./creation-popup.component.scss'],
})
export class CreationPopup implements OnInit {
  commentForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}
}
