import { Action } from "@ngrx/store";
import { Video } from "./video.model";

export enum VideoActionTypes {
  SetSelectedVideo = "[Video] Set Selected Video"
}

export class SetSelectedVideo implements Action {
  readonly type = VideoActionTypes.SetSelectedVideo;

  constructor(public payload: {video:Video}) {}
}

export type VideoActions = SetSelectedVideo;
