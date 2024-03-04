import { Routes } from "@angular/router"
import { HomeComponent } from "./home/home.component"
import { LoginComponent } from "./auth/login/login.component"
import { authGuard } from "./auth/auth.guard"
import { ChatComponent } from "./chat/chat.component"

export const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "chat",
    component: ChatComponent,
    canActivate: [authGuard],
  },
  {
    path: "chat/:name",
    component: ChatComponent,
    canActivate: [authGuard],
  },
  {
    path: "**",
    redirectTo: "login",
  },
]
