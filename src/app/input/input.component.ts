import { Component, Input } from "@angular/core"

@Component({
  selector: "app-input",
  standalone: true,
  imports: [],
  templateUrl: "./input.component.html",
})
export class InputComponent {
  @Input() name!: string
  @Input() type!: string
  @Input() placeholder!: string
}
