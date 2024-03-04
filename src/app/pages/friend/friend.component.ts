import { Component, OnInit } from "@angular/core"
import { FriendService } from "../../services/friend.service"
import { NgFor } from "@angular/common"
import { InputComponent } from "../../components/input/input.component"
import { ButtonComponent } from "../../components/button/button.component"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-friend",
  standalone: true,
  imports: [NgFor, InputComponent, ButtonComponent, FormsModule],
  templateUrl: "./friend.component.html",
})
export class FriendComponent implements OnInit {
  id!: number
  friends: any[] = []
  users: any[] = []
  usersFiltered: any[] = []
  friendName: string = ""

  ngOnInit(): void {
    this.id = Number(localStorage.getItem("sub"))

    this.friendService.getFriends(this.id).subscribe((res) => {
      const userArr = res.groups.map((g: any) => g.users)

      userArr.map((users) => {
        users.map((user: any) => {
          if (user.id !== this.id) {
            this.friends.push(user)
          }
        })
      })

      this.friendService.getUsers().subscribe((res: any) => {
        const ids = this.friends.map((friend) => friend.id)
        console.log(ids, this.id)
        this.users = res.filter(
          (user: any) => user.id !== this.id && !ids.includes(user.id)
        )
        this.usersFiltered = this.users
      })
    })
  }

  search(key: string) {
    if (key === "Enter" || key === "") {
      this.usersFiltered = this.users.filter((user) =>
        user.name
          .toLowerCase()
          .concat(" ", user.surname.toLowerCase())
          .includes(this.friendName.toLowerCase())
      )
      this.friendName = ""
    }
  }

  constructor(private friendService: FriendService) {}
}
