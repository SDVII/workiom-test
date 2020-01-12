import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { reducers } from './reducers';

import { AppComponent } from "./app.component";
import { GridComponent } from "./grid/grid.component";
import { CardComponent } from "./card/card.component";
import { PopupComponent } from "./popup/popup.component";

import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { NgxYoutubePlayerModule } from "ngx-youtube-player";

@NgModule({
  declarations: [AppComponent, GridComponent, CardComponent, PopupComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    NgxYoutubePlayerModule.forRoot(),
    StoreModule.forRoot(reducers)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
