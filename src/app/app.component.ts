import { Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState, getSelectedVid } from "src/app/reducers";
import { Video } from "src/app/reducers/video/video.model";
import { YoutubeService } from "src/app/services/youtube.service";
import { VideosService } from "src/app/services/videos.service";
import { NgxSpinnerService } from "ngx-spinner";

//UCXuqSBlHAE6Xw-yeJA0Tunw

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  title = "workiom-test";
  videos: Video[] = [];
  selectedVideo;
  nextPageToken: string = "";
  channelId: string = "";
  isIncorrectId: boolean = false;

  constructor(
    private store: Store<AppState>,
    private yotubeService: YoutubeService,
    private videosService: VideosService,
    private spinner: NgxSpinnerService
  ) {
    this.store.select(getSelectedVid).subscribe(video => {
      this.selectedVideo = video;
    });
  }

  async ngOnInit() {
    let cachedNum = await this.videosService.getCount();
    if (cachedNum > 0) {
      this.fetchCachedVids();
    }
  }

  /**
   * @description Checks if the video is already cached
   * @param {*} id
   * @returns {boolean}
   * @memberof AppComponent
   */
  containsVideo(id): boolean {
    for (let i = 0; i < this.videos.length; i++) {
      if (this.videos[i].id === id) {
        return true;
      }
    }

    return false;
  }

  /**
   * @description Recursive function that fetches new videos from YouTube
   * newer and older than the cached videos
   * @param {number} num Number of videos to be fetched
   * @param {Video[]} newVids Array of new videos
   * @memberof AppComponent
   */
  fetchYoutubeVids(num: number, newVids: Video[]) {
    // Initialize
    this.isIncorrectId = false;
    this.spinner.show();

    this.yotubeService
      .getUploadsId(this.channelId)
      .then(result => {
        this.yotubeService
          .getUploads(result, num, this.nextPageToken)
          .then(results => {
            // Saves new pageToken
            this.nextPageToken = results.nextPageToken;
            let newVidsCounter = 0;

            // Goes through the fetched items to make sure they are not duplicates
            for (let index = 0; index < results.items.length; index++) {
              const vidItem = results.items[index];

              if (!this.containsVideo(vidItem.contentDetails.videoId)) {
                newVidsCounter++;

                const vid: Video = {
                  id: vidItem.contentDetails.videoId,
                  comment: "",
                  title: vidItem.snippet.title,
                  thumb: vidItem.snippet.thumbnails.medium.url,
                  position: this.videos.length + newVidsCounter
                };

                newVids.push(vid);
                this.videosService.add(vid);
              }
            }

            if (newVidsCounter < num) {
              this.fetchYoutubeVids(num - newVidsCounter, newVids);
            } else {
              // Sorts the videos by their position
              let unorderedVids = this.videos.concat(newVids);
              this.videos = unorderedVids.sort((a, b) =>
                a.position > b.position ? 1 : -1
              );

              return;
            }
          });
      })
      .catch(() => {
        // Incorrect or Empty ID
        this.spinner.hide();
        this.isIncorrectId = true;
      });
  }

  /**
   * @description Fetches cached videos
   * @memberof AppComponent
   */
  async fetchCachedVids() {
    const cachedVids = await this.videosService.getAll();

    let unorderedVids = this.videos.concat(cachedVids);
    this.videos = unorderedVids.sort((a, b) =>
      a.position > b.position ? 1 : -1
    );
  }
}
