import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'register-password-error-message',
  templateUrl: './password-error-message.component.html',
  styleUrls: ['./password-error-message.component.scss'],
})
export class PasswordErrorMessageComponent implements OnInit {
  @Input() signUpForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {}
}
