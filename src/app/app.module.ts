import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { reducers } from "./reducers";
import { AppComponent } from "./app.component";
import { GridComponent } from "./grid/grid.component";
import { CardComponent } from "./card/card.component";
import { PopupComponent } from "./popup/popup.component";
import { CoreModule } from "./core/core.module";
import { VideosService } from "./services/videos.service";
import { NgxSpinnerModule } from "ngx-spinner";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxYoutubePlayerModule } from "ngx-youtube-player";

@NgModule({
  declarations: [AppComponent, GridComponent, CardComponent, PopupComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxYoutubePlayerModule.forRoot(),
    StoreModule.forRoot(reducers),
    HttpClientModule,
    CoreModule,
    FormsModule,
    NgxSpinnerModule,
    RouterModule.forRoot([
      { path: "", redirectTo: "/home", pathMatch: "full" },
    ])
  ],
  providers: [VideosService],
  bootstrap: [AppComponent]
})
export class AppModule {}
