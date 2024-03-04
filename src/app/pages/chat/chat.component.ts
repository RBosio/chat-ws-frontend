import { Component, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { NgClass, NgFor } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Socket } from "ngx-socket-io"
import { ButtonComponent } from "../../components/button/button.component"
import { GroupService } from "../../services/group.service"
import { SidebarComponent } from "../../components/sidebar/sidebar.component"

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [SidebarComponent, NgFor, NgClass, ButtonComponent, FormsModule],
  templateUrl: "./chat.component.html",
})
export class ChatComponent implements OnInit {
  messages: any[] = []
  id!: number
  message!: string
  groupId!: number
  groupName!: string

  ngOnInit(): void {
    this.id = Number(localStorage.getItem("sub"))
    this.socket.fromEvent("message").subscribe((res: any) => {
      const m = {
        message: res.message,
        userSend: {
          id: res.userId,
        },
        created_at: res.created_at,
      }
      this.messages.push(m)
    })

    this.route.params.subscribe((params) => {
      this.groupName = params["name"]
      this.groupService.getGroup(this.groupName).subscribe((res) => {
        this.messages = res.messages
        this.groupId = res.id

        this.socket.emit("join", this.groupName)
      })
    })
  }

  sendMessage(key: string) {
    if (key === "Enter" || key === "") {
      this.groupService
        .sendMessage(this.message, this.groupId, this.id)
        .subscribe((res) => {
          this.socket.emit("message", {
            userId: this.id,
            groupId: this.groupName,
            message: this.message,
          })

          this.message = ""
        })
    }
  }

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute,
    private socket: Socket
  ) {}
}
