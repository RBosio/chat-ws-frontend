import { NgIf } from "@angular/common"
import { Component, OnInit } from "@angular/core"
import { RouterModule } from "@angular/router"

@Component({
  selector: "app-home",
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: "./home.component.html",
})
export class HomeComponent implements OnInit {
  id!: number

  ngOnInit(): void {
    this.id = Number(localStorage.getItem("sub"))
  }
}
