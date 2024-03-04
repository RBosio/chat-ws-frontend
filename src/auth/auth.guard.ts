import { inject } from "@angular/core"
import { CanActivateFn, Router } from "@angular/router"
import { AuthService } from "./auth.service"
import { filter, map } from "rxjs"

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)

  return authService.isLogged().pipe(
    map((currentUser) => {
      if (!currentUser) {
        router.navigateByUrl("/login")
        localStorage.clear()
        return false
      }
      return true
    })
  )
}
