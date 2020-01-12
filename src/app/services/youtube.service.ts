import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

interface YoutubeRespnse {
  etag: string;
  items: [{ contentDetails: any; etag: string; id: string; kind: string }];
  kind: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
}

@Injectable({
  providedIn: "root"
})
export class YoutubeService {
  baseurl = "https://www.googleapis.com/youtube/v3/";
  apiKey = environment.googleKey;

  constructor(public http: HttpClient) {}

  getUploadsId(channelId): Promise<string> {
    const url = `${this.baseurl}channels?id=${channelId}&key=${this.apiKey}&part=contentDetails`;

    return new Promise((resolve, reject) => {
      return this.http
        .get(url)
        .toPromise()
        .then((result: YoutubeRespnse) => {
          console.log(result.items[0].contentDetails.relatedPlaylists.uploads);

          resolve(result.items[0].contentDetails.relatedPlaylists.uploads);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  getUploads(uploadsId, limit = 10, pageToken = ""): Promise<YoutubeRespnse> {
    const url = `${this.baseurl}playlistItems?playlistId=${uploadsId}&key=${this.apiKey}&part=snippet%2CcontentDetails&maxResults=${limit}${pageToken ? `&pageToken=${pageToken}` : ""}`;

    return new Promise((resolve, reject) => {
      return this.http
        .get(url)
        .toPromise()
        .then((result: YoutubeRespnse) => {
          resolve(result);
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}
