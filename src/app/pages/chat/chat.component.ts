import { Component, OnDestroy, OnInit } from "@angular/core"
import { ActivatedRoute } from "@angular/router"
import { NgClass, NgFor, NgIf } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Socket } from "ngx-socket-io"
import { ButtonComponent } from "../../components/button/button.component"
import { GroupService } from "../../services/group.service"
import { SidebarComponent } from "../../components/sidebar/sidebar.component"
import moment from "moment"

@Component({
  selector: "app-chat",
  standalone: true,
  imports: [
    SidebarComponent,
    NgFor,
    NgClass,
    NgIf,
    ButtonComponent,
    FormsModule,
  ],
  templateUrl: "./chat.component.html",
})
export class ChatComponent implements OnInit, OnDestroy {
  messages: any[] = []
  id!: number
  message!: string
  groupId!: number
  groupName!: string
  chat: boolean = false
  users: number[] = []

  ngOnInit(): void {
    moment.locale("es")
    this.id = Number(localStorage.getItem("sub"))
    this.socket.fromEvent("message").subscribe((res: any) => {
      const m = {
        message: res.message,
        userSend: {
          id: res.userId,
        },
        created_at: moment(res.created_at).format("LLL"),
      }
      this.messages.push(m)
    })

    this.socket.fromEvent("users").subscribe((res: any) => {
      this.users = res.split(",").map((id: any) => Number(id))
    })

    this.route.params.subscribe((params) => {
      this.groupName = params["name"]
      if (this.groupName) {
        this.groupService.getGroup(this.groupName).subscribe((res) => {
          this.messages = res.messages
          this.messages.map((message) => {
            message.created_at = moment(message.created_at).format("LLL")
            return message
          })
          this.groupId = res.id

          this.socket.emit("join", this.groupName)
        })
        this.chat = true
      } else {
        this.chat = false
      }
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

  ngOnDestroy(): void {
    this.socket.emit("leave", this.groupName)
  }
}
