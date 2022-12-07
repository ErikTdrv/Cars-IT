import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { emailValidator, passwordValidator } from 'src/app/shared/validator';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  form!: FormGroup;
  errors: string | undefined = undefined;
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],
      rePass: ['', [Validators.required, passwordValidator]]
    });
  }

  register(): void{
    this.userService.register(this.form.value).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.errors = err.error.error
      }
    })
  }

}
