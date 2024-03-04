import { Component, OnInit } from "@angular/core"
import { FriendService } from "../friend/friend.service"
import { NgFor } from "@angular/common"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  user!: any
  friends: any[] = []
  id!: number

  ngOnInit(): void {
    this.id = Number(localStorage.getItem("sub"))

    this.friendService.getFriends(this.id).subscribe((res) => {
      this.user = res

      this.user.groups.map((fr: any) => {
        if (fr.users.length === 2) {
          this.friends = fr.users
            .filter((u: any) => u.id !== this.id)
            .map((r: any) => {
              return { user: r, group: fr.name }
            })
        } else {
        }
      })
    })
  }

  constructor(private friendService: FriendService) {}
}
