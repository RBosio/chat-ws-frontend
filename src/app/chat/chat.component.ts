import { Component, OnInit } from "@angular/core"
import { SidebarComponent } from "../sidebar/sidebar.component"
import { GroupService } from "../group/group.service"
import { ActivatedRoute } from "@angular/router"
import { NgClass, NgFor } from "@angular/common"
import { ButtonComponent } from "../button/button.component"
import { FormsModule } from "@angular/forms"

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

  ngOnInit(): void {
    this.id = Number(localStorage.getItem("sub"))

    this.route.params.subscribe((params) => {
      this.groupService.getGroup(params["name"]).subscribe((res) => {
        this.messages = res.messages
        this.groupId = res.id
      })
    })
  }

  sendMessage(key: string) {
    if (key === "Enter" || key === "") {
      this.groupService
        .sendMessage(this.message, this.groupId, this.id)
        .subscribe((res) => {
          this.message = ""
        })
    }
  }

  constructor(
    private groupService: GroupService,
    private route: ActivatedRoute
  ) {}
}
