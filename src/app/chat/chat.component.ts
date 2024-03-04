import { Component, OnInit } from "@angular/core"
import { SidebarComponent } from "../sidebar/sidebar.component"
import { GroupService } from "../group/group.service"
import { ActivatedRoute } from "@angular/router"
import { NgClass, NgFor } from "@angular/common"
import { ButtonComponent } from "../button/button.component"
import { FormsModule } from "@angular/forms"
import { Socket } from "ngx-socket-io"

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
