import { Component, Input } from "@angular/core"
import { FormControl, ReactiveFormsModule } from "@angular/forms"

@Component({
  selector: "app-input",
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: "./input.component.html",
})
export class InputComponent {
  @Input() name: string = ""
  @Input() type: string = ""
  @Input() placeholder: string = ""
  @Input() control: FormControl = new FormControl()
}
