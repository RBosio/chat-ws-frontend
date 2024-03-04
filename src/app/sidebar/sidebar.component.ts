import { Component, OnInit } from "@angular/core"
import { FriendService } from "../friend/friend.service"
import { UserIResponse } from "../models/user.model"
import { NgFor } from "@angular/common"

@Component({
  selector: "app-sidebar",
  standalone: true,
  imports: [NgFor],
  templateUrl: "./sidebar.component.html",
})
export class SidebarComponent implements OnInit {
  user!: UserIResponse
  friends: UserIResponse[] = []

  ngOnInit(): void {
    const id = localStorage.getItem("sub")
    this.friendService.getFriends(Number(id)).subscribe((res) => {
      this.user = res

      this.user.groups.map((fr: any) => {
        if (fr.users.length === 2) {
          this.friends = this.friends.concat(
            fr.users.filter((u: UserIResponse) => u.id !== Number(id))
          )
        } else {
        }
      })
    })
  }

  constructor(private friendService: FriendService) {}
}
