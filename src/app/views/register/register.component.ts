import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/class/custom-validators/custom-validators';
import { from } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { UserService } from 'src/app/shared/service/users/user.service';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/interface/user.interface';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide: boolean = true;

  test = this.fb;

  signUpForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: [
      '',
      Validators.compose([
        Validators.required,
        // check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true,
        }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true,
        }),
        // check whether the entered password has a lower case letter
        CustomValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true,
        }),
        // check whether the entered password has a special character
        CustomValidators.patternValidator(/[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/, {
          hasSpecialCharacters: true,
        }),
        Validators.minLength(8),
      ]),
    ],
  });

  emailAlreadyExist: boolean = false;
  users!: User[];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private elem: ElementRef,
    private renderer: Renderer2,
  ) { }

  ngOnInit(): void { }

  signUp(): void {
    this.getUsers();
    this.signUpForm.valueChanges.pipe(filter(() => this.signUpForm.controls['email'].valid)).subscribe({
      next: (formValue: User) => {
        this.renderer.listen('window', 'click', (event: PointerEvent) => {
          if (this.users) {
            if (this.users.filter((user: User) => user.email == formValue.email).length == 0) {
              this.emailAlreadyExist = false;
            } else {
              this.emailAlreadyExist = true;
            }
          }
        });
      },
    });
    this.userService.register(this.signUpForm.value).subscribe({
      next: (newUser: User) => {
        localStorage['loggedInUser'] = JSON.stringify(newUser);
        this.router.navigate(['/login']);
      },
    });
  }

  getUsers() {
    this.userService.get().subscribe({
      next: (_users: User[]) => (this.users = _users),
    });
  }
}
