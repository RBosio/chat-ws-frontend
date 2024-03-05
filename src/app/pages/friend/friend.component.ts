import { Component, OnInit } from "@angular/core"
import { FriendService } from "../../services/friend.service"
import { NgFor } from "@angular/common"
import { InputComponent } from "../../components/input/input.component"
import { ButtonComponent } from "../../components/button/button.component"
import { FormsModule } from "@angular/forms"
import { UserIResponse } from "../../models/user.model"

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
  friendRequests: any[] = []
  friendRequestsSend: any[] = []

  ngOnInit(): void {
    this.id = Number(localStorage.getItem("sub"))
    this.friendService.getFriendRequests(this.id).subscribe((res: any) => {
      this.friendRequests = res.map((fr: any) => {
        return {
          id: fr.id,
          userSend: fr.userSend,
        }
      })
    })

    this.friendService.getFriendRequestsSend(this.id).subscribe((res: any) => {
      this.friendRequestsSend = res.map((fr: any) => {
        return {
          id: fr.id,
          userReceive: fr.userReceive,
        }
      })

      this.friendService.getFriends(this.id).subscribe((res: any) => {
        const usersReceive = res
          .map((fr: any) => fr.userReceive)
          .filter((u: any) => u.id !== this.id)

        const usersSend = res
          .map((fr: any) => fr.userSend)
          .filter((u: any) => u.id !== this.id)

        this.friends = usersReceive.concat(usersSend)

        this.friendService.getUsers().subscribe((res: any) => {
          const ids = this.friends.map((friend) => friend.id)
          this.users = res.filter(
            (user: any) => user.id !== this.id && !ids.includes(user.id)
          )
          const usersReceive = this.friendRequestsSend.map(
            (fr) => fr.userReceive.id
          )
          this.users = this.users.filter(
            (user) => !usersReceive.includes(user.id)
          )
          const fr = this.friendRequests.map((fr) => fr.userSend.id)
          this.users = this.users.filter((user) => !fr.includes(user.id))

          this.usersFiltered = this.users
        })
      })
    })
  }

  accept(frId: number) {
    this.friendService.acceptFriendRequests(frId).subscribe((res) => {
      this.friendRequests = this.friendRequests.filter((fr) => fr.id !== frId)
      this.friends.push(res.userSend)
      this.usersFiltered = this.usersFiltered.filter(
        (user: any) => user.id !== res.userSend.id
      )
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

  addNewFriend(idReceive: number) {
    this.friendService
      .addFriend({
        userSendId: this.id,
        userReceiveId: idReceive,
      })
      .subscribe((res: any) => {
        this.users = this.users.filter((user) => user.id !== res.userReceive.id)
        this.usersFiltered = this.usersFiltered.filter(
          (user) => user.id !== res.userReceive.id
        )
      })
  }

  constructor(private friendService: FriendService) {}
}
