import { Injectable } from "@angular/core";
import Dexie from "dexie";

import { DexieService } from "src/app/core/dexie.service";
import { Video } from "../reducers/video/video.model";

@Injectable()
export class VideosService {
  table: Dexie.Table<Video, string>;

  constructor(private dexieService: DexieService) {
    this.table = this.dexieService.table("videos");
  }

  /**
   * @description Gets all videos
   * @returns {Promise<Video[]>}
   * @memberof VideosService
   */
  getAll(): Promise<Video[]> {
    return this.table.toArray();
  }

  /**
   * @description Gets a limited number of stored videos
   * @param {*} limit
   * @param {*} offset
   * @returns {Promise<Video[]>}
   * @memberof VideosService
   */
  getSomeFrom(limit, offset): Promise<Video[]> {
    return this.table
      .offset(offset)
      .limit(limit)
      .sortBy("position");
  }

  /**
   * @description Counts the number of stored videos
   * @returns {Promise<number>}
   * @memberof VideosService
   */
  getCount(): Promise<number> {
    return this.table.count();
  }

  /**
   * @description Adds a new video
   * @param {*} data Video to be added
   * @returns {Promise<string>} Confirmation
   * @memberof VideosService
   */
  add(data): Promise<string> {
    return this.table.add(data);
  }

  /**
   * @description Updates a video with the provided data
   * @param {string} id
   * @param {object} data Object of type {key: newValue}
   * @returns {Promise<number>} Number of affected videos
   * @memberof VideosService
   */
  update(id: string, data: object): Promise<number> {
    return this.table.update(id, data);
  }

  /**
   * @description Removes a video
   * @param {string} id
   * @returns {Promise<void>}
   * @memberof VideosService
   */
  remove(id: string): Promise<void> {
    return this.table.delete(id);
  }
}
