import { Component } from "@angular/core"
import { InputComponent } from "../../components/input/input.component"
import { ButtonComponent } from "../../components/button/button.component"
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms"
import { NgIf } from "@angular/common"
import { Router } from "@angular/router"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "app-signup",
  standalone: true,
  imports: [InputComponent, ButtonComponent, ReactiveFormsModule, NgIf],
  templateUrl: "./signup.component.html",
})
export class SignupComponent {
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
      nombre: ["", Validators.compose([Validators.required])],
      apellido: ["", Validators.compose([Validators.required])],
    })
  }

  onSubmit($e: any) {
    $e.preventDefault()
    if (this.form.valid) {
      const email = this.form.controls.email.value
      const password = this.form.controls.password.value
      const name = this.form.controls.nombre.value
      const surname = this.form.controls.apellido.value

      this.loginService
        .signup({ email, password, name, surname })
        .subscribe((res) => {
          this.router.navigateByUrl("")
        })
      return
    }

    console.log("invalid form")
  }

  constructor(
    private fb: FormBuilder,
    private loginService: AuthService,
    private router: Router
  ) {}
}
