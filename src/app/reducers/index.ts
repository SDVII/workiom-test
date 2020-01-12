import { ActionReducerMap } from "@ngrx/store";

import * as selectedVideo from "./video/video.reducer";
import { SelectedVideo } from "./video/video.model";

export interface AppState extends SelectedVideo {}

export const reducers: ActionReducerMap<AppState> = {
  // @ts-ignore: Some typing miss-match, still works
  video: selectedVideo.reducer
};

export const selectedVid = (state: AppState) => state.video;

export const getSelectedVid = (state: AppState) => state.video;
