import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { filter, map } from 'rxjs/operators';
import { User } from 'src/app/shared/interface/user.interface';
import { UserService } from 'src/app/shared/service/users/user.service';

@Component({
  selector: 'register-email-error-message',
  templateUrl: './email-error-message.component.html',
  styleUrls: ['./email-error-message.component.scss'],
})
export class EmailErrorMessageComponent implements OnInit {
  @Input() signUpForm!: FormGroup;
  users!: User[];
  emailAlreadyExist: boolean = false;

  constructor(private userService: UserService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.getUsers();
    this.signUpForm.valueChanges.pipe(filter(() => this.signUpForm.controls['email'].valid)).subscribe({
      next: (formValue: User) => {
        this.renderer.listen('window', 'click', (event: PointerEvent) => {
          if (this.users.filter((user: User) => user.email == formValue.email).length == 0) {
            this.emailAlreadyExist = false;
          } else {
            this.emailAlreadyExist = true;
          }
        });
      },
    });
  }

  getUsers() {
    this.userService.get().subscribe({
      next: (_users: User[]) => (this.users = _users),
    });
  }
}
