import { ApplicationConfig, importProvidersFrom } from "@angular/core"
import { provideRouter } from "@angular/router"
import { SocketIoModule } from "ngx-socket-io"

import { routes } from "./app.routes"
import { HttpClientModule } from "@angular/common/http"

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      HttpClientModule,
      SocketIoModule.forRoot({
        url: "http://localhost:3000",
        options: {
          withCredentials: true,
        },
      })
    ),
  ],
}
