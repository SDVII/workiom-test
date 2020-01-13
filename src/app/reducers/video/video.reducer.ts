import { VideoActionTypes, VideoActions } from "./video.actions";
import { SelectedVideo } from "./video.model";

export const initialState: SelectedVideo = {
  video: { comment: "", id: "", thumb: "", title: "" }
};

export function reducerFunction(
  state = initialState,
  action: VideoActions
): SelectedVideo {
  switch (action.type) {
    case VideoActionTypes.SetSelectedVideo:
      return (state = action.payload);

    default:
      return state;
  }
}

export const reducer = reducerFunction;
