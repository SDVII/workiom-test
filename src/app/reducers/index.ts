import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as selectedVideo from "./video/video.reducer";
import { SelectedVideo } from './video/video.model';

export interface AppState extends SelectedVideo {}

export const reducers: ActionReducerMap<AppState> = {
  video: selectedVideo.reducer
}

export const selectedVid = (state: AppState) => state.video;

export const getSelectedVid = (state:AppState) => state.video;
