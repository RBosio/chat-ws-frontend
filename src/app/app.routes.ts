import { Routes } from "@angular/router"
import { HomeComponent } from "./pages/home/home.component"
import { authGuard } from "./guards/auth.guard"
import { ChatComponent } from "./pages/chat/chat.component"
import { LoginComponent } from "./pages/login/login.component"
import { FriendComponent } from "./pages/friend/friend.component"

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
    path: "friends",
    component: FriendComponent,
    canActivate: [authGuard],
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
