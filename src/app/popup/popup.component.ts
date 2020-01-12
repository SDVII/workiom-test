import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import { faTimes, faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

import { AppState } from "src/app/reducers";
import * as fromVideo from "src/app/reducers/video/video.actions";
import { Video } from "src/app/reducers/video/video.model";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.scss"]
})
export class PopupComponent {
  @Input() video: Video;

  faTimes = faTimes;
  faExternalLinkAlt = faExternalLinkAlt;

  constructor(private store: Store<AppState>) {}

  close() {
    this.store.dispatch(
      new fromVideo.SetSelectedVideo({
        video: { id: "", comment: "", title: "", thumb: "" }
      })
    );
  }

  openLink(){
    let win = window.open(`https://www.youtube.com/watch?v=${this.video.id}`, '_blank');
    win.focus();
  }
}
