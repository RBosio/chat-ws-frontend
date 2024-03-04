import { Component } from "@angular/core"
import { SidebarComponent } from "../sidebar/sidebar.component"

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: "./chat.component.html",
})
export class ChatComponent {}
