import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";

interface YoutubeRespnse {
  etag: string;
  items: ResponseItem[];
  kind: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  nextPageToken?: string;
}

interface ResponseItem {
  contentDetails: any;
  etag: string;
  id: string;
  kind: string;
  snippet?: any;
}

@Injectable({
  providedIn: "root"
})
export class YoutubeService {
  baseurl = "https://www.googleapis.com/youtube/v3/";
  apiKey = environment.googleKey;

  constructor(public http: HttpClient) {}

  /**
   * @description Gets a channel's uploaded' playlist's ID
   * @param {*} channelId Channel's Id
   * @returns {Promise<string>} Playlist's Id
   * @memberof YoutubeService
   */
  getUploadsId(channelId): Promise<string> {
    const url = `${this.baseurl}channels?id=${channelId}&key=${this.apiKey}&part=contentDetails`;

    return new Promise((resolve, reject) => {
      return this.http
        .get(url)
        .toPromise()
        .then((result: YoutubeRespnse) => {
          if (result.items.length === 0) {
            reject(new TypeError("Incorrect or Empty Channel"));
          }

          resolve(result.items[0].contentDetails.relatedPlaylists.uploads);
        })
        .catch(err => {
          reject(err);
        });
    });
  }

  /**
   * @description Gets videos form the upload playlist
   * @param {string} uploadsId
   * @param {number} [limit=8]
   * @param {string} [pageToken=""]
   * @returns {Promise<YoutubeRespnse>}
   * @memberof YoutubeService
   */
  getUploads(uploadsId:string, limit:number = 8, pageToken:string = ""): Promise<YoutubeRespnse> {
    const url = `${this.baseurl}playlistItems?playlistId=${uploadsId}&key=${
      this.apiKey
    }&part=snippet%2CcontentDetails&maxResults=${limit}${
      pageToken.length > 0 ? `&pageToken=${pageToken}` : ""
    }`;

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
