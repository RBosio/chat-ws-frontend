import { Component } from "@angular/core"
import { InputComponent } from "../input/input.component"
import { ButtonComponent } from "../button/button.component"
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms"
import { NgIf } from "@angular/common"
import { LoginService } from "./login.service"

@Component({
  selector: "app-login",
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, NgIf],
  templateUrl: "./login.component.html",
})
export class LoginComponent {
  form!: FormGroup

  ngOnInit(): void {
    this.form = this.initForm()
  }

  initForm(): FormGroup {
    return this.fb.group({
      email: ["", Validators.compose([Validators.email, Validators.required])],
      password: [
        "",
        Validators.compose([Validators.minLength(6), Validators.required]),
      ],
    })
  }

  onSubmit($e: any) {
    $e.preventDefault()
    if (this.form.valid) {
      const email = this.form.controls.email.value
      const password = this.form.controls.password.value

      this.loginService.login({ email, password }).subscribe((res) => {
        console.log(res)
      })
      return
    }

    console.log("invalid form")
  }

  constructor(private fb: FormBuilder, private loginService: LoginService) {}
}