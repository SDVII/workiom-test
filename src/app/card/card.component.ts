import { Component, Input, EventEmitter, Output } from "@angular/core";
import { trigger, style, animate, transition } from "@angular/animations";
import { Store } from "@ngrx/store";

import {
  faComment,
  faArrowsAlt,
  faPlayCircle
} from "@fortawesome/free-solid-svg-icons";

import { AppState } from "src/app/reducers";
import * as fromVideo from "src/app/reducers/video/video.actions";
import { Video } from "src/app/reducers/video/video.model";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
  animations: [
    trigger("fadeInOut", [
      transition("void => *", [
        style({ opacity: "0" }),
        animate(100, style({ opacity: "1" }))
      ]),
      transition("* => void", [
        style({ opacity: "1" }),
        animate(100, style({ opacity: "0" }))
      ])
    ])
  ]
})
export class CardComponent {
  @Input() video: Video;
  @Output() videoSelected = new EventEmitter<Video>();

  faComment = faComment;
  faArrowsAlt = faArrowsAlt;
  faPlayCircle = faPlayCircle;
  isHovering: boolean;

  constructor(private store: Store<AppState>) {
    this.isHovering = false;
  }

  /**
   * @description Sets a video to be displayed in a popup
   * @param {Video} val Selected Video
   * @memberof CardComponent
   */
  setVideo(val: Video) {
    this.store.dispatch(new fromVideo.SetSelectedVideo({ video: val }));
  }
}
