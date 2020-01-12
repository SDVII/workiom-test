import { Component, Input } from "@angular/core";
import * as muuri from "muuri";
import Muuri from "types/muuri";
import { Video } from "types";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"]
})
export class GridComponent {
  @Input() videos: Array<Video>;
  grid: Muuri;

  constructor() {}

  //UC7_YxT-KID8kRbqZo7MyscQ
  //UU7_YxT-KID8kRbqZo7MyscQ

  ngAfterViewInit() {
    let options = {
      dragEnabled: true,
      rounding: false,
      dragStartPredicate: {
        handle: ".arrows"
      },
      layout: {
        fillGaps: true
      },
      layoutOnResize: 100
    };

    const dragEnd = () => {
      const orderedVideos = this.grid.getItems();
      const orderedVideosIds = orderedVideos.map(function(item) {
        return item
          .getElement()
          .getElementsByClassName("video-card")[0]
          .getAttribute("id");
      });

      this.grid.refreshItems();
      this.grid.layout(true);

      console.log(this.videos, orderedVideosIds);
    };

    this.grid = new muuri(".grid", options);

    setTimeout(() => {
      this.grid.refreshItems();
      this.grid.layout(true);
      document.getElementsByClassName("grid")[0].classList.remove("hidden");
    }, 300);

    this.grid.on("dragEnd", dragEnd);
  }

  identify(item) {
    return item.id;
  }
}
