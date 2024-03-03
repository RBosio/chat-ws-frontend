import { Component } from "@angular/core"
import { RouterModule } from "@angular/router"
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome"
import {
  faHome,
  faRightToBracket,
  faRightFromBracket,
  faUserPlus,
  faUserGroup
} from "@fortawesome/free-solid-svg-icons"

@Component({
  selector: "navbar",
  standalone: true,
  imports: [FontAwesomeModule, RouterModule],
  templateUrl: "./navbar.component.html",
})
export class NavbarComponent {
  faHome = faHome
  faRightToBracket = faRightToBracket
  faRightFromBracket = faRightFromBracket
  faUserPlus = faUserPlus
  faUserGroup = faUserGroup
}
