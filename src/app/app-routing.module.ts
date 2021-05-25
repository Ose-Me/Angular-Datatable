import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AppDataService } from "./services/app-data.service";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppDataService],
})
export class AppRoutingModule {}
