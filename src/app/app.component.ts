import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState, getSelectedVid } from "src/app/reducers";
import { Video } from "src/app/reducers/video/video.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "workiom-test";
  videos: Video[];
  selectedVideo;

  constructor(private store: Store<AppState>) {
    this.videos = [
      {
        id: "PRQCAL_RMVo",
        thumb: "https://i.ytimg.com/vi/XA2LT97Z4Ho/sddefault.jpg",
        comment: "",
        title: "Dave Chappelle For What It's Worth Full YouTube1"
      },
      {
        id: "JxhG3H2-EIE",
        thumb: "https://i.ytimg.com/vi/XA2LT97Z4Ho/sddefault.jpg",
        comment: "Test Comment",
        title: "Dave Chappelle For What It's Worth Full YouTube2"
      },
      {
        id: "JxhG3H2-EIE",
        thumb: "https://i.ytimg.com/vi/XA2LT97Z4Ho/sddefault.jpg",
        comment: "Test Comment",
        title: "Dave Chappelle For What It's Worth Full YouTube3"
      },
      {
        id: "JxhG3H2-EIE",
        thumb: "https://i.ytimg.com/vi/XA2LT97Z4Ho/sddefault.jpg",
        comment: "Test Comment",
        title: "Dave Chappelle For What It's Worth Full YouTube4"
      },
      {
        id: "JxhG3H2-EIE",
        thumb: "https://i.ytimg.com/vi/XA2LT97Z4Ho/sddefault.jpg",
        comment: "Test Comment",
        title: "Dave Chappelle For What It's Worth Full YouTube5"
      }
    ];

    store.select(getSelectedVid).subscribe(video => {
      this.selectedVideo = video;
    });
  }
}
