import { Component, OnInit } from "@angular/core"
import { Router, RouterModule } from "@angular/router"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import {
  faHome,
  faRightToBracket,
  faRightFromBracket,
  faUserPlus,
  faUserGroup,
  faComments,
} from "@fortawesome/free-solid-svg-icons"
import { NgIf } from "@angular/common"
import { AuthService } from "../../services/auth.service"

@Component({
  selector: "navbar",
  standalone: true,
  imports: [FontAwesomeModule, RouterModule, NgIf],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent implements OnInit {
  logged: boolean = false
  local: boolean = false

  ngOnInit(): void {
    this.authService.logged.subscribe((res) => {
      this.logged = res
    })

    this.local = Boolean(localStorage.getItem("logged"))
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigateByUrl("/login")
    })
  }

  faHome = faHome
  faRightToBracket = faRightToBracket
  faRightFromBracket = faRightFromBracket
  faUserPlus = faUserPlus
  faUserGroup = faUserGroup
  faComments = faComments

  constructor(private authService: AuthService, private router: Router) {}
}
