import { Component, Input, OnInit } from "@angular/core"
import { NgFor, NgIf } from "@angular/common"
import { RouterLink } from "@angular/router"
import { FriendService } from "../../services/friend.service"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [NgFor, RouterLink, NgIf],
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  user!: any
  friends: any[] = []
  id!: number

  @Input() users: number[] = []

  ngOnInit(): void {
    this.id = Number(localStorage.getItem("sub"))

    this.friendService.getUser(this.id).subscribe((res) => {
      this.user = res

      this.user.groups.map((fr: any) => {
        if (fr.users.length === 2) {
          this.friends = this.friends.concat(
            fr.users
              .filter((u: any) => u.id !== this.id)
              .map((r: any) => {
                return { user: r, group: fr.name }
              })
          )
        } else {
        }
      })
    })
  }

  constructor(private friendService: FriendService) {}
}
