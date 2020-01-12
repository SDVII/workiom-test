import { Component, Input } from "@angular/core";
import { Store } from "@ngrx/store";

import {
  faTimes,
  faExternalLinkAlt,
  faPen
} from "@fortawesome/free-solid-svg-icons";

import { AppState } from "src/app/reducers";
import * as fromVideo from "src/app/reducers/video/video.actions";
import { Video } from "src/app/reducers/video/video.model";
import { VideosService } from "src/app/services/videos.service";

@Component({
  selector: "app-popup",
  templateUrl: "./popup.component.html",
  styleUrls: ["./popup.component.scss"]
})
export class PopupComponent {
  @Input() video: Video;

  faTimes = faTimes;
  faExternalLinkAlt = faExternalLinkAlt;
  faPen = faPen;
  comment: string = "";
  isInputToggled: boolean = false;

  constructor(
    private store: Store<AppState>,
    private videosService: VideosService
  ) {}

  ngOnInit() {
    // Check if there are comments or not
    if (this.video.comment.trim().length === 0) {
      this.isInputToggled = true;
    } else {
      this.comment = this.video.comment;
    }
  }

  ngAfterViewInit() {
    // Focuses the comment's input if no comments were found
    if (this.isInputToggled) {
      const inputElement = document
        .getElementById("popup")
        .getElementsByClassName("write")[0]
        .getElementsByTagName("input")[0] as HTMLElement;

      inputElement.focus();
    }
  }

  /**
   * @description Closes the popup by clearing the selected video
   * @memberof PopupComponent
   */
  close() {
    this.store.dispatch(
      new fromVideo.SetSelectedVideo({
        video: { id: "", comment: "", title: "", thumb: "" }
      })
    );
  }

  /**
   * @description Opens a link in a new tab
   * @memberof PopupComponent
   */
  openLink() {
    let win = window.open(
      `https://www.youtube.com/watch?v=${this.video.id}`,
      "_blank"
    );
    win.focus();
  }

  /**
   * @description Updates the video's comment with the temporary comment
   * @memberof PopupComponent
   */
  async update() {
    if (this.comment.trim().length > 0) {
      this.video.comment = this.comment;
      await this.videosService.update(this.video.id, { comment: this.comment });
      this.isInputToggled = false;
    }
  }

  /**
   * @description Toggles comment editing
   * @memberof PopupComponent
   */
  toggle() {
    this.isInputToggled = true;

    setTimeout(() => {
      const inputElement = document
        .getElementById("popup")
        .getElementsByClassName("write")[0]
        .getElementsByTagName("input")[0] as HTMLElement;

      inputElement.focus();
    }, 200);
  }
}
