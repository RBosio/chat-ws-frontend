import { Routes } from "@angular/router"
import { HomeComponent } from "./home/home.component"
import { LoginComponent } from "../auth/login/login.component"
import { authGuard } from "../auth/auth.guard"

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [authGuard],
  },
  {
    path: "login",
    component: LoginComponent,
  },
]
