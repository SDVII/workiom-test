import { Component, Input } from "@angular/core";
import * as muuri from "muuri";
import Muuri from "types/muuri";
import { Video } from "types";
import Item from "types/item";
import { VideosService } from "src/app/services/videos.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"]
})
export class GridComponent {
  _videos: Video[] = [];
  grid: Muuri;
  options = {
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
  oldIndex: number = -1;
  newIndex: number = -1;
  currentPositions: string[] = [];

  /**
   * @description Event that triggers on card' dragging end in order to save the new positions and refresh layout
   * @param {Item} item Dragged grid card
   * @memberof GridComponent
   */
  dragEnd = item => {
    this.newIndex = this.getCardPosition(item);

    const shiftedCards = this.getShiftedCards();

    shiftedCards.forEach(card => {
      const newPosition = this.currentPositions.indexOf(card);
      this.videosService.update(card, { position: newPosition });
    });

    this.grid.refreshItems();
    this.grid.layout(true);
  };

  /**
   * @description Event that triggers on card's dragging start in order tot record it's original position
   * @param {Item} item Dragging grid card
   * @memberof GridComponent
   */
  dragStart = (item: Item) => {
    this.oldIndex = this.getCardPosition(item);
  };

  /**
   * @description Component's videos' setter that reinitializes the grid to receive new videos
   * @note This was necessary, because Muuri doesn't support adding web components dynamically.
   * @todo Use a different library
   * @param {Video[]} value new Videos
   * @memberof GridComponent
   */
  @Input() set videos(value: Video[]) {
    if (this.grid) {
      this.grid.destroy();
      this._videos = value;

      setTimeout(() => {
        this.grid = new muuri(".grid", this.options);
        this.grid.on("dragEnd", this.dragEnd);
        this.grid.on("dragStart", this.dragStart);
        window.scrollTo(0, document.body.scrollHeight);
        this.spinner.hide();
      }, 200);
    } else {
      this._videos = value;
      this.spinner.hide();
    }
  }

  get videos(): Video[] {
    return this._videos;
  }

  constructor(
    private videosService: VideosService,
    private spinner: NgxSpinnerService
  ) {}

  ngAfterViewInit() {
    this.grid = new muuri(".grid", this.options);

    // Give some time for the grid to load in order to refresh layout
    setTimeout(() => {
      this.grid.refreshItems();
      this.grid.layout(true);
      document.getElementsByClassName("grid")[0].classList.remove("hidden");
    }, 300);

    this.grid.on("dragEnd", this.dragEnd);
    this.grid.on("dragStart", this.dragStart);
  }

  /**
   * @description Gets card's current position from grid
   * @param {Item} item Card's grid item
   * @returns {number} Card's position
   * @memberof GridComponent
   */
  getCardPosition(item: Item): number {
    // Fetch the current grid items
    const orderedVideos = this.grid.getItems();

    // Create an item ID array
    this.currentPositions = orderedVideos.map(function(item) {
      return item
        .getElement()
        .getElementsByClassName("video-card")[0]
        .getAttribute("id");
    });

    // Get the index of the provided card
    return this.currentPositions.indexOf(
      item.getElement().getAttribute("data-id")
    );
  }

  /**
   * @description Find the cards that were shifted by the reordering
   * @returns Shifted cards
   * @memberof GridComponent
   */
  getShiftedCards() {
    // No shift happened
    if (this.newIndex === this.oldIndex) {
      return [];
    }

    // Shift backwards
    if (this.newIndex < this.oldIndex) {
      return this.currentPositions.slice(this.newIndex, this.oldIndex + 1);
    }
    // Shift forwards
    else {
      return this.currentPositions.slice(this.oldIndex, this.newIndex + 1);
    }
  }

  /**
   * @description Identifies cards to assign keys to them
   * @param item Item to be identified
   */
  identify(item) {
    return item.id;
  }
}
